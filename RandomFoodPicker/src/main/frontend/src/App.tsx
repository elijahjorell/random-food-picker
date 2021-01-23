import React, {useEffect} from 'react';
import {FC, ReactElement} from 'react';
import {Container} from 'react-bootstrap';
import './App.sass';
import googleMapsApi from "./shared/functions/GoogleMapsApi";

interface Props {

}

const App: FC<Props> = (): ReactElement => {
    useEffect(() => {
        const baseUrl = "https://maps.googleapis.com/maps/api/place/"
        const params = {
            input: "Marsden Park",
            inputtype: "textquery"
        }
        googleMapsApi.textsearch(baseUrl, params).then((res) => {
            return res.results[0].geometry.location
        }).then((location) => {
            const params = {
                location: location.lat + "," + location.lng,
                radius: 10000,
                type: "restaurant"
            }
            return googleMapsApi.nearbysearch(baseUrl, params)
        }).then((res) => {
            console.log(res.results)
        })
    }, [])

    return (
        <Container>
            Hello, world!
        </Container>
    )
}

export default App