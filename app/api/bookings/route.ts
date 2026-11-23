import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_ROOM_TYPES = new Set([
  "Lake view room",
  "Garden room",
  "Suite",
  "Not sure yet",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_STAY_NIGHTS = 90;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;

interface BookingRequestPayload {
  guestName?: unknown;
  email?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  guests?: unknown;
  roomType?: unknown;
  phone?: unknown;
  website?: unknown; // Honeypot field
}

export interface StoredBooking {
  reference: string;
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  phone: string;
  createdAt: string;
}

const memoryBookings: StoredBooking[] = [];
const ipHits = new Map<string, number[]>();

function parseIsoDate(value: string): Date | null {
  if (!ISO_DATE_RE.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10) === value ? parsed : null;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

async function persistBookingLocally(booking: StoredBooking): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "bookings.json");
    await mkdir(dataDir, { recursive: true });
    let existing: StoredBooking[] = [];
    try {
      const raw = await readFile(filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed as StoredBooking[];
    } catch {
      // First booking file creation
    }
    existing.push(booking);
    await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
  } catch {
    // Ignore filesystem errors on read-only serverless deployments
  }
}

async function dispatchNotifications(booking: StoredBooking): Promise<void> {
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
    } catch {
      // Non-blocking notification failure
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;
  const fromEmail =
    process.env.BOOKING_FROM_EMAIL || "Zouru Hotel <bookings@zouruhotel.com>";
  if (resendApiKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notifyEmail],
          reply_to: booking.email,
          subject: `New stay request: ${booking.guestName} (${booking.checkIn} to ${booking.checkOut})`,
          text: [
            `Reference: ${booking.reference}`,
            `Guest: ${booking.guestName}`,
            `Email: ${booking.email}`,
            `Phone: ${booking.phone || "Not provided"}`,
            `Arrival: ${booking.checkIn}`,
            `Departure: ${booking.checkOut}`,
            `Guests: ${booking.guests}`,
            `Room style: ${booking.roomType}`,
            `Submitted: ${booking.createdAt}`,
          ].join("\n"),
        }),
      });
    } catch {
      // Non-blocking email failure
    }
  }
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many booking requests right now. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: BookingRequestPayload;

  try {
    body = (await request.json()) as BookingRequestPayload;
  } catch {
    return NextResponse.json(
      { error: "Please send a valid booking request." },
      { status: 400 }
    );
  }

  // Silently accept honeypot bot submissions without storing or notifying
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot.length > 0) {
    return NextResponse.json(
      { ok: true, reference: crypto.randomUUID() },
      { status: 201 }
    );
  }

  const guestName =
    typeof body.guestName === "string" ? body.guestName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const checkIn = typeof body.checkIn === "string" ? body.checkIn.trim() : "";
  const checkOut =
    typeof body.checkOut === "string" ? body.checkOut.trim() : "";
  const guestsRaw = Number(body.guests);
  const roomType =
    typeof body.roomType === "string" ? body.roomType.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (guestName.length < 2 || guestName.length > 100) {
    return NextResponse.json(
      { error: "Please share your name so we can address your reply." },
      { status: 400 }
    );
  }

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const arrivalDate = parseIsoDate(checkIn);
  const departureDate = parseIsoDate(checkOut);
  const nowUtc = new Date();
  const minAllowedArrival = new Date(
    Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate() - 1)
  );

  if (
    !arrivalDate ||
    !departureDate ||
    arrivalDate < minAllowedArrival ||
    departureDate <= arrivalDate
  ) {
    return NextResponse.json(
      { error: "Please choose valid arrival and departure dates." },
      { status: 400 }
    );
  }

  const nights = Math.round(
    (departureDate.getTime() - arrivalDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  if (nights > MAX_STAY_NIGHTS) {
    return NextResponse.json(
      {
        error:
          "For stays longer than 90 nights, please contact our team directly.",
      },
      { status: 400 }
    );
  }

  if (!Number.isInteger(guestsRaw) || guestsRaw < 1 || guestsRaw > 8) {
    return NextResponse.json(
      { error: "Please select between 1 and 8 guests." },
      { status: 400 }
    );
  }

  if (!ALLOWED_ROOM_TYPES.has(roomType)) {
    return NextResponse.json(
      { error: "Please choose one of our room styles." },
      { status: 400 }
    );
  }

  if (phone.length > 30) {
    return NextResponse.json(
      { error: "Phone number is too long." },
      { status: 400 }
    );
  }

  const booking: StoredBooking = {
    reference: crypto.randomUUID(),
    guestName,
    email,
    checkIn,
    checkOut,
    guests: guestsRaw,
    roomType,
    phone,
    createdAt: new Date().toISOString(),
  };

  memoryBookings.push(booking);
  await Promise.all([
    persistBookingLocally(booking),
    dispatchNotifications(booking),
  ]);

  return NextResponse.json(
    { ok: true, reference: booking.reference },
    { status: 201 }
  );
}
