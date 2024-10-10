import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs/TasksTypes.js";
import { resolvers } from "./resolvers/TaskResolvers.js";
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cors: {
    //   origin: 'https://your-frontend-domain.com', // Replace with your client's domain
    //   methods: 'GET,POST',
    // },
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
