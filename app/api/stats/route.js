import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();

  try {
    // Total Services
    const totalServices = await Service.countDocuments();

    // Active Services
    const activeServices = await Service.countDocuments({ status: "active" });

    // ✅ Only completed bookings count
    const totalBookings = await Booking.countDocuments({
      status: "completed",
    });

    // ✅ Only completed bookings revenue
    const revenueData = await Booking.aggregate([
      {
        $match: {
          status: "completed", // 👈 MOST IMPORTANT FIX
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalServices,
        activeServices,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error" });
  }
}