module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false, 
    	defaultValue: false
    }
  }, {
  	timestamps: false
  });
  return Burger;
}
