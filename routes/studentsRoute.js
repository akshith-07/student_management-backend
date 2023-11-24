const express = require("express");
const router = express.Router();
const {
  addNewStudent,
  displayAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");
const { validateStudentName } = require("../controllers/validationController");

router
  .route("/")
  .post(addNewStudent)
  .get(displayAllStudents)
  .patch(updateStudent)
  .delete(deleteStudent);

router.route("/validate").post(validateStudentName);

module.exports = router;
