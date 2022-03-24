export type RawCoinType = {
  [k: string]: any;
  name?: string;
  slug?: string;
  max_supply?: number;
  circulating_supply?: number;
  total_supply?: number;
  quote: {
    [l: string]: any;
    USD: {
      [m: string]: any;
      price?: number;
      market_cap?: number;
      market_cap_dominance?: number;
      fully_diluted_market_cap?: number;
    };
  };
};

export type CoinInfoType = {
  name: string;
  slug?: string;
  max_supply?: number;
  circulating_supply?: number;
  total_supply?: number;
  price?: number;
  market_cap?: number;
  market_cap_dominance?: number;
  fully_diluted_market_cap?: number;
};

export type StatusType = {
  timestamp: string;
  [k: string]: any;
};

export type ReportType = {
  status: StatusType;
  data: CoinInfoType[];
};
