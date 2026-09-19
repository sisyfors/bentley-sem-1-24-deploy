const express = require('express');
const student = express.Router();
const joi = require('joi');
require("dotenv").config();

const {
    Round
} = require("../models/index.js");

const verifyStudentSession = require('./auth').verifyStudentSession;

const validationSchemas = {
    getRoundSchema: joi.object({
        ID: joi.number().required(),
    }),
};

const validateParameters = (schema, property) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.params);

        if (error == null) {
            next();
        } else {
            const { details } = error;
            const errorMsg = details.map(error => error.message).join(',');

            res.status(422).json({ message: errorMsg });
        }
    };
};

student.get('/rounds', verifyStudentSession, async (req, res) => {
    const rounds = await Round.find().lean();
    res.status(200).json(rounds);
});

student.get('/round/:ID', validateParameters(validationSchemas.getRoundSchema), verifyStudentSession, async (req, res) => {
    const round = await Round.findOne({ RoundNumber: req.params.ID }).lean();

    if (round === null) {
        res.sendStatus(404);
    } else {
        res.status(200).json(round);
    }
});

module.exports = student;