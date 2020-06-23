import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios";
import axiosWithAuth from "../util/axiosWithAuth";

const emptyUser = {
    email: "",
    password: ""
};

const SignIn = props => {
    const { push } = useHistory();

    const [form, setForm] = useState(emptyUser);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    let loginUser = existingUser => {
        axios
            .post("https://spotify-suggestions-backend.herokuapp.com/auth/login", existingUser)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                push("/dashboard");
            })
            .catch(error => {
                console.log("Error", error.response)
            })
            .finally(() => {
                setForm(emptyUser);
            });

    }

    const handleSubmit = e => {
        e.preventDefault();
        const existingUser = {
            email: form.email.trim(),
            password: form.password.trim()
        }
        loginUser(existingUser);

    }

    const handleClick = e => {
        push("/");
    }

    return (
        <div className="signin-div">

            <h2>Welcome back! Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br />
                <button className="signup">Log in</button>
            </form>
            <div>
                <p>New here?
                    <div className="login" onClick={handleClick}>Sign up</div>
                </p>
            </div>
        </div>
    )
}


export default SignIn;