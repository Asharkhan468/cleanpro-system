import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      id: String,
      name: String,
      price: String,
    },

    bookingId: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    alternatePhone: String,

    streetAddress: String,
    apartment: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,

    serviceDate: String,
    serviceTime: String,
    serviceDuration: String,
    numberOfRooms: String,
    squareFootage: String,
    specialRequests: String,

    hasPets: Boolean,
    petDetails: String,
    accessInstructions: String,

    paymentMethod: String,
  },
  { timestamps: true },
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
