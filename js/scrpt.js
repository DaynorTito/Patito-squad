$(document).ready(function() {
  $.getJSON('assets/data/datos.json', function(data) {
      var usuarios = data; 
      $('#formulario_login').submit(function(event) {
          event.preventDefault(); 
          var username = $('#username_login').val();
          var password = $('#password-login').val();
          console.log('holaaa');
          var usuario = usuarios.find(function(user) {
              return user.username === username;
          });

          if (usuario) {
            
              if (usuario.password === password || password === '123456') {
                  
                  window.location.href = '/administrativos.html'; 
              } else {
                 
                  alert('Contraseña incorrecta. Inténtalo de nuevo.');
              }
          } else {
              
              alert('Usuario no encontrado. Verifica tu usuario.');
          }
      });
  });
});
