import Home from "./pages/Home";
import Room from "./pages/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:username/:roomId" element={<Room />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
