import { setFilter } from "../reducers/filterReducer"

const Filter = ({ store }) => {
    const handleFilterChange = (event) => {
        store.dispatch(setFilter(event.target.value))
    }

    const style = {
        marginBottom: 10
    }
    
    return (
        <div style={style}>
        filter <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter