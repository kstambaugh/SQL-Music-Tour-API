//dependencies
const events = require('express').Router()
const { application } = require('express')
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

//find all events

events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents
        )
    } catch (error) {
        res.status(500).json(error)
    }
})

//show route

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//post route

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: "Successfully inserted new event",
            data: newEvent
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

//put route

events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: { event_id: req.params.id }
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedEvents} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//delete route

events.delete('/:id', async (req, res) => {
    try {
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteEvents} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)

    }
})

//export
module.exports = events