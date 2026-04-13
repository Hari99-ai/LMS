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

class Course extends SqlDocument {
  static get tableName() {
    return "courses";
  }

  static get columns() {
    return [
      "id",
      "title",
      "description",
      "category",
      "thumbnail_public_id",
      "thumbnail_secure_url",
      "lectures",
      "numbersOfLecture",
      "createdBy",
    ];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      thumbnail: {
        public_id: row.thumbnail_public_id,
        secure_url: row.thumbnail_secure_url,
      },
      lectures: parseJson(row.lectures, []),
      numbersOfLecture: Number(row.numbersOfLecture || 0),
      createdBy: row.createdBy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    const lectures = Array.isArray(doc.lectures)
      ? doc.lectures
      : parseJson(existing.lectures, []);

    return {
      id: doc.id,
      title: doc.title ?? existing.title ?? "",
      description: doc.description ?? existing.description ?? "",
      category: doc.category ?? existing.category ?? "",
      thumbnail_public_id:
        doc.thumbnail?.public_id ?? existing.thumbnail_public_id ?? "",
      thumbnail_secure_url:
        doc.thumbnail?.secure_url ?? existing.thumbnail_secure_url ?? "",
      lectures: JSON.stringify(lectures),
      numbersOfLecture:
        doc.numbersOfLecture ?? lectures.length ?? existing.numbersOfLecture ?? 0,
      createdBy: doc.createdBy ?? existing.createdBy ?? "",
    };
  }

  toJSON() {
    return {
      id: this.id,
      _id: this._id,
      title: this.title,
      description: this.description,
      category: this.category,
      thumbnail: this.thumbnail,
      lectures: this.lectures,
      numbersOfLecture: this.numbersOfLecture,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Course;
