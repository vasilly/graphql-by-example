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

export default App;
```
