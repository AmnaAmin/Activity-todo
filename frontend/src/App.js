import React from "react";
import Todos from "./components/todos/Todos";


import "@material-tailwind/react/tailwind.css";

function App() {
    return (
        <div className="App">
            <Todos />
        </div>
    );
}

export default App;