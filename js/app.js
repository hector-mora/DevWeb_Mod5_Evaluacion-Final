

var numero = 0;
var ruta = "";

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
  numero = Math.floor((Math.random() * 4) + 1);
  ruta = "image/"+numero+".png";
};

function cambioimagen(f,c,numDulce){
  mzTablero[f][c] = numDulce;
};

//Función que reinicia el juego
function reiniciar(){

}

$(document).ready(function(){
  //Variables
  var numMaxRowCol = 6;

  //cambio de color del titulo.
  colorTitulo($(".main-titulo"));

  //Cargar valores a la matriz
  var mzTablero = new Array(numMaxRowCol+1);
  var strDulce;
  var id=1;

  for (i = 0; i <= numMaxRowCol; i++)
  {
    // creo las columnas
    mzTablero[i] = new Array(numMaxRowCol+1);
    // elijo un dulce aleatoriamente para cada valor de la matriz
    for (j = 0; j <= numMaxRowCol; j++)
    {
      eligeDulce();
      mzTablero[i][j] = numero;
      strDulce = document.createElement("img");
      strDulce.src = ruta;
      strDulce.id = id;
      $("div[class^='col']")[j].prepend(strDulce);
      $("#"+id).addClass("elemento");
      console.log("[i] "+i+",[j] "+j+" dulce numero: "+mzTablero[i][j]+ " ruta: "+ruta+" y nuevo html: "+strDulce);
      console.log($("#"+id));
      id= id+1;
    }
  }

  var $tablero = $("div[class^='col']");
  var $dulces = $("div[class^='col'] img");

  $dulces.draggable({
      //addClasses: false,
      connectToSortable: $tablero
  });

  //$tablero.droppable({
      //accept: $dulces
  $tablero.sortable();


  /*$(".ui-droppable").sortable({
    placeholder: "ui-state-highlight",
    //opacity: .5,
    helper: 'original',
    beforeStop: function (event, ui) {
        newItem = ui.item;
    },
    receive: function (event, ui) {

    }
  }).disableSelection().droppable({
    over: ".ui-droppable",
    activeClass: 'highlight',
    drop: function (event, ui) {
        //$(this).addClass("ui-state-highlight");
    }
  });
*/
  //evento click en boton Iniciar/Reiniciar
  $(".btn-reinicio").on("click",function(){
    //Cambio Texto del boton
    $(".btn-reinicio").text("Reiniciar");
    //ejecuto la funcion q reinicia el juego.
    reiniciar();
  });
});
