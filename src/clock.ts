import * as cron from "node-cron";
import { worker } from "./worker";

/* Schedule to run root every hour */
cron.schedule(
  "0 */1 * * *",
  () => {
    worker();
  },
  {}
);
