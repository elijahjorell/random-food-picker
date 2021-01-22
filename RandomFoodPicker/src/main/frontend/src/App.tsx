import React, {useEffect, useState} from 'react'
import {FC, ReactElement} from 'react'
import {Container} from 'react-bootstrap'
import './App.sass'

interface Props {

}

const App: FC<Props> = (): ReactElement => {
    const [location, setLocation] = useState<GeolocationPosition>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position)
        })
    }, [])

    return (
        <Container>
            {location?.coords.latitude}
        </Container>
    )
}

export default App