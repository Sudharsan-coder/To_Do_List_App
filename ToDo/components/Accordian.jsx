import {useState,useEffect} from "react";
import { List } from "react-native-paper";
import { ScrollView, View } from "react-native";
import TaskCard from "./TaskCard";

const Accordian = ({ data }) => {
  const [expanded, setExpanded] = useState([true, true]);
  const [completed, setCompleted] = useState([]);
  const [today, setToday] = useState([]);
  const handlePress = (index) => {
    expanded[index] = !expanded[index];
    setExpanded([...expanded]);
  };
  const setStatus = (id, changedStatus) => {
    if (changedStatus && id) {
      let changedItem = today.filter((item) => item.id == id)[0];
      changedItem.status = true;
      setToday(today.filter((item) => item.id != id));
      setCompleted([...completed, changedItem]);
    } else if (id) {
      let changedItem = completed.filter((item) => item.id == id)[0];
      changedItem.status = false;
      setCompleted(completed.filter((item) => item.id != id));
      setToday([...today, changedItem]);
    }
  };
  useEffect(() => {
    let completedTask = [],
      incompleteTask = [];
    data.forEach((item) => {
      if (item.status) completedTask.push(item);
      else incompleteTask.push(item);
    });
    setCompleted(completedTask);
    setToday(incompleteTask);
  }, [data]);
  return (
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
            return <TaskCard width="200%" key={item.id} data={item} setStatus={setStatus} />;
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
            return <TaskCard width="200%" key={item.id} data={item} setStatus={setStatus} />;
          })}
        </List.Accordion>
      </View>
    </ScrollView>
  );
};

export default Accordian;
