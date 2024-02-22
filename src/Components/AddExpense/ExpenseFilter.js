

const ExpenseFilter = ({ filterItem }) => {
    return (
      <select name="" id="" className="form-select nb-3" onChange={(event) => filterItem(event.target.value)}>
        <option value=""></option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Groceries">Groceries</option>
      </select>
    )
  }
  
  export default ExpenseFilter