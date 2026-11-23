import { NextResponse } from "next/server";

const ALLOWED_ROOM_TYPES = new Set([
  "Lake view room",
  "Garden room",
  "Suite",
  "Not sure yet",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

interface BookingRequestPayload {
  guestName?: unknown;
  email?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  guests?: unknown;
  roomType?: unknown;
  phone?: unknown;
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

const bookings: StoredBooking[] = [];

function parseIsoDate(value: string): Date | null {
  if (!ISO_DATE_RE.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10) === value ? parsed : null;
}

export async function POST(request: Request) {
  let body: BookingRequestPayload;

  try {
    body = (await request.json()) as BookingRequestPayload;
  } catch {
    return NextResponse.json(
      { error: "Please send a valid booking request." },
      { status: 400 }
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
  if (!arrivalDate || !departureDate || departureDate <= arrivalDate) {
    return NextResponse.json(
      { error: "Please choose valid arrival and departure dates." },
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

  const reference = crypto.randomUUID();
  bookings.push({
    reference,
    guestName,
    email,
    checkIn,
    checkOut,
    guests: guestsRaw,
    roomType,
    phone,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
