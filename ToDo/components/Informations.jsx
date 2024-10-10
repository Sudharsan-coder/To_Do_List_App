import { View, Text, Image } from "react-native";

function Informations({ image, title, description }) {
  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 50, width: "80%", alignSelf: "center" }}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Image source={image} style={{ height: 300, objectFit: "fill" }}></Image>
      </View>
      <View style={{ display: "flex", justifyContent: "center" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "white", textAlign: "center" }}>{title}</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>{description}</Text>
      </View>
    </View>
  );
}

export default Informations;
