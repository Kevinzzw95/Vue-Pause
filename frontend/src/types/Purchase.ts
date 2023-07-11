import type {Address} from "./Address";
import type {Customer} from "./Customer";
import type {Order} from "./Order";
import type {OrderItem} from "./OrderItem";

export class Purchase {
    type!: string;
    customer!: Customer;
    shippingAddress?: Address;
    pickupDate?: string;
    order!: Order;
    orderItems!: OrderItem[];
}
  