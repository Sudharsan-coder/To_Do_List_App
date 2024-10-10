import { useState, useEffect } from "react";
import { Searchbar, List } from "react-native-paper";
import { ScrollView, View } from "react-native";
import TaskCard from "../../../components/TaskCard";

function TaskHome({ taskData, sortByIndex, deleteTask, userData }) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(taskData);
  const getdata = () => {
    if (searchText.length == 0) return taskData;
    else return taskData?.filter((item) => item.title?.toLowerCase().startsWith(searchText.toLowerCase()));
  };
  useEffect(() => {
    setData(getdata());
  }, [searchText]);

  useEffect(() => {
    setData(taskData);
  }, [taskData]);

  const [expanded, setExpanded] = useState([true, true]);
  const [completed, setCompleted] = useState([]);
  const [today, setToday] = useState([]);
  const handlePress = (index) => {
    expanded[index] = !expanded[index];
    setExpanded([...expanded]);
  };
  const setStatus = (id, changedStatus) => {
    if (changedStatus && id) {
      userData.taskDone++;
      userData.taskLeft--;
      let changedItem = today.filter((item) => item.id == id)[0];
      changedItem.status = true;
      setToday(today.filter((item) => item.id != id));
      completed.push(changedItem);
      if (sortByIndex == 0) completed.sort((a, b) => a.date - b.date);
      else if (sortByIndex == 1) completed.sort((a, b) => a.Category - b.Category);
      else completed.sort((a, b) => a.priority - b.priority);
      setCompleted([...completed]);
    } else if (id) {
      userData.taskDone--;
      userData.taskLeft++;
      let changedItem = completed.filter((item) => item.id == id)[0];
      changedItem.status = false;
      setCompleted(completed.filter((item) => item.id != id));
      today.push(changedItem);
      if (sortByIndex == 0) today.sort((a, b) => a.date - b.date);
      else if (sortByIndex == 1) today.sort((a, b) => a.Category - b.Category);
      else today.sort((a, b) => a.priority - b.priority);
      setToday([...today]);
    }
  };
  useEffect(() => {
    let completedTask = [],
      incompleteTask = [];
    data.forEach((item) => {
      if (item.status) completedTask.push(item);
      else incompleteTask.push(item);
    });
    if (sortByIndex == 0) {
      completedTask.sort((a, b) => a.date - b.date);
      incompleteTask.sort((a, b) => a.date - b.date);
    } else if (sortByIndex == 1) {
      completedTask.sort((a, b) => a.Category - b.Category);
      incompleteTask.sort((a, b) => a.Category - b.Category);
    } else {
      completedTask.sort((a, b) => a.priority - b.priority);
      incompleteTask.sort((a, b) => a.priority - b.priority);
    }
    setCompleted(completedTask);
    setToday(incompleteTask);
  }, [sortByIndex, data]);

  return (
    <View style={{ backgroundColor: "black", height: "100%", width: "100%", padding: 20 }}>
      <Searchbar
        onChangeText={setSearchText}
        value={searchText}
        style={{ backgroundColor: "#1D1D1D", borderRadius: 10, borderWidth: 1, borderColor: "white" }}
        placeholderTextColor="white"
        placeholder="Search for your task..."
      />
      <ScrollView style={{ marginBottom: "30%", height: "100%" }}>
        <View style={{ width: "50%", marginTop: 10 }}>
          <List.Accordion
            title="Today"
            theme={{ colors: { background: "transparent" } }}
            style={{ backgroundColor: "#363636", borderRadius: 10, marginTop: 10 }}
            titleStyle={{ color: "white", fontSize: 18 }}
            expanded={expanded[0]}
            onPress={() => handlePress(0)}
          >
            {today.map((item) => {
              return <TaskCard width="200%" key={item.id} data={item} setStatus={setStatus} deleteTask={deleteTask} />;
            })}
          </List.Accordion>

          <List.Accordion
            title="Completed"
            theme={{ colors: { background: "transparent" } }}
            style={{ backgroundColor: "#363636", borderRadius: 10, marginTop: 10 }}
            titleStyle={{ color: "white", fontSize: 18 }}
            expanded={expanded[1]}
            onPress={() => handlePress(1)}
          >
            {completed.map((item, index) => {
              return <TaskCard width="200%" key={item.id} data={item} setStatus={setStatus} deleteTask={deleteTask} />;
            })}
          </List.Accordion>
        </View>
      </ScrollView>
    </View>
  );
}

export default TaskHome;
