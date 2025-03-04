import React from "react";

interface LogoProps {
    className?: string;
}

export default function Logo(props: LogoProps) {
    return <img src="../logo.png" alt="logo" className={props.className && props.className} />
}