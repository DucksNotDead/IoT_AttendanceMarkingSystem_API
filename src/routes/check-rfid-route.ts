import { attendanceService } from '~/data-services/attendance/index.js';
import { studentsService } from '~/data-services/students/index.js';
import { createRoute } from '~/utility/create-route.js';

interface DTO {
  rfid: string;
  lessonDate: string;
}

export const checkRfidRoute = createRoute<DTO>(
  'post',
  '/check-rfid',
  ({ rfid, lessonDate }) => {
    const student = studentsService.getStudentByRFID(rfid);

    if (!student) {
      return 404;
    }

    const attendance = attendanceService.getAttendanceByStudentIdAndLessonDate(
      student.id,
      lessonDate,
    );

    if (attendance) {
      return 400;
    }

    return { studentId: student.id };
  },
  { rfid: 'string', lessonDate: 'string' },
);
