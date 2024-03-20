const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyc3VAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcwOTI1MTk4OCwiZXhwIjoxNzQxNjUxOTg4fQ.w904BqhazL9h2ynBkJKKxx2uoLUCUo_nyd5vrAGNlKA";
let llavePublica = "";
let register = "";
let subscription;

const backendURL = "https://km4vvlnd-8080.usw3.devtunnels.ms/api/notification";

const btnObtainKey = document.querySelector( "#ObtainKey" );
const btnRegister = document.querySelector( "#Register" );
const btnProcedureOne = document.querySelector( "#ProcedureOne" );
const btnProcedureTwo = document.querySelector( "#ProcedureTwo" );
const btnProcedureThree = document.querySelector( "#ProcedureThree" );

const registration = async () => {
	
	console.log("Registrando el Service Worker");
	
	register = await navigator.serviceWorker.register( "worker.js" )
		.then( registration => {
			console.log( "Service Worker registrado correctamente.", registration );
			return registration;
		})
		.catch( error => {
			console.error( "Error al registrar el Service Worker:", error );
			throw error;
		});
};

if ( "serviceWorker" in navigator ) registration().catch( err => console.log( err ) );
else console.error("Los Service Workers no son compatibles en este navegador.");

const urlBase64ToUint8Array = ( base64String ) => {

	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i)
		outputArray[i] = rawData.charCodeAt(i);

	return outputArray;
}

btnObtainKey.addEventListener( "click", async () => {

	console.log("Obteniendo la llave publica");
	
	const response = await fetch( backendURL + "/key", {
		method: "GET",
		headers: { "Authorization": "Bearer " + token }
	})
	.then( async response => {
		if ( !response.ok ) 
			throw await response.json()
			.then( data => { throw data; });
		return response.json();
	})
	.then( data => data )
	.catch( error => { throw error });

	llavePublica = response.publicKey;

	console.log( "Llave publica obtenida:", llavePublica );
});

btnRegister.addEventListener( "click", async () => {

	console.log( "Creando la suscripcion para notificaciones push" );

	if ( !register ) {
		console.error( "El Service Worker no está registrado." );
		return;
	}

	try {

		subscription = await register.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array( llavePublica )
		});
		
		console.log( "Subscripcion creada" );

	} catch ( error ) {
		console.error( "Error al crear la suscripción:", error );
		alert( "Error al crear la suscripción: " + error.message );
	}
});

btnProcedureOne.addEventListener( "click", async () => {

	alert( "Creando la suscripcion para el tramite 1" );

	try {
		
		const procedureID = "813df822-7c90-4bcd-a31b-170d86e33f8a";

		const response = await fetch( backendURL + "/subscription/" + procedureID, {
			method: "POST",
			body: JSON.stringify( subscription ),
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "application/json"
			}
		});

		if ( !response.ok ) throw await response.json();

		const data = await response.json();
		console.log( data.message );

	} catch ( error ) {
		console.error( "Error al crear la suscripción:", error );
		alert( "Error al crear la suscripción: " + error.message );
	}
});

btnProcedureTwo.addEventListener( "click", async () => {

	alert( "Creando la suscripcion para el tramite 2" );

	try {
		
		const procedureID = "04400c82-d698-47ef-8aec-4128c5f01333";

		const response = await fetch( backendURL + "/subscription/" + procedureID, {
			method: "POST",
			body: JSON.stringify( subscription ),
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "application/json"
			}
		});

		if ( !response.ok ) throw await response.json();

		const data = await response.json();
		console.log( data.message );

	} catch ( error ) {
		console.error( "Error al crear la suscripción:", error );
		alert( "Error al crear la suscripción: " + error.message );
	}
});

btnProcedureThree.addEventListener( "click", async () => {

	alert( "Creando la suscripcion para el tramite 3" );

	try {
		
		const procedureID = "17cab38c-20ff-432c-ba33-933e94186d40";

		const response = await fetch( backendURL + "/subscription/" + procedureID, {
			method: "POST",
			body: JSON.stringify( subscription ),
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "application/json"
			}
		});

		if ( !response.ok ) throw await response.json();

		const data = await response.json();
		console.log( data.message );

	} catch ( error ) {
		console.error( "Error al crear la suscripción:", error );
		alert( "Error al crear la suscripción: " + error.message );
	}
});

// http://localhost:8080/api/procedure/813df822-7c90-4bcd-a31b-170d86e33f8a
// http://localhost:8080/api/procedure/04400c82-d698-47ef-8aec-4128c5f01333
// http://localhost:8080/api/procedure/17cab38c-20ff-432c-ba33-933e94186d40
