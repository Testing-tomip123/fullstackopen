const Filter = ({name, handleFilterChange}) => {
    return (
      <div>
        filter shown with: <input value={name} onChange={handleFilterChange} />
      </div>
    )
  }

export default Filter