import React, { useState } from "react";

export const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    document.querySelector("html").setAttribute("data-theme", isDarkMode ? "light" : "dark");

    return (
        <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={() => setIsDarkMode(!isDarkMode)} />

            
        </label>
    );
};