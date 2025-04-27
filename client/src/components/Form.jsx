import { Link } from "react-router-dom";
import Select from "react-select/creatable";
import { useState } from "react";

// max-w-[550px] : The form’s maximum width will never exceed 550px, no matter how wide the screen gets.
// mx-auto → Horizontally centers the form within its parent/container.
const Form = ({ isLoading, mutate, recipeData }) => {

  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading

    // 1.Create a FormData obj to grab form fields and their values - e.target is the entire <form> element.
    // 2.Convert the FormData into a regular JS obj so you can send it easily via axios or fetch.
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());


    //instructions are Array in json.data but user enters String so we need to convert it to Array
    newRecipe.instructions = newRecipe.instructions
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

      // Add ingredients to the result 
      newRecipe.ingredients = ingredients;


    // Send API Request
     mutate(newRecipe);
  };

 
  //When user submits the form like by clicking a "Submit" button, it will run a JS func called handleSubmit
  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
    >
      <Field label="Name">
        <input className="inp" name="recipeName" required defaultValue={recipeData?.recipeName}/>
      </Field>
      <Field label="Category">
        <input className="inp" name="category" required 
        defaultValue={recipeData?.category}/>
      </Field>
      <Field label="Ingredients">
        <Select 
          isMulti 
          value={ingredients.map((i)=> ({value:i, label:i}))}
          onChange={(options) => 
            setIngredients(options.map((opt) => opt.value))
         } />
      </Field>
      <Field label="Instructions">
        <textarea
          className="inp min-h-[80px] max-h-[300px]"
          name="instructions"
          required
          defaultValue={recipeData?.instructions}
        />
        <small className="text-gray-400 text-xs">
          Separate each instruction with a comma ( , )
        </small>
      </Field>

      <Field label="Time">
        <input className="inp" name="time" required defaultValue={recipeData?.time}/>
      </Field>
      <Field label="Servings">
        <input className="inp" name="servings" required />
      </Field>
      <Field label="Diet (Vegetarian, Vegan, Pescatarian, Non)">
        <input className="inp" name="diet" required />
      </Field>

      <div className="flex justify-end gap-6">
        <Link to="/" className="btn">
          Back
        </Link>
        <button 
          disabled={isLoading}
          className="btn bg-red-400 hover:bg-red-500" type="submit">
          {recipeData? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
export default Form;

// This is a React component called Field. It’s a reusable wrapper for form fields (like an <input>, <select>, etc.), so you don’t repeat the same structure everywhere. •children and label are props. Props are like inputs you give to a component. In React, children is a special built-in prop. It is whatever you put btw the opening and closing tags when you use this component.
// <Field label="Username">
//  <input className="inp" />
// </Field>
// children = <input className="inp" /> olur burda
//label is a custom prop that u send when using <Field label="Hi">. It's used to show the text for the field label.
//in rturn(), <label>{label}</label>: displays the label text that was passed as a prop. if label="Title" → this renders: <label>Title</label> .  {children}: renders whatever is passed inside the <Field> tag — usually an input field.

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      {children}
    </div>
  );
};
