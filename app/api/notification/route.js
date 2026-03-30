import Notification from "@/models/Notification";

export async function GET() {
  const notifications = await Notification.find({ isRead: false })

    .sort({ createdAt: -1 });

  return Response.json(notifications);
}

//update the status of notification

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;

    await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });

    return Response.json({ message: "Notification marked as read" });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
