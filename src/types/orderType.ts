export type OrderProduct = {
	id?: string;
	quantity: number;
	order_id: string;
	product_id: string;
};
export type Order = {
	id?: string;
	status: string;
	user_id: string;
};

export default Order;
