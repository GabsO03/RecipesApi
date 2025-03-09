const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');      
const v1RecipeRouter = require('./v1/routes/recetasRoutes');
const v1IngredientRouter = require('./v1/routes/ingredientsRoutes');
const v1UserRouter = require('./v1/routes/usuariosRoutes');

const app=express();
const PORT = process.env.PORT || 3000 

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/recipes', v1RecipeRouter);
app.use('/api/v1/ingredients', v1IngredientRouter);
app.use('/api/v1/users', v1UserRouter);

// For testing pusposes
// app.get('/', (req, res) => res.send('<H1>Hello World!</H1>'))

app.listen(PORT, () => console.log(`BACKEND FUNCIONANDO EN EL PUERTO ${PORT}!`));