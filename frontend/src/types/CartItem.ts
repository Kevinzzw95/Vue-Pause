import {Product} from "./Product";

export class CartItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    pieces: number;
    sku: string;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl[0];
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
        this.pieces = product.pieces!;
        this.sku = product.sku;
    }
}