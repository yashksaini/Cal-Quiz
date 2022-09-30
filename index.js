import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Select from "./pages/Select";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";

// import * as serviceWorker from "./serviceWorker";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/select/:id" element={<Select />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/quiz/:id" element={<Quiz />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.register();
serviceWorkerRegistration.register();
