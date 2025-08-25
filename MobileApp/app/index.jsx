import { Text, View } from "react-native";
import "../global.css";
import { Redirect, router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
    const verifyToken = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        router.replace("/home/homepage");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        router.replace("/auth/login");
      }
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  // const isloggedIn = false;

  // if (!isloggedIn) {
  //   return <Redirect href= "/auth/login" />;
  // }
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
