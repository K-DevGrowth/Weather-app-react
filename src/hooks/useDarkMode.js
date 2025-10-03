import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                return savedTheme === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleToggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return { darkMode, handleToggleDarkMode };
}

export default useDarkMode