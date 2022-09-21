//dependencies
const bands = require('express').Router()
const { application } = require('express')
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Time } = db
const { Op } = require('sequelize')
const meet_greet = require('../models/meet_greet')

//find all bands

bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

//show route

bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_Greet,
                    as: "meet_greet",
                    include: {
                        model: Event, as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: Set_Time,
                    as: "set_time",
                    include: {
                        model: Event, as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

//post route

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: "Successfully inserted new band",
            data: newBand
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

//put route

bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: { band_id: req.params.id }
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//delete route

bands.delete('/:id', async (req, res) => {
    try {
        const deleteBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//export
module.exports = bands