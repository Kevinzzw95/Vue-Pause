import {Address} from "@/types/Address";
import {Customer} from "@/types/Customer";
import {Order} from "@/types/Order";
import {PickupTime} from "@/types/PickupTime";
import {Purchase} from "@/types/Purchase";

export interface PurchaseState {
    purchaseItem: Purchase,
}


const state: PurchaseState = {
    purchaseItem: new Purchase()
}

// getters
const getters = {
    getPurchase: (state: PurchaseState) => {
        return state.purchaseItem;
    },
}


// mutations
const mutations = {

    setPurchase(state: PurchaseState, purchase: Purchase) {
        state.purchaseItem = purchase;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}