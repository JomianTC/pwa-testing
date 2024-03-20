console.log( "Service Worker Works" );

const imageNotification = 
	"https://upload.wikimedia.org/wikipedia/commons/3/37/Arc_%28browser%29_logo.svg";

self.addEventListener( "push", event => {

	console.log( "Notificacion Recibida" );

	const data = event.data.json();

	console.log( "Notificacion Recibida" );
	self.registration.showNotification( data.title, {
		icon: imageNotification,
		body: data.message
	});
});