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
