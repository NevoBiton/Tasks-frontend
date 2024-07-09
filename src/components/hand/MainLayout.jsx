import React from "react"
import Header from "../ui/Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"


function MainLayout() {
    return (
        <>
            <Header></Header>
            <Outlet />
            <Footer />
        </>

    )

}

export default MainLayout