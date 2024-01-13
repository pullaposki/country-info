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
        if(countriesToDisplay.length>10){
            return <p>Specify your search.</p>
        }
        
        // Kun ehdon täyttäviä maita on enää yksi, näytetään maan perustiedot, lippu sekä maassa puhutut kielet:
        if(countriesToDisplay.length===1){
            return(
                <div>
                    {countriesToDisplay.map(country=>
                        <div>
                            <h4>Names</h4>
                            <p>{country.name.common}</p>
                            <p>{country.name.official}</p>
                            <h4>Languages</h4>
                            {Object.values(country.languages).map(language=><p>{language}</p>)}
                        </div>
                    )}
                </div>
            )
        }

        return countriesToDisplay.map(country=> <p>{country.name.common}</p>)
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
