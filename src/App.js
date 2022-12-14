import React from 'react';
import "./assets/style/style.css";
import {Routes, Route} from 'react-router-dom';

import {publicRoutes} from "./routers";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                {
                    publicRoutes.map((route, index) => {
                        if (route.component) {
                            // const Layout = route.layout === false ? Fragment : (route.layout || DefaultLayout)
                            const Page = route.component
                            // return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
                            return <Route key={index} path={route.path} element={<Page/>}/>
                        }
                    })
                }
            </Routes>
            {/*<Routes>*/}
            {/*  <Route path="/" element={<Home/>}/>*/}
            {/*  <Route path="/about" element={<About/>}/>*/}
            {/*  <Route path="/test" element={<Test/>}/>*/}
            {/*  <Route path='*' element={<NotFound />} />*/}
            {/*</Routes>*/}
        </div>
    );
}

export default App;
