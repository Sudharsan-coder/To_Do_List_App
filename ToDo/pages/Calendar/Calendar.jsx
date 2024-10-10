import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import TaskCard from "../../components/TaskCard";
import TaskModel from "../../components/TaskModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tasks, AddTask, removeTask } from "../../services/Task";
function Calendar({ visible, hideModal, userData }) {
  const [item, setItem] = useState({});
  const formatDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("calendar data loaded");
        const userId = await AsyncStorage.getItem("userId");

        const data = await Tasks(Number(userId));
        if (data) {
          const currentItems = {};
          data.forEach((item) => {
            const formattedDate = formatDate(item.date);
            currentItems[formattedDate] = currentItems[formattedDate] || [];
            currentItems[formattedDate].push(item);
          });
          setItem(currentItems);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getData();
  }, []);
  const statusChanged = (id, changedStatus) => {
    if (changedStatus) {
      userData.taskDone++;
      userData.taskLeft--;
    } else {
      userData.taskDone--;
      userData.taskLeft++;
    }
  };
  const addTask = async (title, description, date, Category, priority) => {
    const newData = {
      title,
      description,
      date,
      Category,
      priority,
      status: false,
    };
    try {
      const id = await AddTask(newData);
      const formattedDate = formatDate(newData.date);
      if (newData.status) userData.taskDone++;
      else userData.taskLeft++;
      if (id) {
        newData.id = Number(id);
        setItem((prevItems) => {
          const updatedItems = { ...prevItems }; // Create a shallow copy of the previous state
          updatedItems[formattedDate] = updatedItems[formattedDate] || [];
          updatedItems[formattedDate].push(newData); // Add the new task to the array
          return updatedItems; // Return the new state object
        });
      }
    } catch (er) {
      console.log("error calendar adding task: ", er);
    }
  };
  const deleteTask = async (id, date) => {
    try {
      await removeTask({ id: id + "" });
      let status;
      const arr = item[date].filter((item) => {
        if (item.id == id) {
          status = item.status;
          return false;
        }
        return true;
      });
      item[date] = [...arr];
      setItem({ ...item });
      if (status) {
        userData.taskDone--;
      } else {
        userData.taskLeft--;
      }
    } catch (er) {
      console.log("error calendar deleting task: ", er);
    }
  };

  return (
    <>
      <Agenda
        style={{ width: "100%" }}
        theme={{
          calendarBackground: "#363636",
          dayTextColor: "white",
          reservationsBackgroundColor: "black",
          agendaTodayColor: "white",
          monthTextColor: "white",
        }}
        items={item}
        renderItem={(item, index) => {
          item = { ...item, date: formatDate(item.date) };
          return <TaskCard setStatus={statusChanged} key={index} data={item} deleteTask={deleteTask} />;
        }}
        renderEmptyData={() => {
          return (
            <View style={{ padding: 20 }}>
              <Text style={{ color: "white" }}>No Task is avaliable on this day</Text>
            </View>
          );
        }}
      ></Agenda>
      {visible && <TaskModel visible={visible} hideModal={hideModal} addTask={addTask} />}
    </>
  );
}

export default Calendar;
