import { useState } from "react";
import { Button, Divider } from "react-native-paper";
import { Text, View, Modal } from "react-native";
import IconButtonText from "./IconButtonText";

function CategoryModel({ visible, hideModal, setValue, title, data, value: selectedIndex }) {
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(selectedIndex-1);

  const containerStyle = { backgroundColor: "#363636", padding: 15, marginLeft: "5%", width: "90%", borderRadius: 10, display: "flex" };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={hideModal}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
        <View style={containerStyle}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>{title}</Text>
          <Divider bold={true} />
          <View style={{ display: "flex", flexDirection: "row", columnGap: 30, flexWrap: "wrap", justifyContent: "center" }}>
            {data.length > 0 &&
              data.map((item, index) => (
                <IconButtonText
                  handleClick={() => {
                    setCurrentSelectedIndex(index);
                  }}
                  showBorder={index == currentSelectedIndex}
                  key={index}
                  title={item.name}
                  icon={item.icon}
                  backgroundColor={item.color}
                  width={64}
                  height={64}
                />
              ))}
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button
              style={{ borderRadius: 5, marginTop: 10, marginBottom: 10 }}
              onPress={() => {
                hideModal();
                setCurrentSelectedIndex(selectedIndex);
              }}
              mode="contained"
            >
              Cancel
            </Button>
            <Button
              style={{ borderRadius: 5, marginTop: 10, marginBottom: 10 }}
              onPress={() => {
                setValue(currentSelectedIndex);
                hideModal();
              }}
              mode="contained"
            >
              Select
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CategoryModel;
