import './App.css';
import {useEffect, useState} from "react/cjs/react.production.min";
import GMap from "./GMap";
import {Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    // axios.get("http://ip-api.com/json").then((res) => {
    //   console.log(res.data)
    // })
    // GMap.findPlaceFromText("Marsden Park").then((res) => {
    //   console.log("findplacefromtext:");
    //   console.log(res);
    // });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted")

    axios.get("http://ip-api.com/json").then((ipData) => {
      console.log(ipData);
      GMap.textsearch(event.target[0].value + " " + ipData.data.region + " " + ipData.data.country).then((searchData) => {
        return searchData.results["0"]["geometry"]["location"];
      }).then((location) => {
        GMap.nearbySearch(location["lat"], location["lng"], 10000, "restaurant").then((res) => {
          console.log(res);
          setData(res.results["0"]);
        });
      })
    });
  }

  return (
    <div className="App">
      {
        data === undefined ? (
            <div>
              <h1>Let's eat around...</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Control placeholder="Enter suburb"/>
              </Form>
            </div>
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
