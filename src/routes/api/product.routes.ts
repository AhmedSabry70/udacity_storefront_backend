import { Router } from 'express';
import * as controllers from '../../controllers/product.controllers';
import isAuthenticate from '../../middleware/isAuthenticated';
const routes = Router();

//// api/products
routes.route('/').get(controllers.index);
routes.route('/').post(isAuthenticate, controllers.create);
routes.route('/:id').get(controllers.show);
routes.route('/:id').patch(isAuthenticate, controllers.update);
routes.route('/:id').delete(isAuthenticate, controllers.destroy);

// sort by category
routes.route('/category/:category').get(controllers.category);

export default routes;
