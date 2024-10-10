import { useState } from "react";
import { Modal, Text, IconButton } from "react-native-paper";
import { TextInput, View } from "react-native";
import SelectionModel from "./SelectionModel";
import { Calendar } from "react-native-calendars";
import { categories,flags } from "../constants";
const Model = ({ visible, hideModal, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState(0);
  const [categoryVisibility, setCategoryVisibility] = useState(false);
  const [flag, setFlag] = useState(0);
  const [flagVisibility, setFlagVisibility] = useState(false);

  const calendarShow = () => {
    setCalendarVisibility(true);
  };
  const calendarHide = () => {
    setCalendarVisibility(false);
  };
  const categoryShow = () => {
    setCategoryVisibility(true);
  };
  const categoryHide = () => {
    setCategoryVisibility(false);
  };
  const flagShow = () => {
    setFlagVisibility(true);
  };
  const flagHide = () => {
    setFlagVisibility(false);
  };
  const closeModel = () => {
    hideModal();
    setFlagVisibility(false);
    setCategoryVisibility(false);
    setCalendarVisibility(false);
  };
  const containerStyle = { backgroundColor: "black", padding: 30, borderRadius: 10, display: "flex", gap: 20 };
  const textInputStyle = { color: "white", borderColor: "white", borderWidth: 1, padding: 10 };
  return (
    <Modal visible={visible} onDismiss={closeModel} contentContainerStyle={containerStyle}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Add Task</Text>
      <TextInput onChangeText={setTitle} placeholderTextColor="white" placeholder="task name" style={textInputStyle}>
        {title}
      </TextInput>
      <TextInput onChangeText={setDescription} placeholderTextColor="white" placeholder="Description" style={textInputStyle}>
        {description}
      </TextInput>
      <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <IconButton onPress={calendarShow} iconColor="white" icon="clock-outline" />
          <IconButton onPress={categoryShow} iconColor="white" icon="tag-outline" />
          <IconButton onPress={flagShow} iconColor="white" icon="flag-outline" />
        </View>
        <IconButton
          onPress={() => {
            addTask(title, description, selectedDate, category, flag + 1);
            closeModel();
          }}
          iconColor="#8687E7"
          icon="send-outline"
        />
      </View>
      {categoryVisibility && (
        <SelectionModel
          visible={categoryVisibility}
          hideModal={categoryHide}
          setValue={setCategory}
          value={category}
          data={categories}
          title="Choose Category"
          buttonText="Add Category"
        />
      )}
      {<SelectionModel visible={flagVisibility} hideModal={flagHide} setValue={setFlag} value={flag} title="Choose Task Priority" data={flags} buttonText="select" />}
      <Modal visible={calendarVisibility} hideModal={calendarHide} style={{ width: "90%", marginLeft: "5%" }}>
        <Calendar
          theme={{
            calendarBackground: "#000000",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ce2121",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#494646",
          }}
          onDayPress={(day) => {
            setSelectedDate(new Date(day.dateString));
            calendarHide();
          }}
        />
      </Modal>
    </Modal>
  );
};

export default Model;
