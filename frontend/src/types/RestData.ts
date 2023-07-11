import { Product } from "./Product";
import { Brand } from "./Brand";

export interface GetResponsePuzzles {
    _embedded: {
      puzzles: Product[],
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
}

export interface GetResponseBrands {
    _embedded: {
      brands: Brand[],
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
}

export interface GetResponseAccs {
  _embedded: {
    accessories: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface GetResponsePuzzleFrames {
  _embedded: {
    puzzleFrames: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface GetResponseTableGames {
  _embedded: {
    tableGames: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface GetResponseSearchView {
  _embedded: {
    searchViews: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface PlaceOrderResponse {
  orderNumber: string,
}