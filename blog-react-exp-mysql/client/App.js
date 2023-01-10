import React from 'react';
import "./assets/style/style.css";
import {Routes, Route} from 'react-router-dom';

import {publicRoutes} from "./routers";
import {Header} from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                {
                    publicRoutes.map((route, index) => {
                        if (route.component) {
                            const Page = route.component
                            return <Route key={index} path={route.path} element={<Page/>}/>
                        }
                    })
                }
                <Route path="/register"><Register /></Route>
                <Route path="/login"><Login /></Route>
            </Routes>
        </div>
    );
}

export default App;
