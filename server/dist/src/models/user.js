import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username }).exec();
};
userSchema.statics.findByUserId = function (id) {
    return this.findOne({ id }).exec();
};
const User = mongoose.model("User", userSchema);
export default User;
