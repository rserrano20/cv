function revisar(elemento) {
	console.log('ejecutando la funcion revisar');
	// let elemento = document.getElementById('nombre');
	if (elemento.value == '') {
		elemento.className = 'form-control is-invalid';
		return false;
	} else {
		elemento.className = 'form-control is-valid';
		return true;
	}
}

function validarEmail(input) {
	//emilse@gmail.com expresion regular
	let expresion = /\w+@\w+\.[a-z]{2,}$/;
	if (input.value != '' && expresion.test(input.value)) {
		input.className = 'form-control is-valid';
		return true;
	} else {
		input.className = 'form-control is-invalid';
		return false;
	}
}

function validarNumeros(input) {
	//!verdadero ==> false
	if (input.value != '' && !isNaN(input.value)) {
		input.className = 'form-control is-valid';
		return true;
	} else {
		input.className = 'form-control is-invalid';
		return false;
	}
}

function validarConsulta(texto) {
	if (texto.value != '' && texto.value.length >= 10) {
		texto.className = 'form-control is-valid';
		return true;
	} else {
		texto.className = 'form-control is-invalid';
		return false;
	}
}

let checkTerminos = document.getElementById('terminos');

function validarCheckbox() {
	if (checkTerminos.checked) {
		checkTerminos.className = 'form-check-input is-valid';
		return true;
	} else {
		checkTerminos.className = 'form-check-input is-invalid';
		return false;
	}
}

//agregar un evento a un objeto html
checkTerminos.addEventListener('change', validarCheckbox);

function validarGeneral(event) {
	//con esta linea prevengo el refresh de la pagina
	event.preventDefault();
	console.log('Desde validar general');

	if (
		revisar(document.getElementById('nombre')) &&
		validarEmail(document.getElementById('email')) &&
		validarNumeros(document.getElementById('telefono')) &&
		validarConsulta(document.getElementById('consulta')) &&
		validarCheckbox()
	) {
        enviarEmail();
		
	} else {
		alert('Hay un error en el formulario');
	}
}

function enviarEmail() {
	let template_params = {
		from_name: document.getElementById('nombre').value,
        message_html: `Mensaje: ${document.getElementById('consulta').value} - Email: ${document.getElementById('email').value} - Telefono: ${document.getElementById('telefono').value}`
	};

	let service_id = 'default_service';
	let template_id = 'template_bKd57Ayo';
    emailjs.send(service_id, template_id, template_params).then(
        function (response){
            console.log("Respuesta cuando se envio correctamente" + response.status);
            document.getElementById('msjEnvio').className= "alert alert-primary my-4";
            document.getElementById('msjEnvio').innerText = "Su consulta fue enviada correctamente";
        }, function (error){
            console.log("Se produjo un error" +error);
            document.getElementById('msjEnvio').className= "alert alert-danger my-4";
            document.getElementById('msjEnvio').innerText = "Ocurrio un error en el envio";
        }
    )
}
