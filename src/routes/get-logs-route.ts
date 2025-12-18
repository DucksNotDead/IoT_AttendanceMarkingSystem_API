import { logsService } from '~/data-services/app-logs/index.js';
import { createRoute } from '~/utility/create-route.js';

export const getLogsRoute = createRoute('get', '/logs', () => {
  const logs = logsService.getAllLogs();

  return { logs };
});
