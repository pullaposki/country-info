import { useState, useEffect } from 'preact/hooks'
import getAll from "./services/countriesGetter.js";


export function App() {
    const [search, setSearch]=useState("");
    const [countries, setCountries]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [countriesToDisplay, setCountriesToDisplay]= useState([]);
    const handleChange = (event) =>{
        setSearch(event.target.value);
        filterCountries();
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
    
    const filterCountries= ()=>{
        let filteredCountries=[];
        for (const country of countries) {
            filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
        }
        console.log(filteredCountries)
        setCountriesToDisplay(filteredCountries);
    }
    
  return (
    <>
      <h1>Country Info</h1>
        {isLoading ? <div>Loading</div> :  
            <div>
                <p>Type country name to get info.</p>
                Search <input onInput={(event)=>handleChange(event)} />
                
            </div>
            

        }
    </>
  )
}
