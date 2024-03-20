console.log( "Service Worker Works" );

const imageNotification = 
	"https://upload.wikimedia.org/wikipedia/commons/3/37/Arc_%28browser%29_logo.svg";

const soundNotification = 
	"https://cdn.pixabay.com/audio/2021/08/04/audio_bb630cc098.mp3";

self.addEventListener( "push", event => {

	console.log( "Notificacion Recibida" );

	const data = event.data.json();

	console.log( "Notificacion Recibida" );
	self.registration.showNotification( data.title, {
		badge: imageNotification,
		body: data.message,
		vibrate: [ 50,100,50,100,50,100,400,100,300,100,350,50,200,100,100,50,600 ]
	});
});