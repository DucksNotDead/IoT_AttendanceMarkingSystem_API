export interface Student {
  id: number;
  fio: string;
  fingerID: string;
  RFID: string;
  faceID: string;
}

export type StudentDTO = Omit<Student, 'id'>;
