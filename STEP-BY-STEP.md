# GraphQL by Example


## Simple Server
---


### Folder structure

```
Graphql-by-example
├── STEP-BY-STEP.md
├── SUMMARY.md
└── hello-world-server
    ├── package.json
    └── server.js
```

### `/hello-world-server/package.json`

```js
{
  "name": "hello-world-server",
  "private": true
}
```

### `/hello-world-server/server.js`

```js
const bodyParser = require("body-parser");
const express    = require("express");
const cors       = require("cors");
const app        = express();

const port = 9000;

app.use(cors(), bodyParser.json());
app.listen(port, () => console.log(`Server running on port ${port}`));
```

### install

```sh
npm install   \
  express     \
  body-parser \
  cors
```

### run server

```sh
node server.js
```


## Add GraphQL server
---

### install

```sh
npm install             \
  graphql               \
  graphql-tools         \
  apollo-server-express
```

### Add GraphQL typeDefs

```
type Query {
  greeting: String
}
```

### `/hello-world-server/server.js`

```js
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema }            = require("graphql-tools");

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

app.use('/graphql', graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
```

### run server

`graphql-by-example/hello-world-server`
```sh
node server.js
```

### [GraphQL GUI](http://localhost:9000/graphiql)


## Add GraphQL client
---

`graphql-by-example/hello-world-server`
```sh
npx create-react-app hello-world-client
```

`graphql-by-example/hello-world-client/src/App.js`

```js
async function loadGreeting() {
  const response = await fetch("http://localhost:9000/graphql?", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "{greeting}" })
  });
  const responseBody = await response.json();
  return responseBody.data.greeting;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { greeting: "" };
    loadGreeting().then(greeting => {
      this.setState({
        greeting
      });
    });
  }
  render() {
    return   <h1 className="App-title">{this.state.greeting}</h1>
  }
}
```
