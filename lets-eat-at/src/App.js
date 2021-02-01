import './App.css';
import {useEffect, useState} from "react/cjs/react.production.min";
import GMap from "./GMap";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    GMap.findPlaceFromText("Marsden Park").then((res) => {
      console.log("findplacefromtext:");
      console.log(res);
    });
    GMap.nearbySearch(-33.702382, 150.835362, 20000, "restaurant").then((res) => {
      console.log("nearbysearch:");
      console.log(res);
      setData(res.results["0"]);
    });
    GMap.textsearch("Marsden Park KFC").then((res) => {
      console.log("textsearch:");
      console.log(res);
    })
  }, []);

  return (
    <div className="App">
      {
        data === undefined ? (
            <h1>Let's eat around...</h1>
        ) : (
            <div>
              <h1>Let's eat at...</h1>
              <h1>{data["name"]}</h1>
              <h4>({data["vicinity"]})</h4>
            </div>
        )
      }
    </div>
  );
}

export default App;
