//dependencies
const stages = require('express').Router()
const { application } = require('express')
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

//find all stages

stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [['stage_id', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//show route

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//post route

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: "Successfully inserted new stage",
            data: newStage
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

//put route

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: { stage_id: req.params.id }
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//delete route

stages.delete('/:id', async (req, res) => {
    try {
        const deleteStages = await Stage.destroy({
            where: {
                Stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//export
module.exports = stages