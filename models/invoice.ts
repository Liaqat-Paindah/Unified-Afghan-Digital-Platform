import { model, models, Schema } from "mongoose";

const InvoiceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    stripeInvoiceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    stripeCustomerId: {
      type: String,
      required: true,
      index: true,
    },

    stripeSubscriptionId: {
      type: String,
      required: false,
      index: true,
    },

    number: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "draft",
        "open",
        "paid",
        "uncollectible",
        "void",
      ],
      index: true,
    },

    amountDue: {
      type: Number,
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    amountRemaining: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      lowercase: true,
    },

    hostedInvoiceUrl: {
      type: String,
      required: false,
    },

    invoicePdf: {
      type: String,
      required: true,
    },

    dueDate: {
      type: Date,
      required: false,
    },

    paidAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice =
  models.Invoice || model("Invoice", InvoiceSchema);