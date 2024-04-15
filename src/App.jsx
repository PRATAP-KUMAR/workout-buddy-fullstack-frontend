import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className='text-center text-5xl font-bold min-h-[100vh] flex justify-center items-center bg-sky-200'>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
      Workouts
    </div>
  )
}

export default App