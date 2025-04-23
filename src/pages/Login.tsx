import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActionsAtom } from "../store/store";

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const [, userActions] = useAtom(userActionsAtom); // 解构出 userActions 函数
    const handleLogin = async () => {
        try {
            // 模拟登录请求
            const response = await fetch('http://localhost:3001/users?username=' + username + '&password=' + password);

            if (!response.ok) {
                throw new Error('登录失败');
            }

            const users = await response.json();

            if (users.length > 0) {
                console.log('登录成功，模拟返回 token');
                const user = users[0];
                userActions('login', user); // 使用原子操作更新全局状态
                navigate('/');
            } else {
                alert('用户名或密码错误');
            }
        } catch (error) {
            console.error('登录错误:', error);
            alert('网络错误，请重试');
        }
    }
    return (
        <div className="flex justify-center items-center mt-10">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">User</label>
                <input type="text" className="input" placeholder="username"
                    value={username} onChange={(e) => { setUsername(e.target.value) }}
                />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password"
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                />

                <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
                <button className="btn btn-neutral mt-4" onClick={()=>navigate('/register')}>Register</button>
            </fieldset>
        </div>
    );
}
export default Login;
