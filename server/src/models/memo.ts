import mongoose, { Document, Model } from "mongoose";

interface UserAttributes {
  user: mongoose.Schema.Types.ObjectId;
  icon: string;
  title: string;
  descriction: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

export interface UserDocument extends UserAttributes, Document {}

export interface UserModel extends Model<UserDocument> {
  // カスタムな静的メソッドを定義
  // Mongooseの findOne メソッドに類似したカスタムな静的メソッドのシグネチャを定義
  findByUsername(username: string): Promise<UserDocument | null>;
}

const memoSchema = new mongoose.Schema<UserDocument, UserModel>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  descriction: {
    type: String,
    default: "ここに自由に記入して下さい",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

// userSchema.statics.findByUsername = function (username: string) {
//   return this.findOne({ username }).exec();
// };

// userSchema.statics.findByUserId = function (id: string) {
//   return this.findOne({ id }).exec();
// };

const Memo = mongoose.model<UserDocument, UserModel>("Memo", memoSchema);

export default Memo;
