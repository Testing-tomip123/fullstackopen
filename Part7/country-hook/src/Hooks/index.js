import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    
    useEffect(() => {
        if (!name) {
            return
        }
        axios
            .get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setCountry(response.data[0])
            .then((error) => {
                setCountry(null)
            }
            )
        }
        )
    }, [name])

    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}
