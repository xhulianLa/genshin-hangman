import "./App.css";
import GameScreen from "./pages/Game screen/GameScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
