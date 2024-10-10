import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Step1 from "../../assets/step1.png";
import Step2 from "../../assets/step2.png";
import Step3 from "../../assets/step3.png";
import Informations from "../../components/Informations.jsx";
import Login from "../Profile/Login.jsx";
function Instructions({ completedInstructions, initialPageNum }) {
  const [selectedIndex, setSelectedIndex] = useState(initialPageNum);
  const data = [
    <Informations image={Step1} title="Manage your tasks" description="You can easily manage all of your daily tasks in DoMe for free" />,
    <Informations image={Step2} title="Create daily routine" description="In Uptodo  you can create your personalized routine to stay productive" />,
    <Informations image={Step3} title="Organize your tasks" description="You can organize your daily tasks by adding your tasks into separate categories" />,
    <Login onSuccess={completedInstructions} />,
  ];
  return (
    <View style={{ flex: 1, width: "100%", paddingBottom: 10 }}>
      {selectedIndex != data?.length - 1 && (
        <Button
          onPress={() => {
            setSelectedIndex(3);
          }}
          style={{ borderRadius: 5, width: "30%" }}
          textColor="white"
          mode="text"
        >
          SKIP
        </Button>
      )}
      {data[selectedIndex]}
      <View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
          <Button
            onPress={() => {
              setSelectedIndex(selectedIndex - 1);
            }}
            style={{ width: "30%" }}
            disabled={selectedIndex == 0}
            textColor="white"
            mode="text"
          >
            BACK
          </Button>
          {selectedIndex != data?.length - 1 && (
            <Button
              onPress={() => {
                selectedIndex + 1 == data?.length ? completedInstructions() : setSelectedIndex(selectedIndex + 1);
              }}
              style={{ borderRadius: 5, width: "30%" }}
              mode="contained"
            >
              NEXT
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

export default Instructions;
