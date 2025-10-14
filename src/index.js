import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDb.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";

const bootstrap = async () => {
    await initMongoDB();
    setupServer();
    createDirIfNotExists(TEMP_UPLOAD_DIR);
    createDirIfNotExists(UPLOAD_DIR);
};
bootstrap();

