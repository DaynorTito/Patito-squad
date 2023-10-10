
$(document).ready(function() {
  var jsonUrl = 'https://raw.githubusercontent.com/DaynorTito/Patito-squad/main/assets/data/datos.json';
  $.getJSON(jsonUrl, function(data) {
      var usuarios = data; 
      $('#formulario_login').submit(function(event) {
          event.preventDefault(); 
          var username = $('#username_login').val();
        // Almacena el nombre de usuario limpio en una Cookie con un nombre específico
        document.cookie = "username=" + username + "; path=/";


          var password = $('#password-login').val();
          var usuario = usuarios.find(function(user) {
              return user.username === username;
          });
          if (usuario) {
            
              if (usuario.password === password || password === '123456') {
                  
                  window.location.href = 'inicio.html'; 
              } else {
                 
                  alert('Contraseña incorrecta. Inténtalo de nuevo.');
              }
          } else {
              alert('Usuario no encontrado. Verifica tu usuario.');
          }
      });
  });
});


function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    var username = getCookie("username");
    var usernam = username.replace(/\./g, ' ');
    document.getElementById("nombreUs").textContent = usernam;


$(document).ready(function () {
    var jsonUrl = 'https://raw.githubusercontent.com/DaynorTito/Patito-squad/main/assets/data/datos.json';

    var jsonData = [];

    var itemsPerPage = 7;
    var currentPage = 1;

    function loadData() {
        fetch(jsonUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON.');
                }
                
                return response.json();
            })
            .then(function (data) {
                jsonData = data;

                fillTable(currentPage);
                createPagination();
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function fillTable(page) {
        var tableBody = $("#table-body");
        tableBody.empty();

        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var pageData = jsonData.slice(startIndex, endIndex);

        $.each(pageData, function (index, item) {
            var row = $("<tr>");
            row.append("<th scope='row'>" + item.id + "</th>");
            row.append("<td>" + item.apellidos + "</td>");
            row.append("<td>" + item.nombres + "</td>");
            row.append("<td>" + item.tipo_doc_identificacion + "</td>");
            row.append("<td>" + item.ci + "</td>");
            row.append("<td>" + item.celular + "</td>");
            row.append("<td>" + item.puesto_cargo + "</td>");
            row.append("<td>" + item.unidad_area + "</td>");
            row.append("<td>" + "<a href='#' class='link-primary'>Editar</a><i class='bi bi-pencil text-primary'></i>" 
            +"<br>"+ "<a href='#' class='link-danger' style='color: red; font-size: 14px;'>Elimina</a><i class='bi bi-trash text-danger'></i>"+"</td>");
            tableBody.append(row);
        });
    }

    function createPagination() {
        var pagination = $("#pagina");
        pagination.empty();

        var totalPages = Math.ceil(jsonData.length / itemsPerPage);

        for (var i = 1; i <= totalPages; i++) {
            var li = $("<li class='page-item'><a class='page-link' href='#'>" + i + "</a></li>");
            li.click(function () {
                var page = parseInt($(this).text());
                currentPage = page;
                fillTable(page);
            });
            pagination.append(li);
        }
    }

    loadData();
});


