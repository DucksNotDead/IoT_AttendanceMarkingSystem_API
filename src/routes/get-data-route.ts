import { attendanceService } from '~/data-services/attendance/index.js';
import { studentsService } from '~/data-services/students/index.js';
import { createRoute } from '~/utility/create-route.js';

export const getDataRoute = createRoute('get', '/data', () => {
  const students = studentsService.getAllStudents();
  const attendance = attendanceService.getAllAttendance();

  return { students, attendance };
});
