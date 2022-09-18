//dependencies
const bands = require('express').Router()
const { application } = require('express')
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

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

bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
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