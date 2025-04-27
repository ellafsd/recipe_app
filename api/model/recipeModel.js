import fs from "fs";



// Read json file
export const readRecipes = () => {
    try {
        const text = fs.readFileSync("./utils/data.json", "utf-8");
        const data = JSON.parse(text);
        return data;
    }catch(error){
        console.log(error);
    }
};

//Return json file
export const writeRecipes = (data)=> {
    try {
        fs.writeFileSync("./utils/data.json", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}