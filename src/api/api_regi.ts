import axios from "axios";
import { checkUsernameExists } from "./api_getuser";

export const apiRegister = async (username: string, password: string) => {
  // 模拟注册请求
  try {
    const response = await axios.post("http://localhost:3001/users", {
      username,
      password,
      token: "fake-token",
    });

    const users = response.data;
    console.log("users:",users);
    const res = await checkUsernameExists(username);
    if (res) {
      alert("注册成功"); 
    }

   
  } catch (error) {
    console.error("注册错误:", error);
    alert("网络错误，请重试");
  }
};
