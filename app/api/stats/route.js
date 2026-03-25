import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();

  try {
    const totalServices = await Service.countDocuments();

    const activeServices = await Service.countDocuments({ status: "active" });

    const totalBookings = await Booking.countDocuments();

    const revenueData = await Booking.aggregate([
      { $match: { status: "Completed" } },
      {
        $project: {
          numericPrice: {
            $toDouble: { $substr: ["$service.price", 1, -1] },
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$numericPrice" },
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
