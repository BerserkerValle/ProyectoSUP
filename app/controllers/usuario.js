const db = require('../config/db.config.js');
const Usuario = db.Usuario;

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre = req.body.nombre;
        usuario.contrasena = req.body.contrasena;
        usuario.rol = req.body.rol;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;

    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario encontrado con id = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el usuario con id = " + usuarioId
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el usuario",
                error: error.message
            });
        });
}

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                contrasena: req.body.contrasena,
                rol: req.body.rol
            }

            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el usuario con id = " + usuarioId,
                    error: "No se pudo actualizar"
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito con id = " + usuarioId,
                usuario: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + usuarioId,
            error: error.message
        });
    }
}

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404"
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + usuarioId,
            error: error.message
        });
    }
}
