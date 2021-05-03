$(document).ready(function()
{
  $( "#btnLogin" ).click(function()
  {
    let mail = document.getElementById("mail").value.trim();
    let pass = document.getElementById("pass").value.trim();
    $.ajax({
      type: "POST",
      url: "/usuarios/login",
      data: {mail: mail, pass: pass},
      success: function(response)
      {
        let r = response.toString();
        if (r === "F")
        {
          alert("Intente de nuevo...")
        }
        else if (r === "S")
        {
          $('#formLogin').submit();
        }
      },
      error: function()
      {}
    });
  });
  
  $( "#btnLoginreg" ).click(function()
  {
    var mail = document.getElementById("correo").value.trim();
    var nombre = document.getElementById("nombre").value.trim();
    var paterno = document.getElementById("paterno").value.trim();
    var materno = document.getElementById("materno").value.trim();
    var nacimiento = document.getElementById("nacimiento").value.trim();
    var pass = document.getElementById("passwd").value.trim();

    $.ajax({
        type: "POST",
        url: "/usuarios/loginregistro",
        data: { mail:mail },
        success: function(resp)
        {
          let r = resp.toString();
           if (r === "F")
            {
              $.ajax({
                  type: "POST",
                  url: "/usuarios/save",
                  data: {nombre: nombre,paterno:paterno,materno:materno,correo:mail,pass:pass,nacimiento:nacimiento},
                  success: function(resp)
                  {
                    document.getElementById('mail').value=mail;
                    document.getElementById('pass').value=pass;
                    var button = document.getElementById('btnLogin');
                    button.form.submit();
                  }
              });
            }
            else if (r === "S")
            {
              location.href="http://localhost:3000/";
            }
        }
      });
  });

});

   function onSignIn(googleUser)
  {
     var profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
     var nombre=profile.getName();
     var paterno="paterno";
     var materno="materno";
     var correo=profile.getEmail();
     var pass="password";
     var nacimiento="06/17/1997";
    var mail = correo;
    var nombre = nombre;
    var paterno = "paterno";
    var materno = "materno";
    var nacimiento = "06/17/1997";
    var pass ="password";
    var auth2 = gapi.auth2.getAuthInstance();
              auth2.signOut().then(function () {
                   });
    $.ajax({
        type: "POST",
        url: "/usuarios/loginregistro",
        data: { mail:mail },
        success: function(resp)
        {
          let r = resp.toString();
           if (r === "F")
            {
              $.ajax({
                  type: "POST",
                  url: "/usuarios/save",
                  data: {nombre: nombre,paterno:paterno,materno:materno,correo:mail,pass:pass,nacimiento:nacimiento},
                  success: function(resp)
                  {
                    document.getElementById('mail').value=mail;
                    document.getElementById('pass').value="password";
                    var button = document.getElementById('btnLogin');
                    button.form.submit();
                  }
              });
            }
            else if (r === "S")
            {
              document.getElementById('mail').value=mail;
                    document.getElementById('pass').value="password";
                    var button = document.getElementById('btnLogin');
                    button.form.submit();
            }
        }
      });
                    
 }

function registroon()
    {
            var div1 = document.getElementById('registro');
            var div2 = document.getElementById('login');
            div2.style.display = 'none';
            div1.style.display = 'block';
    }
function registrooff()
    {
            var div1 = document.getElementById('registro');
            var div2 = document.getElementById('login');
            div1.style.display = 'none';
            div2.style.display = 'block';
    }
    function loginon()
    {
            var div1 = document.getElementById('registro');
            div1.style.display = 'block';
    }
    function loginoff()
    {
            var div1 = document.getElementById('registro');
            div1.style.display = 'none';
    }
