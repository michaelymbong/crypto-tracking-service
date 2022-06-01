import { getCoinInfo, processCoinInfo } from "../coin";

describe("coin.ts", () => {
  describe("getCoinInfo", () => {
    test("should return coin info data", async () => {
      const retval = await getCoinInfo();
      expect(retval.data).toBeDefined();
    });
  });

  describe("processCoinInfo", () => {
    test("transform an object of RawCoinType to CoinInfoType", () => {
      const rawCoinType = {
        name: "test",
        slug: "test",
        max_supply: 1000,
        circulating_supply: 1000,
        total_supply: 1000,
        quote: {
          USD: {
            price: 100,
            market_cap: 1000000,
            market_cap_dominance: 1,
            fully_diluted_market_cap: 1000000,
          },
        },
      };
      const retval = processCoinInfo(rawCoinType);

      expect(retval).toEqual({
        name: "test",
        slug: "test",
        max_supply: 1000,
        circulating_supply: 1000,
        total_supply: 1000,
        price: 100,
        market_cap: 1000000,
        market_cap_dominance: 1,
        fully_diluted_market_cap: 1000000,
      });
    });
  });
});
