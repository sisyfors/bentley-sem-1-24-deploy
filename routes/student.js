const express = require('express');
const student = express.Router();
const joi = require('joi');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const {
    Project,
    Round,
    CapstoneStudent,
} = require("../models/index.js");

const verifyStudentSession = require('./auth').verifyStudentSession;

const validationSchemas = {
    getRoundSchema: joi.object({
        ID: joi.number().required(),
    }),
    getProjectSchema: joi.object({
        id: joi.number().required(),
    }),
    getProjectsSchema: joi.object({
        roundNum: joi.number().required(),
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

student.get('/project/:ID', validateParameters(validationSchemas.getProjectSchema), verifyStudentSession, async (req, res) => {
    const project = await Project.findOne({ ID: req.params.ID }).lean();

    if (project === null) {
        res.sendStatus(404);
    } else {
        delete project['ID'];
        delete project['IntendedSize'];

        const decodedToken = jwt.verify(req.cookies.token, process.env.WEB_TOKEN_KEY);
        const username = decodedToken.username;

        const user = await UCAccount.findOne({Username: username}).lean();

        if (user.Group === 0) {
            delete project['ClientEmail'];
        }

        console.log(project);
        res.status(200).json(project);
    }
});

student.get('/projects/:round', validateParameters(validationSchemas.getProjectSchema), verifyStudentSession, async (req, res) => {
    const projects = await Project.find({ Round: req.params.round }).lean();
    const round = await Round.findOne({ RoundNumber: req.params.round }).lean();

    if (round === null) {
        res.sendStatus(404);
    } else {
        const decodedToken = jwt.verify(req.cookies.token, process.env.WEB_TOKEN_KEY);
        const username = decodedToken.username;
        const user = await UCAccount.findOne({Username: username}).lean();

        projects.forEach((project) => {
            delete project['ID'];
            delete project['IntendedSize'];

            if (user.Group === 0) {
                delete project['ClientEmail'];
            }
        });

        res.status(200).json(projects);
    }
});

module.exports = student;