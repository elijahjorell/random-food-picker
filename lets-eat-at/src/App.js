import './App.css';
import {useEffect, useState} from "react/cjs/react.production.min";
import GMap from "./GMap";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    GMap.findPlaceFromText("Marsden Park").then((res) => {
      console.log("findplacefromtext:");
      console.log(res.data);
    });
    GMap.nearbySearch(-33.702382, 150.835362, 500).then((res) => {
      console.log("nearbysearch:");
      console.log(res.data);
    });
    GMap.textsearch("Marsden Park KFC").then((res) => {
      console.log("textsearch:");
      console.log(res.data);
    })

  }, []);

  return (
    <div className="App">
      {
        data === undefined ? (
            <h1>Loading...</h1>
        ) : (
            <h1>Loaded</h1>
        )
      }
    </div>
  );
}

export default App;
