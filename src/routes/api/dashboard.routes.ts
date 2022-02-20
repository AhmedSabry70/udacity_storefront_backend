import { Router } from 'express';
import * as controllers from '../../controllers/dashboard.controllers';
import isAuthenticate from '../../middleware/isAuthenticated';
const routes = Router();

// api/users

routes.route('/five-most-expensive').get(controllers.fiveMostExpensive);
routes
	.route('/users-with-orders')
	.get(isAuthenticate, controllers.usersWithOrders);
routes
	.route('/products-in-orders')
	.get(isAuthenticate, controllers.productsInOrders);

export default routes;
