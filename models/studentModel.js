const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    regno: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("students", studentSchema);
