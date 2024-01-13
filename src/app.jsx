import { useState, useEffect } from 'preact/hooks'
import getAll from "./services/countriesGetter.js";
import getWeatherForCountry from "./services/weatherGetter.js";

export function App() {
    const [search, setSearch]=useState("");
    const [countries, setCountries]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [countriesToDisplay, setCountriesToDisplay]= useState([]);
    const [countrySelected, setCountrySelected]=useState("");
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
    
    useEffect((name)=>{
        console.log("should get weather for...", countrySelected);
        setIsLoading(true);
        getWeatherForCountry(countrySelected).then(data => {
            console.log(data);
            setIsLoading(false);
        }).catch(error => {
            console.log("error getting weather ",error);
            setIsLoading(false);
        })
        
    },[countrySelected])
    
    const showFilteredCountries= ()=>{
        let filteredCountries= countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
        setCountriesToDisplay(filteredCountries);
    }
    
    const handleShowClick = (name)=>{
        console.log("should go to ",name);
    }
    const displayCountries = ()=>{
        if(countriesToDisplay.length>10){
            setCountrySelected("");
            return <p>Specify your search.</p>
        }
        
        if(countriesToDisplay.length===1){
            setCountrySelected(countriesToDisplay[0].name.common);
            return(
                <div>
                    {countriesToDisplay.map(country=>
                        <div>
                            <h2>{country.name.common}</h2>
                            <p>{country.name.official}</p>
                            <h4>Languages</h4>
                            {Object.values(country.languages).map(language=><p>{language}</p>)}
                            <img src={country.flags.png} alt={country.flag.alt} />
                        </div>
                    )}
                </div>
            )
        }
        setCountrySelected("");
        return countriesToDisplay.map(country=> 
            <p>
                {country.name.common}
                <button onClick={() => {setSearch(country.name.common)} }>show</button>
            </p>)
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
