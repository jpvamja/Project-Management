import mongoose from "mongoose";
import { Roles, Permissions } from "../enums/role.enum.js";
import { RolePermissions } from "../utils/role-permission.js";

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function () {
        return RolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model("Role", roleSchema);
export default RoleModel;
