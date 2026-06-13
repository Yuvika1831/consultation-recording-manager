const Recording = require("../models/Recording");

exports.uploadRecording = async (req, res) => {
  try {
    const { title, clientName, duration } = req.body;

    const recording = await Recording.create({
      title,
      clientName,
      duration,
      filePath: req.file.path,
      uploadedBy: req.user
    });

    res.status(201).json(recording);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(recordings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteRecording = async (req, res) => {
  try {
    await Recording.findByIdAndDelete(req.params.id);

    res.json({
      message: "Recording deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
