import axios from "axios";

export const CURRENCIES = [
  "bitcoin",
  "ethereum",
  "tether",
  "bnb",
  "cardano",
  "solana",
  "xrp",
  "terra-luna",
  "polkadot-new",
  "dogecoin",
  "polygon",
  "shiba-inu",
];

export const getCoinInfo = async () => {
  let info = null;

  try {
    const options = {
      url: `${process.env.COIN_API_BASE_URL}/v1/cryptocurrency/quotes/latest`,
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COIN_API_KEY,
      },
      params: {
        slug: CURRENCIES.toString(),
      },
      validateStatus: (status) => status <= 200,
    };

    const response = await axios(options);

    info = {
      ...response.data,
      data: Object.keys(response.data.data).map((c) =>
        processCoinInfo(response.data.data[c])
      ),
    };

    console.log("coin info retrieved", info);
  } catch (error) {
    console.error(error);
  }

  return info;
};

export const processCoinInfo = (coin) => {
  const {
    name,
    slug,
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
    name,
    slug,
    max_supply,
    circulating_supply,
    total_supply,
    price,
    market_cap,
    market_cap_dominance,
    fully_diluted_market_cap,
  };
};
