import type {
  Attendance,
  AttendanceDTO,
} from '~/data-services/attendance/model.js';
import { db } from '~/utility/db.js';

function createAttendance(dto: AttendanceDTO) {
  db.add('attendance', dto);
}

function getAllAttendance() {
  return db.getAll<Attendance>('attendance');
}

function getAttendanceByStudentIdAndLessonDate(
  studentId: number,
  lessonDate: string,
) {
  return db.getByAnd<Attendance>('attendance', [
    { key: 'studentId', value: studentId },
    { key: 'lessonDate', value: lessonDate },
  ]);
}

function removeAttendance(id: number) {
  db.remove('attendance', id);
}

export const attendanceService = {
  getAllAttendance,
  getAttendanceByStudentIdAndLessonDate,
  createAttendance,
  removeAttendance,
};
