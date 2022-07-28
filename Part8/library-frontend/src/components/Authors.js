/** @format */

import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../api/queries'

const AuthorAddBirthYear = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const { data: authors } = useQuery(ALL_AUTHORS)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const submit = async e => {
        e.preventDefault()
        editAuthor({ variables: { name, setBornTo: parseInt(born) } })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        {authors &&
                            authors.allAuthors.map(a => (
                                <option key={a.name} value={a.name}>
                                    {a.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    born
                    <label>
                        <input
                            type="number"
                            value={born}
                            onChange={({ target }) => setBorn(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

const Authors = props => {
    const { loading, error, data } = useQuery(ALL_AUTHORS)

    if (!props.show) return null
    if (error) return <div>Error: {error.message}</div>
    if (loading) return <div>Loading...</div>

    const authors = data.allAuthors

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map(a => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorAddBirthYear />
        </div>
    )
}

export default Authors
