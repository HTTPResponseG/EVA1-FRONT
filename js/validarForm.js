document.getElementById("sushi-contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const erroresDiv = document.getElementById("errores");
    erroresDiv.innerHTML = "";

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmarEmail").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const confirmarContraseña = document.getElementById("confirmarContraseña").value;
    const rut = document.getElementById("rut").value.trim().toUpperCase();
    const direccion = document.getElementById("direccion").value.trim();
    const numeroCasa = document.getElementById("numeroCasa").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    let errores = [];

    // Validaciones
    if (nombre.length < 4) {
        errores.push("El nombre debe tener al menos 4 caracteres.");
    }

    if (apellido.length < 2) {
        errores.push("El apellido debe tener al menos 2 caracteres.");
    }

    if (!/^\d+$/.test(numeroCasa) || Number(numeroCasa) <= 0) {
        errores.push("El número de casa debe ser un número positivo.");
    }

    const telefonoLimpio = telefono.replace(/\s+/g, "");
    if (!/^\d{9}$/.test(telefonoLimpio)) {
        errores.push("El número telefónico debe contener exactamente 9 dígitos.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errores.push("El correo electrónico no es válido.");
    }

    if (email !== confirmarEmail) {
        errores.push("Los correos electrónicos no coinciden.");
    }

    const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contraseñaRegex.test(contraseña)) {
        errores.push("La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula y número.");
    }

    if (contraseña !== confirmarContraseña) {
        errores.push("Las contraseñas no coinciden.");
    }

    if (!validarRut(rut)) {
        errores.push("El RUT no es válido.");
    }

    if (direccion.length < 6) {
        errores.push("La dirección debe tener al menos 6 caracteres.");
    }

    // Mostrar errores
    if (errores.length > 0) {
        erroresDiv.innerHTML = errores.map(e => `<p>• ${e}</p>`).join("");
        return;
    }

    // Enviar datos simuladamente
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre, apellido, email, contraseña, rut, direccion, numeroCasa, telefono
            })
        });

        if (response.ok) {
            alert("Formulario enviado con éxito.");
            this.reset();
        } else {
            erroresDiv.textContent = "Error al enviar los datos.";
        }
    } catch (error) {
        erroresDiv.textContent = "Error de red al enviar los datos.";
    }
});

// Función para validar RUT chileno
function validarRut(rut) {
    rut = rut.replace(/\./g, "").replace("-", "");
    if (rut.length < 8) return false;

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv.toUpperCase() === dvEsperado;
}
