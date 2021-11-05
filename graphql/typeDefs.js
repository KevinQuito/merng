// moved from index.js, developer experience - get used to separating things like these because when things like these
// get bigger, the more chaotic it will be

const { gql } = require('apollo-server');   // can import from apollo-server as well as graphql-tag since graphql-tag is a sub-dependency of that

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    # type : User below
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    # inside the type Query, we'll have all of our queries and set them up with what type they return
    type Query{
        sayHi: String! # an exclamation mark means it's required, it has to return a string, we can have it without it, but having it means we have more type safety
        # create a query for fetching all the posts
        # [Post] is a graphQL type
        getPosts: [Post]
    }
    # before creating the crud functionalities on our posts, like creating/editing/deleting posts, we first need to create ways for our users to authenticate, so let's register them
    type Mutation{
        register(registerInput: RegisterInput): User    # this will return a type : User
        login(username: String!, password: String!): User!
    }
`;