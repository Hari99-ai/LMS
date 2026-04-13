import Course from "../models/course.model.js";
import ApiError from "../utills/error.utills.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import crypto from "crypto";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    return res.status(200).json({
      success: true,
      message: "this is courses details",
      data: courses,
    });
  } catch (error) {
    return next(new ApiError(409, error.message));
  }
};
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(
        new ApiError(409, "course is not available on this course id")
      );
    }

    return res.status(200).json({
      success: true,
      message: "this is lectures details",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new ApiError(409, error.message));
  }
};
const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ApiError(409, "Every field is required"));
  }
 

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "dummi",
      secure_url: "dummi",
    },
  });
  if (!course) {
    return next(new ApiError(409, "Course is not created"));
  }
  
  

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
      });
      course.thumbnail.public_id = result.public_id;
      course.thumbnail.secure_url = result.secure_url;
      await fs.unlink(req.file.path);
    } catch (error) {
      return next(new ApiError(409, "thumbnail is not uploaded"));
    }
  }
  await course.save();

  return res.status(200).json({
    success: true,
    message: "Course details are added successfully",
    data: course,
  });
};
const UpdateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new ApiError(500, "course is not updated"));
    }

    return res.status(200).json({
      success: true,
      message: "Course details are updated successfully",
      data: course,
    });
  } catch (error) {
    return next(new ApiError(500, "Details are not updated"));
  }
};
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course =await Course.findById(id);

    if (!course) {
      return next(new ApiError(500, "course is not exist"));
    }
    await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Course is removed successfully",
    });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};
const addLectureByCourseId = async (req, res, next) => {
  try {
    
    const { id } = req.params;
    const { description, title } = req.body;
  
    let course = await Course.findById(id);
  
    if (!course) {
      return next(new ApiError(500, "course is not exist"));
    }
  
    let lecturesData = {
      id: crypto.randomUUID(),
      description,
      title,
      lecture: {},
    };
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS",
          resource_type: "video",
          chunk_size: 50000000,
        });
        await fs.unlink(req.file.path);
        lecturesData.lecture.public_id = result.public_id;
        lecturesData.lecture.secure_url = result.secure_url;
      } catch (error) {
        return next(new ApiError(409, "lecture is not uploaded"));
      }
    }
    course.lectures.push(lecturesData);
    course.numbersOfLecture = course.lectures.length;
    await course.save();
  
    return res.status(200).json({
      success: true,
      message: "lectures are added successfully",
      data: course,
    });
  } catch (error) {
    return next(new ApiError(409, error.message));
  }
};
const removeLectureByLectureId = async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ApiError(500, "course is not exist"));
  }

  const index = course.lectures.findIndex((lecture) => lecture.id === lectureId);

  if (index === -1) {
    return next(new ApiError(500, "lecture is not exist"));
  }

  course.lectures.splice(index, 1);
  course.numbersOfLecture = course.lectures.length;

  await course.save();

  return res.status(200).json({
    success: true,
    message: "lecture is removed successfully",
  });
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  UpdateCourse,
  removeCourse,
  addLectureByCourseId,
  removeLectureByLectureId,
};
