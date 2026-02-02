import Branch, { IBranch } from "../models/Branch";

export const createBranch = async (payload: any, userId: string): Promise<IBranch> => {
  return Branch.create({ ...payload, userId });
};

export const getAllBranches = async (
  userId: string,
  page: number = 1,
  limit: number = 10,
): Promise<{ branches: IBranch[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [branches, total] = await Promise.all([
    Branch.find({ userId }).sort({ name: 1 }).skip(skip).limit(limit),
    Branch.countDocuments({ userId }),
  ]);

  return { branches, total };
};

export const getBranchById = async (id: string, userId: string): Promise<IBranch | null> => {
  return Branch.findOne({ _id: id, userId });
};

export const updateBranch = async (id: string, payload: any, userId: string): Promise<IBranch | null> => {
  return Branch.findOneAndUpdate({ _id: id, userId }, payload, { new: true });
};

export const deleteBranch = async (id: string, userId: string): Promise<IBranch | null> => {
  return Branch.findOneAndDelete({ _id: id, userId });
};
