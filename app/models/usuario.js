module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {	
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      contrasena: {
        type: Sequelize.STRING
      },
      rol: {
        type: Sequelize.INTEGER
      }
    });
  
    return Usuario;
  }
  