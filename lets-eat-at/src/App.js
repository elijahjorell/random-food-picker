import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";
import GMap from "./GMap";
import {Form, Spinner} from "react-bootstrap";
import {Button, TextField} from "@material-ui/core";
import CasinoIcon from '@material-ui/icons/Casino';
import RoomIcon from '@material-ui/icons/Room';
import CheckIcon from '@material-ui/icons/Check';
import Misc from "./Misc";

function App() {
  const [nearbyData, setNearbyData] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [geolocation, setGeolocation] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      setGeolocation(geolocation);
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!disabled) {
      setSubmitted(true);
      GMap.textsearch(searchQuery, geolocation.coords.latitude, geolocation.coords.longitude).then((searchData) => {
        return searchData.results["0"]["geometry"]["location"];
      }).then((foundLocation) => {
        GMap.nearbySearch(foundLocation["lat"], foundLocation["lng"], "restaurant").then((nearbyData) => {
          setNearbyData(nearbyData);
          setSelectedPlace(Misc.getRandomElementFromArray(Object.values(nearbyData.results)));
        });
      })
    }
  }

  const handleReroll = async () => {
    setSelectedPlace(undefined);
    setTimeout(() => {
      setSelectedPlace(Misc.getRandomElementFromArray(Object.values(nearbyData.results)));
    }, 1000);
  }

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPlace(undefined);
    setSearchQuery("");
    setDisabled(true);
  }

  const handleOnFocus = (event) => {
    event.target.placeholder = "";
  }

  const handleOnBlur = (event) => {
    event.target.placeholder = "Enter address, building name or suburb";
  }

  const handleOnChange = (event) => {
    setSearchQuery(event.target.value);
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
      <div className="location-text">
        {}
      </div>
      {
        selectedPlace === undefined ? (
          <div>
            {
              !submitted ? (
                <div>
                  <h2>Let's eat somewhere around...</h2>
                  <div className="card">
                    <Form onSubmit={handleSubmit}>
                      <TextField placeholder="Enter address, building name or suburb" fullWidth inputProps={{ style: { textAlign: "center", fontSize: "2.0rem" }}} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur}/>
                    </Form>
                    <Button variant="contained" disabled={disabled} color={"primary"} onClick={handleSubmit}>Go</Button>
                  </div>
                  {
                    geolocation ? (
                        <div>
                          <RoomIcon/><CheckIcon style={{marginRight: "5px"}}/>
                        </div>
                    ) : (
                        <div>
                          Location not provided, add country to query for a more accurate search.
                        </div>
                    )
                  }
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
              <Button variant="contained" color="primary" inputprops={{ style: buttonCardStyle }} target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + GMap.createUrl([selectedPlace["name"], selectedPlace["vicinity"]])}>
                <div className="result-content">
                  <h1>{selectedPlace["name"]}</h1>
                  {selectedPlace["vicinity"]}
                </div>
              </Button>
              <div className="light-grey">
                (Click above to go to Google Maps)
              </div>
            </div>
            <Button fullWidth variant="contained" color="secondary" onClick={handleReroll}><CasinoIcon style={{marginRight: "5px"}}/>Reroll Search "{searchQuery}"</Button>
            <hr/>
            <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
          </div>
        )
      }
    </div>
  );
}

export default App;
