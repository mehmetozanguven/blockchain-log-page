import React from "react";
import "./App.css";
import "./components/Table";
import SimpleTable from "./components/Table";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <SimpleTable></SimpleTable>
    </div>
  );
}

export default App;
