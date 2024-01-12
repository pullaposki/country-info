const URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = ()=>{
    return fetch(URL)
        .then(response => response.json())
        .then(data => data);
}

export default getAll;