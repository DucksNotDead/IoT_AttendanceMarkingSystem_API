import { studentsService } from '~/data-services/students/index.js';
import { createRoute } from '~/utility/create-route.js';
import {
  base64FromVector,
  bufferFromBase64,
  compareVectors,
  createFaceFromCamera,
  vectorFromImageBuffer,
} from '~/utility/cv.js';

interface DTO {
  studentId: number;
}

export const checkFaceIdRoute = createRoute<DTO>(
  'post',
  '/check-face-id',
  async ({ studentId }) => {
    const student = studentsService.getStudentById(studentId);
    if (!student) {
      return 404;
    }

    const vector = await createFaceFromCamera();
    if (!vector) {
      return 400;
    }

    const buffer = bufferFromBase64(student.faceID);

    const originalVector = (await vectorFromImageBuffer(buffer))!;

    const confidence = await compareVectors(originalVector, vector);

    if (confidence < 0.4) {
      return 401;
    }

    return {
      faceID: base64FromVector(vector),
    };
  },
  { studentId: 'number' },
);
