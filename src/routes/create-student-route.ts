import { studentsService } from '~/data-services/students/index.js';
import type { StudentDTO } from '~/data-services/students/model.js';
import { createRoute } from '~/utility/create-route.js';

export const createStudentRoute = createRoute<StudentDTO>(
  'post',
  '/create-student',
  body => {
    try {
      studentsService.createStudent(body);
    } catch {
      return 500;
    }

    return 200;
  },
  {
    fio: 'string',
    faceID: 'string',
    RFID: 'string',
    fingerID: 'string',
  },
);
