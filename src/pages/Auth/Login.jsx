import { useState } from "react";
import { useCookies } from 'react-cookie';
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/context";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const HandelSubmit = (e) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "email": email,
            "password": password
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`https://ass3-store-server.onrender.com/auth/login`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.accessToken) {
                    let expires = new Date();
                    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // Thêm 1 ngày tính bằng mili giây
                    setCookie('token', result.accessToken, { path: '/', expires });
                    navigate('/');
                }
            })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        if (user.isRole === 'admin') {
            navigate('/');
        }
    }, [user])
    return (
        <div className="form-container">
            <div className="form">
                <h3>Login Admin</h3>
                <input type="text" placeholder="Enter your Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your Password" onChange={e => setPassword(e.target.value)} />
                <div className="form-control1">
                    {user.auth === true && user.isRole !== 'admin' && <p className="error">Ban khong co quyen Admin</p>}
                </div>
                <button type="submit" className="form-btn" onClick={() => HandelSubmit()}>Login Now</button>

            </div>
        </div>
    );
};

export default Login;
