import {CartItem} from "@/types/CartItem"
import {Product} from "@/types/Product"
import type {RootState} from ".."
import axios from "axios"
import type { PlaceOrderResponse } from "@/types/RestData"

export interface CartState {
    items: CartItem[],
    checkoutStatus: string,
    savings: number,
}

const state: CartState = {
    items: [],
    checkoutStatus: "",
    savings: 0
}

const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
}

// getters
const getters = {
    cartProducts: (state: CartState) => {
        return state.items;
    },

    checkoutStatus: (state: CartState) => {
        return state.checkoutStatus;
    },

    findCartQauntity: (state: CartState) => (sku: string) => {
        var res = 0;
        state.items.forEach((item) => {
            if(item.sku === sku) {
                res = item.quantity;
                return res;
            }
        })
        return res;
    },

    cartTotalPrice: (state: CartState) => {
        return state.items != undefined ? state.items.reduce((total: number, product: CartItem) => {
            return total + product.unitPrice * product.quantity
        }, 0) : 0
    },

    cartTotalQuantity: (state: CartState) => {
        return state.items != undefined ? state.items.reduce((total: number, product: CartItem) => {
            return total + product.quantity
        }, 0) : 0
    },

    getSavings: (state: CartState) => {
        return state.savings;
    }
}

// actions
const actions = {
    async checkout({commit, state, rootState}: { state: CartState, commit: Function, rootState: RootState }) {
        const savedCartItems = [...state.items];
        const savedPurchase = rootState.purchase.purchaseItem
        const purchase = rootState.purchase.purchaseItem;        
        commit('setCheckoutStatus', null);
        let orderNumber =""
        // empty cart
        commit('setCartItems', {items: []});
        await axios.post<PlaceOrderResponse>('/checkout/place_order', purchase).then(
            (res) => {
                orderNumber = res.data.orderNumber;
                commit('setCheckoutStatus', 'successful');
                
            },
            (err) => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', {items: savedCartItems})
                commit('purchase/setPurchase', {purchase: purchase})
                alert(`There was an error: ${err.message}`);
            }
                
        )
        return orderNumber;
    },

    addProductToCart({state, commit}: { state: CartState, commit: Function }, {
        product,
        qnt
    }: { product: Product, qnt: number }) {
        commit('setCheckoutStatus', null);
        if (product.unitsInStock >= qnt) {
            const cartItem = state.items.find((item: CartItem) => item.sku === product.sku)
            if (!cartItem) {
                commit('pushProductToCart', {product: product, quantity: qnt})
            } else {
                if (product.unitsInStock >= cartItem.quantity + qnt) {
                    const newQnt = qnt + cartItem.quantity;
                    commit('setItemQuantity', {sku: cartItem.sku, quantity: newQnt})
                }

            }
            // remove 1 item from stock
            //commit('products/decrementProductInventory', { id: product.id }, { root: true })
        }
    },

    async calculateSavings({state, commit}: { state: CartState, commit: Function }) {
        try {
            await axios.post<number>('/sales', state.items).then(
                (res) => commit('setSavings', res.data)
            );
        } catch (error) {
            throw error
        }
    }

}

// mutations
const mutations = {
    pushProductToCart(state: CartState, {product, quantity} : {product: Product, quantity: number}) {
        const newItem = new CartItem(product);
        newItem.quantity = quantity;
        state.items.push(newItem);
        updateLocalStorage(state.items);
    },

    updateCartFromLocalStorage(state: CartState) {
        const cart = localStorage.getItem('cart');
        if(cart) {
            state.items = JSON.parse(cart);
        }
    },

    removeItemFromCart(state: CartState, sku: string ) {
        state.items = state.items.filter((item) => item.sku !== sku);
        updateLocalStorage(state.items);
    },

    setItemQuantity(state: CartState, {sku, quantity}: { sku: string, quantity: number }) {
        
        const cartItem = state.items.find(item => item.sku === sku)!
        cartItem.quantity = quantity;
        updateLocalStorage(state.items);
    },

    setCartItems(state: CartState, {items} : {items: CartItem[]}) {
        state.items = items;
        updateLocalStorage(state.items);
    },

    setCheckoutStatus(state: CartState, status: string) {
        state.checkoutStatus = status
    },

    setSavings(state: CartState, saving: number) {
        state.savings = saving;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}