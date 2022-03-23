import "dotenv/config";
import { getCoinInfo } from "./coin";
import { authenticate as authenticateGoogle, writeToSheet } from "./google";

/* Load environment variables from env file */

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
