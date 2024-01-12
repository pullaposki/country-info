import { useState, useEffect } from 'preact/hooks'
import getAll from "./services/countriesGetter.js";


export function App() {
    const [search, setSearch]=useState("");
    const [countries, setCountries]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [countriesToDisplay, setCountriesToDisplay]= useState([]);
    
    const handleChange = (event) =>{
        setSearch(event.target.value);
    }

    useEffect(() => {
        setIsLoading(true);
        getAll()            
            .then(data => {
                setCountries(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("error getting countries", error);
                setIsLoading(false);
            });
    }, [])

    useEffect(()=>{
        let filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setCountriesToDisplay(filteredCountries);
    },[search, countries])

    useEffect(() => {
        showFilteredCountries();
    }, [search]);
    
    const showFilteredCountries= ()=>{
        let filteredCountries= countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
        setCountriesToDisplay(filteredCountries);
    }
    
    const displayCountries = ()=>{
            return countriesToDisplay.map(country=> <p>{country.name.common}</p>
        )
    }
    
  return (
    <>
      <h1>Country Info</h1>
        {isLoading ? <div>Loading</div> :  
            <div>
                <p>Type country name to get info.</p>
                Search <input onInput={(event)=>handleChange(event)} />
                <ul>
                    {displayCountries()}
                </ul>
            </div>
            

        }
    </>
  )
}
