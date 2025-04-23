import axios from "axios";

export const checkUsernameExists = async (username: string) => {
  // 检查用户名是否已存在
  try {
    const response = await axios.get("http://localhost:3001/users", {
      params: { username },
    });
    const users = response.data;
    return users.length > 0; // 如果存在用户，返回 true，否则返回 false
  } catch (error) {
    console.error("Error checking username existence:", error);
    return;
  }
};
