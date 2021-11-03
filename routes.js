
import productsApiV1 from "./controllers/products-api-v1.js";
import productsApiV2 from "./controllers/products-api-v2.js";
import cartApi       from "./controllers/cart-api.js";

/**
 * @typedef {import('express').Application} Application
 */

export default {

  /**
   * Defines and binds each URI endpoint and HTTP method
   * to specific RequestHandler functions.
   *
   * @param {Application} app
   */
  configureRoutes(app) {
    app.get('/v1/products',     productsApiV1.getProducts);
    app.get('/v1/products/:id', productsApiV1.getProduct);
    app.get('/v2/products',     productsApiV2.getProducts);
    app.get('/v2/products/:id', productsApiV2.getProduct);
    app.get('/v2/cart',         cartApi.getCart);
    app.post('/v2/cart/add',    cartApi.addToCart);
  }
};
