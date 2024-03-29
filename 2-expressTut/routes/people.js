const express = require('express')
const router = express.Router()

let {people} = require('../data')


router.get('/', (req, res) => {
    res.status(200).json({ sucess: true, data: people })
})

router.post('/', (req, res) => {
    const {name} = req.body
    if (!name){
       return res.status(401).json({sucess: false, msg: 'please provide value name'})
    }
    res.status(201).send({sucess: true, person: name})
})

router.post('/postman', (req, res) => {
    const {name} = req.body
    if (!name){
       return res.status(401).json({sucess: false, msg: 'please provide value name'})
    }
    res.status(201).send({sucess: true, data: [...people, name]})
})

router.put('/:id', (req, res)=> {
    const {id} = req.params
    const {name} = req.body
    const person = people.find((person) => person.id === Number(id)) 
    if (!person){
        return res.status(404).json({sucess: false, msg: `no person with that ${id}`})
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({sucess: true, data: newPeople})
})

router.delete('/:id', (req, res)=> {
    const person = people.find((person) => person.id === Number(req.params.id)) 
    if (!person){
        return res.status(404).json({sucess: false, msg: `no person with that ${req.params.id}`})
    }
    const newPeople = people.filter((person)=> person.id !== Number(req.params.id))
    return res.status(200).json({sucess: true, data: newPeople})
})

module.exports = router