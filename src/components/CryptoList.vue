<template>
  <el-table 
    :data="coins.filter((coin) => !search || coin.name.toLowerCase().includes(search.toLowerCase()))" 
    style="width: 100%" 
    :default-sort="{ prop: 'price_change_percentage_24h', order: 'descending' }"> <!-- perchè non funziona? -->
    <el-table-column>
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template>
      <el-table-column label="" width="120px">
      <template #default="scope">
        <div class="symbol">
          <el-image
            :src="scope.row.image"
            fit="cover"
            style="width: 40px; height: 40px"
          ></el-image>
          <span>{{ scope.row.symbol.toUpperCase() }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" sortable :filters="getNameFilters()" :filter-method="handleNameFilter">
      <template #default="scope">
          {{ scope.row.name }}
      </template>
    </el-table-column>
    </el-table-column>
    <el-table-column prop="current_price" label="Current price" sortable>
      <template #default="scope">
        {{ formatNumber(scope.row.current_price) }}
      </template></el-table-column
    >
    <el-table-column label="Market Cap">
      <template #default="scope">
        {{ formatNumber(scope.row.market_cap) }}
      </template>
    </el-table-column>
    <el-table-column label="Total volume">
      <template #default="scope">
        {{ formatNumber(scope.row.total_volume) }}
      </template>
    </el-table-column>
    <el-table-column prop="price_change_percentage_24h" label="Price change % 24h" sortable>
      <template #default="scope">
        <el-tag
          v-if="scope.row.price_change_percentage_24h <= 0"
          type="danger"
          >{{ scope.row.price_change_percentage_24h }}</el-tag
        >
        <el-tag
          v-else-if="scope.row.price_change_percentage_24h > 0"
          type="success"
          >+{{ scope.row.price_change_percentage_24h }}</el-tag
        >
        <el-tag v-else>{{ scope.row.price_change_percentage_24h }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      fixed="right">
      <template #default="scope">
        <el-button type="text" size="small" @click="gotoCryptoInfo(scope.row)">Info</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import {getMarkets} from '@/api/coins';
// import {ref, onMounted} from 'vue';
import useCoinsMarkets from "@/use/coinsMarkets";
import useTableFilters from "@/use/tableFilters";
import {useRouter} from 'vue-router';

export default {
  setup() {
    const coinsMarkets = useCoinsMarkets();
    const tableFilters = useTableFilters();
    const router = useRouter();

    function gotoCryptoInfo(crypto){
      router.push({path:`/crypto/${crypto.id}`});
    }

  // spostato in coinsMarkets
    // async function getAPIData() {
    //   coins.value = await getMarkets();
    // };
  //   function getNameFilters(){
  //     // questa sintassi ({  }) ci permette di tornare un oggetto
  //     //altrimenti avremmo dovuto mettere { return oggetto }
  //     return coins.value.map((coin) => ({ text: coin.name, value: coin.name }));
  //   }

    // onMounted(getAPIData); 
    
    //spostato in tableFilter
  //   function formatNumber(number) {
  //     return new Intl.NumberFormat("it-IT", {
  //       style: "currency",
  //       currency: "eur",
  //       maximumSignificantDigits: 20
  //     }).format(number);
  //   }; 
  //  function handleNameFilter(value, row){
  //     return row.name === value;
  //   };

    return { ...coinsMarkets, ...tableFilters, gotoCryptoInfo};

  }
}

// gestito nel setup tramite onMountain. Il created non esiste
  // created() {
  //   this.getAPIData();
  // },
  //abbiamo usato setup
  // data() {
  //   return {
  //       coins: [],
  //       search: "",
  //   //usando la API nel methods richiamata dal created non usiamo più l'array statico
  //   //   coins: [
  //   //     {
  //   //       id: "bitcoin",
  //   //       symbol: "btc",
  //   //       name: "Bitcoin",
  //   //       image:
  //   //         "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  //   //       current_price: 35584,
  //   //       market_cap: 674357743225,
  //   //       market_cap_rank: 1,
  //   //       fully_diluted_valuation: 746123764060,
  //   //       total_volume: 21745366486,
  //   //       high_24h: 36112,
  //   //       low_24h: 34867,
  //   //       price_change_24h: 1.76,
  //   //       price_change_percentage_24h: 0.00495,
  //   //       market_cap_change_24h: -1875656218.5794678,
  //   //       market_cap_change_percentage_24h: -0.27737,
  //   //       circulating_supply: 18980112,
  //   //       total_supply: 21000000,
  //   //       max_supply: 21000000,
  //   //       ath: 59717,
  //   //       ath_change_percentage: -40.75608,
  //   //       ath_date: "2021-11-10T14:24:11.849Z",
  //   //       atl: 51.3,
  //   //       atl_change_percentage: 68866.25984,
  //   //       atl_date: "2013-07-05T00:00:00.000Z",
  //   //       roi: null,
  //   //       last_updated: "2022-03-11T07:10:09.524Z"
  //   //     },
  //   //     {
  //   //       id: "ethereum",
  //   //       symbol: "eth",
  //   //       name: "Ethereum",
  //   //       image:
  //   //         "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  //   //       current_price: 2358.56,
  //   //       market_cap: 282335039524,
  //   //       market_cap_rank: 2,
  //   //       fully_diluted_valuation: null,
  //   //       total_volume: 11068775973,
  //   //       high_24h: 2386.37,
  //   //       low_24h: 2304.91,
  //   //       price_change_24h: 15.94,
  //   //       price_change_percentage_24h: 0.68029,
  //   //       market_cap_change_24h: 1121832063,
  //   //       market_cap_change_percentage_24h: 0.39893,
  //   //       circulating_supply: 119912747.624,
  //   //       total_supply: null,
  //   //       max_supply: null,
  //   //       ath: 4228.93,
  //   //       ath_change_percentage: -44.50805,
  //   //       ath_date: "2021-12-01T08:38:24.623Z",
  //   //       atl: 0.381455,
  //   //       atl_change_percentage: 615100.61173,
  //   //       atl_date: "2015-10-20T00:00:00.000Z",
  //   //       roi: {
  //   //         times: 87.77209359668407,
  //   //         currency: "btc",
  //   //         percentage: 8777.209359668408
  //   //       },
  //   //       last_updated: "2022-03-11T07:10:53.734Z"
  //   //     },
  //   //     {
  //   //       id: "tether",
  //   //       symbol: "usdt",
  //   //       name: "Tether",
  //   //       image:
  //   //         "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
  //   //       current_price: 0.909682,
  //   //       market_cap: 72817982106,
  //   //       market_cap_rank: 3,
  //   //       fully_diluted_valuation: null,
  //   //       total_volume: 43550290097,
  //   //       high_24h: 0.914979,
  //   //       low_24h: 0.899999,
  //   //       price_change_24h: 0.00473983,
  //   //       price_change_percentage_24h: 0.52377,
  //   //       market_cap_change_24h: 396944846,
  //   //       market_cap_change_percentage_24h: 0.54811,
  //   //       circulating_supply: 80047716084.0496,
  //   //       total_supply: 80047716084.0496,
  //   //       max_supply: null,
  //   //       ath: 1.13,
  //   //       ath_change_percentage: -19.60695,
  //   //       ath_date: "2018-07-24T00:00:00.000Z",
  //   //       atl: 0.533096,
  //   //       atl_change_percentage: 70.64999,
  //   //       atl_date: "2015-03-02T00:00:00.000Z",
  //   //       roi: null,
  //   //       last_updated: "2022-03-11T07:07:15.340Z"
  //   //     },
  //   //     {
  //   //       id: "binancecoin",
  //   //       symbol: "bnb",
  //   //       name: "BNB",
  //   //       image:
  //   //         "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
  //   //       current_price: 339.06,
  //   //       market_cap: 57007827161,
  //   //       market_cap_rank: 4,
  //   //       fully_diluted_valuation: 57007827161,
  //   //       total_volume: 1376083865,
  //   //       high_24h: 342.71,
  //   //       low_24h: 331.52,
  //   //       price_change_24h: -2.071408870796,
  //   //       price_change_percentage_24h: -0.60722,
  //   //       market_cap_change_24h: -321299327.02762604,
  //   //       market_cap_change_percentage_24h: -0.56045,
  //   //       circulating_supply: 168137035.9,
  //   //       total_supply: 168137035.9,
  //   //       max_supply: 168137035.9,
  //   //       ath: 583.17,
  //   //       ath_change_percentage: -41.99471,
  //   //       ath_date: "2021-11-26T02:58:28.000Z",
  //   //       atl: 0.03359941,
  //   //       atl_change_percentage: 1006678.83873,
  //   //       atl_date: "2017-10-19T00:00:00.000Z",
  //   //       roi: null,
  //   //       last_updated: "2022-03-11T07:10:03.234Z"
  //   //     }
  //   //   ]
  //   };
//   // },

// messi nel setup()
//   methods: {
//     async getAPIData() {
//     //spostato tutto in src/api/coins.js
//     //   const response = await fetch(
//     //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//     //   );
//     //   const result = await response.json();
//     //   this.coins = result;

//       this.coins = await getMarkets();
//     },
//     formatNumber(number) {
//       return new Intl.NumberFormat("it-IT", {
//         style: "currency",
//         currency: "eur",
//         maximumSignificantDigits: 20
//       }).format(number);
//     },
//     handleNameFilter(value, row){
//       return row.name === value;
//     },
//     getNameFilters(){
//       // questa sintassi ({  }) ci permette di tornare un oggetto
//       //altrimenti avremmo dovuto mettere { return oggetto }
//       return this.coins.map((coin) => ({ text: coin.name, value: coin.name }));
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.symbol {
  display: flex;
  align-items: center;

  .el-image {
    margin-right: 10px;
  }

  span {
    font-weight: 700;
  }
}
</style>
