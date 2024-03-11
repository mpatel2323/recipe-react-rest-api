// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBox from './components/SearchBox';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Container from './components/Container';
import InnerContainer from './components/innerContainer'; 
import HeaderNav from './components/HeaderNav';

import './App.css';

const SPURL = "https://api.spoonacular.com/recipes/complexSearch";
const RD_URL = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false";
const SPAPI_KEY = 'b52e888f858f4d0e9f89fda48da1dffb';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchRecipes(searchQuery);
    } else {
      setSelectedRecipe();
      setRecipes([]);
    }
  }, [searchQuery]);

  async function fetchRecipes() {

    const response = await fetch(`${SPURL}?query=${searchQuery}&apiKey=${SPAPI_KEY}`);
    const recipesResultObj = await response.json();
    const recipes = recipesResultObj.results;
    console.log("recipes",recipes);
    if(recipes) {
      setRecipes(recipes);
    }
    //reset recipe detail
    setSelectedRecipe();

  }



  const handleRecipeClick = async (recipeId) => {
    try {
        const responseObj = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=b52e888f858f4d0e9f89fda48da1dffb&includeNutrition=true`);
        const recipeResultObj = await responseObj.json();

        console.log(recipeResultObj);
        if(recipeResultObj) {
          setSelectedRecipe(recipeResultObj);
          setIsLoading(false);
        }

    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className="App">
      
      <HeaderNav/>
        <SearchBox value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        <Container>
            <InnerContainer>
              <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            </InnerContainer>
            <InnerContainer>
              <RecipeDetail recipe={selectedRecipe} isLoading={isLoading}/>
            </InnerContainer>

        </Container>
       
    </div>
  );
}

export default App;
