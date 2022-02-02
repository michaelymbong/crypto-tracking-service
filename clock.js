import cron from "node-cron";
import { worker } from "./worker.js";

/* Schedule to run root every hour */
cron.schedule("0 */1 * * *", () => {
  worker();
});
