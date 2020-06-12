const express = require("express")
const server = express()
const path = require("path")


const gestione_get_router = require('./gestioneGetRouter')
const gestione_post_router = require('./gestionePostRouter')
const controlla_db = require('./controllaDB')
const sessione = require('express-session')



const PORTA = process.env.PORT || 3000 


server.use(sessione({
    secret: 'parola_segreta_per_codifica_dei_valori',
    resave: false,
    saveUninitialized: false,
}))


server.use(gestione_get_router)
server.use(gestione_post_router)
server.use(controlla_db)

server.use(express.urlencoded({ extended: true }))



server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname,"fileStatici")))



server.listen(PORTA, () =>{
console.log(`Server attivo alla porta ${ PORTA }`)
})