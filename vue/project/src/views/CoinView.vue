<script setup lang="ts">
import { RequestHandler } from '../utils/RequestHandler.ts'
import { formatPrice } from '../utils/utils.ts'
import { GREEN, RED } from '../utils/constants.ts'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const handler = RequestHandler.getInstance()
const data = ref()

let page = 1

async function addMoreData() {
    const newData = await handler.get('/coins/markets', {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: page,
        price_change_percentage: '24h'
    })

    if (!data.value) data.value = newData
    else data.value.push(...newData)
    page++

    localStorage.setItem('coins', JSON.stringify(data.value.map((c: any) => { return {
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        image: c.image,
        current_price: c.current_price,
        market_cap: c.market_cap,
        total_volume: c.total_volume,
        ath: c.ath,
        ath_date: c.ath_date,
        high_24h: c.high_24h,
        low_24h: c.low_24h,
    }})))
}

onMounted(async () => {
    addMoreData()
})

const router = useRouter()
</script>

<template>
    <header>
        <h1>Crypto Dashboard</h1>
    </header>

    <div v-if="data" class="cards">
        <div v-for="coin in data" :key="coin.id" @:click="() => router.push(coin.id)" class="card">
            <div class="cardHeader">
                <img :src="coin.image" :alt="`${coin.name} Logo`" height="32" width="32">
                <h2>{{ coin.name }}</h2>
            </div>

            <div class="divider"></div>

            <p>Current Price: <span>{{ formatPrice(coin.current_price) }}</span></p>
            <p>Market Cap: <span>{{ formatPrice(coin.market_cap) }}</span></p>

            <p id="change">24h Change: 
                <span :style="{color: coin.price_change_percentage_24h > 0 ? GREEN : coin.price_change_percentage_24h < 0 ? RED : 'darkgray'}"> 
                    <div class="icon">
                        {{ coin.price_change_percentage_24h?.toFixed(3) || '0.000' }}% 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path v-if="coin.price_change_percentage_24h > 0" d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            <path v-if="coin.price_change_percentage_24h < 0" d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                </span>
            </p>
        </div>
    </div>

    <div class="btn"><button @click="addMoreData">Load More</button></div>
</template>

<style scoped>
header {
    margin: 60px 0;
    text-align: center;
}

h1 {
    padding-bottom: 10px;
    border-bottom: 3px solid rgba(75, 192, 192, 1);
    width: fit-content;
    margin: 0 auto;
}

header p {
    font-style: italic;
    color: #505050;
    font-size: 0.85em;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    max-width: 80vw;
}

.card {
    box-sizing: border-box;
    background: #f4f4f4;
    width: 100%;
    break-inside: avoid; 
    display: inline-block;
    cursor: pointer;
    border-radius: 15px;
    box-shadow: inset 0 0 10px 2.5px rgba(75, 192, 192, 0.35);
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 250ms ease-out;
    margin-bottom: 10px;

    &:hover {
        box-shadow: inset 0 0 10px 5px rgba(75, 192, 192, 0.4);
        transform: scale(1.03);
    }
}

.cardHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 5px;
}

.cardHeader img {
    border-radius: 5px;
    margin-right: 5px;
}

span {
    color: rgba(24, 77, 77, 1);
}

p {
    font-size: 0.95em;
    margin-left: 5px;
}

#change {
    display: inline-flex;
    align-items: center;
    width: 100%;
    gap: 5px;
}

.divider {
    width: 75px;
    border-top: 2px solid rgba(75, 192, 192, 0.7);
}

.icon {
    width: fit-content;
    display: flex;
    flex-direction:row;
    align-items: center;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

button {
    margin: 20px 0 40px;
    background: none;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 110px;
    gap: 5px;
    color: rgba(75, 192, 192, 1);
    border: 2px solid rgba(75, 192, 192, 0.5);
    padding: 5px;
    border-radius: 7.5px;
    cursor: pointer;

    transition: all 250ms ease-out;

    &:hover {
        box-shadow: 1px 2px 7.5px 0 rgba(0, 0, 0, 0.2);
        background-color: rgba(75, 192, 192, 0.75);
        color: white;
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
}
</style>