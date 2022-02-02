import dotenv from "dotenv";
import { getCoinInfo } from "./src/coin.js";
import {
  authenticate as authenticateGoogle,
  writeToSheet,
} from "./src/google.js";

/* Load environment variables from env file */
dotenv.config();

export const worker = async () => {
  console.log("getting coin info...");

  try {
    const coinData = await getCoinInfo();

    if (!!coinData) {
      const googleClient = await authenticateGoogle();
      writeToSheet(googleClient, coinData);
    } else {
      console.log("NULL COIN DATA");
    }
  } catch (error) {
    console.error(error);
  }
};
