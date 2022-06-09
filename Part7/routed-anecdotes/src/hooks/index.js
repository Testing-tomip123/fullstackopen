import { useState } from 'react'

export const useField = (initialValue) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        default: { value, onChange, initialValue },
        reset
    }
}