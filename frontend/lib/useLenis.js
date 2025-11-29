"use client"
import { useEffect } from "react";

export default function useLenis() {
    useEffect(() => {
        const loadLenis = async () => {
            const Lenis = (await import("lenis")).default;
            const lenis = new Lenis();

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        };

        loadLenis();
    }, []);
}
