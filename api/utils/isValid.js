const reqFields = [
    "recipeName",
    "category",
    "ingredients",
    "instructions",
    "time",
    "servings",
    "diet"
];


// USER SHOULD ENTER EACH KEY-VALUE
const isValid = (data) => {
    return reqFields.some( (field)=>!data[field] );  //if there is no field in data that user will enter
};

export default isValid;
