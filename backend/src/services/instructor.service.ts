import Instructor, { IInstructor } from "../models/Instructor";

export const createInstructor = async (payload: any, userId: string): Promise<IInstructor> => {
  return Instructor.create({ ...payload, userId });
};

export const getAllInstructors = async (
  userId: string,
  branchId?: string,
  page: number = 1,
  limit: number = 10,
): Promise<{ instructors: IInstructor[]; total: number }> => {
  const filter: any = { userId };
  if (branchId) {
    filter.branchIds = branchId;
  }
  const skip = (page - 1) * limit;

  const [instructors, total] = await Promise.all([
    Instructor.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    Instructor.countDocuments(filter),
  ]);

  return { instructors, total };
};

export const getInstructorById = async (id: string, userId: string): Promise<IInstructor | null> => {
  return Instructor.findOne({ _id: id, userId }).populate("branchIds", "name");
};

export const updateInstructor = async (id: string, payload: any, userId: string): Promise<IInstructor | null> => {
  return Instructor.findOneAndUpdate({ _id: id, userId }, payload, { new: true });
};

export const deleteInstructor = async (id: string, userId: string): Promise<IInstructor | null> => {
  return Instructor.findOneAndDelete({ _id: id, userId });
};
