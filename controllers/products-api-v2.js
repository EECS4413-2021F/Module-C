
const _     = require('lodash');
const model = require('../models/products-orm.js');

const { Product, Category, Vendor } = model;

/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */

// Shared arguments in Product.findAll for Sequelize ORM.
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

module.exports = {

  /**
   * Retrieve all of the Products within the database
   * that matches the specified query parameters. Responses
   * with a JSON array of the Products or an error object
   * if none found.
   * 
   * @type {RequestHandler}
   */
  getProducts(req, res) {
    console.log(`From ${req.ip}, Request ${req.url}`);
    const where = Product.filters(req.query);
    Product.findAll({ include, attributes, where }).then((products) => {
      let response = products.map(p => _.pick(p, attributes)) || new Error('No Products found');
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    }, console.log);
  },

  /**
   * Retrieve the Product object from the database
   * that matches the specified Product ID. Responses
   * with a JSON object of the matched Product or an
   * error object if not found.
   * 
   * @type {RequestHandler}
   */
  getProduct(req, res) {
    console.log(`From ${req.ip}, Request ${req.url}`);
    const where = { id: req.params.id };
    Product.findOne({ include, attributes, where }).then((product) => {
      let response = _.pick(product, attributes) || new Error('Product not found');
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    }, console.log);
  }
};
