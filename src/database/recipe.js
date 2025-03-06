const DB = require('./db.json');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');

const saveDatabase = (DB) => {
    fs.writeFileSync(dbPath, JSON.stringify(DB, null, 2), 'utf-8');
}


const filtrado = (entrada, atributo) => {
    const entradas = entrada.split(',').map((ent) => ent.toLowerCase());

    const resultado = DB.recipes.filter((recipe) => {
        //Pasamos los atributos de esta receta a minuscula

        //Por si es el nombre
        if (atributo === 'name') {
            return entradas.filter((_ent) => 
                recipe.name.toLowerCase().includes(_ent)
            ).length > 0
        }

        const atributoMinus = recipe[atributo].map((attr) => attr.toLowerCase());

        return entradas.filter((_ent) =>
            atributoMinus.filter((recCat) => recCat.includes(_ent)).length > 0
        ).length > 0
    });

    return resultado;
}

const getAllRecipes = (filterParams) => {
    try {
        let recipes = DB.recipes;

        //Vamos a hacer que se filtre por todo
        if (filterParams.q) {//Si hay algún filtro 'q'
            
            //Filtramos por tiempo
            let porTiempo;
            if (!isNaN(filterParams.q)) {
                const tiempo = filterParams.q + ' minutos';
                porTiempo = recipes.filter((recipe) => recipe.time == tiempo);
            }

            //Por nombre
            const porNombre = filtrado(filterParams.q, 'name');

            //Filtramos por categoria
            const porCategoria = filtrado(filterParams.q, 'categories');

            //Filtramos por ingredientes
            const porIngredientes = filtrado(filterParams.q, 'ingredients');


            //Unimos los tres por si alguno coincide
            let nuevoArray = [];
            if (porNombre) nuevoArray = porNombre;
            if (porTiempo) nuevoArray = nuevoArray.concat(porTiempo);
            if (porCategoria) nuevoArray = nuevoArray.concat(porCategoria);
            if (porIngredientes) nuevoArray = nuevoArray.concat(porIngredientes);
            console.log(nuevoArray);

            //Eliminamos duplicados convirtiendo a set y se lo metemos a recipes
            const eliminador = new Set(nuevoArray);

            recipes = Array.from(eliminador);
        }

        if (filterParams.limit && parseInt(filterParams.limit) < recipes.length) {
            recipes.splice(0, parseInt(filterParams.limit))
        }

        return recipes;
    } catch (error) {
        console.log('Hubo un error');
        throw { status: 500, message: error }
    }
}

const getOneRecipe = (recipeId) => {

    try {
        const recipe = DB.recipes.find((recipe) => recipe.id == recipeId);
        if (!recipe) {
            throw {
                status: 400,
                message: 'Can`t find recipe with the id ' + recipeId
            };
        }
        return recipe;
    } catch (error) {
        throw { status: error?.status || 580, message: error?.message || error };
    }
}

const createNewRecipe = (newRecipe) => {

    const yaExiste = DB.recipes.findIndex((recipe) => recipe.name == newRecipe.name) > -1;

    if (yaExiste) {
        throw {
            status: 400,
            message: `Recipe with name '${newRecipe.name}' already exists`
        }
    }

    try {
        DB.recipes.unshift(newRecipe); //Esto para que lo añada al inicio
        saveDatabase(DB);
        return newRecipe;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

const updateOneRecipe = (recipeId, changes) => {

    try {
        const isAlreadyAdded = DB.recipes.findIndex((recipe) => recipe.name == changes.name && recipe.id != recipeId) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Recipe with the name ${changes.name} already exists`
            }
        }

        const indexForUpdate = DB.recipes.findIndex((recipe) => recipe.id == recipeId);
        
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find recipe with the id ${recipeId}`
            };
        }

        const updatedRecipe = {
            ...DB.recipes[indexForUpdate],
            ...changes,
            updatedAt: new Date().toISOString()
        }

        DB.recipes[indexForUpdate] = updatedRecipe;
        saveDatabase(DB);
        return updatedRecipe;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }


    if (indexForUpdate === -1) {
        throw {
            status: 400,
            message: 'Recipe with the name ' + changes.name + alread
        }
    }
    

    //TODO esta mmda
    const updatedRecipe = {
        ...DB.recipes[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    
    DB.recipes[indexForUpdate] = updatedRecipe;
    saveDatabase(DB);
    return updatedRecipe;
}

const deleteOneRecipe = (recipeId) => {
    const indexForDeletion = DB.recipes.findIndex((recipe) => recipe.id == recipeId);

    if (indexForDeletion === -1) {
        return;
    }

    DB.recipes.splice(indexForDeletion, 1);
    saveDatabase(DB);
} 

module.exports = { 
    getAllRecipes,
    createNewRecipe,
    getOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
 }