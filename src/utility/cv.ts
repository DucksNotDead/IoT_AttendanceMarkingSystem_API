import tf from '@tensorflow/tfjs-node';
import faceapi from '@vladmandic/face-api';

type Vector = Float32Array<ArrayBufferLike>;

export async function loadCV() {
  await tf.ready();
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('models');
}

export async function vectorFromImageBuffer(
  buffer: Buffer,
): Promise<Vector | undefined> {
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = await faceapi
    .detectAllFaces(
      tensor,
      new faceapi.SsdMobilenetv1Options({ minConfidence: 0.25, maxResults: 1 }),
    )
    .withFaceLandmarks()
    .withFaceDescriptors();
  tf.dispose(tensor);
  return faces[0]?.descriptor;
}

export async function compareVectors(
  first: Vector,
  second: Vector,
): Promise<number> {
  return 1 - faceapi.euclideanDistance(first, second);
}

export function bufferFromBase64(base64: string): Buffer<ArrayBuffer> {
  const base64Data = base64.replace(/^data:image\/jpeg;base64,/, '');

  return Buffer.from(base64Data, 'base64');
}

export function base64FromVector(vector: Vector): string {
  const buffer = vector.buffer;

  const uint8Array = new Uint8Array(buffer);

  return Buffer.from(uint8Array).toString('base64');
}

export async function createFaceFromCamera() {
  const res = await fetch('http://192.168.4.1/snapshot');

  const blob = await res.blob();

  const buffer = Buffer.from(await blob.arrayBuffer());

  return await vectorFromImageBuffer(buffer);
}
