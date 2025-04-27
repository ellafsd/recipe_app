import { readRecipes } from "../model/recipeModel.js";


// KULLANICI ID GIREREK BELLI BIR TARIFI ALICAK. ONCE DATA.JSON'A GIDIP TEK TEK BAKARIZ KULLANICININ GIRDIGI ID HANGI RECIPE ILE UYUSUYOR
const checkId = (req, res, next) => {
  const data = readRecipes();
  const found = data.find((recipe) => recipe.id == req.params.id);

  if (!found) {
    return res.status(404).json({ message: "Recipe with that id not found" });
  }

  // Attach the found recipe to the request. foundRecipe ismini kendimiz verdik
     req.foundRecipe = found;
  // Continue to the next middleware or route handler- sorun yoksa sonraki adima devam et
      next();   
};
export default checkId;