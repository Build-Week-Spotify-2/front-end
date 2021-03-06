import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios";
import formSchema from '../Validation/formSchema'
import * as Yup from 'yup'

const emptyUser = {
    email: "",
    password: ""
};

const initialFormErrors = {
    email: '',
    password: '',
}

const initialDisabled = true

const SignUp = props => {
    const { push } = useHistory();

    const [form, setForm] = useState(emptyUser);
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const handleChange = e => {
        const { name, value } = e.target;
        Yup 
        .reach(formSchema, name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,
                [name]: ""
            })
        })
        .catch(err => {
            setFormErrors({
                ...formErrors,
                [name]: err.errors[0]
            })
        })
        setForm({ ...form, [name]: value });
    }

    let createUser = newUser => {
        axios
        .post("https://spotify-suggestions-backend.herokuapp.com/auth/signup", newUser)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                push("/dashboard");
            })
            .catch(error => {
                console.log("Error", error)
            })
            .finally(() => {
                setForm(emptyUser);
            });

    }

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            email: form.email.trim(),
            password: form.password.trim()
        }
        createUser(newUser);

    }

    useEffect(() => {
        formSchema.isValid(form).then(valid => {
            setDisabled(!valid)
        })
    }, [form])

    const handleClick = e => {
        push("/login");
    }

    return (
        <div className="signin-div">

            <h2>Create an account!</h2>
            <div className="schemaErrors">
                <h4>{formErrors.email}</h4>
                <h4>{formErrors.password}</h4>
            </div>
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
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br />
                <button className="signup" disabled={disabled}>Sign up</button>
            </form>
            <div>
                <p>Already registered?</p>
                    <div className="login" onClick={handleClick}>Log in</div>
                
            </div>
        </div>
    )
}


export default SignUp;