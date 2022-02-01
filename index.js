import cron from "node-cron";
import dotenv from "dotenv";
import { getCoinInfo, processCoinInfo } from "./src/coin.js";

// Load environment variables from env file
dotenv.config();

cron.schedule("* 8 * * *", () => {
  root();
});

const root = async () => {
  console.log("getting coin info...");

  const coins = await getCoinInfo();
  const coin_data = coins.map((c) => processCoinInfo(c));

  console.log(coin_data);
};

// root();
