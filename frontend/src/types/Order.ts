export class Order {
    totalQuantity: number = 0;
    totalPrice: number = 0;
    shippingFee: number = 0;
    payment: string = '';
    orderNumber: string = "";
    savings: number = 0;
    shippingAddress?: string;
    pickupDate?: string;
}
  