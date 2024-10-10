import { Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
function IconButtonText({ handleClick, showBorder, icon, title, isSelected, backgroundColor = "transparent", width = "100%", height = "auto" }) {
  const defaultstyles = { display: "flex", justifyContent: "center", alignItems: "center" };
  return (
    <TouchableOpacity onPress={handleClick} style={showBorder ? { ...defaultstyles, borderColor: "white", borderRadius: 10, borderWidth: 1 } : defaultstyles}>
      <IconButton icon={isSelected ? icon : icon + "-outline"} iconColor="white" style={{ backgroundColor: backgroundColor, borderRadius: 5, width, height }} size={25} />
      <Text style={{ color: "white", fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
  );
}

export default IconButtonText;
