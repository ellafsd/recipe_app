import express from "express";
import { getAllRecipes, getOneRecipe, updateRecipe, createRecipe, deleteRecipe } from "../controllers/recipeController.js";
import checkId from "../middleware/checkId.js";


// Router -> helps create route in server.js
const router = express.Router();

// Endpoints for recipes.  Handles GET and POST requests
router.route("/api/v1/recipes").get(getAllRecipes).post(createRecipe);

// Handles GET, PATCH, and DELETE 
router.route("/api/v1/recipes/:id").get(checkId, getOneRecipe).patch(checkId, updateRecipe).delete(checkId, deleteRecipe);

export default router;