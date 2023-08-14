import Memo from "../models/memo.js";
import { Request, Response } from "express";
import { body } from "express-validator";

export const create = async (req: any) => {
  try {
    const memoCount = await Memo.find().count();
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    return memo;
  } catch (error: unknown) {
    return error;
  }
};

export const getMemoAll = async (req: any) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    return memos;
  } catch (error: unknown) {
    return error;
  }
};

export const getMemoOne = async (req: any) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });

    return memo;
  } catch (error: unknown) {
    return error;
  }
};

export const update = async (req: any) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === "") req.body.title = "無題";
    if (description === "") req.body.description = "ここに自由に記載して下さい";
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return false;

    const updateMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });

    return updateMemo;
  } catch (error: unknown) {
    return error;
  }
};

export const deleteMemo = async (req: any) => {
  const { memoId } = req.params;
  try {
    await Memo.deleteOne({ _id: memoId });

    return "memoを削除しました";
  } catch (error: unknown) {
    return error;
  }
};
