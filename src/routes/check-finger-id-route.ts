import { studentsService } from '~/data-services/students/index.js';
import { createRoute } from '~/utility/create-route.js';

interface DTO {
  studentId: number;
  fingerID: string;
}

export const checkFingerIdRoute = createRoute<DTO>(
  'post',
  '/check-finger-id',
  ({ fingerID, studentId }) => {
    const student = studentsService.getStudentById(studentId);

    if (!student) {
      return 404;
    }

    console.log(student.fingerID);

    if (fingerID !== student.fingerID) {
      return 401;
    }

    return 200;
  },
  { studentId: 'number', fingerID: 'string' },
);
