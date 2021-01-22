import React, {useEffect, useState} from 'react';
import {FC, ReactElement} from 'react';
import {Container} from 'react-bootstrap';
import './App.sass';
import axios from "axios";

interface Props {

}

interface Restaurant {
    restaurant: {
        name: string
    }
}

const App: FC<Props> = (): ReactElement => {
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

    const getRandomArrayElement = <T,>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)]
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((geolocation) => {
            const params = {
                lat: geolocation.coords.latitude,
                lon: geolocation.coords.longitude
            }
            axios.post("http://localhost:8080/get/geocode", params).then((res) => {
                console.log(res.data)
                setNearbyRestaurants(res.data.nearby_restaurants)
            })
        })
    }, [])

    return (
        <Container>
            {
                nearbyRestaurants.map((restaurant: Restaurant) => {
                    return (
                        <div>
                            {restaurant.restaurant.name}
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default App