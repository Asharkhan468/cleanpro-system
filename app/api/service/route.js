import { NextResponse } from "next/server";
import Service from "@/models/Service";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, price, duration, category, status } = body;

    // Validation
    if (!name || !description || !price || !duration || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create service
    const newService = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      status: status || "active",
    });

    return NextResponse.json(
      { success: true, data: newService, message: "Service created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}