import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    emoji: {
      type: String,
      required: false,
      trim: true,
      default: "📊", // Default emoji for project
    },
    description: {
      type: String,
      required: false,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace", // Reference to the workspace this project belongs to
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // User who created the project
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;
