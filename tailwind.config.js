
/** @type {import('tailwindcss').Config} */
//import daisyui from "daisyui"
import withMT from "@material-tailwind/react/utils/withMT"

export default({
content: ["./index.html",
  "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  "node_modules/@material-tailwind/react/**/*.js",
  
], 
darkMode:["class"] , // enable dark mode as class
// other options...

theme: {
  extend: {
    // Add any custom theme settings here
  },
},
variants: {
  extend: {},
},
plugins: [withMT],
//withMT:{themes:["light","dark"]},
//darkMode: ["selector", '[data-theme="dark"]'],

});


