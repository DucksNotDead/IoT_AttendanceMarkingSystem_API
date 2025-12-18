export interface Attendance {
  id: number;
  lessonId: number;
  studentId: number;
  lessonDate: string;
}

export type AttendanceDTO = Omit<Attendance, 'id'>;
