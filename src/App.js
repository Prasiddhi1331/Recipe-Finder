import React, { useEffect, useState } from "react";
// import { SocialIcon } from 'react-social-icons';
import Recipe from "./Recipe";
import { BsSearch } from "react-icons/bs";
import "./App.css";


function App() {
  const app_id = "d74dc80a";
  const api_key = "094d99f52626182ccb438668ebde8d89";
  const [allRecipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');
  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const getData = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${api_key}`
    );
    const finalData = await getData.json();
    setRecipe(finalData.hits);
  };
  const updateSearch = e => {
    setSearch(e.target.value)
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  
  return (
    <div>
    <div className="App">
      <h2 className="text-center mt-3 h2style">RECIPE FINDER</h2>
      <form onSubmit={getSearch} className="form">
        <input type="text" className="input" value={search} placeholder= "panner, chicken, pancake etc..."onChange={updateSearch}></input>
        <button type="submit" className="search">Search</button>
        <button type="submit" className="search1"> <BsSearch size="20px" color="white"/> </button>
      </form>
      <div className="d-flex justify-content-around flex-wrap">
        {allRecipe.map((r) => (
          <Recipe
            key={r.recipe.label}
            title={r.recipe.label}
            label={r.recipe.label}
            calory={r.recipe.calories.toFixed(0)}
            image={r.recipe.image}
            // ingredients={r.recipe.ingredients}
            url={r.recipe.url}
          />
        ))}
      </div>
      
    </div>
    {/* <div className="footer-copyright text-center py-3">
      RECIPE FINDER 
      <br></br>
      <SocialIcon url="https://www.instagram.com/prasiddhi1331/" network="instagram" fgColor="#FFFFFF" bgColor="#000000" style={{ height: 25, width: 25 }} />
      &nbsp;
      &nbsp;
      <SocialIcon url="https://github.com/Prasiddhi1331" network="github" fgColor="#FFFFFF" bgColor="#000000" style={{ height: 25, width: 25 }} />
      
      </div> */}
    </div>
  );
}

export default App;
