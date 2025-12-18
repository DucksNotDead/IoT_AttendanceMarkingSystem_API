import { checkFaceIdRoute } from '~/routes/check-face-id-route.js';
import { checkFingerIdRoute } from '~/routes/check-finger-id-route.js';
import { checkRfidBeforeStudentCreateRoute } from '~/routes/check-rfid-before-student-create-route.js';
import { checkRfidRoute } from '~/routes/check-rfid-route.js';
import { createAttendanceRoute } from '~/routes/create-attendance-route.js';
import { createFaceIdRoute } from '~/routes/create-face-id-route.js';
import { createStudentRoute } from '~/routes/create-student-route.js';
import { getDataRoute } from '~/routes/get-data-route.js';
import { getLogsRoute } from '~/routes/get-logs-route.js';
import { loadCV } from '~/utility/cv.js';
import { initServers } from '~/utility/init-servers.js';

await loadCV();

const { app } = await initServers();

getDataRoute(app);

getLogsRoute(app);

createFaceIdRoute(app);

createStudentRoute(app);

createAttendanceRoute(app);

checkRfidRoute(app);

checkFingerIdRoute(app);

checkRfidBeforeStudentCreateRoute(app);

checkFaceIdRoute(app);
