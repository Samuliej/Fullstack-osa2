import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = props => {
  return (
    <Input values={props}/>
  )
}

const Input = (props) => {
  const {text, value, func} = props.values
  return (
    <div>
      {text} <input 
        value={value}
        onChange={func}
      />
    </div>
  )
}

const FullInfo = props => {
  // console.log('info of one country')
  // console.log(props.info)

  return (
    <div>
      <h1>{props.info.name.common}</h1>
      <p>capital {props.info.capital}</p>
      <p>area {props.info.area}</p>
      <h2>languages:</h2>
      <Languages lang={props.info.languages} />
      <Flag link={props.info.flags.png} />
    </div>
  )
}

const Flag = props => {
  return (
    <img alt="The country's flag" src={props.link}/>
  )
}

const Languages = props => {
  //console.log(props.lang)
  return (
    <ul>
      {
        Object.values(props.lang).map((value, ind) => {
          return (
            <li key={ind} >{value}</li>
          )
        })
      }
    </ul>
  )
}

const Countries = props => {
  let countryArr;
  countryArr = props.arr.filter(country => (country.name.common.toLowerCase().includes(props.filt)) ?
      country : null
  )

  //console.log(countryArr)

  if (countryArr.length === 1) {
    return (
      <FullInfo info={countryArr[0]} />
    )
  }

  if (props.filt === '') {
    return (
      <div>enter a filter</div>
    )
  }

  if (countryArr.length === 0) {
    return (
      <div>no matches, specify another filter</div>
    )
  } 

  if (countryArr.length > 10) {
    return (
      <div>too many matches, specify another filter</div>
    )
  } else {
    
      return (
        <div>
          {
          props.arr.map(country => country.name.common.toLowerCase().includes(props.filt) ?
          <Country key={country.cca2} 
                  name={country.name.common} /> : null ) }
        </div>
      )
  }
  
}

const Country = props => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = event => setFilter(event.target.value)

  console.log('render', countries.length, 'notes')
  return (
    <div className="App">
       <Filter text="find countries" value={filter} func={handleFilterChange} />
       <Countries arr={countries} filt={filter} />
    </div>
  );
}

export default App;
