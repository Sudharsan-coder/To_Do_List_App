import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { categories } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from 'react-native-dotenv';

const client = new ApolloClient({
  uri: API_URL+"/graphql",
  cache: new InMemoryCache(),
});

const GET_TASKS = gql`
  query GetTasks($userId: Int!) {
    tasks(id: $userId) {
      date
      Category {
        color
        icon
        name
      }
      description
      id
      priority
      title
      status
    }
  }
`;
const GET_HISTORY = gql`
  query Query($userId: Int!) {
    history(id: $userId) {
      previous {
        id
        title
        description
        date
        Category {
          name
          icon
          color
        }
        priority
        status
      }
      createdAt
      operation
      new {
        Category {
          color
          icon
          name
        }
        date
        description
        id
        priority
        status
        title
      }
    }
  }
`;

const GET_Perticular_Task = gql`
  query query($id: ID, $userId: Int!, $title: String, $description: String, $date: String, $priority: Int, $categoryName: String) {
    perticularTask(id: $id, userId: $userId, title: $title, description: $description, date: $date, priority: $priority, CategoryName: $categoryName) {
      date
      Category {
        color
        icon
        name
      }
      description
      id
      priority
      title
      status
    }
  }
`;

const ADD_task = gql`
  mutation Mutation($title: String!, $userId: Int!, $description: String!, $date: String!, $priority: Int!, $categoryName: String, $categoryIcon: String, $categoryColor: String) {
    addNewTask(
      title: $title
      userId: $userId
      description: $description
      date: $date
      priority: $priority
      CategoryName: $categoryName
      CategoryIcon: $categoryIcon
      CategoryColor: $categoryColor
    )
  }
`;

export const Tasks = async () => {
  const userId = await AsyncStorage.getItem("userId");
  const id = Number(userId);
  const data = await client
    .query({ query: GET_TASKS, variables: { userId: id }, fetchPolicy: "no-cache" })
    .then((result) => result.data.tasks)
    .catch((ERR) => {
      console.log("error while getting task: ",ERR);
    });

  const modifiedItem = data?.map((item) => {
    let newItem = { ...item };
    const categoryIndex = categories.findIndex((category) => category.name == item.Category.name);
    newItem.Category = categoryIndex;
    newItem.date = new Date(newItem.date);
    delete newItem.__typename;
    return newItem;
  });
  return modifiedItem;
};
export const getHistory = async () => {
  const userId = await AsyncStorage.getItem("userId");
  const id = Number(userId);
  const data = await client
    .query({ query: GET_HISTORY, variables: { userId: id }, fetchPolicy: "no-cache" })
    .then((result) => result.data.history)
    .catch((ERR) => {
      console.log("error while getting history: ",ERR);
    });
  const modifiedItem = data?.map((item) => {
    let convertedItem, operation;
    if (item.operation == "create") {
      operation = "Created";
      convertedItem = item.new;
    } else if (item.operation == "update") {
      operation = "Updated";
      convertedItem = item.new;
    } else {
      operation = "Deleted";
      convertedItem = item.previous;
    }
    const categoryIndex = categories.findIndex((category) => category.name == convertedItem.Category.name);
    convertedItem.Category = categoryIndex;
    convertedItem.date = new Date(convertedItem.date);
    delete convertedItem.__typename;
    return { operation: operation, createdAt: item.createdAt, data: convertedItem };
  });

  return modifiedItem == undefined ? [] : modifiedItem;
};

export const perticularTasks = async (data) => {
  const userId = await AsyncStorage.getItem("userId");
  const id = Number(userId);
  const inputs = {
    userId: id,
    ...(data.id == undefined || data.id == null ? undefined : { id: data.id }),
    ...(data.title == undefined || data.title == null ? undefined : { title: data.title }),
    ...(data.description == undefined || data.description == null ? undefined : { description: data.description }),
    ...(data.date == undefined || data.date == null ? undefined : { date: data.date }),
    ...(data.priority == undefined || data.priority == null ? undefined : { priority: data.priority }),
    ...(data.Category == undefined || data.Category == null
      ? undefined
      : {
          CategoryName: categories[data.Category].name,
        }),
  };
  const result = await client
    .query({ query: GET_Perticular_Task, variables: { ...inputs }, fetchPolicy: "no-cache" })
    .then((result) => result.data.perticularTask)
    .catch((ERR) => {
      console.log("error while getting perticular task: ",ERR);
    });
  const modifiedItem = result?.map((item) => {
    let newItem = { ...item };
    const categoryIndex = categories.findIndex((category) => category.name == item.Category.name);
    newItem.Category = categoryIndex;
    newItem.date = new Date(newItem.date);
    delete newItem.__typename;
    return newItem;
  });
  return modifiedItem == undefined ? [] : modifiedItem;
};

export const AddTask = async (data) => {
  const userId = await AsyncStorage.getItem("userId");
  const id = Number(userId);
  try {
    const result = await client
      .mutate({
        mutation: ADD_task,
        variables: {
          userId: id,
          title: data.title,
          description: data.description,
          date: data.date.toString(),
          priority: data.priority,
          categoryName: categories[data.Category].name,
          categoryIcon: categories[data.Category].icon,
          categoryColor: categories[data.Category].color,
        },
      })
      .then((res) => res).catch(err=>{console.log("error while adding task: ",err.message)});
    return result?.data?.addNewTask;
  } catch (error) {
    console.log("error while adding task: ",error);
  }
  return null;
};

export const EditTask = async (data) => {
  const Update_task = gql`
    mutation Update_task(
      $addNewTaskId: ID!
      $title: String
      $description: String
      $date: String
      $priority: Int
      $categoryName: String
      $categoryIcon: String
      $categoryColor: String
      $status: Boolean
    ) {
      updateTask(
        id: $addNewTaskId
        title: $title
        description: $description
        date: $date
        priority: $priority
        CategoryName: $categoryName
        CategoryIcon: $categoryIcon
        CategoryColor: $categoryColor
        status: $status
      )
    }
  `;

  const inputs = {
    addNewTaskId: data.id,
    ...(data.title == undefined || data.title == null ? undefined : { title: data.title }),
    ...(data.description == undefined || data.description == null ? undefined : { description: data.description }),
    ...(data.date == undefined || data.date == null ? undefined : { date: data.date }),
    ...(data.priority == undefined || data.priority == null ? undefined : { priority: data.priority }),
    ...(data.status == undefined || data.status == null ? undefined : { status: data.status }),
    ...(data.Category == undefined || data.Category == null
      ? undefined
      : {
          categoryName: categories[data.Category].name,
          categoryIcon: categories[data.Category].icon,
          categoryColor: categories[data.Category].color,
        }),
  };
 try {
    const result = await client
      .mutate({
        mutation: Update_task,
        variables: { ...inputs },
      })
      .then((res) => res)
      .catch((err) =>{console.log("gql error while editing task: ",err.message)});
  } catch (error) {
    console.log("error while editing task: ",error);
  }
};
export const removeTask = async (data) => {
  const delete_task = gql`
    mutation delete_task($Id: ID!) {
      removeTask(id: $Id)
    }
  `;
  try {
    const result = await client
      .mutate({
        mutation: delete_task,
        variables: { Id: data.id },
      })
      .then((res) => res)
      .catch((err) =>{console.log("gql error while deleting task: ",err.message)});
  } catch (error) {
    console.log("error while deleting task: ",error);
  }
};

export const addUser = async (name, password,url) => {
  const add_user = gql`
    mutation Signup($name: String!, $password: String!,$link:String!) {
      addUser(name: $name, password: $password,link:$link)
    }
  `;
  try {
    const userId = await client
      .mutate({ mutation: add_user, variables: { name: name, password: password ,link:url} })
      .then((res) => {
        return res.data.addUser;
      })
      .catch((err) => {
        console.log("gql error while adding user: ",err.message);
      });
    if (userId) {
      await AsyncStorage.setItem("userId", userId);
      return true;
    }
    return false;
  } catch (err) {
    console.log("error while adding user: ",err);
  }
};

export const findUser = async (name, password) => {
  const add_user = gql`
    query Login($name: String!, $password: String!) {
      userExist(name: $name, password: $password)
    }
  `;
  try {
    const userId = await client
      .mutate({ mutation: add_user, variables: { name: name, password: password } })
      .then((res) => {
        return res.data.userExist;
      })
      .catch((err) => {
        console.log("gql error while finding user: ",err.message);
      });
    if (userId) {
      await AsyncStorage.setItem("userId", userId);
      return true;
    }
    return false;
  } catch (err) {
    console.log("error while finding user: ",err);
  }
};
export const userDetails = async () => {
  const get_user_details = gql`
    query Query($Id: Int!) {
      userData(id: $Id) {
        name
        taskDone
        taskLeft
        link
      }
    }
  `;

  const userId = await AsyncStorage.getItem("userId");
  const id = Number(userId);

  try {
    const response = await client
      .query({ query: get_user_details, variables: { Id: id } , fetchPolicy: "no-cache"})
      .then((res) => {
        return res.data.userData;
      })
      .catch((err) => {
        console.log("gql error while getting user details: ",err.message);
      });
    return response
  } catch (err) {
    console.log("error while getting user details: ",err);
  }
};
