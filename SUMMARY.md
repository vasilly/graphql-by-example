# GraphQL by Example

## Folder structure

```
Graphql-by-example
├── STEP-BY-STEP.md
├── SUMMARY.md
└── hello-world-server
    ├── package.json
    └── server.js
```

## `/hello-world-server/package.json`

```js
{
  "name"   : "hello-world-server",
  "private": true
}
```

## `/hello-world-server/server.js`

```js
const bodyParser = require("body-parser");
const express    = require("express");
const cors       = require("cors");
const app        = express();

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema }            = require("graphql-tools");

const port = 9000;

const typeDefs = `
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello World!"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());
app.use('/graphql', graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(port, () => console.log(`Server running on port ${port}`));
```

## install

```sh
npm install             \
  express               \
  body-parser           \
  cors                  \
  graphql               \
  graphql-tools         \
  apollo-server-express
```

## run server

```sh
node server.js
```


Open [GraphQL GUI](http://localhost:9000/graphiql)
