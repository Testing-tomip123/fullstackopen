import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const fetch = useCallback(async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    , [baseUrl])
  
    useEffect(() => {
      fetch()
    }
    , [fetch])
  
    const create = async (resource) => {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        default: { value, onChange, type },
        reset
    }
}
