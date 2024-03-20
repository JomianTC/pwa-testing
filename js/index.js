const PUBLIC_VAPID_KEY =
	"BEd5LmpqRXdR6X2GCnZ4pNBci-bPLZO9ZWjSCI_c4O0moDWu2FKnCzZfsgpjklVdIO4bPl7jkpAphwYTHTdGEH8";

let register = "";

const subscription = async () => {
	
	console.log( "Registrando el Service Worker" );
	register = await navigator.serviceWorker.register( "worker.js", {
		scope: "/"
	});

	console.log( "Service Worker Registrado" );
};

const urlBase64ToUint8Array = ( base64String ) => {

	const padding = "=".repeat(( 4 - ( base64String.length % 4 )) % 4 );
	const base64 = ( base64String + padding ).replace( /-/g, "+" ).replace( /_/g, "/" );

	const rawData = window.atob( base64 );
	const outputArray = new Uint8Array( rawData.length );

	for ( let i = 0; i < rawData.length; ++i )
		outputArray[ i ] = rawData.charCodeAt( i );
	
	return outputArray;
}

const boton = document.querySelector( "#boton" );

boton.addEventListener( "click", async () => {

	alert( "Creando la suscripcion para notificaciones push" );

	console.log( "Creando la suscripcion para notificaciones push" );
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array( PUBLIC_VAPID_KEY )
	});
	const procedureID = "813df822-7c90-4bcd-a31b-170d86e33f8a";


	console.log( "Subscripcion creada" );

	const response = await fetch( "api/notification/subscription/" + procedureID, {
		method: "POST",
		body: JSON.stringify( subscription ),
		headers: {
			"Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyc3VAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcwOTI1MTk4OCwiZXhwIjoxNzQxNjUxOTg4fQ.w904BqhazL9h2ynBkJKKxx2uoLUCUo_nyd5vrAGNlKA",
			"Content-Type": "application/json"
		}
	})
	.then( async response => {
		if ( !response.ok ) 
			throw await response.json()
			.then( data => { throw data; });
		return response.json();
	})
	.then( data => data)
	.catch( error => { throw error });

	console.log( response.message );
	console.log( "Subscripcion creada" );
});

// Verificacion del service Worker
if ( "serviceWorker" in navigator )
	subscription().catch( err => console.log( err ) );
