import { useState,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ApplicationLogo from "./logo";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export  const Login = (props) =>  {

    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');

    const submitHandler = (event) =>{
        event.preventDefault()

        setLoading(true);
        setMessage("");

        AuthService.login(username, password).then(
            () => {
                props.history.push("/home");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );

    }

    return (
            <div className="col-md-12">
                <div className="card card-container">
                    <ApplicationLogo></ApplicationLogo>

                    <Form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input type="text" className="form-control"
                                placeholder="User Name"
                                name="username"
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input type="password" className="form-control"
                                name="password"
                                value={password}
                                   placeholder = "Password"
                                onChange={e => setPassword(e.target.value)}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={loading}
                                type="submit"
                            >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                      {/*  <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />*/}
                    </Form>
                </div>
            </div>
        );
}