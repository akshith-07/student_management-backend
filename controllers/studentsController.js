const studentModel = require("../models/studentModel");
const initialData = require("../data/initialStudentData");

const addNewStudent = async (request, response) => {
  const newStudent = request.body;
  try {
    const existingStudent = await studentModel.findOne({
      name: newStudent.name,
    });
    if (existingStudent) {
      return response
        .status(409)
        .json({ message: "Student with the same name already exists." });
    }
    const student = await studentModel.create(newStudent);
    response.status(201).json(student);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const displayAllStudents = async (request, response) => {
  try {
    const allStudents = await studentModel.find();
    if (allStudents.length === 0) {
      const initialStudents = await studentModel.insertMany(initialData);
    }
    response.status(200).json(allStudents);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// const updateStudent = async (request, response) => {
//   const studentToBeUpdated = request.body;
//   try {
//     const updatedStudent = await studentModel.updateMany(
//       { name: studentToBeUpdated.name },
//       studentToBeUpdated
//     );
//     response.status(200).json(updatedStudent);
//   } catch (error) {
//     response.status(500).json({ message: error.message });
//   }
// };

const updateStudent = async (request, response) => {
  const studentToBeUpdated = request.body;
  try {
    const updatedStudent = await studentModel.findOneAndUpdate(
      { name: studentToBeUpdated.name },
      { $set: studentToBeUpdated },
      { new: true } // This option returns the modified document instead of the original
    );

    if (!updatedStudent) {
      return response
        .status(404)
        .json({ message: "Student not found for updating." });
    }

    response.status(200).json(updatedStudent);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (request, response) => {
  const studentToBeDeleted = request.body;
  try {
    const deletedStudent = await studentModel.deleteOne({
      name: studentToBeDeleted.name,
    });
    response.status(200).json(deletedStudent);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewStudent,
  displayAllStudents,
  updateStudent,
  deleteStudent,
};
