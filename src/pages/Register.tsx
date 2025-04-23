import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUsernameExists } from "../api/api_getuser";
import { apiRegister } from "../api/api_regi";

function Register() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        if (username === '' || password === '') {
            alert('用户名和密码不能为空');
            return;
        }
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            alert('用户名已存在');
            return;
        } else {
            const res = await apiRegister(username, password);
            console.log(res);
            navigate('/login');
        }
    }
    return (
        <div className="flex justify-center items-center mt-10">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>

                <label className="label">User</label>
                <input type="text" className="input" placeholder="username"
                    value={username} onChange={(e) => { setUsername(e.target.value) }}
                />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password"
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                />

                <button className="btn btn-neutral mt-4" onClick={handleRegister}>Register</button>
            </fieldset>
        </div>
    );;
}
export default Register;
