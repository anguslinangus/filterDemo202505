import { useState, useEffect } from "react";

const MobileBreakPoint = 768;

export function useViewport(){
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () =>{
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        width: viewportWidth,
        isMobile: viewportWidth < MobileBreakPoint,
    };
}