import type { AppLog, AppLogDTO } from '~/data-services/app-logs/model.js';
import { db } from '~/utility/db.js';

function createLog(dto: AppLogDTO) {
  db.add('app_logs', dto);
}

function getAllLogs() {
  return db.getAll<AppLog>('app_logs');
}

export const logsService = {
  createLog,
  getAllLogs,
};
