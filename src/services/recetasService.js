const { v4: uuid } = require('uuid');
const Recipe = require('../database/recipe');

const getAllRecipes = async (filterParams) => {    
    try {
        const allRecipes = await Recipe.getAllRecipes(filterParams);
        return allRecipes;
    } catch (error) {
        throw error;
    }
}

const getOneRecipe = async (recipeId) => {
    try {
        const recipes = await Recipe.getOneRecipe(recipeId);
        return recipes;
    } catch (error) {
        throw error;
    }
}

const createNewRecipe = async (newRecipe) => {
    
    const recipeToInsert = {
        id: uuid(),
        ...newRecipe,
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    };

    try {
        const createdRecipe = await Recipe.createNewRecipe(recipeToInsert);
        return createdRecipe;
    } catch (error) {
        throw error;
    }
}

const updateOneRecipe = async (recipeId, changes) => {
    try {
        const updatedRecipe = await Recipe.updateOneRecipe(recipeId, changes);
        return updatedRecipe;    
    } catch (error) {
        throw error;
    }
}

const deleteOneRecipe = async (recipeId) => {
    try {
        await Recipe.deleteOneRecipe(recipeId);   
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe,
};