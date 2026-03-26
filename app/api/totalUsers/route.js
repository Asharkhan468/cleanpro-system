import { dbConnect } from "@/libs/db";
import Booking from "@/models/Booking";

export async function GET() {
  await dbConnect();

  try {
    const uniqueEmails = await Booking.distinct("email");
    return new Response(
      JSON.stringify({ totalUsers: uniqueEmails.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}