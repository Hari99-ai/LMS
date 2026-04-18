import { SqlDocument } from "./sql.utils.js";

class TopEducator extends SqlDocument {
  static get tableName() {
    return "top_educators";
  }

  static get columns() {
    return [
      "id",
      "name",
      "title",
      "bio",
      "imageKey",
      "imageUrl",
      "twitterUrl",
      "githubUrl",
      "slackUrl",
      "sortOrder",
    ];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      name: row.name,
      title: row.title,
      bio: row.bio,
      imageKey: row.imageKey,
      imageUrl: row.imageUrl,
      twitterUrl: row.twitterUrl,
      githubUrl: row.githubUrl,
      slackUrl: row.slackUrl,
      sortOrder: Number(row.sortOrder ?? 0),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};

    return {
      id: doc.id,
      name: doc.name ?? existing.name ?? "",
      title: doc.title ?? existing.title ?? "",
      bio: doc.bio ?? existing.bio ?? "",
      imageKey: doc.imageKey ?? existing.imageKey ?? null,
      imageUrl: doc.imageUrl ?? existing.imageUrl ?? null,
      twitterUrl: doc.twitterUrl ?? existing.twitterUrl ?? "#",
      githubUrl: doc.githubUrl ?? existing.githubUrl ?? "#",
      slackUrl: doc.slackUrl ?? existing.slackUrl ?? "#",
      sortOrder: doc.sortOrder ?? existing.sortOrder ?? 0,
    };
  }
}

export default TopEducator;
