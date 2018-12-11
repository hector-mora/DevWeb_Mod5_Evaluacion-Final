
var numMaxRowCol = 7;
var resH = 0, resV = 0;
var puntajeTotal = 0;
var cantMovimientos = 0;
var deshacerMov = 1;
var espera = 0;
var velocidad = 200;

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

function agregaDulces(col){
  var ruta = "";
  var imgOrigen = "";
  var imgDestino = "";

    var vtop = 730;
    espera = 100;
    for (i = 1; i <= numMaxRowCol; i++)
    {
      if ($("."+col).children("img:nth-last-child("+i+")").css("top") == null) {
        ruta = eligeDulce();
        $("."+col).prepend("<img src='"+ruta+"' class='elemento' style='position:absolute;top:30px;opacity: 0.35;'></img>");
        $("."+col).children("img:nth-last-child("+i+")").delay(espera).animate({opacity: 1, top: vtop+'px'},velocidad);
      }
      vtop -= 99.4;
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

function busVertical(col){
  var resV = 0;
  var numCol = "";
  for (i = 1; i <= numMaxRowCol; i++)
  {
    for (j = 1; j <= numMaxRowCol; j++)
    {
      numCol = "col-"+j;

      if (col != ""){
        j=numMaxRowCol;
        numCol = col;
      }

      var r1=$("."+numCol).children("img:nth-last-child("+i+")").attr("src");
			var r2=$("."+numCol).children("img:nth-last-child("+(i+1)+")").attr("src");
			var r3=$("."+numCol).children("img:nth-last-child("+(i+2)+")").attr("src");
      if((r1==r2) && (r2==r3) && (r2!=null) && (r3!=null))
      {
        $("."+numCol).children("img:nth-last-child("+i+")").attr("class","elemento activo");
        $("."+numCol).children("img:nth-last-child("+(i+1)+")").attr("class","elemento activo");
        $("."+numCol).children("img:nth-last-child("+(i+2)+")").attr("class","elemento activo");
        resV = 1
      }
    }
  }
  return resV
}


function desplaza(col) {

  espera = 0;

    var vtop = 730;
    for (i = 1; i <= numMaxRowCol; i++)
    {
      if ($("."+col).children("img:nth-last-child("+i+")").css("top") != vtop+"px") {
        $("."+col).children("img:nth-last-child("+i+")").delay(espera).animate({top: vtop+'px'},50);
      }
      vtop -= 99.4;
    };

};

function validaDulces(col){
  if (col == ""){
    resH = busHorizontal();
    resV = busVertical("");
  }
  else {
    resH = busHorizontal();
    resV = busVertical(col);
  }

  if((resH==1) || (resV==1)){
    deshacerMov = 0;

    //Cambio en pantalla de puntuacion
		$("#score-text").text(puntajeTotal);

    //remover dulces activos
    $(".activo").delay(10).hide(1000,function(){
      var col = this.parentElement.className;

      $(this).remove();

      //calculos del puntaje
      puntajeTotal = puntajeTotal+10;

      desplaza(col);
      agregaDulces(col);
      validaDulces(col);
    });
    $(".elemento").draggable({
      disabled:true
    });

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
          validaDulces("");

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
  for (x = 1; x <= 7; x++)
  {
    var col = "col-"+x;
    agregaDulces(col)
  }

  $(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
  $("#score-text").text(puntajeTotal);
  $("#movimientos-text").text(cantMovimientos);

  validaDulces("");
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
