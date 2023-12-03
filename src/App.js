import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import ProtectedRoute from "./Routing/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Navbar */}
        <Navbar />
        {/* Screen */}
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
