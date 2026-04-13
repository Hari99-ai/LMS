import { SqlDocument } from "./sql.utils.js";

const parseJson = (value, fallback) => {
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value) || typeof value === "object") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

class Question {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  async save() {
    return this;
  }
}

class Quiz extends SqlDocument {
  static get tableName() {
    return "quizzes";
  }

  static get columns() {
    return ["id", "title", "questions", "courseId", "createdBy"];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      title: row.title,
      questions: parseJson(row.questions, []),
      courseId: row.courseId,
      createdBy: row.createdBy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    const questions = Array.isArray(doc.questions)
      ? doc.questions
      : parseJson(existing.questions, []);

    return {
      id: doc.id,
      title: doc.title ?? existing.title ?? "",
      questions: JSON.stringify(questions),
      courseId: doc.courseId ?? existing.courseId ?? "",
      createdBy: doc.createdBy ?? existing.createdBy ?? null,
    };
  }
}

class SubmittedQuiz extends SqlDocument {
  static get tableName() {
    return "submitted_quizzes";
  }

  static get columns() {
    return ["id", "userId", "quizId", "selectedOptions", "score"];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      userId: row.userId,
      quizId: row.quizId,
      selectedOptions: parseJson(row.selectedOptions, []),
      score: row.score === null ? null : Number(row.score),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    const selectedOptions = Array.isArray(doc.selectedOptions)
      ? doc.selectedOptions
      : parseJson(existing.selectedOptions, []);

    return {
      id: doc.id,
      userId: doc.userId ?? existing.userId ?? "",
      quizId: doc.quizId ?? existing.quizId ?? "",
      selectedOptions: JSON.stringify(selectedOptions),
      score: doc.score ?? existing.score ?? null,
    };
  }
}

export { Quiz, Question, SubmittedQuiz };
