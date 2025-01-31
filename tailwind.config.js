//import daisyui from "daisyui"
//export default {
////...
  //plugins: [
   // daisyui,
  //],
//}

//import withMT from "@material-tailwind/react/utils/withMT"
 
//export default({
  //content: [],
  //theme: {
    //extend: {},
  //},
  //plugins: [],
//});


/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import withMT from "@material-tailwind/react/utils/withMT"
export default({
content: [
  "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  "node_modules/@material-tailwind/react/**/*.js",
  "node_modules/daisyui/dist/**/*.js",
],
theme: {
  extend: {
    // Add any custom theme settings here
  },
},
plugins: [
  require('daisyui'), // Add DaisyUI as a plugin
  // You can add other plugins here as needed
],
});