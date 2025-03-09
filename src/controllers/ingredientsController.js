const IngredientService = require('../services/ingredientsService');

const getAllIngredients = async (req, res) => {

    const { q } = req.query;

    try {
        const allIngredients = await IngredientService.getAllIngredients(q);
        res.send({ status: "OK", data: allIngredients });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }

}

const createNewIngredient = async (req,res) => {

    const body  = req.body;
    if (
        !body.name
    ) {
        res.status(400).send({ status: 'Missing fields', data: { error: 'Faltan datos de la ingrediente' }}
        )
        return;
    }
    const newIngredient = body.name;

    try {
        const createdIngredient = await IngredientService.createNewIngredient(newIngredient);
        res.status(201).send({ status: "OK", data: createdIngredient });
    } catch (error) {
        res
        .status( error?.status || 500 )
        .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}


module.exports = {
    getAllIngredients,
    createNewIngredient
};