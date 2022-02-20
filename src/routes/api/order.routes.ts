import { Router } from 'express';
import * as controllers from '../../controllers/order.controllers';
import isAuthenticate from '../../middleware/isAuthenticated';
const routes = Router();

// api/orders
routes.route('/').get(isAuthenticate, controllers.index);
routes.route('/').post(isAuthenticate, controllers.create);
routes.route('/:id').get(isAuthenticate, controllers.show);
routes.route('/current/:userId').get(isAuthenticate, controllers.orderByUserId);
routes.route('/:id').patch(isAuthenticate, controllers.update);
routes.route('/:id').delete(isAuthenticate, controllers.destroy);
// add product to cart
//app.post('/orders/:id/products', addProduct);
routes.route('/:orderId/addcart').post(isAuthenticate, controllers.addProduct);
routes
	.route('/completed/:userId')
	.get(isAuthenticate, controllers.completedOrdersByUser);

export default routes;
