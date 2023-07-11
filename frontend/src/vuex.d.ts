import {Store} from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface CartState {
        items: CartItem[],
        checkoutStatus: string
    }

    interface RootState {
        cart: CartState
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<RootState>
    }
}