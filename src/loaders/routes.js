// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('/app/src/components/auth/auth.module.js');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  }
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
