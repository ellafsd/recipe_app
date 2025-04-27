import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isValid from "../utils/isValid.js";
import crypto from "crypto";


 // Read fresh data
const data = readRecipes();   

// Get All Food Recipes
export const getAllRecipes = (req, res) => {
  
   // CREATE A COPY OF DATA.JSON - WORK WITH COPY NOT TO CHANGE ORIGINAL VERSION
   let recipes = [...data];

   const search = req.query?.search?.toLowerCase();

  if (search) {
    recipes = data.filter((recipe) =>  //cloned data into recipes so filtering recipe
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.time - b.time
        : b.time - a.time
    );
  }

  res.status(200).json({
    message: `${recipes.length} result fetched successfully.`,
    results: recipes.length,
    recipes: recipes,
  });
};


// Add A New Recipe
export const createRecipe = (req, res) => {
  const data = readRecipes(); // Read fresh data
  let newRecipe = req.body;

  if (isValid(newRecipe)) {
    return res
      .status(404)
      .json({ message: "All fields must be filled out." });
  }

  //add id to the recipes
  newRecipe = {
    ...newRecipe, 
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`, };

  // Add recipe to the food array
  data.push(newRecipe);

  // Update json file after writing a new recipe in it
  writeRecipes(data);

  res.status(201).json({
    message: "Recipe added",
  });
};


// Get One Recipe
export const getOneRecipe = (req, res) => {
  res.status(200).json({   //No need to read data here(const data=readRecipes();)—checkId middleware took care of it
    message: "Recipe fetched successfully.",
    found: req.foundRecipe
  });
};  


// Delete A New Recipe
export const deleteRecipe = (req, res) => {
  const data = readRecipes();   // Read fresh data

  const index = data.findIndex( (i)=>i.id === req.params.id );
  //remove recipe 
  data.splice(index,1);
  //update data.json file
  writeRecipes(data);

  res.status(204).json({
  });
};


// Update A Recipe
export const updateRecipe = (req, res) => {
  const data = readRecipes(); // Read fresh data(Get the latest data from JSON)

  const updated = {...req.foundRecipe, ...req.body};   // Merge old + new data
  const index = data.findIndex( (i)=>i.id === req.params.id );   // Find where to replace
  data.splice(index,1,updated);  // replaces recipe at the found index with the updated version
  writeRecipes(data);    // update data.json

  res.status(200).json({
    message: "Recipe updated successfully.",
  });
};
