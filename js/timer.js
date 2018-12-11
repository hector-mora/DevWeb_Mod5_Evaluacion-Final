
$(document).ready(function(){
  //evento click en boton Iniciar/Reiniciar
  $(".btn-reinicio").click(function(){
    // Variables
    var seg = 0;
    var min = 2;

    //ejecuto la funcion q reinicia el juego.
    tiempo = setInterval(function(){timer()}, 1000);

    function timer(){
      var strSeg = "";
      var strMin = "";

      if(seg!=0){
        seg=seg-1;
        strSeg = seg;
      }
      if(seg==0){
        if(min==0){

          $(".time").hide();
          detener();
          //$(".panel-tablero").hide("drop","slow",puntuacion);
          $(".panel-tablero").hide(1500);
          $(".elemento").animate({width:'0%', height:'0%', top: '130px'},1500);
          $(".panel-score").animate({width:'100%'},1500);


          clearInterval(tiempo);
        }
        else {
          seg=59;
          strSeg = seg;
          min=min-1;
          strMin = min
        }

      }
      if (seg<10){
        strSeg = "0"+seg;
      };
      if (min<10){
        strMin = "0"+min;
      };

      $("#timer").html(strMin+":"+strSeg);
    };

    function detener(){
      $(".elemento").stop(true);
    };
  });

});
