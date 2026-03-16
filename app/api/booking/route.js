import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const { serviceDate, serviceTime } = data;

    // Check existing booking
    const existingBooking = await Booking.findOne({ serviceDate, serviceTime });
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

    // Generate new bookingId
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 });
    let newId = "BK001";
    if (lastBooking && lastBooking.bookingId) {
      const lastNumber = parseInt(lastBooking.bookingId.replace("BK", ""));
      const nextNumber = lastNumber + 1;
      newId = "BK" + String(nextNumber).padStart(3, "0");
    }

    const booking = await Booking.create({ ...data, bookingId: newId });

    return NextResponse.json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// DELETE booking
export async function DELETE(req) {
  try {
    await connectDB();
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ success: false, message: "Booking ID required" }, { status: 400 });
    }

    const deletedBooking = await Booking.findOneAndDelete({ bookingId });

    if (!deletedBooking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// PATCH / update booking status
export async function PATCH(req) {
  try {
    await connectDB();
    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json({ success: false, message: "Booking ID and status required" }, { status: 400 });
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}