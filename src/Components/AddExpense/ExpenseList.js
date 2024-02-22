const ExpenseList = ({items, deleteItem}) => {
    return (
      
      <table className="table">
    <thead>
      <tr>
        <th scope="col">Description</th>
        <th scope="col">Amount</th>
        <th scope="col">Category</th>
      </tr>
    </thead>
    <tbody>
  
      { items.map((item, index) => <tr key ={index}>     
     <td>{item.description}</td>
     <td>${item.amount}</td>
     <td>{item.category}</td>
     <td><button className="btn btn-outline-danger" onClick={()=> deleteItem(item.id)}>Delete</button></td>
   </tr>
   )
   }
  
  <tr>     
     <td><h3>Total</h3></td>
     <td><h3>${items.reduce((total, item) => total + parseInt(item.amount),0).toFixed(2)}</h3></td>
      
  
   </tr>
      
      
    </tbody>
  </table>
    )
  }
  
  export default ExpenseList;