import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const style = {
    margin: 10,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  }

  return (
    <div style={style}>
      Filter <input 
      placeholder="Filter"
      onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter