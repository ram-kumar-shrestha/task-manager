import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./helpers/protectedRoute";
import { Home, Login, Signup, Welcome } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/welcome" element={<ProtectedRoute />}>
          <Route path="" element={<Welcome />} />
          <Route path="profile" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
