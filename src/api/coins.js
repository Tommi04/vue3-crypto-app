const BASE_URL = "https://api.coingecko.com/api/v3/";
const MARKETS = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const COIN = 'coins/';

export const getMarkets = async() => {
    const response = await fetch( `${BASE_URL}${MARKETS}`);
    return await response.json();
}

export const getCoinsDetail = async(id) => {
    const response = await fetch(`${BASE_URL}${COIN}${id}`);
    return await response.json();
}