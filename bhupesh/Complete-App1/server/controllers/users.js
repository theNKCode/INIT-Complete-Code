// // import User from "../models/User.js";

// // /* READ */
// // export const getUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const user = await User.findById(id);
// //     res.status(200).json(user);
// //   } catch (err) {
// //     res.status(404).json({ message: err.message });
// //   }
// // };

// // export const getUserCompanies = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const user = await User.findById(id);

// //     const companies = await Promise.all(
// //       user.companies.map((id) => User.findById(id))
// //     );
// //     const formattedCompanies = companies.map(
// //       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
// //         return { _id, firstName, lastName, occupation, location, picturePath };
// //       }
// //     );
// //     res.status(200).json(formattedCompanies);
// //   } catch (err) {
// //     res.status(404).json({ message: err.message });
// //   }
// // };

// // /* UPDATE */
// // export const addRemoveCompany = async (req, res) => {
// //   try {
// //     const { id, companyId } = req.params;
// //     const user = await User.findById(id);
// //     const company = await User.findById(companyId);

// //     if (user.companies.includes(companyId)) {
// //       user.companies = user.companies.filter((id) => id !== companyId);
// //       company.companies = company.companies.filter((id) => id !== id);
// //     } else {
// //       user.companies.push(companyId);
// //       company.companies.push(id);
// //     }
// //     await user.save();
// //     await company.save();

// //     const companies = await Promise.all(
// //       user.companies.map((id) => User.findById(id))
// //     );
// //     const formattedcompanies = companies.map(
// //       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
// //         return { _id, firstName, lastName, occupation, location, picturePath };
// //       }
// //     );

// //     res.status(200).json(formattedcompanies);
// //   } catch (err) {
// //     res.status(404).json({ message: err.message });
// //   }
// // };
















// import User from "../models/User.js";
// import cloudinary from '../config/cloudinary.js';

// /* READ */
// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserCompanies = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const companies = await Promise.all(
//       user.companies.map((id) => User.findById(id))
//     );
//     const formattedCompanies = companies.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedCompanies);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const updateUserPhoto = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { file } = req;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: "user_photos",
//     });

//     // Save the Cloudinary URL to the user's profile
//     const user = await User.findByIdAndUpdate(
//       id,
//       { picturePath: result.secure_url },
//       { new: true }
//     );

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const addRemoveCompany = async (req, res) => {
//   try {
//     const { id, companyId } = req.params;
//     const user = await User.findById(id);
//     const company = await User.findById(companyId);

//     if (user.companies.includes(companyId)) {
//       user.companies = user.companies.filter((id) => id !== companyId);
//       company.companies = company.companies.filter((id) => id !== id);
//     } else {
//       user.companies.push(companyId);
//       company.companies.push(id);
//     }
//     await user.save();
//     await company.save();

//     const companies = await Promise.all(
//       user.companies.map((id) => User.findById(id))
//     );
//     const formattedcompanies = companies.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedcompanies);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };





import User from "../models/User.js";
import cloudinary from '../config/cloudinary.js';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserCompanies = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const companies = await Promise.all(
      user.companies.map((id) => User.findById(id))
    );
    const formattedCompanies = companies.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
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
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedcompanies);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
