const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const router = express.Router()

const Data = require('../Database/DataSchema');

const EntryType = new GraphQLObjectType({
  name: 'Entry',
  description: 'This represents an Entry',
  fields: () => ({
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    phone_number: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    zip_code: { type: GraphQLString },
    address: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: GraphQLString }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    entry: {
      type: EntryType,
      description: 'A Single Entry',
      args: {
        first_name: { type: GraphQLString }
      }
    },
    entries: {
      type: new GraphQLList(EntryType),
      description: 'List of All Entries',
      resolve: async () => {
        const data = await Data.find({});
        return data;
      }
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
})

module.exports =  async function graphqltojson(req, res, next) {
  console.log(req.client);
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
  next();
}

// router.post('/graphql', );

// module.exports = router;
