import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDb.js";

const bootstrap = async () => {
    await initMongoDB();
    setupServer();
};
bootstrap();

