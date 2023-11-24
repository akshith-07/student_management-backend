const studentModel = require("../models/studentModel");

const validateStudentName = async (request, response) => {
  const studentToBeValidated = request.body.name;

  try {
    const validStudent = await studentModel.findOne({
      name: studentToBeValidated,
    });
    if (validStudent) {
      return response.status(200).json(validStudent);
    }
    response.status(400).json({ message: "Invalid Student Name..." });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { validateStudentName };
