
import _     from 'lodash';
import model from '../models/products-orm-model.js';

const { Product, Category, Vendor } = model;

/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */

const include = [ Category, Vendor ];
const attributes = [
  'id',
  'name',
  'description', 
  'category',
  'vendor',
  'cost',
  'msrp',
  'qty'
];

export default {

  /**
   * Retrieve the an array of Product items within
   * shopping cart for the current session. Responses
   * with a JSON array of Product objects.
   * 
   * @type {RequestHandler}
   */
  getCart(req, res) {
    console.log(`From ${req.ip}, Request ${req.url}`);
    req.session.cart = req.session.cart || [];
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(req.session.cart));
    res.end();
  },

  /**
   * Add the Product item associated with the id within the request body's JSON
   * to the shopping cart for the current session. Responses with a JSON array
   * of Product objects or an error object.
   *
   * @type {RequestHandler}
   */
  addToCart(req, res) {
    console.log(`From ${req.ip}, Request ${req.url}`);
    const where = { id: req.body.id };
    req.session.cart = req.session.cart || [];
    Product.findOne({ include, attributes, where }).then((product) => {
      let response;
      if (!product) {
        response = new Error('Product not found');
      } else {
        req.session.cart.push(product);
        response = req.session.cart.map(p => _.pick(p, attributes));
      }
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    });
  }
};
