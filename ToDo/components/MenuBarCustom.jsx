import { View } from "react-native";
import IconButtonText from "./IconButtonText";
import { Avatar } from "react-native-paper";

function MenuBarCustom({ setPageNum, pageNum, showModal }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#363636",
        width: "100%",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        paddingBottom: 20,
      }}
    >
      <IconButtonText
        handleClick={() => {
          setPageNum(0);
        }}
        isSelected={pageNum == 0}
        icon={"home"}
        title={"Home"}
      />
      <IconButtonText
        handleClick={() => {
          setPageNum(1);
        }}
        isSelected={pageNum == 1}
        icon={"calendar"}
        title={"calendar"}
      />
      <Avatar.Icon
        onTouchStart={() => {
          if (pageNum == 2 || pageNum == 3) setPageNum(0);
          showModal();
        }}
        style={{ position: "relative", top: -30 }}
        icon="plus"
        size={64}
        iconColor="#8687E7"
      />
      <IconButtonText
        handleClick={() => {
          setPageNum(2);
        }}
        isSelected={pageNum == 2}
        icon={"clock"}
        title={"History"}
      />
      <IconButtonText
        handleClick={() => {
          setPageNum(3);
        }}
        isSelected={pageNum == 3}
        icon={"account"}
        title={"Profile"}
      />
    </View>
  );
}

export default MenuBarCustom;
