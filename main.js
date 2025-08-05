// Navbar active highlight
$('.nav-link').click(function(e) {
  $('.nav-link').removeClass('active');
  $(this).addClass('active');
});

document.addEventListener("DOMContentLoaded", function() {
  var navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Bootstrap usa la clase "show" para el navbar abierto
      if(navbarCollapse.classList.contains('show')){
        // Trigger Bootstrap collapse
        var collapse = new bootstrap.Collapse(navbarCollapse, {toggle: true});
      }
    });
  });
});

// Smooth scroll for nav
$('.nav-link').on('click', function(e) {
  var target = $(this).attr('href');
  if(target.startsWith('#')) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(target).offset().top - 75
    }, 500);
  }
});

// Contact Form feedback with Formspree
$('#contactForm').on('submit', function(e) {
  e.preventDefault();
  var $form = $(this);
  $.ajax({
    url: $form.attr('action'),
    method: 'POST',
    data: $form.serialize(),
    dataType: "json",
    success: function() {
      $('#form-msg').show().text('¡Gracias! Tu mensaje ha sido enviado.');
      $form[0].reset();
    },
    error: function() {
      $('#form-msg').show().text('Hubo un error al enviar el mensaje. Por favor, inténtalo más tarde.');
    }
  });
});

$('#modalDelorean').on('show.bs.modal', function () {
  $('#miniVideoDelorean')[0].pause();
  $('#fullVideoDelorean')[0].play();
});
$('#modalDelorean').on('hidden.bs.modal', function () {
  $('#miniVideoDelorean')[0].play();
  $('#fullVideoDelorean')[0].pause();
});

//Control de fecha
document.addEventListener('DOMContentLoaded', function() {

  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const hoyStr = `${yyyy}-${mm}-${dd}`;


  document.getElementById('fecha_inicio').setAttribute('min', hoyStr);
  document.getElementById('fecha_fin').setAttribute('min', hoyStr);
});
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if(response.ok){
          form.reset();
          // Mostrar modal de éxito (Bootstrap)
          const successModal = new bootstrap.Modal(document.getElementById('formSuccessModal'));
          successModal.show();
        } else {
          response.json().then(data => {
            alert(data.message || 'Hubo un error enviando el formulario. Inténtalo de nuevo.');
          });
        }
      }).catch(() => {
        alert('Hubo un error enviando el formulario. Inténtalo de nuevo.');
      });
    });
  }
});