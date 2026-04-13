import { SqlDocument } from "./sql.utils.js";

class ContactUs extends SqlDocument {
  static get tableName() {
    return "contact_us";
  }

  static get columns() {
    return ["id", "name", "email", "message"];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    return {
      id: doc.id,
      name: doc.name ?? existing.name ?? "",
      email: doc.email ?? existing.email ?? "",
      message: doc.message ?? existing.message ?? "",
    };
  }
}

export { ContactUs };
