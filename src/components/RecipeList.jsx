import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes, onRecipeClick }) => {

 // console.log("recipe list compoenent",recipes);
  return (
    <div>
      <div>
        {recipes.map((recipe) => (
          <RecipeItem  key={recipe.id} recipe={recipe} onRecipeClick = {onRecipeClick}/>
          
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
