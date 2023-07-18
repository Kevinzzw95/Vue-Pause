import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PuzzleView from '../views/PuzzleView.vue'
import PuzzleFrameView from '../views/PuzzleFrameView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ChooseShipping from '../components/ChooseShipping.vue'
import Pickup from '../components/Pickup.vue'
import Shipping from '../components/Shipping.vue'
import Confirmation from '../components/Confirmation.vue'
import SuccessView from '../views/SuccessView.vue'
import PuzzleAccView from '../views/PuzzleAccView.vue'
import TableGamesView from '../views/TableGamesView.vue'
import SearchView from '../views/SearchView.vue'
import ProductDetails from '@/components/ProductDetails.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/puzzles/:pieces(\\d+)',
            name: 'puzzles',
            component: PuzzleView
        },
        {
            path: '/puzzle_frames',
            name: 'puzzle_frames',
            component: PuzzleFrameView
        },
        {
            path: '/puzzle_acc',
            name: 'puzzle_acc',
            component: PuzzleAccView
        },
        {
            path: '/table_games',
            name: 'table_games',
            component: TableGamesView
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView,
            props: true,
            children: [
                {
                    name: 'chooseshipping',
                    path: 'chooseshipping',
                    component: ChooseShipping,
                },
                {
                    name: 'pickup',
                    path: 'pickup',
                    component: Pickup,
                },
                {
                    name: 'shipping',
                    path: 'shipping',
                    component: Shipping,
                },
                {
                    name: 'confirmation',
                    path: 'confirmation',
                    component: Confirmation,
                },
            ]
        },
        {
            name: 'success',
            path: '/success/:orderNumber',
            component: SuccessView,
        },
    ],
})


export default router
