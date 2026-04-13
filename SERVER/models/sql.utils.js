import crypto from "crypto";
import { sqlExecute, sqlQuery } from "../config/dbConection.js";

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const getPath = (object, path) => {
  if (!object || !path) {
    return undefined;
  }

  return path.split(".").reduce((accumulator, key) => {
    if (accumulator === undefined || accumulator === null) {
      return undefined;
    }
    return accumulator[key];
  }, object);
};

const setPath = (object, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  let cursor = object;

  for (const key of keys) {
    if (!isPlainObject(cursor[key])) {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }

  cursor[lastKey] = value;
};

const deletePath = (object, path) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  let cursor = object;

  for (const key of keys) {
    if (!cursor || typeof cursor !== "object") {
      return;
    }
    cursor = cursor[key];
  }

  if (cursor && typeof cursor === "object") {
    delete cursor[lastKey];
  }
};

const compareValue = (actual, expected) => {
  if (isPlainObject(expected)) {
    if ("$gt" in expected) {
      return actual > expected.$gt;
    }
    if ("$gte" in expected) {
      return actual >= expected.$gte;
    }
    if ("$lt" in expected) {
      return actual < expected.$lt;
    }
    if ("$lte" in expected) {
      return actual <= expected.$lte;
    }
    if ("$ne" in expected) {
      return actual !== expected.$ne;
    }
    if ("$in" in expected && Array.isArray(expected.$in)) {
      return expected.$in.includes(actual);
    }
  }

  return actual === expected;
};

export const matchesWhere = (item, where = {}) => {
  if (!where || Object.keys(where).length === 0) {
    return true;
  }

  return Object.entries(where).every(([key, expected]) => {
    const actual = getPath(item, key);
    return compareValue(actual, expected);
  });
};

export const applySelection = (item, selection) => {
  if (!selection) {
    return item;
  }

  const tokens = String(selection)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("-")) {
      deletePath(item, token.slice(1));
    }
    if (token.startsWith("+")) {
      setPath(item, token.slice(1), getPath(item, token.slice(1)));
      if (token.slice(1) === "password") {
        item.__includePassword = true;
      }
    }
  }

  return item;
};

const projectResult = (result, selection) => {
  if (!selection) {
    return result;
  }

  if (Array.isArray(result)) {
    return result.map((item) => applySelection(item, selection));
  }

  if (result && typeof result === "object") {
    return applySelection(result, selection);
  }

  return result;
};

export class SqlQuery {
  constructor(loader) {
    this.loader = loader;
    this.selection = null;
  }

  select(selection) {
    this.selection = selection;
    return this;
  }

  async exec() {
    const result = await this.loader();
    return projectResult(result, this.selection);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

export class SqlDocument {
  constructor(data = {}) {
    Object.assign(this, data);
    if (this.id && !this._id) {
      this._id = this.id;
    }
    if (this._id && !this.id) {
      this.id = this._id;
    }
  }

  static get tableName() {
    throw new Error("tableName is not defined");
  }

  static get columns() {
    throw new Error("columns are not defined");
  }

  static fromRow(row) {
    return new this(row);
  }

  static toRow(doc, existingRow = null) {
    return { ...existingRow, ...doc };
  }

  static async _getAllRows() {
    return sqlQuery(`SELECT * FROM \`${this.tableName}\``);
  }

  static async _getRowById(id) {
    const rows = await sqlQuery(
      `SELECT * FROM \`${this.tableName}\` WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async _insertRow(row) {
    const columns = this.columns;
    const values = columns.map((column) => row[column] ?? null);
    const placeholders = columns.map(() => "?").join(", ");
    await sqlExecute(
      `INSERT INTO \`${this.tableName}\` (\`${columns.join("`, `")}\`) VALUES (${placeholders})`,
      values
    );
  }

  static async _updateRow(id, row) {
    const columns = this.columns;
    const values = columns.map((column) => row[column] ?? null);
    values.push(id);
    const assignments = columns.map((column) => `\`${column}\` = ?`).join(", ");
    await sqlExecute(
      `UPDATE \`${this.tableName}\` SET ${assignments} WHERE id = ?`,
      values
    );
  }

  static find(where = {}) {
    return new SqlQuery(async () => {
      const rows = await this._getAllRows();
      return rows.map((row) => this.fromRow(row)).filter((item) =>
        matchesWhere(item, where)
      );
    });
  }

  static findOne(where = {}) {
    return new SqlQuery(async () => {
      const rows = await this._getAllRows();
      return rows
        .map((row) => this.fromRow(row))
        .find((item) => matchesWhere(item, where)) || null;
    });
  }

  static findById(id) {
    return new SqlQuery(async () => {
      const row = await this._getRowById(id);
      return row ? this.fromRow(row) : null;
    });
  }

  static findByIdAndUpdate(id, update = {}, options = {}) {
    return new SqlQuery(async () => {
      const existing = await this._getRowById(id);
      if (!existing) {
        return null;
      }

      const payload = update?.$set ? update.$set : update;
      const current = this.fromRow(existing);
      Object.assign(current, payload);
      if (options.runValidators && typeof current.validate === "function") {
        await current.validate();
      }
      await current.save();
      return current;
    });
  }

  static findByIdAndDelete(id) {
    return new SqlQuery(async () => {
      const row = await this._getRowById(id);
      if (!row) {
        return null;
      }
      await sqlExecute(
        `DELETE FROM \`${this.tableName}\` WHERE id = ?`,
        [id]
      );
      return this.fromRow(row);
    });
  }

  static async countDocuments(where = {}) {
    const rows = await this._getAllRows();
    return rows.map((row) => this.fromRow(row)).filter((item) => matchesWhere(item, where)).length;
  }

  static async create(data) {
    const instance = new this(data);
    await instance.save();
    return instance;
  }

  async save() {
    const ctor = this.constructor;
    if (!this.id && !this._id) {
      this.id = crypto.randomUUID();
    }
    if (!this.id) {
      this.id = this._id;
    }
    if (!this._id) {
      this._id = this.id;
    }

    const existing = await ctor._getRowById(this.id);
    const payload = ctor.toRow(this, existing);
    payload.id = this.id;

    if (existing) {
      await ctor._updateRow(this.id, payload);
    } else {
      await ctor._insertRow(payload);
    }

    const fresh = await ctor._getRowById(this.id);
    if (fresh) {
      Object.assign(this, ctor.fromRow(fresh));
    }

    return this;
  }
}

