import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const { default: content, reset: resetContent } = useField('text')
    const { default: author, reset: resetAuthor } = useField('text')
    const { default: info, reset: resetInfo } = useField('text')


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({ 
            content: content.value, 
            author: author.value, 
            info: info.value, 
            votes: 0 
        })

        notification(
            `A new anecdote ${content.value} by ${author.value} added!`
        )
        navigate('/')
    }

    const notification = (message) => {
        clearTimeout(window.timeout)
        props.setNotification(message)
        window.timeout = setTimeout(() => {
            props.setNotification('')
        }, 5000)
    }

    const reset = (e) => {
        e.preventDefault()
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content
                    <input {...content} />
                </div>
                <div>
                    Author
                    <input {...author} />
                </div>
                <div>
                    Url for more info
                    <input {...info} />
                </div>
                <button type="submit">Create</button>
                <button onClick={reset}>Reset</button>
            </form>
        </div>
    )
}

export default CreateNew