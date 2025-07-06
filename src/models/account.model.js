import mongoose from "mongoose";
import { ProviderEnum } from "../enums/account-provider.enum.js";

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // Don't expose refresh token in API responses
        delete ret.refreshToken;
        return ret;
      },
    },
  }
);

const AccountModel = mongoose.model("Account", accountSchema);
export default AccountModel;
