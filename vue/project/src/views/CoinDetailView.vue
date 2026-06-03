<script setup lang="ts">
import { watch, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { RequestHandler } from '../utils/RequestHandler.ts'
import Chart from 'chart.js/auto'
import { RED, RED_TRANSPARENT, GREEN, GREEN_TRANSPARENT } from '../utils/constants.ts'

const route = useRoute()
const handler = RequestHandler.getInstance()

const from = ref(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16))
const to = ref(new Date(Date.now()).toISOString().slice(0, 16))

const _from = ref(Date.now() - 24 * 60 * 60 * 1000)
const _to = ref(Date.now())

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'line'> | null = null

function getTimestamp(v: Date) {
    if ((_to.value - _from.value) > 90 * 24 * 60 * 60 * 1000)
        return v.toLocaleDateString()
    else
        return v.toLocaleTimeString()
}

watch(
    [() => route.params.id, _from, _to],
    async ([newId]) => {
        if (!newId) return

        const values = await handler.get(`/coins/${newId}/market_chart/range`, {
            vs_currency: 'usd',
            from: _from.value,
            to: _to.value
        })

        if (chartInstance)
            chartInstance.destroy()

        if (!chartCanvas.value) return
        
        chartInstance = new Chart(chartCanvas.value, {
            type: 'line',
            data: {
                labels: values.prices.map((p: number[]) => getTimestamp(new Date(p[0] as number))),
                datasets: [{
                    data: values.prices.map((p: number[]) => p[1] as number),
                    fill: true,
                    segment: {
                        borderColor: (ctx) => (ctx.p0.parsed.y as number) >= (ctx.p1.parsed.y as number) ? RED : GREEN,
                        backgroundColor: (ctx) => (ctx.p0.parsed.y as number) >= (ctx.p1.parsed.y as number) ? RED_TRANSPARENT : GREEN_TRANSPARENT
                    }
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Time'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 2,
                        backgroundColor: (ctx) => (ctx.parsed.y as number) >= (ctx.dataset.data[ctx.dataIndex - 1] as number) ? GREEN : RED,
                        borderColor: (ctx) => (ctx.parsed.y as number) >= (ctx.dataset.data[ctx.dataIndex - 1] as number) ? GREEN : RED
                    }
                }
            }
        })
    },
    { immediate: true }
)

onBeforeUnmount(() => {
    if (chartInstance)
        chartInstance.destroy()
})
</script>

<template>
    <div>
        <h1>{{ route.params.id }}</h1>
        <label>
            From:
            <input type="datetime-local" v-model="from" :max="to" />
        </label>
        <label>
            To:
            <input type="datetime-local" v-model="to" :min="from" :max="Date.now()" />
        </label>

        <button @click="() => { _from = new Date(from).getTime(); _to = new Date(to).getTime() }">Update Chart</button>
    </div>

    <canvas ref="chartCanvas"></canvas>
</template>

<style scoped>
</style>