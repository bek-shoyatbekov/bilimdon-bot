/** @format */

import { CronJob } from "cron";

const createCronJob = (cronTime: string, callback: () => void) => {
  return new CronJob(cronTime, callback, null, false, "Asia/Bishkek");
};

export default createCronJob;
