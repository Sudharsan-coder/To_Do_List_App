import React from "react";
import Informations from "../../../components/Informations";
import HomeSVG from "../../../assets/HomeTask.png";
import { View } from "react-native";
function NoTaskHome() {
  return (
    <View style={{backgroundColor:"black",height:"100%"}}>
      <Informations image={HomeSVG} title="What do you want to do today?" description="Tap + to add your tasks" />
    </View>
  );
}

export default NoTaskHome;
