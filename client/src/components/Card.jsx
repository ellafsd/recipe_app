import { Link } from "react-router-dom";
import { TbClockHour8 } from "react-icons/tb";

const Card = ({ recipe }) => {

  const getDietIcon = (diet) => {
    const d = diet.toLowerCase().trim();
    if (d === "vegan") return "🌱 Vegan";
    if (d === "vegetarian") return "🥦🥕 Vegetarian";
    if (d === "pescatarian") return "🐟 Pescatarian";
    return "❌ Not vegetarian, not vegan";
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="rounded-lg p-4">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="rounded-lg h-[150px] w-full object-cover"
        />

        <p className="absolute bottom-1 left-1 bg-red-400 text-white rounded-lg py-1 px-2 font-semibold flex items-center gap-2">
          <TbClockHour8 />
          <span> {recipe.time} minutes </span>
        </p>
      </div>

      <h2 className="my-3 text-xl font-semibold"> {recipe.recipeName} </h2>

      <p className="text-gray-500">{getDietIcon(recipe.diet)}</p>
      <p className="text-gray-500"> {recipe.category} </p>

      <p className="flex gap-2 mt-3 text-sm text-gray-500">
        <span>{recipe.ingredients[0]},</span>
        <span>{recipe.ingredients[1]}</span>
        <span className="text-gray-400">...</span>
      </p>
    </Link>
  );
};

export default Card;
