import mongoose from "mongoose";
const memoSchema = new mongoose.Schema({
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
const Memo = mongoose.model("Memo", memoSchema);
export default Memo;
