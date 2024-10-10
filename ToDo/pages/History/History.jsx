import { useState, useEffect } from "react";
import { Text, ScrollView, View } from "react-native";
import TaskCard from "../../components/TaskCard";
import { getHistory } from "../../services/Task";
import Informations from "../../components/Informations";
import HomeSVG from "../../assets/HomeTask.png";
function History() {
  const [data, setData] = useState([]);
  const formatDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  function formatToAMPM(dateInput) {
    const date = new Date(dateInput);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getHistory();
        setData(data.reverse());
      } catch (err) {
        console.log("error getting history: ", err);
      }
    };
    getData();
  }, []);
  const frequency = new Map();
  return (
    <>
      {data.length == 0 ? (
        <Informations image={HomeSVG} title="Sorry you don't have any history" description="Tap + to add your tasks" />
      ) : (
        <ScrollView style={{ marginBottom: "25%", height: "100%", padding: 5 }}>
          {data.map((item, index) => {
            const date = formatDate(new Date(item.createdAt));
            if (frequency.has(date))
              return (
                <View key={index} style={{ marginTop: 5 }}>
                  <Text style={{ color: "white" }}>{formatToAMPM(item.createdAt)}</Text>
                  <TaskCard key={index} data={item.data} tag={item.operation} />
                </View>
              );
            else frequency.set(date, 1);
            return (
              <View key={index} style={{ marginTop: 10 }}>
                <Text style={{ color: "white", textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{date}</Text>
                <Text style={{ color: "white" }}>{formatToAMPM(item.createdAt)}</Text>
                <TaskCard key={index} data={item.data} tag={item.operation} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

export default History;
