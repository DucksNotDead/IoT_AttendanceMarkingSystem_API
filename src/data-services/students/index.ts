import type { Student, StudentDTO } from '~/data-services/students/model.js';
import { db } from '~/utility/db.js';

function getAllStudents() {
  return db.getAll<Student>('students', ['id', 'fio']);
}

function getStudentById(id: number) {
  return db.getById<Student>('students', id);
}

function getStudentByRFID(rfid: string) {
  return db.getBy<Student>('students', 'RFID', rfid);
}

function createStudent(dto: StudentDTO) {
  db.add('students', dto);
}

function removeStudent(id: number) {
  db.remove('students', id);
}

export const studentsService = {
  getAllStudents,
  getStudentById,
  getStudentByRFID,
  createStudent,
  removeStudent,
};
