import mongoose, { Document, Model } from "mongoose";

interface UserAttributes {
  username: string;
  password: string;
}

export interface UserDocument extends UserAttributes, Document {}

export interface UserModel extends Model<UserDocument> {
  // カスタムな静的メソッドを定義
  // Mongooseの findOne メソッドに類似したカスタムな静的メソッドのシグネチャを定義
  findByUsername(username: string): Promise<UserDocument | null>;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username }).exec();
};

userSchema.statics.findByUserId = function (id: string) {
  return this.findOne({ id }).exec();
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
