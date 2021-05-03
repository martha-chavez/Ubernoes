$(document).ready(function()
{
  $("button").click(function()
  {
    var id = $(this).attr('id');
    $.ajax({
      type: "POST",
      url: "/viajes/addTrip",
      data: {idViaje: id},
      success: function(response)
      {
        if (response.toString() === "S")
        {location.href="http://localhost:3000/viajes/getAll";}
      },
      error: function()
      {}
    });
  });
});
