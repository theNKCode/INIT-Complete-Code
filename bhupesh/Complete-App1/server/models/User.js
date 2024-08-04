import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 30,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    picturePath: {
        type: String,
        default: "",
    },
    coverPicturePath: {
        type: String,
        default: "",
    },
    companies: {
        type: Array,
        max: 50,
    },
    location: {
        type: String,
        max: 50,
    },
    occupation: {
        type: String,
        max: 50,
    },
    viewedProfile: {
        type: Number,
        // type: Array,
        // default: [],
    },
    impressions: {
        type: Number,
        // type: Array,
        // default: [],
    },
},
    { timestamps: true } //Timestamps will automatically add createdAt and updatedAt fields
);

const User = mongoose.model('User', UserSchema);
export default User;
