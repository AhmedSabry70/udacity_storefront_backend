import { Router } from 'express';
import * as controllers from '../../controllers/user.controllers';
import isAuthenticate from '../../middleware/isAuthenticated';
const routes = Router();

// api/users
routes.route('/signup').post(controllers.register);
routes.route('/').post(controllers.register);
routes.route('/').get(isAuthenticate, controllers.indexUsers);
routes.route('/:id').get(isAuthenticate, controllers.show);
routes.route('/:id').patch(isAuthenticate, controllers.updateUser);
routes.route('/:id').delete(isAuthenticate, controllers.deletUser);
// authentication
routes.route('/login').post(controllers.authenticate);
//routes.route('/generAccessToken').post(controllers.generAccessToken);

export default routes;
