<template>
    <el-container v-if="coin" direction="vertical">
        <!-- deriva dall'uso di vueRouter, è l'id passato alla rotta -->
        <h1>{{ coin.name }} detail</h1>

        <el-descriptions
            :column="3"
            border
        >

            <el-descriptions-item label="Name">{{coin.name}}</el-descriptions-item>
            <el-descriptions-item label="Symbol">{{coin.symbol}}</el-descriptions-item>
            <el-descriptions-item label="Country Origin">{{coin.country_origin}}</el-descriptions-item>

            <el-descriptions-item label="Sentiment votes down percentage">
                <el-tag size="medium" type="danger">{{ coin.sentiment_votes_down_percentage }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Sentiment votes up percentage">
                <el-tag size="medium" type="danger">{{ coin.sentiment_votes_up_percentage }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Liquidity score">
                <el-tag size="medium" type="danger">{{ coin.liquidity_score }}</el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="Current price">{{ formatNumber(coin.market_data.current_price.eur) }}</el-descriptions-item>
            <el-descriptions-item label="High 24h" size="medium">{{ formatNumber(coin.market_data.high_24h.eur) }}</el-descriptions-item>
        </el-descriptions>
    </el-container>
</template>

<script>
import { ref, onMounted } from 'vue-demi';
import { getCoinsDetail } from '@/api/coins';
import { useRoute } from 'vue-router';
import { formatNumber } from '@/utils';

export default {
    setup() {
        const coin = ref(null);
        const route = useRoute();

        async function getAPIData(){
            coin.value = await getCoinsDetail(route.params.id);
        }

        onMounted(getAPIData);

        return { coin, formatNumber };
    }
}
</script>