import React from 'react';

import styles from './recipedetail.module.css';

const RecipeDetail = ({ recipe , isLoading }) => {
  return (
    <div>
      {recipe && (
        <>
          
          <div >
            <div className={styles.recipeCard}>
              <h1 className={styles.recipeName}>Name: {recipe.title}</h1>
              <img className={styles.recipeImg}  alt={recipe.title} src={recipe.image} />
              <div className={styles.recipeDetail}>
                
                <span><strong>Ready in  {recipe.readyInMinutes} Minutes </strong> </span>
                <span><strong>{recipe.vegeterian ? "Vegeterian": "Non-Vegeterian"} </strong></span>
                <span><strong>{recipe.vegan ? "Vegan": ""} </strong></span>
                <span><strong>{recipe.glutenFree ? "Gluten Free": ""} </strong></span>

                <span><strong>Serves {recipe.servings} </strong></span>
               
              </div>
              <div>
                <span><strong>Weight Watcher Smart Points : {recipe.weightWatcherSmartPoints} </strong> </span>
              </div>
            
              <h2>Instructions</h2>
              <div className={styles.recipeInstruction}>
                <ol>
                  { isLoading ? ( <p> Loading... </p> ) : (  
                    recipe.analyzedInstructions[0]  &&

                    recipe.analyzedInstructions[0].steps.map( (stepObj) => (<li key={stepObj.number}>{stepObj.step}</li>))
                    )
                  }
                </ol>
              </div>
            </div>

          </div>
          
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
