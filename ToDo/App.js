import { StyleSheet, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import Instruction from "./pages/Instruciton/Instructions";
import Logo from "./assets/TodoLogo.png";
import MenuBarCustom from "./components/MenuBarCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDetails } from "./services/Task";
//pages
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import History from "./pages/History/History";
import Calendar from "./pages/Calendar/Calendar";

export default function App() {
  const [loaded, setLoaded] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [instructed, setInstructed] = useState(false);
  const [instructionPageNum, setInstructionPageNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(() => {
    async function check() {
      try {
        const userIdAvaliable = await AsyncStorage.getItem("userId");

        if (userIdAvaliable != null) {
          setInstructed(true);
          const userData = await userDetails();
          setUserData(userData);
        }
      } catch (err) {}
    }
    check();
  }, [instructed]);
  const logout = async() => {
    await AsyncStorage.removeItem("userId")
    setInstructionPageNum(3);
    setInstructed(false);
  };
  const pages = [
    <Home visible={visible} hideModal={hideModal} userData={userData} />,
    <Calendar userData={userData} visible={visible} hideModal={hideModal} />,
    <History />,
    <Profile logout={logout} data={userData} />,
  ];
  const completedInstructions = () => {
    setInstructed(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, []);
  return (
    <PaperProvider>
      <View style={styles.container}>
        {loaded ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ zIndex: 100 }} source={Logo} />
          </View>
        ) : instructed ? (
          pages[pageNum]
        ) : (
          <Instruction completedInstructions={completedInstructions} initialPageNum={instructionPageNum} />
        )}
        {instructed && !loaded && <MenuBarCustom setPageNum={setPageNum} pageNum={pageNum} showModal={showModal} />}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "black",
  },
});
