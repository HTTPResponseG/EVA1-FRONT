document.addEventListener('DOMContentLoaded', () => {
const botones = document.querySelectorAll('.btn-pedir');
const alertContainer = document.getElementById('alert-container');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
    const titulo = boton.parentElement.querySelector('.card-title').textContent;

    const alerta = document.createElement('div');
    alerta.className = 'alert alert-success alert-dismissible fade show';
    alerta.role = 'alert';
    alerta.innerHTML = `
    <strong>🍣 Pedido realizado:</strong> ${titulo}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alerta);

        // Elimina automáticamente la alerta después de 4 segundos
    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 500); // espera a que termine animación
    }, 4000);
    });
});
});