import React from "react"
import Header from "../ui/Header"
import { Outlet } from "react-router-dom"


function MainLayout() {
    return (
        <>
            <Header></Header>
            <Outlet />
        </>

    )

}

export default MainLayout