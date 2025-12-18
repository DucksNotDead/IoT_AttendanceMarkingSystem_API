import * as crypto from 'node:crypto';

const ALGO = 'aes-256-gcm';
const KEY = crypto.createHash('sha256').update('super-secret-key').digest(); // 32 байта

export function encryptBase64(base64: string): string {
  const raw = Buffer.from(base64, 'base64');
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(raw), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decryptBase64(payload: string): string {
  const buffer = Buffer.from(payload, 'base64');

  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const data = buffer.subarray(28);

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

  return decrypted.toString('base64');
}
