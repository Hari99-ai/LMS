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

class Subscribe extends SqlDocument {
  static get tableName() {
    return "subscribes";
  }

  static get columns() {
    return ["id", "userId", "courseId"];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      userId: row.userId,
      courseId: parseJson(row.courseId, []),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    const courseId = Array.isArray(doc.courseId)
      ? doc.courseId
      : parseJson(existing.courseId, []);

    return {
      id: doc.id,
      userId: doc.userId ?? existing.userId ?? "",
      courseId: JSON.stringify(courseId),
    };
  }
}

export default Subscribe;
