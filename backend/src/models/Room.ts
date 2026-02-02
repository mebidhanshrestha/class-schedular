import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  branchId: mongoose.Types.ObjectId;
  capacity?: number;
  userId: mongoose.Types.ObjectId;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    capacity: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);
