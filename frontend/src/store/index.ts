import {type InjectionKey} from 'vue';
import cart, {type CartState} from './modules/cart'
import {Store, createStore, useStore as baseUseStore} from 'vuex';
import purchase, {type PurchaseState} from './modules/purchase';
import type { BrandState } from './modules/brand';
import brand from './modules/brand';

export interface RootState {
    cart: CartState;
    purchase: PurchaseState;
    brand: BrandState;
}
  

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules: {
        cart,
        purchase,
        brand,
    },

})

export function useStore() {
    return baseUseStore(key)
}