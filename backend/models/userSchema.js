import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must cotain at least 3 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email."],
  },
  picturePath: {
    type: String,
    default: "",
  },
  companies: {
    type: [String],
    maxlength: 50,
    validate: {
      validator: (value) => value.length <= 50,
      message: "Companies field cannot have more than 50 elements.",
    },
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
    type: [Number],
    default: [], 
    // type: Array,
    // default: [],
  },
  impressions: {
    type: [Number],
    default: [],
    // type: Array,
    // default: [],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    firstNiche: {
      type: String,
    },
    secondNiche: {
      type: String,
    },
    thirdNiche: {
      type: String,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must cantain at least 8 chatacters."],
    maxLength: [32, "Password cannot exceed 32 characters."],
    select: false
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer", "Admin"],
    default: "Employer"
  },
  isApproved: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
