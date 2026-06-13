const express = require("express");
const multer = require("multer");

const {
  uploadRecording,
  getRecordings,
  deleteRecording
} = require("../controllers/recordingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  "/upload",
  authMiddleware,
  upload.single("recording"),
  uploadRecording
);

router.get("/", authMiddleware, getRecordings);

router.delete("/:id", authMiddleware, deleteRecording);

module.exports = router;
