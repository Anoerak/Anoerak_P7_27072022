class RecipeCardModel {
  constructor(data) {
    this._appliance = data.appliance;
    this._ingredients = data.ingredients;
    this._name = data.name;
    this._time = data.time;
    this._ustensils = data.ustensils;
    this._description = data.description;
    this._serving = data.serving;
    this._id = data.id;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get time() {
    return this._time;
  }

  get description() {
    return this._description;
  }

  get serving() {
    return this._serving;
  }

  get appliance() {
    return this._appliance;
  }

  get ingredients() {
    return this._ingredients;
  }

  get ustensils() {
    return this._ustensils;
  }
  
}