import { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addUser, findUser } from "../../services/Task";
function Login({ onSuccess }) {
  const textInputStyle = { color: "white", height: 10, borderColor: "white", borderWidth: 1, padding: 10 };
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const checkUser = async () => {
    const userExist = await findUser(name, password);
    if (userExist) onSuccess();
    else setShowValidationError(true);
  };
  const checkExistance = async () => {
    const validation = await addUser(name, password, url);
    if (validation) onSuccess();
    else setShowDuplicateError(true);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black", width: "100%", padding: 30, gap: 15, justifyContent: "center" }}>
      <View>
        <Text style={{ color: "white", marginBottom: 5 }}>User Name</Text>
        <TextInput
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
          placeholderTextColor="black"
          placeholder="User name"
          style={textInputStyle}
        >
          {/* {name} */}
        </TextInput>
      </View>
      <View>
        <Text style={{ color: "white", marginBottom: 5 }}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          placeholderTextColor="black"
          placeholder="Password"
          style={textInputStyle}
        ></TextInput>
      </View>
      {showValidationError && <Text style={{ color: "red" }}>Please check your user name and password</Text>}
      {showDuplicateError && <Text style={{ color: "red" }}>Please use different user name</Text>}
      {signUpClicked ? (
        <View>
          <Text style={{ color: "white", marginBottom: 5 }}>Image URL</Text>
          <TextInput
            value={url}
            onChangeText={(value) => {
              setUrl(value);
            }}
            placeholderTextColor="black"
            placeholder="Link"
            style={textInputStyle}
          ></TextInput>
        </View>
      ) : (
        <Button onPress={checkUser} mode="contained" style={{ borderRadius: 5 }}>
          Login
        </Button>
      )}
      {signUpClicked ? (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            onPress={() => {
              setSignUpClicked(false);
            }}
            style={{ width: "40%", borderRadius: 5, borderWidth: 2, borderColor: "gray" }}
          >
            Cancel
          </Button>
          <Button mode="contained" onPress={checkExistance} style={{ width: "40%", borderRadius: 5, borderWidth: 2, borderColor: "gray" }}>
            Done
          </Button>
        </View>
      ) : (
        <Button
          onPress={() => {
            setSignUpClicked(true);
          }}
          style={{ borderRadius: 5, borderWidth: 2, borderColor: "gray" }}
        >
          SignUp
        </Button>
      )}
    </View>
  );
}

export default Login;
