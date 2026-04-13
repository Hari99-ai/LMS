import { SqlDocument } from "./sql.utils.js";

class Payment extends SqlDocument {
  static get tableName() {
    return "payments";
  }

  static get columns() {
    return [
      "id",
      "razorpay_payment_id",
      "razorpay_subscription_id",
      "razorpay_signature",
    ];
  }

  static fromRow(row) {
    if (!row) {
      return null;
    }

    return new this({
      id: row.id,
      _id: row.id,
      razorpay_payment_id: row.razorpay_payment_id,
      razorpay_subscription_id: row.razorpay_subscription_id,
      razorpay_signature: row.razorpay_signature,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  static toRow(doc, existingRow = null) {
    const existing = existingRow || {};
    return {
      id: doc.id,
      razorpay_payment_id:
        doc.razorpay_payment_id ?? existing.razorpay_payment_id ?? "",
      razorpay_subscription_id:
        doc.razorpay_subscription_id ?? existing.razorpay_subscription_id ?? "",
      razorpay_signature:
        doc.razorpay_signature ?? existing.razorpay_signature ?? "",
    };
  }
}

export default Payment;
