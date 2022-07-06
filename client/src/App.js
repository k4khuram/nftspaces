import React,{useState,useEffect} from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import "./styles/style.css";
import "./styles/_fonts.css";
import Home from "./components/home.component";
import {Login} from "./components/login.component";

export const App = () => {
    const [currentUser, setCurrentUser] = useState([]);

    const getUser = () => {
        return AuthService.getCurrentUser();
    };

    useEffect(() => {
        setCurrentUser(getUser());
    }, []);

        return (
            <div>{currentUser?(<Home/>):(<Login/>)}</div>

        );

}

