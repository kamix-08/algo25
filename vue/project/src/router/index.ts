import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/CoinView.vue')
        },
        {
            path: '/:id',
            component: () => import('../views/CoinDetailView.vue')
        }
    ]
})