const express = require('express')
const mio_router = require('express').Router()
const mongo = require('mongodb').MongoClient
const path = require('path')
const codificaFun = require('./codificaPassword')


let instanzaApp = express()

// creare su heroku la variabile DB_CONNESSIONE coi dati di connessione
// che mongodb altals fornisce
const string_connessione = process.env.DB_CONNESSIONE || "mongodb://localhost:27017";


mio_router.use(express.urlencoded({ extended: true }))

mio_router.use(express.static(path.join(__dirname,"fileStatici")))



mio_router.post('/registraUtente', (richiesta, risposta) =>{

 console.log("sei in /registraUtente")

 dataBaseCollezione = instanzaApp.locals.collezioneDatiGlobali;




	const nomeUtente   = richiesta.body.utente
	const passwdUtente = richiesta.body.passwd
	const bodyPassCod  = richiesta.body.codificaPwd


	console.log("nome:     " + nomeUtente)
	console.log("passwd:   " + passwdUtente)
	console.log("codifica: " + bodyPassCod)

    if(bodyPassCod == 'codeIt')
	{
		// dataBaseCollezione.insert({ utente: nomeUtente, passwd: codificaFun(passwdUtente) })	

		// inserisce un untente solo se non esiste
		dataBaseCollezione.update(
									{utente: nomeUtente},
									{$set:{utente: nomeUtente, passwd: codificaFun(passwdUtente)  }},
									{ upsert: true}
		)
	}
     else
	 {

		 		// inserisce un untente solo se non esiste		 
		 		dataBaseCollezione.update(
									{utente: nomeUtente},
									{$set:{utente: nomeUtente, passwd: passwdUtente  }},
									{ upsert: true}
				 )

		//  dataBaseCollezione.insert({ utente: nomeUtente, passwd: passwdUtente })
	 }
	

	risposta.redirect('/login')


})

mio_router.post('/postLogIn', (richiesta, risposta) =>{
	console.log("sei nella route '/postLogIn' del server web" )

	const bodyFromNome = richiesta.body.utente 
	const bodyFromPass = richiesta.body.passwd

    collezioneDati = instanzaApp.locals.collezioneDatiGlobali;

	// collezioneDati.find({ utente: bodyFromNome , passwd: bodyFromPass })
	collezioneDati.find({$or: [ { utente: bodyFromNome , passwd: bodyFromPass }, 
								{ utente: bodyFromNome , passwd: codificaFun(bodyFromPass) }  
							  ] 
						})
	.toArray()
	.then(dati =>{


		if(Object.keys(dati).length)
		{
			datiSessione = richiesta.session         // prendo l'oggetto session e gli 
			datiSessione.nome = bodyFromNome		 // aggiungo/creo la propietà 'nome' e la valorizzo

			console.log("utente valido")
			console.log("IN POST, dati utente di sessione: " + datiSessione)
			risposta.render('paginaHome',{ datiSessione : datiSessione.nome })
			
		}
		else{
			console.log("utente NON valido")
			risposta.redirect("logOnInvalid.html")

			console.log(dati)

		}

	})

	console.log("nome:   " + bodyFromNome)
	console.log("passwd: " + bodyFromPass)

})



mongo.connect(string_connessione,{ useUnifiedTopology: true }, (errore, serverDB) =>{
	if(errore)
	 console.log("errore di connessione al db: " + errore.message)

const bancaDati = serverDB.db("login")	 
const collezione = bancaDati.collection("utenti_login")	 

instanzaApp.locals.collezioneDatiGlobali = collezione;


})

module.exports = mio_router;
