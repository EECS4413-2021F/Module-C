
import os     from 'os';
import path   from 'path';
import sqlite from 'sqlite3';

const dbfile  = '4413/pkg/sqlite/Models_R_US.db';
const dbpath  = path.join(os.homedir(), ...dbfile.split('/'));
const sqlite3 = sqlite.verbose();
const db      = new sqlite3.Database(dbpath);

const GET_ALL_PRODUCTS = 'SELECT P.*, C.name as category, V.name as vendor '
                       + 'FROM Product P, Category C, Vendor V '
                       + 'WHERE P.catid = C.id AND P.venid = V.id';

const conditions = {
  "id":          " AND P.id = ?",
  "name":        " AND UPPER(P.name) LIKE UPPER(?)",         // case insensitive
  "description": " AND UPPER(P.description) LIKE UPPER(?)",  // case insensitive
  "category":    " AND C.name = ?",
  "vendor":      " AND V.name = ?",
  "min_cost":    " AND P.cost >= ?",
  "min_msrp":    " AND P.msrp >= ?",
  "min_qty":     " AND P.qty  >= ?",
  "max_cost":    " AND P.cost <= ?",
  "max_msrp":    " AND P.msrp <= ?",
  "max_qty":     " AND P.qty  <= ?"
};

export default {
  getProducts(query, success, failure = console.log) {
    let statement = [GET_ALL_PRODUCTS];
    let values    = [];

    Object.keys(query).map(k => [k, query[k]]).forEach(([k, v]) => {
      let condition = conditions[k];
      if (condition) {
        statement.push(condition);
        values.push(condition.match(/LIKE/) ? `%${v}%` : v);
      }
    });

    db.all(statement.join(), values, (err, rows) => {
      if (err == null) {
        success(rows);
      } else {
        failure(err);
      }
    });
  }
};
