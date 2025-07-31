// Navbar active highlight
$('.nav-link').click(function(e) {
  $('.nav-link').removeClass('active');
  $(this).addClass('active');
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
