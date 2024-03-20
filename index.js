const PUBLIC_VAPID_KEY =
	"BEd5LmpqRXdR6X2GCnZ4pNBci-bPLZO9ZWjSCI_c4O0moDWu2FKnCzZfsgpjklVdIO4bPl7jkpAphwYTHTdGEH8";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyc3VAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcwOTI1MTk4OCwiZXhwIjoxNzQxNjUxOTg4fQ.w904BqhazL9h2ynBkJKKxx2uoLUCUo_nyd5vrAGNlKA";			
let register = "";

const subscription = async () => {
    console.log("Registrando el Service Worker");
    register = await navigator.serviceWorker.register("worker.js")
        .then(registration => {
            console.log('Service Worker registrado correctamente.', registration);
            return registration;
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
            throw error; // Lanzamos el error para que sea capturado por el catch externo
        });

    console.log("Service Worker Registrado");
};

const boton = document.querySelector("#boton");

boton.addEventListener("click", async () => {
    alert("Creando la suscripcion para notificaciones push");
    console.log("Creando la suscripcion para notificaciones push");

    // Verificar que el Service Worker está registrado
    if (!register) {
        console.error("El Service Worker no está registrado. Por favor, registra el Service Worker antes de suscribirte a las notificaciones push.");
        return;
    }

    try {
        // Crear la suscripción
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });
        const procedureID = "813df822-7c90-4bcd-a31b-170d86e33f8a";

        console.log("Subscripcion creada");

        // Enviar la suscripción al servidor
        const response = await fetch("api/notification/subscription/" + procedureID, {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw await response.json();
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Error al crear la suscripción:", error);
        alert("Error al crear la suscripción: " + error.message);
    }
});

// Verificación del Service Worker
if ("serviceWorker" in navigator) {
    subscription().catch(err => console.log(err));
} else {
    console.error("Los Service Workers no son compatibles en este navegador.");
}

console.log("Service Worker Works");

const urlBase64ToUint8Array = ( base64String ) => {

	const padding = "=".repeat(( 4 - ( base64String.length % 4 )) % 4 );
	const base64 = ( base64String + padding ).replace( /-/g, "+" ).replace( /_/g, "/" );

	const rawData = window.atob( base64 );
	const outputArray = new Uint8Array( rawData.length );

	for ( let i = 0; i < rawData.length; ++i )
		outputArray[ i ] = rawData.charCodeAt( i );
	
	return outputArray;
}