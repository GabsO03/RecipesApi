const { v4: uuid } = require('uuid');
const Recipe = require('../database/recipe');
const { id } = require('apicache');
const { create } = require('domain');

const getAllRecipes = (filterParams) => {    
    try {
        const allRecipes = Recipe.getAllRecipes(filterParams);
        return allRecipes;
    } catch (error) {
        throw error;
    }
}

const getOneRecipe = (recipeId) => {
    try {
        const recipes = Recipe.getOneRecipe(recipeId);
        return recipes;
    } catch (error) {
        throw error;
    }
}

const createNewRecipe = (newRecipe) => {
    
    const recipeToInsert = {
        id: uuid(),
        ...newRecipe,
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    };

    try {
        const createdRecipe = Recipe.createNewRecipe(recipeToInsert);
        return createdRecipe;
    } catch (error) {
        throw error;
    }
    // res
    // .status(error?.status || 500)
    // .send({ status: "OK", data: createdRecipe });
    
}

const updateOneRecipe = (recipeId, changes) => {
    try {
        const updatedRecipe = Recipe.updateOneRecipe(recipeId, changes);
        return updatedRecipe;    
    } catch (error) {
        throw error;
    }
}

const deleteOneRecipe = (recipeId) => {

    Recipe.deleteOneRecipe(recipeId);
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe,
};