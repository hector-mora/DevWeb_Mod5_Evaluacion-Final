
var numMaxRowCol = 7;
var resH = 0, resV = 0;
var puntajeTotal = 0;
var cantMovimientos = 0;
var deshacerMov = 1;
var espera = 0;
var velocidad = 100;

//cambia el color original del titulo a un color más oscuro.
function colorTitulo(elemento){
  $(elemento).animate({
    color: "#949974"
  },
  500,
  function(){
    colorTituloOriginal(elemento)
  })
}

//cambia el color del titulo a su color original.
function colorTituloOriginal(elemento){
  $(elemento).animate({
    color: "#DCFF0E"
  },
  500,
  function(){
    colorTitulo(elemento)
  })
}

//funcion q elige un dulce aleatoriamente y retorna la ruta de la imagen
function eligeDulce(){
  var numero = 0;
  var ruta = "";

  numero = Math.floor((Math.random() * 4) + 1);
  ruta = "image/"+numero+".png";

  return ruta;
};

function agregaDulces(){
  var ruta = "";
  //var strDulce;
  //var cantdulces = 0;
  var imgOrigen = "";
  var imgDestino = "";
  var columna = "";
  var imagen = "";

  for (j = 1; j <= numMaxRowCol; j++)
  {
    var vtop = 730;
    espera = 100;
    for (i = 1; i <= numMaxRowCol; i++)
    {
      if ($(".col-"+j).children("img:nth-last-child("+i+")").css("top") == null) {
        ruta = eligeDulce();
        $(".col-"+j).prepend("<img src='"+ruta+"' class='elemento' style='position:absolute;top:30px;opacity: 0.35;'></img>");
        $(".col-"+j).children("img:nth-last-child("+i+")").delay(espera).animate({opacity: 1, top: vtop+'px'},velocidad);
      }
      //espera += 100;
      vtop -= 99.4;
    }
  };
};

function busHorizontal(){
  var resH = 0
  for (i = 1; i <= numMaxRowCol; i++)
  {
    for (j = 1; j <= numMaxRowCol; j++)
    {
      var r1=$(".col-"+j).children("img:nth-last-child("+i+")").attr("src");
			var r2=$(".col-"+(j+1)).children("img:nth-last-child("+i+")").attr("src");
			var r3=$(".col-"+(j+2)).children("img:nth-last-child("+i+")").attr("src");
      if((r1==r2) && (r2==r3) && (r2!=null) && (r3!=null))
      {
        $(".col-"+j).children("img:nth-last-child("+i+")").attr("class","elemento activo");
        $(".col-"+(j+1)).children("img:nth-last-child("+i+")").attr("class","elemento activo");
        $(".col-"+(j+2)).children("img:nth-last-child("+i+")").attr("class","elemento activo");
        resH = 1
      }
    }
  }
  return resH
}

function busVertical(){
  var resV = 0
  for (i = 1; i <= numMaxRowCol; i++)
  {
    for (j = 1; j <= numMaxRowCol; j++)
    {
      var r1=$(".col-"+j).children("img:nth-last-child("+i+")").attr("src");
			var r2=$(".col-"+j).children("img:nth-last-child("+(i+1)+")").attr("src");
			var r3=$(".col-"+j).children("img:nth-last-child("+(i+2)+")").attr("src");
      if((r1==r2) && (r2==r3) && (r2!=null) && (r3!=null))
      {
        $(".col-"+j).children("img:nth-last-child("+i+")").attr("class","elemento activo");
        $(".col-"+j).children("img:nth-last-child("+(i+1)+")").attr("class","elemento activo");
        $(".col-"+j).children("img:nth-last-child("+(i+2)+")").attr("class","elemento activo");
        resV = 1
      }
    }
  }
  return resV
}

/*
function eliminaDulces(){
  for (i = numMaxRowCol; i >= 1; i--)
  {
    for (j = numMaxRowCol; j >= 1; j--)
    {
      var valor=$(".col-"+j).children("img:nth-last-child("+i+")").attr("class");
      if(valor=="elemento activo")
      {
        $(".col-"+j).children("img:nth-last-child("+i+")").effect("explode",100);
        //$(".col-"+j).children("img:nth-last-child("+i+")").remove();
      }
    }
  }
}*/

function desplaza() {

  espera = 100;

  for (j = 1; j <= numMaxRowCol; j++)
  {
    var vtop = 730;
    for (i = 1; i <= numMaxRowCol; i++)
    {
      if ($(".col-"+j).children("img:nth-last-child("+i+")").css("top") != vtop+"px") {
        $(".col-"+j).children("img:nth-last-child("+i+")").delay(espera).animate({top: vtop+'px'},velocidad);
      }
      //espera += 10;
      vtop -= 99.4;
    }
  };

};

function validaDulces(){
  resH = busHorizontal();
  resV = busVertical();

  if((resH==1) || (resV==1)){
    deshacerMov = 0;
    //$("div[class^='col']").css("justify-content","flex-end");

    //almaceno cantidas de dulces activos
    var cantActivos=$(".activo").length;
    //calculos del puntaje
		puntajeTotal= puntajeTotal+(cantActivos*10);
    //Cambio en pantalla de puntuacion
		$("#score-text").text(puntajeTotal);

    //eliminar dulces iguales
    //eliminaDulces();

    //remover dulces activos
		$(".activo").remove();
    $(".elemento").draggable({
      disabled:true
    });

    desplaza();

    //relleno las columnas nuevamente
    agregaDulces();
    validaDulces();
  }
  else {
    $(".elemento").draggable({
      disabled:false,
      cursor: 'pointer',
      grid: [120,90],
      revert: true,
      revertDuration: 100,
      start: function(event, ui) {
          xpos = ui.position.left;
          ypos = ui.position.top;
        }
    });

    $(".elemento").droppable({
      accept: ".elemento",
      drop: function(event, ui){
        var xmove = Math.abs(ui.position.left - xpos);
        var ymove = Math.abs(ui.position.top - ypos);

        if ((xmove == 120 && ymove == 0) || (xmove == 0 && ymove == 90))
        {
          cantMovimientos = cantMovimientos+1;
          $("#movimientos-text").text(cantMovimientos);

          imgOrigen = $(this).attr("src");
          imgDestino = $(ui.draggable).attr("src");
          $(this).attr("src", imgDestino);
          $(ui.draggable).attr("src", imgOrigen);
          deshacerMov = 1;
          validaDulces();

          //si no encontro coincidencias
          if (deshacerMov == 1) {
            $(this).attr("src", imgOrigen);
            $(ui.draggable).attr("src", imgDestino);
          }
        }
      }
    });
  }

}

//Función que reinicia el juego
function reiniciar(){
  //reiniciar Variables
  resH = 0;
  resV = 0;
  puntajeTotal = 0;
  cantMovimientos = 0;

  //Cambio Texto del boton
  $(".btn-reinicio").text("Reiniciar");

  //limpio los Dulces
  $("div[class^='col'] img").remove();

  //Cargar valores a las filas
  agregaDulces();

  $("#score-text").text(puntajeTotal);
  $("#movimientos-text").text(cantMovimientos);

  validaDulces()
};

$(document).ready(function(){
  //Variables
  var xpos; var ypos;

  //cambio de color del titulo.
  colorTitulo($(".main-titulo"));

  //evento click en boton Iniciar/Reiniciar
  $(".btn-reinicio").on("click",function(){
    //ejecuto la funcion q reinicia el juego.
    reiniciar();
  });
});
