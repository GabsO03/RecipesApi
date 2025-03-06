const { v4: uuid } = require('uuid');
const Ingredient = require('../database/ingredient');
const { id } = require('apicache');
const { create } = require('domain');

const getAllIngredients = (q) => {    
    try {
        const allIngredients = Ingredient.getAllIngredients(q);
        return allIngredients;
    } catch (error) {
        throw error;
    }
}

const createNewIngredient = (newIngredient) => {
    try {
        const createdIngredient = Ingredient.createNewIngredient(newIngredient);
        return createdIngredient;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredients,
    createNewIngredient
};