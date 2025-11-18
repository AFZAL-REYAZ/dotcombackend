// middleware/uploadAvatar.js
import multer from "multer";
import path from "path";
import fs from "fs";

const avatarsDir = path.join(process.cwd(), "uploads", "avatars");
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-.]/g, "");
    cb(null, `${Date.now()}-${safeName}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const mimetype = allowed.test(file.mimetype);
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) cb(null, true);
  else cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
};

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});
