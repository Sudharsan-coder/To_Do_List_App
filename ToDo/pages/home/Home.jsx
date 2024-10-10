import { useState, useEffect } from "react";
import TaskHome from "./Varients/TaskHome";
import { Avatar, RadioButton, ToggleButton } from "react-native-paper";
import { Modal, View, Text, Image } from "react-native";
import NoTaskHome from "./Varients/NoTaskHome";
import TaskModel from "../../components/TaskModel";
import { AddTask, perticularTasks, removeTask } from "../../services/Task";

function Home({ visible, hideModal, userData }) {
  const [taskData, setTaskData] = useState([]);
  const [sortByIndex, setSortByIndex] = useState(0);
  const [sortVisibility, setSortVisibility] = useState(false);

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
      if (id) {
        newData.id = Number(id);
        setTaskData((pre) => [...pre, newData]);
        if (newData.status) {
          userData.taskDone++;
        } else {
          userData.taskLeft++;
        }
      }
    } catch (er) {
      console.log("error adding task: ", er);
    }
  };
  const deleteTask = async (id) => {
    try {
      await removeTask({ id: id + "" });
      let status;
      const removedList = taskData.filter((item) => {
        if (item.id == id) {
          status = item.status;
        }
        return item.id != id;
      });
      if (status) userData.taskDone--;
      else userData.taskLeft--;
      setTaskData([...removedList]);
    } catch (er) {
      console.log("error deleting task: ", er);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const temp = await perticularTasks({ date: new Date().toString() });
        setTaskData(temp);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTaskData([]);
      }
    };
    getData();
  }, []);
  return (
    <>
      <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 }}>
        <ToggleButton onPress={() => setSortVisibility(true)} icon="filter-variant" size={42} iconColor="white" />
        <Text style={{ color: "white", fontSize: 20 }}>Index</Text>
        {userData.link ? <Image source={{ uri: userData.link }} style={{ width: 42, height: 42, borderRadius: 100 }} /> : <Avatar.Icon size={42} icon="account" />}
      </View>

      {taskData.length != 0 ? <TaskHome userData={userData} taskData={taskData} sortByIndex={sortByIndex} deleteTask={deleteTask} /> : <NoTaskHome />}
      {visible && <TaskModel visible={visible} hideModal={hideModal} addTask={addTask} />}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sortVisibility}
        onRequestClose={() => {
          setSortVisibility(false);
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "white", padding: 10 }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              status={sortByIndex == 0 ? "checked" : "unchecked"}
              onPress={() => {
                setSortByIndex(0);
                setSortVisibility(false);
              }}
            />
            <Text>Creation Order</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              status={sortByIndex == 1 ? "checked" : "unchecked"}
              onPress={() => {
                setSortByIndex(1);
                setSortVisibility(false);
              }}
            />
            <Text>Category</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              status={sortByIndex == 2 ? "checked" : "unchecked"}
              onPress={() => {
                setSortByIndex(2);
                setSortVisibility(false);
              }}
            />
            <Text>Priority</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Home;
