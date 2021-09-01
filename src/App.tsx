import { RecoilRoot } from 'recoil';
import './App.css';
import Map from "./components/Map";

function App() {
  return (
    <RecoilRoot>
      <Map />
    </RecoilRoot>
  );
}

export default App;
