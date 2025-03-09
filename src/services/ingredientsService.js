const Ingredient = require('../database/ingredient');

const getAllIngredients = async (q) => {    
    try {
        const allIngredients = await Ingredient.getAllIngredients(q);
        return allIngredients;
    } catch (error) {
        throw error;
    }
}

const createNewIngredient = async (newIngredient) => {
    try {
        const createdIngredient = await Ingredient.createNewIngredient(newIngredient);
        return createdIngredient;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredients,
    createNewIngredient
};