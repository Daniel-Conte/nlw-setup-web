import Habit from "./components/Habit";
import "./styles/global.css";

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={1} />
      <Habit completed={2} />
      <Habit completed={4} />
    </div>
  );
}

export default App;
