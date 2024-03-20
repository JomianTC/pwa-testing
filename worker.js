console.log( "Service Worker Works" );

const imageNotification = 
	"https://res.cloudinary.com/headlinr-events/image/upload/c_scale,w_450/v1683340781/Clients/starset/product_o7bnln.png";

const soundNotification = 
	"https://cdn.pixabay.com/audio/2021/08/04/audio_bb630cc098.mp3";

self.addEventListener( "push", event => {

	console.log( "Notificacion Recibida" );

	const data = event.data.json();

	console.log( "Notificacion Recibida" );
	self.registration.showNotification( data.title, {
		badge: imageNotification,
		icon: imageNotification,
		body: data.message,
		vibrate: [ 50,100,50,100,50,100,400,100,300,100,350,50,200,100,100,50,600 ]
	});
});