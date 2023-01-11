import React from 'react';
import "./assets/style/style.css";
import {Routes, Route} from 'react-router-dom';

import {publicRoutes} from "./routers";
import {Header} from "./components/Header";

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
            </Routes>
        </div>
    );
}

export default App;
