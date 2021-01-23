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
                radius: 20000,
                type: "restaurant"
            }
            return googleMapsApi.nearbysearch(baseUrl, params)
        }).then((nearbySearch) => {
            console.log(nearbySearch.results)
            return nearbySearch.next_page_token
        }).then((pageToken) => {
            const params = {
                pagetoken: pageToken
            }
            setTimeout((): void => {
                googleMapsApi.nearbysearch(baseUrl, params).then((nearbySearch) => console.log(nearbySearch))
            }, 1500)
        })
    }, [])

    return (
        <Container>
            Hello, world!
        </Container>
    )
}

export default App