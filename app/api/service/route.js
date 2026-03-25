import { NextResponse } from "next/server";
import Service from "@/models/Service";

//All Services
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

// Create Service
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

// Update Service
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, description, price, duration, category, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Service ID is required" },
        { status: 400 },
      );
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        duration,
        category,
        status,
      },
      { new: true },
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedService,
        message: "Service updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 },
    );
  }
}

//Delete Service
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Service ID is required" },
        { status: 400 },
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 },
    );
  }
}
