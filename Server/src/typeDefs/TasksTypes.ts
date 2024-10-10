export const typeDefs = `#graphql
  type Category{
    name: String
    icon: String
    color: String
  }
  type Task {
    id: ID!
    userId: Int!
    title: String!
    description: String!
    date: String!
    Category: Category!
    priority: Int!
    status: Boolean!
  }
  type optionalTask{
    id: ID
    userId: Int
    title: String
    description: String
    date: String
    Category: Category
    priority: Int
    status: Boolean
  }
  type History{
    userId:Int
    operation: String
    previous: optionalTask
    new: optionalTask
    createdAt: String
  }
  type userDetails{
    name:String
    taskDone:Int
    taskLeft:Int
    link:String
  }
  type Query {
    userExist(
    name:String!
    password:String!): ID

    tasks(id:Int!): [Task]

    perticularTask(
    id: ID
    userId:Int!
    title:String
    description: String
    date: String
    CategoryName: String
    priority: Int): [Task]

    history(id:Int!): [History]

    userData(id:Int!): userDetails
  }
  type Mutation{
    addUser(
    name:String! 
    password:String!
    link:String!): ID

    addNewTask(
    title: String!
    userId: Int!
    description: String!
    date: String!
    CategoryName: String
    CategoryIcon:String
    CategoryColor:String
    priority: Int!): ID
    
    removeTask(id : ID!): String
      
    updateTask( 
    id: ID!
    title: String
    description: String
    date: String
    CategoryName: String
    CategoryIcon:String
    CategoryColor:String
    priority: Int
    status:Boolean) : String
  }
`;
