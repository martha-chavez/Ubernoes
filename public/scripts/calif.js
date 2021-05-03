$(document).ready(function()
{

  $("button[name='cal']").click(function()
  {
    var id = $(this).attr('id');
    var cViaje = $("input[name='viaje']:checked").val();
    var cChofer = $("input[name='chofer']:checked").val();
    if((cViaje)&&(cChofer))
    {
      $.ajax
      ({
        type: "POST",
        url: "/viajes/calificar",
        data: {idViaje: id, cChofer:cChofer, cViaje:cViaje},
        success: function(response)
        {
          if (response.toString() === "S")
          {location.href="http://localhost:3000/viajes/mviajes";}

        },
        error: function(){}
      });
    }

  });

  

});
