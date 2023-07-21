const Filter = ({name, handleChange}) => {
    return (
        <p>filter shown with 
        <input value={name}
        onChange={handleChange}/>
      </p>
    )
}

export default Filter