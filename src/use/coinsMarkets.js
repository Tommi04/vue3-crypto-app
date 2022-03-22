import {getMarkets} from '@/api/coins';
import {ref, onMounted} from 'vue';

export default function useCoinsMarkets(){
    const coins = ref([])

    async function getAPIData() {
      coins.value = await getMarkets();
    };
    
    function getNameFilters(){
        // questa sintassi ({  }) ci permette di tornare un oggetto
        //altrimenti avremmo dovuto mettere { return oggetto }
        return coins.value.map((coin) => ({ text: coin.name, value: coin.name }));
      }
    
    onMounted(getAPIData); 

    return { coins, getNameFilters };

}