<script setup lang="ts">
import { RequestHandler } from '../utils/RequestHandler.ts'
import { formatPrice } from '../utils/utils.ts'
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
}

onMounted(async () => {
    addMoreData()
})

const router = useRouter()
</script>

<template>
    <div v-if="data">
        <div v-for="coin in data" :key="coin.id" @:click="() => router.push(coin.id)">
            <h2>{{ coin.name }}</h2>
            <img :src="coin.image" :alt="`${coin.name} Logo`" height="32" width="32">
            <p>Current Price: {{ formatPrice(coin.current_price) }}</p>
            <p>Market Cap: {{ formatPrice(coin.market_cap) }}</p>
            <p>24h Change: {{ coin.price_change_percentage_24h }}%</p>
        </div>

        <button @click="addMoreData">Load More</button>
    </div>
</template>

<style scoped>
</style>