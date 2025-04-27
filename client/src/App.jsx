import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import Undefined from "./pages/Undefined";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-200 p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Detail />} />
            <Route path="/add" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<Undefined />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
