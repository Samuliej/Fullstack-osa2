const Form = props => {
    return (
      <form onSubmit={props.submitAction}>
      <div>
        name: <input 
              value={props.nameInput}
              onChange={props.nameChange}
              />
              <br/>
        number: <input
              value={props.numberInput}
              onChange={props.numberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}

export default Form