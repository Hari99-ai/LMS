import { ContactUs } from "../models/contact.model.js";
import TopEducator from "../models/topEducator.model.js";
import User from "../models/user.model.js";
import AppError from "../utills/error.utills.js";
import sendMail from "../utills/sendMail.utills.js";

const topEducatorDefaults = [
  {
    name: "Dr. Manish Dixit",
    title: "Head of Department",
    bio: "Leading our team to success with a strong focus on quality, mentorship, and academic excellence.",
    imageKey: "manishsir",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 1,
  },
  {
    name: "Dr. Praphula Kumar Jain",
    title: "Asst. Professor",
    bio: "Innovating our technology stack and helping students think like builders.",
    imageKey: "prafulasir",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 2,
  },
  {
    name: "Prof. Jigyasa Mishra",
    title: "Asst. Professor",
    bio: "Driving operational excellence and making learning feel structured and approachable.",
    imageKey: "jigyasamaam",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 3,
  },
  {
    name: "Dr. Dheeraj Kumar Dixit",
    title: "Asst. Professor",
    bio: "Leading with clarity, practical guidance, and a focus on real-world outcomes.",
    imageKey: "dheerajsir",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 4,
  },
  {
    name: "Dr. Devesh Kumar Lal",
    title: "Asst. Professor",
    bio: "Helping students build confidence through consistent support and strong fundamentals.",
    imageKey: "deveshsir",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 5,
  },
  {
    name: "Prof. Khushboo Agrawal",
    title: "Asst. Professor",
    bio: "Crafting a thoughtful learning journey with care and precision.",
    imageKey: "khushboomaam",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 6,
  },
  {
    name: "Mr. Rohan Malakar",
    title: "Full Stack Developer",
    bio: "Building experiences that are clean, fast, and student-first.",
    imageKey: "rohan",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 7,
  },
  {
    name: "Mr. Brajraj Mishra",
    title: "Full Stack Developer",
    bio: "Shaping product ideas into practical tools students can rely on.",
    imageKey: "brajraj",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 8,
  },
];

const getOrderedTopEducators = async () => {
  const educators = await TopEducator.find({});
  return educators.sort((left, right) => {
    const orderDiff = Number(left.sortOrder ?? 0) - Number(right.sortOrder ?? 0);
    if (orderDiff !== 0) {
      return orderDiff;
    }
    return String(left.createdAt || "").localeCompare(String(right.createdAt || ""));
  });
};

const seedTopEducators = async () => {
  const existing = await TopEducator.find({});
  if (existing.length > 0) {
    return existing;
  }

  await Promise.all(topEducatorDefaults.map((item) => TopEducator.create(item)));
  return getOrderedTopEducators();
};

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("Name, Email, Message are required"));
  }

  const contact = await ContactUs.create({
    name,
    email,
    message,
  });

  res.status(200).json({
    success: true,
    message: "Your message has send successfully",
    data: contact,
  });
};
export const getcontactUs = async (req, res, next) => {
  const contact = await ContactUs.find();
  res.status(200).json({
    success: true,
    message: "Contact Details",
    data: contact,
  });
};
export const userStats = async (req, res, next) => {
  try {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
      "subscription.status": "active",
    });

    res.status(200).json({
      success: true,
      message: "All registered users count",
      allUsersCount,
      subscribedUsersCount,
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};

export const getTopEducators = async (req, res, next) => {
  try {
    const educators = await seedTopEducators();

    res.status(200).json({
      success: true,
      message: "Top educators fetched successfully",
      data: educators,
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};

export const createTopEducator = async (req, res, next) => {
  try {
    const { name, title, bio, imageKey, imageUrl, twitterUrl, githubUrl, slackUrl } = req.body;

    if (!name || !title || !bio) {
      return next(new AppError(400, "Name, title, and bio are required"));
    }

    const currentEducators = await getOrderedTopEducators();
    const maxSortOrder = currentEducators.reduce(
      (max, educator) => Math.max(max, Number(educator.sortOrder ?? 0)),
      0,
    );

    const educator = await TopEducator.create({
      name,
      title,
      bio,
      imageKey: imageKey || null,
      imageUrl: imageUrl || null,
      twitterUrl: twitterUrl || "#",
      githubUrl: githubUrl || "#",
      slackUrl: slackUrl || "#",
      sortOrder: Number(req.body.sortOrder ?? maxSortOrder + 1),
    });

    res.status(201).json({
      success: true,
      message: "Top educator created successfully",
      data: educator,
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};

export const updateTopEducator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const educator = await TopEducator.findById(id);

    if (!educator) {
      return next(new AppError(404, "Top educator not found"));
    }

    const updatedEducator = await TopEducator.findByIdAndUpdate(id, {
      name: req.body.name ?? educator.name,
      title: req.body.title ?? educator.title,
      bio: req.body.bio ?? educator.bio,
      imageKey: Object.prototype.hasOwnProperty.call(req.body, "imageKey") ? req.body.imageKey || null : educator.imageKey,
      imageUrl: Object.prototype.hasOwnProperty.call(req.body, "imageUrl") ? req.body.imageUrl || null : educator.imageUrl,
      twitterUrl: req.body.twitterUrl ?? educator.twitterUrl,
      githubUrl: req.body.githubUrl ?? educator.githubUrl,
      slackUrl: req.body.slackUrl ?? educator.slackUrl,
      sortOrder: req.body.sortOrder ?? educator.sortOrder,
    });

    res.status(200).json({
      success: true,
      message: "Top educator updated successfully",
      data: updatedEducator,
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};

export const deleteTopEducator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const educator = await TopEducator.findByIdAndDelete(id);

    if (!educator) {
      return next(new AppError(404, "Top educator not found"));
    }

    res.status(200).json({
      success: true,
      message: "Top educator deleted successfully",
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};
