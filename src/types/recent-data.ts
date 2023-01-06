export interface RecentData {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap:                       number;
    market_cap_rank:                  null;
    fully_diluted_valuation:          number | null;
    total_volume:                     number;
    high_24h:                         number | null;
    low_24h:                          number | null;
    price_change_24h:                 number | null;
    price_change_percentage_24h:      number | null;
    market_cap_change_24h:            number | null;
    market_cap_change_percentage_24h: number | null;
    circulating_supply:               number;
    total_supply:                     number;
    max_supply:                       number | null;
    ath:                              number;
    ath_change_percentage:            number;
    ath_date:                         Date;
    atl:                              number;
    atl_change_percentage:            number;
    atl_date:                         Date;
    roi:                              null;
    last_updated:                     Date;
}
