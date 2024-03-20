const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyc3VAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcwOTI1MTk4OCwiZXhwIjoxNzQxNjUxOTg4fQ.w904BqhazL9h2ynBkJKKxx2uoLUCUo_nyd5vrAGNlKA";
let llavePublica = "";
let register = "";

const backendURL = "https://km4vvlnd-8080.usw3.devtunnels.ms/api/notification";

const btnObtainKey = document.querySelector( "#ObtainKey" );
const btnRegister = document.querySelector( "#Register" );
const btnProcedureOne = document.querySelector( "#ProcedureOne" );
const btnProcedureTwo = document.querySelector( "#ProcedureTwo" );
const btnProcedureThree = document.querySelector( "#ProcedureThree" );

const subscription = async () => {
	
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

if ( "serviceWorker" in navigator ) subscription().catch( err => console.log( err ) );
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
		method: "POST",
		body: JSON.stringify(subscription),
		headers: {
			"Authorization": "Bearer " + token,
			"Content-Type": "application/json"
		}
	})
	.then( async response => {
		if ( !response.ok ) 
			throw await response.json()
			.then( data => { throw data; });
		return response.json();
	})
	.then( data => data )
	.catch( error => { throw error });

	console.log( response.message );
});

// boton.addEventListener("click", async () => {

// 	alert("Creando la suscripcion para notificaciones push");
// 	console.log("Creando la suscripcion para notificaciones push");

// 	// Verificar que el Service Worker está registrado
// 	if (!register) {
// 		console.error("El Service Worker no está registrado. Por favor, registra el Service Worker antes de suscribirte a las notificaciones push.");
// 		return;
// 	}

// 	try {
// 		// Crear la suscripción
// 		const subscription = await register.pushManager.subscribe({
// 			userVisibleOnly: true,
// 			applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
// 		});
// 		const procedureID = "813df822-7c90-4bcd-a31b-170d86e33f8a";

// 		console.log("Subscripcion creada");

// 		// Enviar la suscripción al servidor
// 		const response = await fetch( backendURL + "notification/subscription/" + procedureID, {
// 			method: "POST",
// 			body: JSON.stringify(subscription),
// 			headers: {
// 				"Authorization": "Bearer " + token,
// 				"Content-Type": "application/json"
// 			}
// 		});

// 		// Verificar si la respuesta fue exitosa
// 		if (!response.ok) {
// 			throw await response.json();
// 		}

// 		const data = await response.json();
// 		console.log(data.message);
// 	} catch (error) {
// 		console.error("Error al crear la suscripción:", error);
// 		alert("Error al crear la suscripción: " + error.message);
// 	}
// });
