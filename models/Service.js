import mongoose from 'mongoose';
import { dbConnect } from "@/libs/db";


const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

dbConnect();


export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);