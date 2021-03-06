const express = require('express')
const mio_router =  require('express').Router()


let instanzaApp = express()

let datiSessione = ''

instanzaApp.set('view engine','ejs')


 mio_router.get('/', (richiesta, risposta) =>{
	console.log("sei nella route '/' del server web" )
    risposta.render('controllaApp',{ datiSessione })
})


mio_router.get('/login', (richiesta, risposta) =>{
	console.log("sei nella route '/login' del server web" )
	// risposta.render('login')
	risposta.redirect('/login.html')
})


mio_router.get('/paginaHome', (richiesta, risposta) =>{
	console.log("sei nella route '/paginaHome' del server web" )


	console.log("utente della sessione: ", richiesta.session.nome)

    datiSessione = richiesta.session.nome;
	risposta.render("paginaHome", { datiSessione })
})


mio_router.get('/controllaDB', (richiesta, risposta) =>{
	console.log("sei nella route '/controllaDB' del server web" )
	risposta.render("controllaDB", { dati: '', datiSessione })
})



mio_router.get('/distruggiSessione', (richiesta, risposta) =>{
	console.log("sei nella route '/distruggiSessione' del server web" )

	datiSessione = richiesta.session.nome = 'distrutta';
	risposta.redirect("/login.html")
	// risposta.render('login', { datiSessione })
})





module.exports = mio_router