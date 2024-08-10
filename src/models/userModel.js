import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       fullname: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
       },
       email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
       },
       password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
       },
       isVerified: {
         type: Boolean,
         default: false,
       },
       isAdmin: {
         type: Boolean,
         default: false,
       },
       forgotPasswordToken: String,
       forgotPasswordTokenExpire: Date,
       verifyToken: String,
       verifyTokenExpire: Date,
}, {
  collection: 'User Registration Data'
});

const User = mongoose.models.users || mongoose.model
("users", userSchema);

export default User;