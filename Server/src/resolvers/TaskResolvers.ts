import { taskFilter, task, newTask, history, user } from "../types.js";
import utils from "../utils.js";
let tasksData: task[] = utils.readData();
let historyData: history[] = utils.readHistory();
let users: user[] = utils.readUsers();
export const resolvers = {
  Query: {
    userExist: (parent: any, arg: { name: string; password: string }) => {
      const currentUser = users.filter((item) => item.name === arg.name && item.password === arg.password);
      return currentUser.length != 0 ? currentUser[0].id : null;
    },
    tasks: (parent: any, arg: { id: number }) => {
      return tasksData.filter((item) => item.userId == arg.id);
    },
    history: (parent: any, arg: { id: number }) => {
      console.log(arg);
      return historyData.filter((item) => item.userId == arg.id);
    },
    perticularTask: (_parent: any, arg: taskFilter) => {
      const condition = (item: task) => {
        if (arg.userId != item.userId) return false;
        if (arg.id && item.id != arg.id) return false;
        if (arg.date && !utils.areDatesEqual(item.date, arg.date)) return false;
        if (arg.CategoryName && item.Category.name !== arg.CategoryName) return false;
        if (arg.description && item.description !== arg.description) return false;
        if (arg.title && item.title !== arg.title) return false;
        if (arg.priority && item.priority !== arg.priority) return false;
        return true;
      };
      return tasksData.filter((item) => {
        return condition(item);
      });
    },
    userData: (parent: any, arg: { id: Number }) => {
      let done = 0,
        left = 0;
      tasksData.forEach((item) => {
        if (item.userId == arg.id) {
          if (item.status) done++;
          else left++;
        }
      });
      const currentUser = users.filter((item) => item.id == arg.id)[0];
      return { name: currentUser.name, link: currentUser.link, taskDone: done, taskLeft: left };
    },
  },
  Mutation: {
    addUser: (parent: any, arg: { name: string; password: string; link: string }) => {
      console.log(arg);
      const id = users.length + 1;
      const alreadyExist = users.some((item) => item.name == arg.name);
      if (alreadyExist) return null;
      users.push({ ...arg, id });
      utils.writeUsers(users);
      return id + "";
    },
    addNewTask: (parent: any, arg: newTask) => {
      console.log(arg);
      let newdata: task = {
        id: tasksData.length + 1 + "",
        userId: arg.userId,
        title: arg.title,
        description: arg.description,
        date: arg.date,
        Category: {
          name: arg?.CategoryName ?? "Home",
          icon: arg?.CategoryIcon ?? "home",
          color: arg?.CategoryColor ?? "green",
        },
        priority: arg.priority,
        status: false,
      };
      historyData.push({ userId: arg.userId, operation: "create", previous: {}, new: newdata, createdAt: new Date().toString() });
      utils.writeHistory(historyData);
      tasksData.push(newdata);
      utils.writeData(tasksData);
      return newdata.id;
    },
    removeTask: (parent: any, arg: { id: "String" }) => {
      let removed = false;
      utils.writeData(
        tasksData.filter((item) => {
          if (item.id == arg.id) {
            removed = true;
            historyData.push({ userId: item.userId, operation: "delete", previous: item, new: {}, createdAt: new Date().toString() });
            utils.writeHistory(historyData);
          }
          return item.id != arg.id;
        })
      );
      return removed ? "Task removed" : `No task found with the id ${arg.id}`;
    },
    updateTask: (parent: any, input: newTask) => {
      const currentItem = tasksData.filter((item) => item.id == input.id)[0];
      const previousItem = { ...currentItem };
      if (input.title != undefined) currentItem.title = input.title;
      if (input.description != undefined) currentItem.description = input.description;
      if (input.date != undefined) currentItem.date = input.date;
      if (input.priority != undefined) currentItem.priority = input.priority;
      if (input.status != undefined) currentItem.status = input.status;

      if (input.CategoryName) {
        currentItem.Category = {
          name: input.CategoryName,
          icon: input.CategoryIcon,
          color: input.CategoryColor,
        };
      }
      console.log(currentItem);
      historyData.push({ userId: currentItem.userId, operation: "update", previous: previousItem, new: currentItem, createdAt: new Date().toString() });
      utils.writeHistory(historyData);
      utils.writeData(tasksData);
      return "updated";
    },
  },
};
