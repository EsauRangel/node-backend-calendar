const express = require("express")
const Evento = require("../models/Evento")



const getEventos = async (req, res = express.request) => {

    try {

        const eventos = await Evento.find().populate('user', 'name');
        return res.status(200).json({
            ok: true,
            eventos
        })

    } catch (error) {
        res.status.json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

const creatEvento = async (req, res = express.request) => {

    try {
        let event = new Evento(req.body);
        event.user = req.uid;

        const eventoGuardado = await event.save();

        return res.status(200).json({
            ok: true,
            eventoGuardado
        });

    } catch (error) {
        res.status.json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const actualizarEvento = async (req, res = express.request) => {

    try {
        const { id } = await req.params;
        const event = await Evento.findById(id);

        if (!event) {
            return res.status.json({
                ok: false,
                msg: "No tienes permisos para editar este recurso"
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status.json({
                ok: false,
                msg: "No existe el recurso"
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        };
        const eventUpdated = await Evento.findByIdAndUpdate(id, newEvent, { new: true });


        return res.status(200).json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

const eliminarEvento = async (req, res = express.request) => {

    const { id } = await req.params;
    const event = await Evento.findById(id);

    if (!event) {
        return res.status.json({
            ok: false,
            msg: "No tienes permisos para eliminar este recurso"
        });
    }

    if (event.user.toString() !== req.uid) {
        return res.status.json({
            ok: false,
            msg: "No existe el recurso"
        });
    }

    const eventUpdated = await Evento.findByIdAndDelete(id);


    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    getEventos, creatEvento, actualizarEvento, eliminarEvento
}