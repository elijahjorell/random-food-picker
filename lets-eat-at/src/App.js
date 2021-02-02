import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";
import GMap from "./GMap";
import {Form, Spinner} from "react-bootstrap";
import axios from "axios";
import {Button, TextField} from "@material-ui/core";
import Misc from "./Misc";

function App() {
  const [data, setData] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [suburb, setSuburb] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!disabled) {
      setSubmitted(true);
      axios.get("http://ip-api.com/json").then((ipData) => {
        GMap.textsearch(suburb + " " + ipData.data.region + " " + ipData.data.country).then((searchData) => {
          return searchData.results["0"]["geometry"]["location"];
        }).then((location) => {
          GMap.nearbySearch(location["lat"], location["lng"], 5000, "restaurant").then((nearbyData) => {
            setData(Misc.getRandomElementFromArray(Object.values(nearbyData.results)));
          });
        })
      });
    }
  }

  const handleReset = () => {
    setSubmitted(false);
    setData(undefined);
    setSuburb("");
    setDisabled(true);
  }

  const handleOnFocus = (event) => {
    event.target.placeholder = "";
  }

  const handleOnBlur = (event) => {
    event.target.placeholder = "Enter suburb";
  }

  const handleOnChange = (event) => {
    setSuburb(event.target.value);
    if (event.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const buttonCardStyle = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "red"
  }

  return (
    <div className="App">
      {
        data === undefined ? (
          <div>
            {
              !submitted ? (
                <div>
                  <h2>Let's eat somewhere around...</h2>
                  <div className="card">
                    <Form onSubmit={handleSubmit}>
                      <TextField placeholder="Enter suburb" fullWidth inputProps={{ style: { textAlign: "center", fontSize: "2.0rem", textTransform: "capitalize"}}} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur}/>
                    </Form>
                    <Button variant="contained" disabled={disabled} color={"primary"} onClick={handleSubmit}>Go</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2>Let's eat at...</h2>
                  <div className="loading">
                    <Spinner animation="border"/>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <div>
            <h2>Let's eat at...</h2>
            <div className="card">
              <Button variant="contained" color="primary" inputProps={{ style: buttonCardStyle }} target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + GMap.createUrl([data["name"], data["vicinity"]])}>
                <div className="result-content">
                  <h1>{data["name"]}</h1>
                  {data["vicinity"]}
                </div>
              </Button>
            </div>
            <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
          </div>
        )
      }
    </div>
  );
}

export default App;
