import fs from "fs";
import { history, task, user } from "./types.js";
import path from 'path'

const dataFilePath = path.join(__dirname, 'data.json');
const historyFilePath = path.join(__dirname, 'history.json');
const userFilePath = path.join(__dirname, 'user.json');

const dict = {
  readData() {
    try {
      const data = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(data).data;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  },
  writeData(updatedData: task[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ data: updatedData }, null, 2), "utf8");
    console.log("history added successfully.");
  },
  readHistory() {
    try {
      const data = fs.readFileSync(historyFilePath, "utf8");
      return JSON.parse(data).history;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  },
  writeHistory(updatedData: history[]) {
    fs.writeFileSync(historyFilePath, JSON.stringify({ history: updatedData }, null, 2), "utf8");
    console.log("Data added successfully.");
  },
  readUsers() {
    try {
      const data = fs.readFileSync(userFilePath, "utf8");
      return JSON.parse(data).data;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  },
  writeUsers(updatedData: user[]) {
    fs.writeFileSync(userFilePath, JSON.stringify({ data: updatedData }, null, 2), "utf8");
    console.log("user Data added successfully.");
  },
  areDatesEqual(date1: string, date2: string) {
    const convertedDate1 = new Date(date1);
    const convertedDate2 = new Date(date2);
    return (
      convertedDate1.getFullYear() === convertedDate2.getFullYear() &&
      convertedDate1.getMonth() === convertedDate2.getMonth() &&
      convertedDate1.getDate() === convertedDate2.getDate()
    );
  },
};
export default dict;