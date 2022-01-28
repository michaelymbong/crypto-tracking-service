const cron = require("node-cron");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

cron.schedule("* 8 * * *", () => {
  console.log("getting coin info...");
  getCoinInfo();
});

const getCoinInfo = async () => {
  try {
    const options = {
      url: `${process.env.COIN_API_BASE_URL}/v1/cryptocurrency/listings/latest`,
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COIN_API_KEY,
      },
      params: {
        limit: 15,
      },
      validateStatus: (status) => status <= 200,
    };

    const response = await axios(options);
    console.log(response.data);

    console.log("coin info retrieved");
  } catch (error) {
    console.error(error);
  }
};
