import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

// 300 Is PORT
web.listen(3000, () => {
    logger.info("APP Start");
}) 