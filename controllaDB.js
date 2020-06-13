const express = require('express');
const modulo_gestisci_db  = express();

const mongo = require('mongodb').MongoClient

let instanzaApp = express()

// creare su heroku la variabile DB_CONNESSIONE coi dati di connessione
// che mongodb altals fornisce
const string_connessione = process.env.DB_CONNESSIONE || "mongodb://localhost:27017";


modulo_gestisci_db.post('/mostraDB', (richiesta, risposta) =>{
	console.log("sei in mostraDB")

	datiDb = instanzaApp.locals.datiGlobaliCollezione



	datiDb.find({})
	.toArray()
	.then(dati =>{
		risposta.render('controllaDB', { dati: dati })
	})

	
})




modulo_gestisci_db.post('/creaDB', (richiesta, risposta) =>{
	console.log("sei in creaDB")

	datiDb = instanzaApp.locals.datiGlobaliCollezione


datiDb.remove({})

		setTimeout(()=>{

					datiDb.insert([
									{ 
										utente: "giuseppe",
										passwd: "tarallo",
									},
									{ 
										utente: "Dennis",
										passwd: "Ritchie",
									},
									{ 
										utente: "Kenneth",
										passwd: "Thompson",
									},
									{ 
										utente: "Anna",
										passwd: "Ciob",
									}
								]

					)

		}, 500)



		setTimeout(()=>{

					datiDb.find({})
					.toArray()
					.then( dati =>{
						risposta.render('controllaDB', { dati: dati })
					})

		}, 777)


	

})



modulo_gestisci_db.get('/creaDB', (richiesta, risposta) =>{
	console.log("sei in creaDB ::GET")
			risposta.render('controllaDB' ,{ dati: ''})


})


modulo_gestisci_db.get('/mostraDB', (richiesta, risposta) =>{
	console.log("sei in mostradb ::GET")
			risposta.render('controllaDB', {dati: ''})


})


modulo_gestisci_db.get('/controllaDB', (richiesta, risposta) =>{
	console.log("sei in controllaDB ::GET")
			risposta.render('controllaDB', {dati: ''})


})

modulo_gestisci_db.get('*', (richiesta, risposta) =>{
	console.log("sei in /")
			risposta.render('fileNotFound')


})



mongo.connect(string_connessione,{ useUnifiedTopology: true }, (errore, serverDB) =>{

	if(errore)
	 console.log("errore: " + errore.message)

	 bancaDati  = serverDB.db("login")
	 collezione = bancaDati.collection("utenti_login")

	 instanzaApp.locals.datiGlobaliCollezione = collezione;

})


module.exports = modulo_gestisci_db