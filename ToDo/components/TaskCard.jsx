import {  useState } from "react";
import { Button, RadioButton, Text, IconButton, Chip } from "react-native-paper";
import { View } from "react-native";
import SelectionModel from "./SelectionModel";
import { EditTask } from "../services/Task";
import { categories } from "../constants";
const TaskCard = ({ data, setStatus, width = "100%", deleteTask, tag }) => {
  const flags = [
    { icon: "flag", name: 1, color: "transparent" },
    { icon: "flag", name: 2, color: "transparent" },
    { icon: "flag", name: 3, color: "transparent" },
    { icon: "flag", name: 4, color: "transparent" },
    { icon: "flag", name: 5, color: "transparent" },
    { icon: "flag", name: 6, color: "transparent" },
    { icon: "flag", name: 7, color: "transparent" },
    { icon: "flag", name: 8, color: "transparent" },
    { icon: "flag", name: 9, color: "transparent" },
  ];

  const [checked, setChecked] = useState(data.status);
  const [category, setCategory] = useState(data.Category);
  const [categoryVisibility, setCategoryVisibility] = useState(false);
  const [flag, setFlag] = useState(data.priority);
  const [flagVisibility, setFlagVisibility] = useState(false);

  const UpdateDB = async (data) => {
    await EditTask(data);
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
  const changeCategory = (newCategory) => {
    data.Category = newCategory;
    UpdateDB({ id: data.id, Category: newCategory });
    setCategory(newCategory);
  };
  const changePriority = (newPriority) => {
    data.priority = newPriority+1;
    UpdateDB({ id: data.id, priority: newPriority + 1 });
    setFlag(newPriority+1);
  };
  const changeStatus = (newStatus) => {
    UpdateDB({ id: data.id, status: newStatus });
    setChecked(newStatus);
    if (setStatus) setStatus(data.id, newStatus);
  };
  return (
    <>
      <View
        style={{
          width: width,
          backgroundColor: "#363636",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 7,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <View style={{ gap: 1, width: "40%", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            status={checked ? "checked" : "unchecked"}
            uncheckedColor={"white"}
            color={categories[category].color}
            onPress={() => {
              if (tag == undefined) changeStatus(!checked);
            }}
          />
          <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <Text style={{ fontSize: 16, color: "white" }}>{data.title}</Text>
            <Text style={{ fontSize: 16, color: "white", width: "65%" }}>{data.description}</Text>
          </View>
        </View>
        <View style={{ gap: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {tag == undefined ? (
            <IconButton style={{ alignSelf: "flex-end", margin: 0 }} onPress={() => deleteTask(data.id, data.date)} icon="close" size={25} iconColor="white" />
          ) : (
            <Chip style={{ alignSelf: "flex-end" }}>{tag}</Chip>
          )}
          <View style={{ gap: 10, display: "flex", flexDirection: "row" }}>
            <Button
              disabled={tag != undefined}
              onPress={categoryShow}
              style={{ backgroundColor: categories[category].color, borderRadius: 10, borderWidth: 2 }}
              textColor="white"
              icon={categories[category].icon}
            >
              <Text style={{ fontWeight: 12, color: "white" }}>{categories[category].name}</Text>
            </Button>
            <Button disabled={tag != undefined} onPress={flagShow} style={{ borderWidth: 2, borderColor: "#8687E7", borderRadius: 10 }} textColor="white" icon="flag">
              <Text style={{ fontSize: 13, color: "white" }}>{flag}</Text>
            </Button>
          </View>
        </View>
      </View>
      {categoryVisibility && (
        <SelectionModel
          visible={categoryVisibility}
          hideModal={categoryHide}
          setValue={changeCategory}
          value={category}
          data={categories}
          title="Choose Category"
          buttonText="Add Category"
        />
      )}
      {<SelectionModel visible={flagVisibility} hideModal={flagHide} setValue={changePriority} value={flag} title="Choose Task Priority" data={flags} buttonText="select" />}
    </>
  );
};

export default TaskCard;
