import React, { useState, useEffect } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';

// import { grid, container, sidebar, content } from './AppLayout.module.scss'
import { app_container } from './AppLayout.module.scss';
import {Context} from '../../hooks/context'
import { throttle } from 'throttle-debounce';

export default function AppLayout(props) {
    const [path, setPath] = useState([]);
    const [title, setTitle] = useState([]);
    const [adminProfile, setAdminProfile] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [isOpen, setIsOpen] = useState(windowWidth > 1200);

    const resizeHandler = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    const throttledResizeHandler = throttle(80, resizeHandler);

    useEffect(() => {
        window.addEventListener('resize', throttledResizeHandler);
        return () => window.removeEventListener('resize', throttledResizeHandler);
    }, []);

    const [fromXL, setFromXL] = useState(windowWidth > 1200);

    useEffect(() => {
        if (windowWidth <= 1200 && fromXL) {
            setFromXL(false);
            setIsOpen(false);
        } else if (windowWidth > 1200 && !fromXL) {
            setFromXL(true);
            setIsOpen(true);
        }
    }, [windowWidth])
    
    return (
        <Context.Provider value={{setTitle, setPath, windowWidth, windowHeight, adminProfile, setAdminProfile}}>
            <div className={app_container}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                <Header path={path} title={title} isOpen={isOpen}/>
                <Content isOpen={isOpen} setPath={setPath} setTitle={setTitle}>
                    {props.children}
                </Content>
            </div>
        </Context.Provider>
    )
}