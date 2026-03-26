import { dbConnect } from "@/libs/db";
import Booking from "@/models/Booking";

export async function GET() {
  await dbConnect();

  try {
    const revenue = await Booking.aggregate([
      {
        $match: {
          status: "Completed",
          createdAt: { $exists: true },
        },
      },
      {
        $addFields: {
          price: {
            $toDouble: {
              // "$79" → "79"
              $substr: ["$service.price", 1, -1],
            },
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$price" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthlyRevenue = Array(12).fill(0);

    revenue.forEach((item) => {
      monthlyRevenue[item._id - 1] = item.total;
    });

    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue",
          data: monthlyRevenue,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgb(59, 130, 246)",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Revenue API Error:", error);

    return Response.json(
      { success: false, message: "Failed to fetch revenue" },
      { status: 500 },
    );
  }
}
