import Room, { IRoom } from "../models/Room";

export const createRoom = async (payload: any, userId: string): Promise<IRoom> => {
  return Room.create({ ...payload, userId });
};

export const getAllRooms = async (
  userId: string,
  branchId?: string,
  page: number = 1,
  limit: number = 10,
): Promise<{ rooms: IRoom[]; total: number }> => {
  const filter: any = { userId };
  if (branchId) {
    filter.branchId = branchId;
  }
  const skip = (page - 1) * limit;

  const [rooms, total] = await Promise.all([
    Room.find(filter)
      .populate("branchId", "name")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit),
    Room.countDocuments(filter),
  ]);

  return { rooms, total };
};

export const getRoomById = async (id: string, userId: string): Promise<IRoom | null> => {
  return Room.findOne({ _id: id, userId });
};

export const updateRoom = async (id: string, payload: any, userId: string): Promise<IRoom | null> => {
  return Room.findOneAndUpdate({ _id: id, userId }, payload, { new: true });
};

export const deleteRoom = async (id: string, userId: string): Promise<IRoom | null> => {
  return Room.findOneAndDelete({ _id: id, userId });
};
