<script setup lang="ts">
import { watch, ref, onBeforeUnmount, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { RequestHandler } from '../utils/RequestHandler.ts'
import Chart from 'chart.js/auto'
import { RED, RED_TRANSPARENT, GREEN, GREEN_TRANSPARENT, DAY } from '../utils/constants.ts'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

const route = useRoute()
const handler = RequestHandler.getInstance()

const fullData = ref()

function getDateFormat(v: number) {
    return new Date(v).toISOString().slice(0, 16)
}

const _from = ref(Date.now() - 365 * DAY)
const from = ref(getDateFormat(_from.value))

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'line'> | null = null

const daily = ref(true)
const slider = ref<HTMLElement | null>(null)

function getTimestamp(v: Date) {
    if (daily.value)
        return v.toLocaleDateString()
    else
        return v.toLocaleTimeString()
}

function render(prices: number[][], animation: [boolean, number] = [false, 0]) {
    if (chartInstance)
        chartInstance.destroy()

    if (!chartCanvas.value) return
    
    chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: {
            labels: prices.map((p: number[]) => daily.value ? new Date(p[0]!).toLocaleDateString() : getTimestamp(new Date(p[0]!))),
            datasets: [{
                data: prices.map((p: number[]) => p[1]!),
                fill: true,
                segment: {
                    borderColor: (ctx) => ctx.p0.parsed.y! >= ctx.p1.parsed.y! ? RED : GREEN,
                    backgroundColor: (ctx) => ctx.p0.parsed.y! >= ctx.p1.parsed.y! ? RED_TRANSPARENT : GREEN_TRANSPARENT
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
            },
            animation: animation[0] ? {
                delay: (ctx) => ctx.type === 'data' && ctx.mode === 'default' ? ctx.dataIndex * animation[1] / prices.length : 0
            } : false
        }
    })
}

async function renderHourly() {
    const data = await handler.get(`/coins/${route.params.id}/market_chart/range`, {
        vs_currency: 'usd',
        from: _from.value,
        to: _from.value + DAY
    })

    render(data.prices, [true, 250])
}

function createSlider() {
    noUiSlider.create(slider.value!, {
        start: [Date.now() - 365 * DAY, Date.now()],
        connect: true,
        range: {
            min: Date.now() - 365 * DAY,
            max: Date.now()
        },
        tooltips: [
            { to: (v) => new Date(+v).toLocaleDateString() }, 
            { to: (v) => new Date(+v).toLocaleDateString() }
        ],
        step: 60 * 60 * 1000
    }).on('update', ([v1, v2]) => {
        if (+v2! - (+v1!) <= DAY) {
            from.value = getDateFormat(+v1!)
            return
        }

        render(fullData.value.prices.filter((p: number[]) => p[0]! >= +v1! && p[0]! <= +v2!))
    })
}

function initDisplay() {
    createSlider()
    render(fullData.value.prices, [true, 1000])
}

watch(daily, async (newVal) => {
    if (!newVal) {
        await renderHourly()
        return
    }

    await nextTick()
    initDisplay()
})

watch(from, (newVal) => {
    _from.value = new Date(newVal).getTime()

    if (!daily.value)
        renderHourly()
    else
        daily.value = false
})

onMounted(async () => {
    fullData.value = await handler.get(`/coins/${route.params.id}/market_chart/range`, {
        vs_currency: 'usd',
        from: Date.now() - 365 * DAY,
        to: Date.now()
    })

    initDisplay()
})

onBeforeUnmount(() => {
    if (chartInstance)
        chartInstance.destroy()
})
</script>

<template>
    <div class="heading">
        <h1>{{ route.params.id }}</h1>
        <router-link to="/">Go back <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg></router-link>
    </div>

    <div class="man">
        <p>Chart time management: </p>
        <div class="segmented-control">
            <input type="radio" id="overall" name="timeOption" value="24h+" checked>
            <label for="overall">24h+</label>
            <input type="radio" id="daily" v-model="daily" name="timeOption" value="24h">
            <label for="daily">24h</label>
        </div>
        <!-- <input type="checkbox" v-model="daily" id="daily">
        <label for="daily">Daily</label> -->
        <div id="silders" v-if="daily" ref="slider"></div>
        <input type="datetime-local" v-else v-model="from" class="dateInp">
    </div>

    <canvas ref="chartCanvas"></canvas>
</template>

<style scoped>

    .segmented-control {
        display: inline-flex;
        background: rgba(75, 192, 192, 0.15);
        border-radius: 10px;
        padding: 2px;
        font-family: sans-serif;
        margin-bottom: 50px;
        width: 126.5px;
    }

    .segmented-control input {
        display: none;
    }

    .segmented-control label {
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 8px;
        color: #555;
        transition: all 0.2s ease;
        user-select: none;
    }

    .segmented-control input:checked + label {
        background: #fff;
        color: #000;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }

    canvas{
        margin: 30px 0;
    }

    .dateInp{
        background-color: white;
        border: 2px solid rgba(75, 192, 192, 0.5);
        padding: 5px;
        border-radius: 5px;
    }

    input{
        width: fit-content;
    }

    .man{
        display: flex;
        flex-direction: column;
    }

    a{
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100px;
        gap: 5px;
        color: rgba(75, 192, 192, 1);
        border: 2px solid rgba(75, 192, 192, 0.5);
        padding: 5px;
        border-radius: 7.5px;

        transition: all 250ms ease-out;

        &:hover {
            box-shadow: 1px 2px 7.5px 0 rgba(0, 0, 0, 0.2);
            background-color: rgba(75, 192, 192, 0.75);
            color: white;
            transform: scale(1.01);
        }

        &:active{
            transform: scale(0.98);
        }
    }

    .heading{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 60vw;
    }

</style>