import { attendanceService } from '~/data-services/attendance/index.js';
import type { AttendanceDTO } from '~/data-services/attendance/model.js';
import { studentsService } from '~/data-services/students/index.js';
import type { StudentDTO } from '~/data-services/students/model.js';
import { createRoute } from '~/utility/create-route.js';

export const createAttendanceRoute = createRoute<
  AttendanceDTO & Omit<StudentDTO, 'fio'>
>(
  'post',
  '/create-attendance',
  async ({ faceID: _, fingerID, RFID, ...dto }) => {
    const student = studentsService.getStudentById(dto.studentId);
    if (!student) {
      return 404;
    }

    if (student.RFID !== RFID || student.fingerID !== fingerID) {
      return 401;
    }

    attendanceService.createAttendance(dto);

    return 200;
  },
  {
    lessonId: 'number',
    studentId: 'number',
    lessonDate: 'string',
    faceID: 'string',
    RFID: 'string',
    fingerID: 'string',
  },
);
