const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length < 3 ) {
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]
const url = `mongodb+srv://samuliej:${password}@cluster0.v6byrc8.mongodb.net/peopleData?retryWrites=true&w=majority`
mongoose.connect(url)

if (process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
} else {

    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
        name: newName,
        number: newNumber
    })

    person.save().then(result => {
        console.log('Added ' + newName + ' number: ' + newNumber + ' to the phonebook')
        mongoose.connection.close()
    })
}