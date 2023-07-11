
import { Brand } from "@/types/Brand";
import type { GetResponseBrands } from "@/types/RestData";
import axios from "axios";

export interface BrandState {
    brands: Brand[],
}

let brands: Brand[] = []

const state: BrandState = {
    brands: brands
}

// getters
const getters = {
    getBrands: (state: BrandState) => {
        return state.brands;
    },

    getBrandName: (state: BrandState) => (id: number) => {
        return state.brands.find((brand) => brand.id === id)?.name;
    }
}

// mutations
const mutations = {

    setBrands(state: BrandState, brnads: Brand[]) {
        state.brands = brnads;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}