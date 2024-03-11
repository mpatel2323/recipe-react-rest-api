import React from 'react';
import styles from "./recipeitem.module.css";

const RecipeItem = ({ recipe, onRecipeClick }) => {

  //console.log("recipe RecipeItem compoenent",recipe);
  return (

          <div className={styles.itemContainer}  key={recipe.id} >
            <img alt={recipe.title} src={recipe.image} className={styles.itemImage}/>
            <div className={styles.itemContent} >
              <p className={styles.itemName}>{recipe.title}</p>
            </div>
            
            <div className={styles.btnContainer}>
                <button className={styles.itemBtn} onClick={() => onRecipeClick(recipe.id)} >View Recipe Detail</button>
            </div>
          </div>
  );
};

export default RecipeItem;
