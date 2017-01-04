// visitantes.js
/*
 *      Visitantes (v4)
 *          2009, 2010: Visitantes v1 a Visitantes v3: inform/glulx
 *      (c) 2017 baltasarq@gmail.com MIT License
 *
 *      Aventura de texto SciFi construida con fi.js.
 *
 */

ctrl.ponTitulo( "Visitantes" );
ctrl.ponIntro( "Los Alkranos necesitan un planeta... como la Tierra." );
ctrl.ponImg( "res/ngc1512.jpg" );
ctrl.ponAutor( "Baltasarq" );
ctrl.ponVersion( "4 20170107" );

function amenities() {
    return "<p>Este relato fue creado para una <i>RapidoComp</i> en 2009.<br> \
            El soporte era Inform 6SP/Glulx, pero en realidad se trataba \
            más de un relato interactivo que de una verdadera aventura \
            conversacional (objetos, puzzles, etc.)</p><p>Así que en 2016 \
            me lié la manta a la cabeza y la porté a mi propio sistema, \
            <b>fi.js</b>. El resultado es así más versátil.</p>"
}

var dates_presentation = {
    time: 0,
    earth_dates: [ 1373, 1553, 2006 ],
    space_dates: [ -949901, -770901, -317901 ],
    next: function() {
        ++this.time;
    },
    getEarthDate: function() {
        return this.earth_dates[ this.time ];
    },
    getSpaceDate: function() {
        return this.space_dates[ this.time ];
    },
    getDatePresentation: function() {
        return "Fecha estelar: "
                + this.getSpaceDate()
                + " (contrarreferencia: fecha terráquea c. "
                + this.getEarthDate()
                + " d.c.)";
    }
};

// *** Locs --
var locCamaroteComandancia = ctrl.places.creaLoc(
    "Camarote del comandante",
    [ "camarote", "sala" ],
    "El camarote del comandante disfruta de algunos privilegios, \
     como por ejemplo, un ${gran ventanal estelar, ex ventanal}. \
     <br>El Universo se extiende, inabarcable, en todas direcciones. \
     Infinito espacio, ${infinito tiempo..., mirar}.<br/>La \
     ${consola, ex consola} de mando se sitúa del lado opuesto." );
locCamaroteComandancia.pic = "res/alk-c34.jpg";

locCamaroteComandancia.postExamine = function() {
    var player = ctrl.personas.getPlayer();
    window.scrollTo( 0, 0 );

    switch ( dates_presentation.time ) {
        case 0:
            ctrl.print( dates_presentation.getDatePresentation() );

            player.say( "Ha pasado mucho tiempo... demasiado, desde que la \
                            ALK-C34 comenzó la búsqueda." );
            player.say( "Casi demasiado para contarlo. Da miedo. Pero la \
                            misión es importante. El futuro de nuestra raza, \
                            de nuestra galaxia, depende de ello." );
            player.say( "Tantos planetas, tantas razas... pero ninguno \
                            maduro, ninguno preparado para lo que se nos \
                            viene encima." );

            player.say( "${Demasiado tiempo, sur}..." );
            break;
        case 1:
            ctrl.print( dates_presentation.getDatePresentation() );
            player.say( "¿Habrán cambiado los humanos?\
                           ¡Cuanto querría terminar esta misión!" );
            ctrl.print( "Ungarr suspiró. Laggan se había estado comportando \
                         desafiantemente, y el sabía perfectamente lo que \
                         quería. Hasta cierto punto, tenía razón. \
                         'Sólo en caso de fuerza mayor, Laggan', y había \
                         respondido '¿Acaso no son las vidas de \
                         nuestros conciudadanos una causa mayor?' \
                         Fue capaz de sobreponerse a aquel argumento para \
                         responder, afortunadamente, 'No a costa de millones \
                         de vidas de seres inteligentes'."
            );
            player.say( "Y allá vamos de nuevo. Ngarr habrá vuelto ya del \
                          ${reconocimiento, sur}." );
            break;
        case 2:
            ctrl.print( dates_presentation.getDatePresentation() );
            ctrl.print( "El comandante echaba de menos su hogar. \
                         Enfocó el visor para que el \
                         ventanal le mostrara, de nuevo, aquel planeta \
                         que era, aparentemente, su última posibilidad."
            );
            player.say( "¿Cómo es posible que de entre todas \
                         las naves enviadas, ninguna haya encontrado \
                         un planeta adecuado, un planeta... cómo este?" );
            player.say( "Ngarr ya ha vuelto para informar. \
                         Deben estar esperándome en la \
                         ${sala de reuniones, sur}." );
            break;
        case 3:
            player.say( "Ya apenas queda energía para volver a alguno \
                         de los planetas visitados, o a... casa." );
            ctrl.print( "El comandante sentía la pesada responsabilidad de \
                         una injusta y excesiva decisión sobre todo su ser." );
            player.say( "¿Debo preservar la raza humana, o arrebatarles su \
                         planeta?" );
            player.say( "¿Perder la nave y sus tripulantes, o salvarla, y \
                         con ella a los de mi raza?" );
            break;
    }

    return;
};

var objWindow = ctrl.creaObj(
        "ventanal",
        [ "ventana", "planeta", "vista", "pantalla", "visor" ],
        "Una vista magnífica del planeta de los humanos, la Tierra.",
        locCamaroteComandancia,
        Ent.Scenery
);

var objConsole = ctrl.creaObj(
        "consola",
        [ "pantalla", "instrumentos", "mandos" ],
        "Consola de manejo del sistema.",
        locCamaroteComandancia,
        Ent.Scenery
);

objConsole.preExamine = function() {
    var toret = this.desc;

    if ( dates_presentation.time >= 3 ) {
        toret += "<br/>Tras manipular la consola, se te presentan dos \
                  opciones:<br/><ol>\
                  <li>${Abandonar el sistema solar, ex returnEnding}.</li>\
                  <li>${Iniciar el ataque, ex attackEnding}.</li>\
                  <li>${Autodestrucción, ex destructEnding}.</li>\
                  </ol>";
    } else {
        toret += " Ahora está apagada.";
    }

    return toret;
}

objConsole.communication = function(txt) {
    ctrl.print( "El comunicador se activó en la consola; \
                 se trataba del primer oficial." );
    pnjLaggan.say( txt );
    ctrl.print( "El comandante apagó la consola: no tenía ganas de escuchar \
                 a nadie, y mucho menos a Laggan." );
}

var htmlRestartEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.\
                         </p>";
var returnEnding = ctrl.creaObj(
        "returnEnding",
        [],
        "Back home.",
        locCamaroteComandancia,
        Ent.Scenery
);

returnEnding.status = 0;
returnEnding.preExamine = function() {
    if ( this.status == 0 ) {
        // Leaving the solar system
        pnjUngarr.say( "La nave ya apenas tiene energía para prolongar más \
                    la misión, intentaré que volvamos a casa. \
                    Debo alejarla lo más posible de \
                    la Tierra, para preservarla." );

        ctrl.print( "Aún a pesar de los potentes motores antigravitatorios, \
                    una leve sacudida se percibió al arrancar los propulsores \
                    hiperespeciales." );

        objConsole.communication( "¡Comandante!¡Aborte la orden!¡Aborte!" );
        ctrl.print( "${Procediendo a NGC1512..., ex returnEnding}" );
        ++this.status;
    } else {
        ctrl.endGame( "Sólo espero que lleguemos lo suficientemente lejos \
                    para que nunca la encuentren. Aunque claro, siempre \
                    podrán revisar los bancos de datos... esperemos \
                    que tengan otras prioridades que atender."
                    + htmlRestartEnding,
                    "res/ngc1512.jpg" );
    }

    return "";
}

var attackEnding = ctrl.creaObj(
        "attackEnding",
        [],
        "Attack Earth.",
        locCamaroteComandancia,
        Ent.Scenery
);

attackEnding.status = 0;
attackEnding.preExamine = function() {
    if ( this.status == 0 ) {
        // Attacking the earth
        pnjUngarr.say( "Los humanos no merecen la pena. No se merecen \
                        el planeta en el que les ha tocado vivir, un \
                        planeta lleno de posibilidades y recursos, que \
                        están transformando en un vertedero." );
        ctrl.print( "Un leve zumbido indica el alzado de los escudos \
                     y activación de las armas." );
        objConsole.communication( "¡A sus órdenes, comandante!¡Iniciaremos \
                                   el ataque al punto!" );
        ctrl.print( "${Zafarrancho de combate, ex attackEnding}." );
        ++this.status;
    } else {
        ctrl.endGame( "Que I me perdone, sólo espero estar tomando la \
                        decisión correcta... que es preservar nuestra raza... \
                        a costa de la humana.."
                        + htmlRestartEnding,
                    "res/earth.jpg" );
    }

    return "";
}

var destructEnding = ctrl.creaObj(
        "destructEnding",
        [],
        "Destruct alk-c34.",
        locCamaroteComandancia,
        Ent.Scenery
);

destructEnding.status = 0;
destructEnding.preExamine = function() {
    if ( this.status == 0 ) {
        // Destruct ALK-C34
        pnjUngarr.say( "La nave ya apenas tiene energía para prolongar más \
                        la misión, es indiferente \
                        a dónde la lleve. Debo alejarla lo más posible de \
                        la Tierra, para destruirla con seguridad." );
        pnjUngarr.say( "Los humanos no son tan distintos de nosotros, \
                        al fin y al cabo. De hecho, son exactamente iguales \
                        a nosotros cuando comenzamos las guerras planetarias. \
                        No tenemos derecho a hacernos con su planeta por la \
                        fuerza." );
        ctrl.print( "Procediendo a NGC1512." );
        objConsole.communication( "¡Comandante!¡Aborte la orden!¡Aborte!" );
        pnjUngarr.say( "Sólo espero que lleguemos lo suficientemente lejos \
                        como para que nunca relacionen el 'accidente' \
                        con la tierra y no haya \
                        investigaciones ulteriores." );
        ctrl.print( "Aún a pesar de los potentes motores antigravitatorios, una \
                     leve sacudida se percibió al arrancar los propulsores \
                     hiperespeciales." );
        ctrl.print( "Ungarr activó la \
                     ${autodestrucción, ex destructEnding}." );
        ++this.status;
    } else {
        ctrl.endGame( "Que I me perdone por sacrificar la vida de mis \
                       tripulantes, y la mía propia."
                       + htmlRestartEnding,
                    "res/alk-c34.jpg" );
    }

    return "";
}

var locSalaReuniones = ctrl.places.creaLoc(
    "Sala de reuniones",
    [ "sala", "camarote", "habitacion" ],
    "Un gran tapete antigravitatorio sirve de soporte para las deliberaciones \
    que tienen lugar en esta parte de la nave. El zumbido de los motores \
    antigravedad, apenas audible a través de las paredes metálicas, \
    se expande agradablemente por la habitación. Dos lugares ligeramente \
    elevados, reservados para el comandante y el ${primer oficial, ex laggan}, \
    destacan en \
    uno de los extremos del óvalo que forma el tapete. El resto de lugares se \
    encuentra vacío, tan solo uno es ocupado por el oficial de operaciones \
    especiales con su ${extravagante aspecto, ex ngarr}."
);
locSalaReuniones.pic = "res/room.jpg";
locSalaReuniones.setExitBi( "norte", locCamaroteComandancia );
locSalaReuniones.postExamine = function() {
    window.scrollTo( 0, 0 );
}

// *** PNJs --
var pnjUngarr = ctrl.personas.creaPersona( "Ungarr",
                    [ "comandante" ],
                    "Eres el comandante Ungarr, del navío de combate estelar \
                     ALK-C34 en misión en el cuadrante SS-345 \
                     (contrarreferencia: sistema solar, planeta 'Tierra', \
                     habitado por los autodenominados 'humanos').",
                    locCamaroteComandancia
);


var pnjLaggan = ctrl.personas.creaPersona( "Laggan",
                    [ "oficial", "primero", "contramaestre" ],
                    "El primer oficial es el tipo de alkrano que vuelve a ser \
                    muy popular entre los puestos militares de hoy en día. \
                    Si bien su historial resulta impecable, tiene una cierta \
                    tendencia beligerante. Esto se pone de manifiesto cuando \
                    la nave se encuentra bajo su mando, tiempo durante el cual \
                    los escudos siempre están activos, aún a pesar del elevado \
                    consumo de energía que ello supone... y del hecho de que \
                    hace más de cien sarksecs que los alkranos viven en \
                    armonía con el resto de planetas en la galaxia Galera.",
                    locSalaReuniones
);

pnjLaggan.preTalk = function() {
    this.say( "Creo que deberíamos escuchar el informe del \
               oficial de operaciones especiales, comandante." );
}

var pnjNgarr = ctrl.personas.creaPersona( "Ngarr",
                    [ "oficial", "especiales", "especial" ],
                    "El oficial de operaciones especiales es un hábil maestro \
                    del disfraz, su cuerpo ha sido modificado genéticamente \
                    para mutar a voluntad en cuanto a su aspecto exterior. \
                    Aunque no todos los alkranos estarían dispuestos a sufrir \
                    una modificación de tal calibre, oficiales de la \
                    abnegación y coraje de Ngarr lo hacen voluntariamente.",
                    locSalaReuniones
);

pnjNgarr.preTalk = function() {
    var player = ctrl.personas.getPlayer();

    switch ( dates_presentation.time ) {
            case 0: // 1373, Andrónico y Juan se hinchan a leches
                this.say( "Me he mezclado con los aborígenes, comandante, \
                           tal y como exigía la misión." );
                ctrl.print( "El comandante pensó en como Ngarr nunca \
                             podía ocultar su satisfacción \
                             con sus habilidades." );
                this.say( "Los humanos resultan ser descendientes \
                          de animales de tipo territorial. \
                          Creo que es eso lo que explica que \
                          dividan la tierra en trozos, reclamando \
                          su propiedad. De hecho, llaman a su planeta, \
                          simplemente, 'Tierra'. \
                          Más aún, los humanos se aglutinan en los llamados \
                          'reinos', y frecuentemente \
                          los reinos entran en guerra entre sí. Hay un jefe \
                          del reino, llamado 'rey'."
                );
                ctrl.print( "El comandante interrumpió al oficial, \
                          con un movimiento amplio de uno de sus miembros." );
                player.say( "¿Eligen de entre ellos al más inteligente?" );
                this.say( "Desconozco las normas exactas, \
                           pero me temo que no es así." );
                ctrl.print( "Los presentes se miraron significativamente, \
                          en silencio, los unos a los otros." );
                this.say( "A veces, un reino vence a otros \
                          varios, y a eso lo denominan 'imperio'." );
                this.say( "Comandante, en mi opinión, han seguido una \
                           evolución totalmente distinta a la \
                           nuestra. Son ejemplares físicamente fuertes, \
                           y se pelean entre ellos con armas primitivas, \
                           vanagloriándose de las muertes hechas; nosotros, en \
                           cambio, no entramos en \
                           guerras hasta desarrollar el arma espacial." );
                pnjLaggan.say( "Ngarr, limítese a informar de su misión, en \
                                aquellos campos \
                                donde destaca su experiencia y pericia." );
                this.say( "Sí, señor." );
                this.say( "Los humanos son ciertamente primitivos. \
                           He asistido, en el llamado \
                           'Imperio Bizantino', a una lucha entre el rey \
                           y su hijo. Creo que \
                           el hijo deseaba ser rey, como su padre." );
                ctrl.print( "El espía consultó sus notas en su pad personal." );
                this.say( "Juan 'V', y Andrónico 'I','V', \
                           padre e hijo, respectivamente." );
                ctrl.print( "Ngarr hace una pausa, como avergonzado." );
                pnjLaggan.say( "¿'I', 'V'?, ¡es realmente extraño!" );
                this.say( "Me temo que el rey ha hecho cegar a su hijo, por \
                           liderar la rebelión. ¡Su propio hijo!" );
                ctrl.print( "Un repentino y abrupto silencio permitió que las \
                          palabras del oficial calaran con todo su peso." );
                pnjLaggan.say( "Son claramente inmaduros, señor. Si entráramos \
                                en un contacto pacífico con ellos, nos \
                                aplastarían." );
                pnjLaggan.say( "En caso de contactar, deberemos tomar \
                                precauciones." );
                player.say( "No, no. Es demasiado pronto para... \
                            contactar ahora. En cualquier caso... Ngarr, \
                            habladnos de sus recursos. \
                            ¿Merecería la pena intervenir?" );
                ctrl.print( "Al espía se le iluminarion los ojos." );
                this.say( "Nadan en la abundancia, comandante. \
                           Los recursos de energía \
                           caen sin más del cielo la mayor parte de las veces. \
                           Las extensiones practicables son..." );
                player.say( "Lo sabemos, lo sabemos. Hemos escaneado la \
                             superficie en cuanto llegamos." );
                ctrl.print( "El primer oficial intervino de pronto, \
                             visiblemente excitado." );
                pnjLaggan.say( "Comandante, podríamos..." );
                player.say( "Seguiremos buscando. \
                            Sólo emplearemos la violencia en último lugar. \
                            El planeta no está maduro, eso es un hecho, pero \
                            el ciclo de vida de estos \
                            especímenes es muy corto. ${Buscaremos en otros \
                            lugares, norte}, y si no encontramos \
                            nada, volveremos y evalúaremos de nuevo la \
                            situación." );
                ctrl.print( "Los asistentes a aquella reunión dieron por \
                             finalizadas sus disertaciones, y abandonaron la \
                             sala. Solo Ungarr se demoró tras ellos, \
                             cavilando." );
                ctrl.print( "El comandante suspiró; Laggan tenía su parte de \
                            razón, pues habían encontrado \
                            por fin el planeta que, \
                            exactamente, estaban buscando, desde hacía mucho, \
                            mucho tiempo. Pero debía refrenar a Laggan y a su \
                            instinto belicoso. Las vidas de \
                            tantos humanos no podrían tomarse a la ligera." );
                player.say( "Pero cuánto, cuánto me gustaría darle la razón. \
                            No deja de ser, desde un punto de vista práctico, \
                            una cuestión de escrúpulos. ¿O no?" );
                ctrl.print( "Ungarr permaneció silencioso, escrutando por el \
                            enorme ventanal aquel planeta maravilloso, capaz de \
                            resolver de un plumazo todas sus necesidades." );
                player.say( "Ninguna nave de guerra Alkrana \
                            ha entrado en combate \
                            desde la guerra interplanetaria, y no será bajo mi \
                            mando que vuelva a suceder, a no ser que existan \
                            causas de fuerza mayor." );
                ctrl.print( "Suspiró y sacudió sus extremidades. \
                            Volvió a su camarote. \
                            Decidió ${ponerse a trabajar, norte} \
                            inmediatamente. Miríadas de planetas \
                            quedaban por explorar, sólo en aquel cuadrante de \
                            la galaxia, y este sólo era uno de ellos."
                );
                this.status++;
                dates_presentation.next();
                break;
            case 1:  // 1553: Juana Grey y las guerras religiosas
                this.say( "Señor, estoy dispuesto a informar de mi segunda \
                           misión en la Tierra, si da su permiso." );
                player.say( "Adelante." );
                ctrl.print( "Ngarr consultó sus notas, y procedió a apagar \
                          y ocultar su pad electrónico." );
                this.say( "Me temo que el planeta sigue sumido en sus luchas \
                           internas, como la primera vez. \
                           He asistido, en un reino llamado \
                           'Inglaterra', al nombramiento de la reina \
                           llamada Jane Grey..."
                );
                pnjLaggan.say( "¿Cuál es el motivo de que un \
                                especimen tenga dos nombres?" );
                this.say( "Creo que está relacionado con el hecho de poder \
                           rastrear su origen ('la cuna', como ellos \
                           la llaman). Por lo visto, tiene mucha importancia \
                           provenir de una núcleo familiar..."
                );
                ctrl.print( "El comandante pidió un alto. \
                          Eran demasiados datos, de golpe." );
                player.say( "¿El jefe del reino no era el Rey?" );
                this.say( "Y así sigue siendo comandante, sólo que \
                           cuando el especimen elegido es de sexo femenino, \
                           lo denominan 'reina'."
                );
                player.say( "¿Sexo? ¿Femenino?" );
                ctrl.print( "Ngarr se incomodó visiblemente." );
                this.say( "Es complejo, mi comandante. Especímenes \
                           de sexos distintos se... aparean, intercambiando \
                           fluidos, para reproducirse, \
                           creando nuevos especímenes." );
                player.say( "¡Por Alkran que tal cosa es asquerosa!" );
                ctrl.print( "El primer oficial tapó su \
                         cara con sus propios miembros." );
                pnjLaggan.say( "No quiero ni pensar en ello." );
                this.say( "Para ellos, sin embargo, casi todos \
                           los momentos de sus \
                           vidas parecen centrarse en ese rito copulatorio, \
                           o temas \
                           directa o indirectamente relacionados. Eso \
                           cuando no se preocupan de seguir vivos, claro. \
                           Esa necesidad \
                           se acucia dependiendo de la cuna del aborigen, \
                           de sus recursos."
                );
                pnjLaggan.say( "¡Ciertamente primitivo! \
                                Pero, si uno de ellos tiene dificultades, \
                                ¿no le ayudan los otros especímenes?"
                );
                ctrl.print( "Ngarr hizo una pausa, deseando \
                          cambiar de tema cuanto antes." );
                this.say( "Por otra parte, he descubierto fuertes indicios de \
                           inteligencia." );
                this.say( "Los nativos se preocupan fuertemente por sus \
                           creencias, al margen del rito copulatorio."
                );
                player.say( "¡Fantástico!¿Cuáles son esas preocupaciones?" );
                this.say( "Tiene que ver con algo llamado Deidad. Es similar \
                           a lo que nosotros denominamos 'I'. Como nosotros, \
                           se preguntan fuertemente por el sentido de su lugar \
                           en la existencia."
                );
                ctrl.print( "El comandante movió sus miembros vigorosamente." );
                player.say( "Si eso es cierto, quizás ahora sea el \
                             momento de contactar con ellos." );
                ctrl.print( "El espía desvió su mirada, sacó su pad de nuevo, \
                          y simuló manipularlo."
                );
                this.say( "Me temo, comandante, que no han llegado a un \
                           acuerdo sobre la identidad o \
                           naturaleza de la deidad, y de hecho, \
                           cuando sus creencias se ven amenazadas se vuelven \
                           violentos, beligerantes hasta el extremo de... \
                           matar. Esta reina tiene unas creencias, pero la \
                           mayoría del reino tiene otras, y el resultado, \
                           aunque no lo puedo adivinar, bien \
                           podría terminar en una guerra."
                );
                this.say( "Es una tendencia que ya existía antes, \
                           pero ahora las diferencias entre distintas \
                           creencias es muy marcada."
                );
                ctrl.print( "Un silencio sepulcral cayó pesadamente sobre \
                            ellos, y su presión pareció llenar toda la sala \
                            hasta querer hacerla reventar."
                );
                pnjLaggan.say( "Señor..." );
                player.say( "No es el momento. Todavía no." );
                player.say( "Todavía quedan por explorar la gran mayoría de \
                             planetas del cuadrante X11, y..." );
                pnjLaggan.say( "¡Señor! ¡Los recursos!..." );
                player.say( "Seguirán ahí cuando volvamos. \
                             La decisión está tomada, \
                             y la celebración de esta reunión de informe de \
                             inteligencia ha terminado."
                );
                ctrl.print( "El comandante lanzó una mirada significativa al \
                          primer oficial, y el alkrano abandonó la sala, \
                          visiblemente alterado."
                );
                ctrl.print( "Repentinamente, se sintió muy cansado, \
                          como si el gran peso de la responsabilidad \
                          se hubiera multiplicado."
                );
                player.say( "Y en realidad, así es." );
                ctrl.print( "El comandante suspiró, admirando la vista \
                              de aquel planeta, \
                              aquel precioso planeta, en más de un sentido." );
                player.say( "La búsqueda se está tornando frustrante, y aunque \
                            pueda desviar, esta vez, la atención de Laggan \
                            y del resto de la tripulación sobre la Tierra, \
                            no podré volver a hacerlo en el futuro." );
                ctrl.print( "Pesadamente, el comandante volvió a su camarote." );
                ctrl.print( "Ungarr entornó la vista para descansar, \
                             sólo tras ordenar, por medio de la consola, \
                             un nuevo rumbo, \
                             ${para continuar la misión, norte}." );
                this.status++;
                dates_presentation.next();
                break;
            case 2: // 2006: Desastre de la mina de Cochos
                this.say( "Preparado para informar, comandante, \
                           si da su permiso." );
                player.say( "Adelante." );
                this.say( "Ha transcurrido un tiempo significativo, \
                           para la medida del tiempo de la Tierra."
                );
                this.say( "Al menos, la evolución ha sido exponencial, \
                           en cuanto a avances científicos y tecnológicos."
                );
                ctrl.print( "El comandante se impacientaba, deseando oir lo que \
                          parecía sería el veredicto para la salvación de su \
                          raza, y la vuelta a casa."
                );
                player.say( "¿Podemos entonces contactar con ellos?" );
                this.say( "Diría que sí, comandante, aprecio una importante \
                           evolución en parte de los especímenes que parece \
                           querer llevar a la raza humana a unos objetivos más \
                           altos."
                );
                pnjLaggan.say( "Aprecia, parece querer... es demasiado vago, \
                               oficial. Denos hechos, acontecimientos."
                );
                ctrl.print( "El espía consultó de nuevo su pad." );
                this.say( "Bueno, comandante, han descubierto nuestra galaxia, \
                           la llaman..." );
                ctrl.print( "Ngarr desvió la mirada sólo un momento." );
                this.say( "NGC1512" );
                ctrl.print( "El primer oficial y el comandante se miraron \
                          sorprendidos." );
                player.say( "¿Cuál es el significado de esa... palabra?" );
                this.say( "Ninguno, señor. Se trata de una referencia." );
                ctrl.print( "Ambos oficiales dejaron de contener la \
                             respiración, aliviados." );
                player.say( "Comprendo. Prosiga." );
                this.say( "Oh, y la música, ¡es fascinante!... me he permitido \
                           el lujo de traer conmigo una reproducción de la \
                           Sonata en mi mayor K.380, que..." );
                pnjLaggan.say( "¿Es esa música un medio de comunicación?" );
                this.say( "No, la crean por placer, para escuchar en momentos \
                           de ocio." );
                pnjLaggan.say( "Pero... ¿tiene alguna utilidad?" );
                this.say( "Bueno, no en sí misma, pero..." );
                ctrl.print( "El primer oficial hizo un gesto amplio y rápido \
                             con uno de sus miembros, impacientándose." );
                pnjLaggan.say( "Haga el favor de centrarse en hechos \
                                significativos." );
                this.say( "Han desarrollado las matemáticas, estudian su \
                            propia historia... afirman no querer cometer \
                            los mismos errores del pasado."
                );
                player.say( "Parece que promete..." );
                pnjLaggan.say( "Ngarr, su informe se me antoja totalmente \
                                vago y parcial. ¿Está ocultando algo?" );
                ctrl.print( "El oficial de operaciones especiales se sintió \
                             muy incómodo. Se dirigió directamente \
                             al primer oficial." );
                this.say( "Bueno señor, hace tan solo noventa y dos de \
                           sus años se produjo la llamada I Guerra mundial."
                );
                player.say( "¿Mundial?¿Qué significa eso?\
                             ¿Todos contra todos?" );
                this.say( "Me temo que sí señor. No conozco exactamente el \
                           tema en disputa, pero no debió quedar \
                           totalmente claro, pues repitieron más o menos \
                           la misma guerra treinta de sus años más tarde."
                );
                player.say( "¡La repitieron! ¿Qué quiere decir con eso?" );
                this.say( "Se organizaron para otra contienda similar y la \
                           llamaron II Guerra Mundial." );
                ctrl.print( "El primer oficial dio un respingo." );
                player.say( "¡Es de locos, de locos!" );
                player.say( "Está bien. ¿Cuál es el evento más popular en este \
                             momento?¿De qué hablan entre ellos?" );
                ctrl.print( "El espía hizo como que consultaba su pad, aunque \
                          sabía perfectamente lo que tenía que contestar."
                );
                this.say( "Bueno, varios especímenes se han visto atrapados en \
                          una mina, intentando obtener recursos minerales \
                          directamente excavando su tierra." );
                pnjLaggan.say( "¿Una mina?" );
                this.say( "Un gran agujero en el suelo, muy profundo, del que \
                           se extraen minerales." );
                pnjLaggan.say( "¿Para qué se interesan en los recursos \
                                minerales, dada la cantidad de otros recursos \
                                que tienen disponibles?" );
                this.say( "Señor, de hecho, le dan mucha importancia, basan \
                           lo que ellos llaman economía en un mineral llamado \
                           'oro', y también en otros minerales raros como el \
                           carbono,que por un proceso de presión durante un \
                           largo periodo de tiempo, se transforma en una \
                           especie de prisma cristalino..." );
                player.say( "Bueno, de acuerdo, \
                             ¿qué pasó con esos especímenes?" );
                ctrl.print( "El oficial interpelado sacudió sus miembros \
                          espasmódicamente." );
                this.say( "Lo llaman el desastre minero de Pasta de Cochos." );
                ctrl.print( "El espía dirigió una mirada a sus oficiales \
                          superiores, que se encontró con \
                          total incomprensión." );
                this.say( "Resumiendo, se sospecha que dejaron morir a varios \
                           especímenes para conseguir mejores beneficios \
                           económicos."
                );
                pnjLaggan.say( "¡Pero bueno! ¿Y qué pasa si no dispones de \
                                esos 'beneficios económicos?"
                );
                this.say( "Los especímenes que no los tienen se mueren, señor, \
                           pues no pueden conseguir alimentos."
                );
                ctrl.print( "El capitán hizo un gesto brusco con uno de sus \
                miembros, un gesto rotundo que no dejaba lugar a dudas."
                );
                player.say( "He oído suficiente. \
                             Está bien. Retírese, oficial." );
                ctrl.print( "El espía abandonó la sala, mientras el capitán se \
                          preparaba para irse." );
                pnjLaggan.say( "Señor, yo..." );
                player.say( "Tomaré una decisión y se la haré saber, oficial." );
                ctrl.print( "El comandante remarcó la última palabra con \
                          especial énfasis, \
                          de manera que no quedara lugar a dudas, y \
                          ${abandonó la sala, norte}." );
                dates_presentation.next();
                break;
    }
}

// Arranque ------------------------------------------------------------
ctrl.personas.changePlayer( pnjUngarr );
ctrl.lugares.setStart( locCamaroteComandancia );
