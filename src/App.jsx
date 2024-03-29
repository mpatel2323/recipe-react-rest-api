// App.js
import React, { useState, useEffect } from 'react';

import SearchBox from './components/SearchBox';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Container from './components/Container';
import InnerContainer from './components/innerContainer'; 
import HeaderNav from './components/HeaderNav';

import './App.css';

import recipesData from './data/recipes.json';// Import static JSON data for recipe details in case spoonacular api limit reach for the day
import selectedRecipeDetailsData from './data/receipe-detail.json';// Import static JSON data for recipe details in case spoonacular api limit reach for the day

const SPURL = "https://api.spoonacular.com/recipes/complexSearch";
const RD_URL = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false";
const SPAPI_KEY = 'b52e888f858f4d0e9f89fda48da1dffb';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [useStaticData, setUseStaticData] = useState(false);


  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchRecipes(searchQuery);
    } else {
      setSelectedRecipe();
      setRecipes([]);
    }
  }, [searchQuery]);

  async function fetchRecipes() {

    let recipes = [];
    if(useStaticData){
      console.log("recipesData = ",recipesData);
      recipes = recipesData.results;
    } else {
      const response = await fetch(`${SPURL}?query=${searchQuery}&apiKey=${SPAPI_KEY}`);
      const recipesResultObj = await response.json();
      recipes = recipesResultObj.results;

    }

    if(recipes) {
      setRecipes(recipes);
    }
    //reset recipe detail
    setSelectedRecipe();

  }



  const handleRecipeClick = async (recipeId) => {
    try {
      console.log("useStaticData = " ,useStaticData);

      let selecteRecipeDetails = {};
      if(useStaticData){
        console.log("recipesData = ",selectedRecipeDetailsData);
        selecteRecipeDetails = selectedRecipeDetailsData;
      } else {
        const responseObj = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=b52e888f858f4d0e9f89fda48da1dffb&includeNutrition=true`);
        selecteRecipeDetails = await responseObj.json();
      }

     

        console.log(typeof selecteRecipeDetails);
        console.log(selecteRecipeDetails);

        if(selecteRecipeDetails) {
          setSelectedRecipe(selecteRecipeDetails);
          setIsLoading(false);
          window.scrollTo(0, 0);
        }

    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className="App">
      
      <HeaderNav value={useStaticData} onChange={(e) => setUseStaticData(!useStaticData)} />
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
