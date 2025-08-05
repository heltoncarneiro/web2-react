import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pagina2  from "./pages/Pagina2";
import Menu  from "./pages/Menu";
import Inserir  from "./pages/Inserir";
import Update from "./pages/Update"

export default function RoutesApp(){
    return(
    <BrowserRouter>
      <Routes>
          <Route  path="/" exact element={<Pagina2 />} />
          <Route  path="/menu" element={<Menu />} />
          <Route  path="/Inserir" element={<Inserir />} />
          <Route  path="/Update" element={<Update />} />      </Routes>
    </BrowserRouter>
    );
}