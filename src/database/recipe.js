const pool = require('../config/connection_db');

const getAllRecipes = async (filterParams) => {
    try {
        let query = `SELECT * FROM recipes`;
        const values = [];
        const timeRegex = /\d+/; //Esto para ver si hay algún número que indique tiempo en el filtro

        //Filtrado por nombre, ingredientes, tags y tiempo
        if (filterParams.q) {
            const filtro = filterParams.q.toLowerCase(); //Esto para evitar confusiones

            query = query.concat(' WHERE name ILIKE $1 OR tags @> ARRAY[$2]');//ILIKE con I de insensitive para que ignore la mayúscula

            query = query.concat(' OR EXISTS (SELECT 1 FROM jsonb_array_elements_text(ingredients) elem WHERE elem LIKE $3)'); //Esto porque en mi bbdd guardo un json para los ingredientes

            values.push(`%${filtro}%`, [filtro], `%${filtro}%`);

            if (timeRegex.test(filtro)) {
                const tiempo = filtro.match(timeRegex)[0]; //Esto para sacarlo de la cadena
                query = query.concat(' OR time = $4');
                values.push(`${tiempo} minutos`);
            }
        }

        query = query.concat(' ORDER BY created_at DESC'); //Para que me salga el más nuevo primero

        if (filterParams.limit) { //Ya no comprueba el length porque la BBDD no da problema con eso
            query = query.concat(` LIMIT ${parseInt(filterParams.limit)}`);
        }

        const recipes = await pool.query(query, values);
        return recipes.rows;
    } catch (error) {
        throw error;
    }
}

const getOneRecipe = async (recipeId) => {
    try {
        const query = 'SELECT * FROM recipes WHERE id = $1';
        const values = [recipeId];
        const recipe = await pool.query(query, values);
        if (recipe.rows.length === 0) {
            throw new Error('Recipe not found');
        }
        return recipe.rows[0];
    } catch (error) {
        throw error;
    }
}

const createNewRecipe = async (recipe) => {
    const query = `
    INSERT INTO recipes (id, name, description, ingredients, tags, time, instructions, alt_img, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    RETURNING *;
    `;

    const values = [
        recipe.id,
        recipe.name,
        recipe.description,
        JSON.stringify(recipe.ingredients),
        recipe.tags,
        recipe.time,
        recipe.instructions,
        recipe.alt_img
    ];

    try{
        const respuesta = await pool.query(query, values);
        console.log('Receta insertada:', respuesta.rows[0]);
        return respuesta.rows[0];
    }catch(error){
        throw error;
    }
}

const updateOneRecipe = async (recipeId, changes) => {
    try {
        const recipeForUpdate = await getOneRecipe(recipeId);
        
        if (!recipeForUpdate) {
            throw { status: 404, message: `Recipe with ID ${recipeId} not found` };
        }

        const updatedRecipe = {
            ...recipeForUpdate,
            ...changes,
            ingredients: changes.ingredients ?? recipeForUpdate.ingredients,
            updatedAt: new Date().toISOString()
        };

        const query = `
            UPDATE recipes
            SET name = $1, description = $2, ingredients = $3, tags = $4, time = $5, instructions = $6, alt_img = $7, updated_at = NOW()
            WHERE id = $8
            RETURNING *;
        `;

        const values = [
            updatedRecipe.name,
            updatedRecipe.description,
            JSON.stringify(updatedRecipe.ingredients),
            updatedRecipe.tags,
            updatedRecipe.time,
            updatedRecipe.instructions,
            updatedRecipe.alt_img,
            recipeId
        ];

        const respuesta = await pool.query(query, values);

        if (respuesta.rows.length === 0) {
            throw new Error ('Receta no encontrada para actualizar');
        }

        return respuesta.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteOneRecipe =  async (recipeId) => {
    try {
        const recipeFound = await getOneRecipe(recipeId);

        if (!recipeFound) {
            throw {status: 404, message: `Recipe with ID ${recipeId} not found`}
        }

        const query = `Delete from recipes where id = $1 RETURNING *;`;
        const respuesta = await pool.query(query, [recipeId]);

        if (respuesta.rows.length === 0) {
            throw { status: 404, message: `Recipe could not be deleted` };
        }

        return respuesta.rows[0];
    } catch (error) {
        throw error;
    }
} 

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe
}


/*  
// Actualizar una receta por su ID
const updateOneRecipe = async (recipeId, changes) => {
    try {
        const { name, description, ingredients, tags, time, instructions, alt_img } = changes;

        const query = `
            UPDATE recipes
            SET name = $1, description = $2, ingredients = $3, tags = $4, time = $5, instructions = $6, alt_img = $7, updated_at = NOW()
            WHERE id = $8
            RETURNING *;
        `;

        const values = [name, description, JSON.stringify(ingredients), tags, time, instructions, alt_img, recipeId];
        const respuesta = await pool.query(query, values);

        if (respuesta.rows.length === 0) {
            throw { status: 404, message: 'Receta no encontrada para actualizar' };
        }

        return respuesta.rows[0];
    } catch (error) {
        console.error('Error al actualizar receta:', error);
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

// Eliminar una receta por su ID
const deleteOneRecipe = async (recipeId) => {
    try {
        const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *';
        const values = [recipeId];
        const respuesta = await pool.query(query, values);

        if (respuesta.rows.length === 0) {
            throw { status: 404, message: 'Receta no encontrada para eliminar' };
        }

        return respuesta.rows[0];
    } catch (error) {
        console.error('Error al eliminar receta:', error);
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = { 
    getAllRecipes,
    getOneRecipe,
    createNewRecipe,
    updateOneRecipe,
    deleteOneRecipe
};

*/