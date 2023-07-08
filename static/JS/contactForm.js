const contactForm = document.getElementById('contactForm');
const inputs = document.querySelectorAll('#contactForm input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	mensaje: /^.{4,200}$/, //// Puede ingresar hasta 200 caracteres no importa q 
}
const email = {
	host: " smtp.elasticemail.com",
	username: "codoacodo6@gmail.com",
	password: "29B1DDEF440206EE4A74084C267B56987ED4",
	to: 'codoacodo6@gmail.com',
	from: "codoacodo6@gmail.com",
	subject: "Contacto desde la Pagina.",
}
const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	mensaje: false,
}

const validateContactForm = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
		// No valido el msj porq puede ser solo una suscripcion 
	}
}

const validarCampo = (expresion, input, campo) => {
	
 	if (expresion.test(input.value)  ){
		document.getElementById(`group__${campo}`).classList.remove('contactForm__wrongGroup');
		document.getElementById(`group__${campo}`).classList.add('contactForm__successGroup');
		document.querySelector(`#group__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#group__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__${campo} .contactForm__input-error`).classList.remove('contactForm__input-error-activo');
		campos[campo] = true;
		document.getElementById('contactForm__errorMessage').classList.remove('contactForm__activeMessage');
	} 
	else {
		document.getElementById(`group__${campo}`).classList.add('contactForm__wrongGroup');
		document.getElementById(`group__${campo}`).classList.remove('contactForm__successGroup');
		document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#group__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__${campo} .contactForm__input-error`).classList.add('contactForm__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validateContactForm);
	input.addEventListener('blur', validateContactForm);
});

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//
	
	if(campos.nombre && campos.correo && campos.telefono ){
		
		document.getElementById('contactForm__success-message').classList.add('contactForm__active-success-message');

		let nombre = document.getElementById('nombre').value;
		let correo = document.getElementById('correo').value;
		let telefono = document.getElementById('telefono').value;
		// var suscribe = document.getElementById("suscripcion");
		// if (suscribe.checked == true){
		// 	let suscripcion = 'Si';
		//   }
		// else{
		// 	let suscripcion = 'No';
		// }

		let suscripcion = (document.getElementById('suscripcion').checked?'Si':'No');
		//col === "screwdriver" ? " selected " : ""
		let mensaje = document.getElementById('mensaje').value;
		
		let bodyText = `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nSuscripcion: ${suscripcion}\nMensaje: ${mensaje}`;
	
		Email.send({
		  Host: email.host,
		  Username: email.username,
		  Password: email.password,
		  To: email.to + ',' + correo,
		  From: email.from,
		  Subject: email.subject,
		  Body: bodyText,

		})
		  .then(function (message) {
			console.log("Email enviado!!!!!")
		  });
	
		document.getElementById('contactForm__errorMessage').classList.remove('contactForm__activeMessage');
		contactForm.reset();
				
		// Mejoraria utilizando react
		campos.nombre = false;
		campos.correo = false;
		campos.telefono = false;

		setTimeout(() => {
			document.getElementById('contactForm__success-message').classList.remove('contactForm__active-success-message');
		}, 5000);

		document.querySelectorAll('.contactForm__successGroup').forEach((icono) => {
			icono.classList.remove('contactForm__successGroup');
		});
	} else {
		
		document.getElementById('contactForm__errorMessage').classList.add('contactForm__activeMessage');
	}
});

 function sendEmail() {

		let nombre = document.getElementById('nombre').value;
		let correo = document.getElementById('correo').value;
		let telefono = document.getElementById('telefono').value;
		let mensaje = document.getElementById('mensaje').value;
		
		let bodyText = `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nSuscripcion: ${suscripcion}\nMensaje: ${mensaje}`;
	
		Email.send({
		  Host: email.host,
		  Username: email.username,
		  Password: email.password,
		  To: email.to + ',' + correo,
		  From: email.from,
		  Subject: email.subject,
		  Body: bodyText,

		})
		  .then(function (message) {
			console.log("Email enviado!!!!!")
		  });
   }


