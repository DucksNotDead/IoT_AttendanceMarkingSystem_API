import { createRoute } from '~/utility/create-route.js';
import { base64FromVector, createFaceFromCamera } from '~/utility/cv.js';

export const createFaceIdRoute = createRoute(
  'post',
  '/create-face-id',
  async () => {
    const vector = await createFaceFromCamera();
    if (!vector) {
      return 400;
    }

    return { faceID: base64FromVector(vector) };
  },
);
