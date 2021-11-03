
import dao from '../models/products-dao.js';

/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */

export default {

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
    dao.getProducts(req.query, function (rows) {
      let response;
      if (rows.length > 1) {
        response = rows;
      } else {
        response = new Error('No Products found');
      }
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    });
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
    dao.getProducts(req.params, function (rows) {
      let response;
      if (rows.length == 1) {
        response = rows[0];
      } else {
        response = new Error('Product not found');
      }
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
    });
  }
};
