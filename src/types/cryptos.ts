export interface Crypto {
  id:                                      string;
  symbol:                                  string;
  name:                                    string;
  image:                                   string;
  current_price:                           number;
  market_cap:                              number;
  market_cap_rank:                         number;
  fully_diluted_valuation:                 number;
  total_volume:                            number;
  high_24h:                                number;
  low_24h:                                 number;
  price_change_24h:                        number;
  price_change_percentage_24h:             number;
  market_cap_change_24h:                   number;
  market_cap_change_percentage_24h:        number;
  circulating_supply:                      number;
  total_supply:                            number;
  max_supply:                              number;
  ath:                                     number;
  ath_change_percentage:                   number;
  ath_date:                                Date;
  atl:                                     number;
  atl_change_percentage:                   number;
  atl_date:                                Date;
  roi:                                     null;
  last_updated:                            Date;
  price_change_percentage_1h_in_currency:  number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency:  number;
}


export interface GetCryptos {
  status:              string;
  fetchStatus:         string;
  isLoading:           boolean;
  isSuccess:           boolean;
  isError:             boolean;
  isInitialLoading:    boolean;
  data:                Crypto[];
  dataUpdatedAt:       number;
  error:               null;
  errorUpdatedAt:      number;
  failureCount:        number;
  errorUpdateCount:    number;
  isFetched:           boolean;
  isFetchedAfterMount: boolean;
  isFetching:          boolean;
  isRefetching:        boolean;
  isLoadingError:      boolean;
  isPaused:            boolean;
  isPlaceholderData:   boolean;
  isPreviousData:      boolean;
  isRefetchError:      boolean;
  isStale:             boolean;
  trpc:                any;
}