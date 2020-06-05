import React from 'react';
import './App.css';
// import Graph from './Graph.js';
// import GUI from "./react-graph.js";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application"

function App() {
  var app = new Application();
  return (
    <div className="App">
        <BodyWidget app={app} />;
    </div>
  );
}

export default App;
