import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    if (!accessToken && !refreshToken) {
      console.log("Not generated");
      return;
    }
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Something Went Wrong");
  }
};

const signUp = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if ([name, password, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required !!");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "Email already exists");
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    isEmailVerified: false,
    emailVerificationToken,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong at User Creation !!");
  }

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/users/verifyEmail/${emailVerificationToken}`;

  const message = `Please verify your email by clicking on the following link: \n\n ${verificationUrl}`;

  await sendEmail({
    email: user.email,
    subject: "Email Verification",
    message,
  });

  const options = {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, { sameSite: "Strict" })
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        "User Registered Successfully. Please verify your email.",
        {
          user: createdUser,
          accessToken,
          refreshToken,
        }
      )
    );
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid Credentials!");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(400, "Email not verified. Please verify your email.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, { sameSite: "Strict" })
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Sign-In Successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Email verified successfully"));
});

const sendPasswordResetEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/users/resetPassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  await sendEmail({
    email: user.email,
    subject: "Password reset token",
    message,
  });

  return res.status(200).json(new ApiResponse(200, "Email sent successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

export { signUp, signIn, verifyEmail, sendPasswordResetEmail, resetPassword };
