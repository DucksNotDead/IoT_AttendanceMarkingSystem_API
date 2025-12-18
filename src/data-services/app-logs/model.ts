export interface AppLog {
  id: number;
  timestamp: number;
  operation: string;
  studentId: number | undefined;
  status: number;
}

export type AppLogDTO = Omit<AppLog, 'id'>;
