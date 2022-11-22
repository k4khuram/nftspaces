import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import "./styles/style.css";
import "./styles/_fonts.css";
import Home from "./components/Home";
import {Login} from "./components/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {RequireAuth} from "./components/RequireAuth"
import { TwitterCallback } from './components/TwitterCallback';

export const App = () => {
    
        return (
            
            <Router>
                <Routes>
                   <Route  path="/" element={<RequireAuth><Home/></RequireAuth>}></Route>   
                   <Route  path="/home" element={<RequireAuth><Home/></RequireAuth>}></Route>  
                   <Route  path="/login" element={<Login/>}></Route>
                   <Route path="/auth/twitter/callback" element={<RequireAuth><TwitterCallback/></RequireAuth>}></Route>
                </Routes>
            </Router>
                   
        );
}

