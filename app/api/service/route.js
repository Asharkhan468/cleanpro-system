import { NextResponse } from "next/server";
import Service from "@/models/Service";

export async function GET() {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: services },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, price, duration, category, status } = body;

    if (!name || !description || !price || !duration || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const newService = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      status: status || "active",
    });

    return NextResponse.json(
      {
        success: true,
        data: newService,
        message: "Service created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
