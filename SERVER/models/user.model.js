import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { SqlDocument } from "./sql.utils.js";

const isBcryptHash = (value) =>
  typeof value === "string" && /^\$2[aby]\$\d{2}\$/.test(value);

const getJwtSecret = () => process.env.JWT_SECRET;
const getJwtExpiry = () => process.env.JWT_TOKEN_EXPIRY || "7d";

class User extends SqlDocument {
  static get tableName() {
    return "users";
  }

  static get columns() {
    return [
      "id",
      "fullName",
      "email",
      "password",
      "avatar_public_id",
      "avatar_secure_url",
      "role",
      "subscription_id",
      "subscription_status",
      "forgotPasswordToken",
      "forgotPasswordExpiry",
    ];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      fullName: row.fullName,
      email: row.email,
      password: row.password,
      avatar: {
        public_id: row.avatar_public_id,
        secure_url: row.avatar_secure_url,
      },
      role: row.role || "USER",
      subscription: {
        id: row.subscription_id || null,
        status: row.subscription_status || null,
      },
      forgotPasswordToken: row.forgotPasswordToken || null,
      forgotPasswordExpiry: row.forgotPasswordExpiry
        ? Number(row.forgotPasswordExpiry)
        : null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    const password = doc.password ?? existing.password ?? "";
    return {
      id: doc.id,
      fullName: doc.fullName ?? existing.fullName ?? "",
      email: doc.email ?? existing.email ?? "",
      password: isBcryptHash(password) ? password : bcrypt.hashSync(password, 10),
      avatar_public_id:
        doc.avatar?.public_id ?? existing.avatar_public_id ?? null,
      avatar_secure_url:
        doc.avatar?.secure_url ?? existing.avatar_secure_url ?? null,
      role: doc.role ?? existing.role ?? "USER",
      subscription_id:
        doc.subscription?.id ?? existing.subscription_id ?? null,
      subscription_status:
        doc.subscription?.status ?? existing.subscription_status ?? null,
      forgotPasswordToken:
        doc.forgotPasswordToken ?? existing.forgotPasswordToken ?? null,
      forgotPasswordExpiry:
        doc.forgotPasswordExpiry ?? existing.forgotPasswordExpiry ?? null,
    };
  }

  toJSON() {
    const base = {
      id: this.id,
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      avatar: this.avatar,
      role: this.role,
      subscription: this.subscription,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    if (this.__includePassword) {
      base.password = this.password;
    }

    return base;
  }

  async generateJWTtoken() {
    const secret = getJwtSecret();
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        role: this.role,
        subscription: this.subscription,
      },
      secret,
      {
        expiresIn: getJwtExpiry(),
      }
    );
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async generatePasswordResetToken() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return resetToken;
  }
}

export default User;
