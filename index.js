const cron = require("node-cron");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

cron.schedule("* 8 * * *", () => {
  root();
});

const getCoinInfo = async () => {
  let coins = [];

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
    coins = response.data.data;

    console.log("coin info retrieved");
  } catch (error) {
    console.error(error);
  }

  return coins;
};

const processCoinInfo = (coin) => {
  const {
    id,
    name,
    max_supply,
    circulating_supply,
    total_supply,
    quote: {
      USD: {
        price,
        market_cap,
        market_cap_dominance,
        fully_diluted_market_cap,
      },
    },
  } = coin;

  return {
    id,
    name,
    max_supply,
    circulating_supply,
    total_supply,
    price,
    market_cap,
    market_cap_dominance,
    fully_diluted_market_cap,
  };
};

const root = async () => {
  console.log("getting coin info...");

  const coins = await getCoinInfo();
  const coin_data = coins.map((c) => processCoinInfo(c));

  console.log(coin_data);
};

// root();
