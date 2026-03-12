import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const { serviceDate, serviceTime } = data;

    // Check existing booking
    const existingBooking = await Booking.findOne({
      serviceDate,
      serviceTime,
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This time slot is already booked. Please select another time.",
        },
        { status: 400 },
      );
    }

    const booking = await Booking.create(data);

    return NextResponse.json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
