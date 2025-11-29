"use client";
import { useEffect } from "react";
import useLenis from "../lenis";

function useScript(src) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.dataset.useServiceCore = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);
}

const LenisProvider = ({ children }) => {
    useScript("https://static.elfsight.com/platform/platform.js");
    useLenis();

    return <>{children}</>;
};

export default LenisProvider;
