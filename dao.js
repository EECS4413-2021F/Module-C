#!/usr/bin/env node

const _       = require('lodash');
const home    = require('os').homedir();
const dbfile  = '4413/pkg/sqlite/Models_R_US.db';
const dbpath  = require('path').join(home, ...dbfile.split('/'));
const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database(dbpath);

function getAll(queries, success, failure = console.log) {
  let statement = `SELECT P.id, P.name, P.description, P.cost, P.msrp,
                   P.qty AS quantity, C.name AS category, V.name AS vendor
                   FROM Product P, Category C, Vendor V
                   WHERE C.id = P.catid AND V.id = P.venid`;

  let fragments = _.toPairs(queries).map(function (el) {
    let [k, p] = el;
    switch (k) {
      case 'id':
        return { q: 'P.id = ?', p };
      case 'name':
      case 'description':
        return { q: `UPPER(P.${k}) LIKE UPPER(?)`, p: `%${p}%` };
      case 'category':
        return { q: `UPPER(C.name) LIKE UPPER(?)`, p: `%${p}%` };
      case 'vendor':
        return { q: `UPPER(V.name) LIKE UPPER(?)`, p: `%${p}%` };
      case 'min_qty':
      case 'min_cost':
      case 'min_msrp':
        return { q: `P.${k.replace('min_', '')} >= ?`, p };
      case 'max_qty':
      case 'max_cost':
      case 'max_msrp':
        return { q: `P.${k.replace('max_', '')} <= ?`, p };
    }
  });

  const qs = _.map(fragments, 'q');
  const ps = _.map(fragments, 'p');

  statement = [statement, ...qs].join(' AND ');
  db.all(statement, ps, function (err, rows) {
    console.log(statement); // preparedstatement
    console.log(ps); // parameters ?
    if (err == null) {
      success(rows);
    } else {
      failure(err);
    }
  });
}

module.exports = {
  getAll
};
