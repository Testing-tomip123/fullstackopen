const AnecdoteView = ({ anecdote }) => {
    
    const anecdoteStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'lightgrey'
    }

    return (
        <div style={anecdoteStyle}>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default AnecdoteView