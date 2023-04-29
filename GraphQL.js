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
const app = express()


const fs = require('fs');
const personData = fs.readFileSync('./Final_data.json', 'utf8');
const entries = JSON.parse(personData);

const EntryType = new GraphQLObjectType({
  name: 'Entry',
  description: 'This represents an Entry',
  fields: () => ({
    first_name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
    phone_number: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLNonNull(GraphQLString) },
    zip_code: { type: GraphQLString},
    address: { type: GraphQLNonNull(GraphQLString) },
    gender:{ type: GraphQLNonNull(GraphQLString) },
    state:{ type: GraphQLString }
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
      resolve: () => entries
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))