const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require('../models/Usuario');
const { generarJWT } = require("../helpers/jwt")

const crearUsuario = async (req, res = express.response) => {

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            });
        }
        usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        //Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
            error: error
        });
    }
};


const loginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y/o contrasena incorrectos"
            });
        }

        let validatePassword = bcrypt.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario y/o contrasena incorrectos"
            });
        }

        //Genera jwt
        const token = await generarJWT(usuario.id, usuario.name);

        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
            error: error
        });
    }

};


const revalidarToken = async (req, res = express.response) => {
    const uid = req.uid;
    const name = req.name;

    //Renovar token
    const token = await generarJWT(uid, name);
;

    res.status(200).json({
        ok: true,
        token,
    });
};





module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};