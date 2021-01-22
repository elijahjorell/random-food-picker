import React, {useEffect, useState} from 'react';
import {FC, ReactElement} from 'react';
import {Container} from 'react-bootstrap';
import './App.sass';
import axios from "axios";

interface Props {

}

const App: FC<Props> = (): ReactElement => {
    const [location, setLocation] = useState<GeolocationPosition>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((geolocation) => {
            setLocation(geolocation)
            axios.get("http://localhost:8080/key").then((res) => {
                console.log(res.data)
            })
        })
    }, [])

    return (
        <Container>
            {location?.coords.latitude}
        </Container>
    )
}

export default App