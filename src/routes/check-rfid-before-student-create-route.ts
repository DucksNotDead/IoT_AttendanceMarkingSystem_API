import { studentsService } from '~/data-services/students/index.js';
import { createRoute } from '~/utility/create-route.js';

interface DTO {
  rfid: string;
}

export const checkRfidBeforeStudentCreateRoute = createRoute<DTO>(
  'post',
  '/check-rfid-before-student-create',
  ({ rfid }) => {
    const student = studentsService.getStudentByRFID(rfid);

    if (student) {
      return 404;
    }

    return 200;
  },
  {
    rfid: 'string',
  },
);
