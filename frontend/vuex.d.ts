import type { BrandState } from '@/store/modules/brand'
import type { CartState } from '@/store/modules/cart'
import type { PurchaseState } from '@/store/modules/purchase'
import {Store} from 'vuex'


declare module '@vue/runtime-core' {
    // declare your own store states

    interface RootState {
        cart: CartState,
        brand: BrandState,
        purchase: PurchaseState
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<RootState>
    }
}

declare module "vuex" {
    export {useStore, Store, createStore} from "vuex/types/index.d.ts";
    export * from "vuex/types/helpers.d.ts";
    export * from "vuex/types/logger.d.ts";
    export * from "vuex/types/vue.d.ts";
}