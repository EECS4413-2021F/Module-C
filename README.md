# Module C - NodeJS + Express

Unlike in the lab and in the lecture, this project is structured slightly
differently. The ExpressJS framework is unopinionated, i.e.: it does not dictate
a specific file structure or layout for your project. While there are helpful
[Examples](http://expressjs.com/en/starter/examples.html) like one for MVC,
it's entirely up to you. You can put everything in a single file. It's not going
to stop you, but it's just bad practice.

In this repo, we show you a modularized layout of a project. It is divided into
controllers and models. We wire Express up with the URL routes associated with
the Request Handlers in the `routes.js` file and then require and invoke the
`configureRoutes(app)` function in `index.js`. From `routes.js`, we link to the
controller files which group the related Request Handlers togethers. Finally, we
store static or shared configurations (such as: secrets, passwords, API keys, DB
path and credentials, etc.) in a `config.json` as an object and require it in
the files that need it. Then, in production, we can replace this file with a
`config.json` containing the actual configurations.

The overall structure of the project is as follows:
```
.
├── controllers
│   ├── cart-api.js
│   ├── products-api-v1.js
│   └── products-api-v2.js
├── models
│   ├── products-dao.js
│   └── products-orm.js
├── node_modules
├── config.json
├── index.js
├── package.json
├── README.md
└── routes.js
```

## Other Examples

- [TCP Client](examples/tcpclient.js)
- [Geo TCP Service](examples/geo.js)
- [HTTP Client](examples/httpclient.js)
- [Simple HTTP Server](examples/httpserver.js)
- [Express Session](examples/session.js)
