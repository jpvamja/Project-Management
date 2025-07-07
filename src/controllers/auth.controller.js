import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { config } from "../config/app.config.js";

export const googleLoginCallback = asyncHandler(async (req, res) => {
  const currentWorkspace = req.user?.currentWorkspace;

  if (!currentWorkspace) {
    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
    );
  }

  return res.redirect(`${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
});
