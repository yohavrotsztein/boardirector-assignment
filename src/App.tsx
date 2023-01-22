import { Route, Routes } from "react-router-dom";
import AddRecipe from './Pages/AddRecipe'
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </>
  );
}

export default App;
