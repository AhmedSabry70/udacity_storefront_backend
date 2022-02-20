import { Router } from 'express';
import usersRoutes from './api/user.routes';
import orderRoutes from './api/order.routes';
import productsRoutes from './api/product.routes';
import dashboardRoutesa from './api/dashboard.routes';
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/dashboard', dashboardRoutesa);
routes.use('/orders', orderRoutes);

//routes.use(booksRoutes);
export default routes;
