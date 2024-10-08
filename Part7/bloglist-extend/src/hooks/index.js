/** @format */

import { useState } from 'react'

export const useField = type => {
    const [value, setValue] = useState('')
    const onChange = event => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    return {
        default: { type, value, onChange },
        reset,
    }
}
