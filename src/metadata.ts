/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [], "controllers": [[import("./pizzas/pizzas.controller"), { "PizzasController": { "findAll": { type: String }, "findOne": { type: String }, "findIngredient": { type: String }, "create": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./burgers/burgers.controller"), { "BurgersController": { "findAll": { type: String }, "findOne": { type: String }, "findIngredient": { type: String }, "create": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};