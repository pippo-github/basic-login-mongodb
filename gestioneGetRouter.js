const express = require('express')
const mio_router =  require('express').Router()


let instanzaApp = express()

let datiSessione = ''

instanzaApp.set('view engine','ejs')


/* mio_router.get('/', (richiesta, risposta) =>{
	console.log("sei nella root '/' del server web" )
	risposta.render('controllaApp',{ datiSessione })
}) */

mio_router.get('/login', (richiesta, risposta) =>{
	console.log("sei nella root '/login' del server web" )
	risposta.render('login')
})


mio_router.get('/paginaHome', (richiesta, risposta) =>{
	console.log("sei nella root '/paginaHome' del server web" )


	console.log("utente della sessione: ", richiesta.session.nome)

    datiSessione = richiesta.session.nome;
	risposta.render("paginaHome", { datiSessione })
})


mio_router.get('/controllaDB', (richiesta, risposta) =>{
	console.log("sei nella root '/controllaDB' del server web" )
	risposta.render("controllaDB", { dati: '', datiSessione })
})



mio_router.get('/distruggiSessione', (richiesta, risposta) =>{
	console.log("sei nella root '/distruggiSessione' del server web" )

	datiSessione = richiesta.session.nome = 'distrutta';
	risposta.render('login', { datiSessione })
})





module.exports = mio_router