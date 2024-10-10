import { View, Text, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";

function Profile({ logout, data }) {
  return (
    <View style={{ display: "flex", height: "90%", justifyContent: "center", alignItems: "center", gap: 15 }}>
      <Button style={{ position: "absolute", top: 15, right: 15, borderWidth: 2, borderRadius: 5 }} onPress={logout}>
        <Text style={{ fontSize: 20 }}>Log Out</Text>
      </Button>
      <Text style={{ color: "white", fontSize: 30 }}>Profile</Text>
      {data?.link ? <Image source={{ uri: data.link }} style={{ width: 100, height: 100, borderRadius: 100 }} /> : <Avatar.Icon size={100} icon="account" />}
      <Text style={{ color: "white", fontSize: 25 }}>{data.name}</Text>

      <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <View style={{ borderRadius: 10, backgroundColor: "#414040", padding: 20, paddingLeft: 30, paddingRight: 30 }}>
          <Text style={{ color: "white", fontSize: 15 }}>{data.taskDone} Task done</Text>
        </View>
        <View style={{ borderRadius: 10, backgroundColor: "#414040", padding: 20, paddingLeft: 30, paddingRight: 30 }}>
          <Text style={{ color: "white", fontSize: 15 }}>{data.taskLeft} Task left</Text>
        </View>
      </View>
    </View>
  );
}

export default Profile;
