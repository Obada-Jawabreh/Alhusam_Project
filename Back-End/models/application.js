const mongoose = require("mongoose");
const { Schema } = mongoose;

const providerApplicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true },
    resume: { type: String },
    yearsOfExperience: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

const ProviderApplication =
  mongoose.models.ProviderApplication ||
  mongoose.model("ProviderApplication", providerApplicationSchema);

module.exports = ProviderApplication;
