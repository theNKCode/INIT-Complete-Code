import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwtToken.js";
// import cloudinary from '../config/cloudinary.js';
// import jwt from 'jsonwebtoken'

// export const register = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       address,
//       password,
//       role,
//       firstNiche,
//       secondNiche,
//       thirdNiche,
//       coverLetter,
//     } = req.body;

//     if (!name || !email || !phone || !address || !password || !role) {
//       return next(new ErrorHandler("All fields are required.", 400));
//     }
//     if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
//       return next(new ErrorHandler("Please provide your preferred job niches.", 400));
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(new ErrorHandler("Email is already registered.", 400));
//     }
//     const userData = {
//       name,
//       email,
//       phone,
//       address,
//       password,
//       role,
//       niches: {
//         firstNiche,
//         secondNiche,
//         thirdNiche,
//       },
//       coverLetter,
//       isApproved: false, // Default to false
//     };
//     if (req.files && req.files.resume) {
//       const { resume } = req.files;
//       if (resume) {
//         try {
//           const cloudinaryResponse = await cloudinary.uploader.upload(
//             resume.tempFilePath,
//             { folder: "Job_Seekers_Resume" }
//           );
//           if (!cloudinaryResponse || cloudinaryResponse.error) {
//             return next(new ErrorHandler("Failed to upload resume to cloud.", 500));
//           }
//           userData.resume = {
//             public_id: cloudinaryResponse.public_id,
//             url: cloudinaryResponse.secure_url,
//           };
//         } catch (error) {
//           return next(new ErrorHandler("Failed to upload resume", 500));
//         }
//       }
//     }
//     const user = await User.create(userData);
//     sendToken(user, 201, res, "Registration request submitted. Awaiting admin approval.");
//   } catch (error) {
//     next(error);
//   }
// });

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
      picturepath,
      companies,
      location,
      occupation
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your preferred job niches.", 400)
    );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
  

    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
      picturepath,
      coverPicturePath,
      isApproved: role === "Employer" ? false : true, // Only Employers need approval
      companies,
      location,
      occupation,
      viewedProfile: [],
      impressions: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud.", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }

    const user = await User.create(userData);
    if (role === "Employer") {
      sendToken(user, 201, res, "Registration request submitted. Awaiting admin approval.");
    } else {
      sendToken(user, 201, res, "Registration successful.");
    }
  } catch (error) {
    next(error);
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    return next(
      new ErrorHandler("Email, password and role are required.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }
  if (!user.isApproved) {
    return next(new ErrorHandler("Your account is pending approval by the admin.", 400));
  }
  sendToken(user, 200, res, "User logged in successfully.");
});

// export const approveUser = catchAsyncErrors(async (req, res, next) => {
//   const { userId, approve } = req.body; // `approve` is a boolean indicating whether to approve or reject

//   const user = await User.findById(userId);
//   if (!user) return next(new ErrorHandler("User not found.", 404));

//   user.isApproved = approve;
//   await user.save();

//   res.status(200).json({ success: true, message: approve ? 'User approved.' : 'User rejected.' });
// });

export const approveUser = catchAsyncErrors(async (req, res, next) => {
  const { userId, approve } = req.body;
  const user = await User.findById(userId);
  if (!user) return next(new ErrorHandler("User not found.", 404));

  user.isApproved = approve;
  await user.save();

  const message = approve ? 'User approved.' : 'User rejected.';
  res.status(200).json({ success: true, message });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }catch (err) {
    res.status(404).json({ message: err.message });
  }
  // const user = req.user; // Assuming req.user contains the user details
  // res.status(200).json({
  //   success: true,
  //   user,
  // });
});


export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    coverLetter: req.body.coverLetter,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
    },
  };
  const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;

  if (
    req.user.role === "Job Seeker" &&
    (!firstNiche || !secondNiche || !thirdNiche)
  ) {
    return next(
      new ErrorHandler("Please provide your all preferred job niches.", 400)
    );
  }
  if (req.files) {
    const resume = req.files.resume;
    if (resume) {
      const currentResumeId = req.user.resume.public_id;
      if (currentResumeId) {
        await cloudinary.uploader.destroy(currentResumeId);
      }
      const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "Job_Seekers_Resume",
      });
      newUserData.resume = {
        public_id: newResume.public_id,
        url: newResume.secure_url,
      };
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
    message: "Profile updated.",
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully.");
});

// New method to get all users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  const users = await User.find(); // Fetch all users
  res.status(200).json({
    success: true,
    users,
  });
});

export const getUserCompanies = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const companies = await Promise.all(
      user.companies.map((id) => User.findById(id))
    );
    const formattedCompanies = companies.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return { _id, name, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedCompanies);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateUserPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "user_photos",
    });

    // Save the Cloudinary URL to the user's profile
    const user = await User.findByIdAndUpdate(
      id,
      { picturePath: result.secure_url },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveCompany = async (req, res) => {
  try {
    const { id, companyId } = req.params;
    const user = await User.findById(id);
    const company = await User.findById(companyId);

    if (user.companies.includes(companyId)) {
      user.companies = user.companies.filter((id) => id !== companyId);
      company.companies = company.companies.filter((id) => id !== id);
    } else {
      user.companies.push(companyId);
      company.companies.push(id);
    }
    await user.save();
    await company.save();

    const companies = await Promise.all(
      user.companies.map((id) => User.findById(id))
    );
    const formattedcompanies = companies.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return { _id, name, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedcompanies);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
