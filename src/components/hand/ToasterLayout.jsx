import React from "react";
import { Toaster } from "@/components/ui/toaster";

export default function ToasterLayout({ children }) {
    return (
        <>
            <main>{children}</main>
            <Toaster />
        </>
    );
}
