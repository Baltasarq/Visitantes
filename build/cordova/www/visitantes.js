// visitantes.js
/*
 *      Visitantes (v4)
 *          2009, 2010: Visitantes v1 a Visitantes v3: inform/glulx
 *      (c) 2016 baltasarq@gmail.com MIT License
 *
 *      Aventura de texto SciFi construida con fi.js.
 *
 */

ctrl.ponTitulo( "Visitantes" );
ctrl.ponIntro( "Los Alkranos necesitan un planeta... como la Tierra." );
ctrl.ponImg( "res/visitantes.jpg" );
ctrl.ponAutor( "Baltasarq" );
ctrl.ponVersion( "4 20161226" );

function amenities() {
    return "<p>Este relato fue creado para una <i>RapidoComp</i> en 2009.<br> \
            El soporte era Inform 6SP/Glulx, pero en realidad se trataba \
            más de un relato interactivo que de una verdadera aventura \
            conversacional (objetos, puzzles, etc.)</p><p>Así que en 2016 \
            me lié la manta a la cabeza y la porté a mi propio sistema, \
            <b>fi.js</b>. El resultado es así más versátil.</p>"
}

var dates_presentation = {
    time: -1,
    earth_dates: [ 1373, 1553, 2006 ],
    space_dates: [ -949901 -770901 -317901 ],
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
        this.next();
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
     como por ejemplo, un gran ventanal estelar.<br>El Universo se extiende, \
     inabarcable, en todas direcciones. Infinito espacio, \
     infinito tiempo..."
);
locCamaroteComandancia.pic = "res/alk-c34.jpg";

var objPensamientos = ctrl.creaObj(
    "pensamientos",
    [ "mente", "pensamiento" ],
    "",
    locCamaroteComandancia,
    Ent.Scenery
);

locCamaroteComandancia.postExamine = function() {
    if ( dates_presentation.time == -1 ) {
        ctrl.print( dates_presentation.getDatePresentation() );

        pnjUngarr.say( "Ha pasado mucho tiempo... demasiado, desde que la \
                        ALK-C34 comenzó la búsqueda." );
        pnjUngarr.say( "Casi demasiado para contarlo. Da miedo. Pero la \
                        misión es importante. El futuro de nuestra raza, de \
                        nuestra galaxia, depende de ello." );
        pnjUngarr.say( "Tantos planetas, tantas razas... pero ninguno maduro, \
                        ninguno preparado para lo que se nos viene encima." );

        pnjUngarr.say( "${Demasiado tiempo, sur}..." );
    }

    return;
};


var objConsola = ctrl.creaObj(
        "consola",
        [ "pantalla", "instrumentos", "mandos" ],
        "Consola de manejo del sistema.",
        locCamaroteComandancia,
        Ent.Scenery
);

var locSalaReuniones = ctrl.places.creaLoc(
    "Sala de reuniones",
    [ "sala", "camarote", "habitacion" ],
    "Un gran tapete antigravitatorio sirve de soporte para las deliberaciones \
    que tienen lugar en esta parte de la nave. El zumbido de los motores \
    antigravedad, apenas audible a través de las paredes metálicas, \
    se expande agradablemente por la habitación. Dos lugares ligeramente \
    elevados, reservados para el comandante y el ${primer oficial, ex lagan}, \
    destacan en \
    uno de los extremos del óvalo que forma el tapete. El resto de lugares se \
    encuentra vacío, tan solo uno es ocupado por el oficial de operaciones \
    especiales con su ${extravagante aspecto, ex ngarr}."
);
locSalaReuniones.pic = "res/room.jpg";
locSalaReuniones.setExitBi( "norte", locCamaroteComandancia );

// *** PNJs --
var pnjUngarr = ctrl.personas.creaPersona( "Ungarr",
                    [ "comandante" ],
                    "Eres el comandante Ungarr, del navío de combate estelar \
                     ALK-C34 en misión en el cuadrante SS-345 \
                     (contrarreferencia: sistema solar, planeta 'Tierra', \
                     habitado por los autodenominados 'humanos').",
                    locCamaroteComandancia
);

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
    switch ( dates_presentation.time ) {
            -1: // 1373, Andrónico y Juan se hinchan a leches
                self.say( "Me he mezclado con los aborígenes, comandante, tal y como exigía la misión." );
                player.think( "Ngarr nunca puede ocultar su satisfacción con sus habilidades." );
                self.say( "Los humanos resultan ser descendentes de animales de tipo territorial.
                          Creo que es eso lo que explica que dividan la tierra en trozos, reclamando
                          su propiedad. De hecho, llaman a su planeta, simplemente, ~Tierra~.
                          Más aún, los humanos se aglutinan en los llamados ~reinos~, y frecuentemente
                          los reinos entran en guerra entre sí. Hay un jefe del reino, llamado ~rey~."
                );
                novelar( "El comandante interrumpió al oficial, con un movimiento
                          amplio de uno de sus miembros."
                );
                player.say( "¿Eligen de entre ellos al más inteligente?" );
                self.say( "Desconozco las normas exactas, pero me temo que no es así." );
                novelar( "Los presentes se miraron significativamente,
                          en silencio, los unos a los otros."
                );
                self.say( "A veces, un reino vence a otros
                          varios, y a eso lo denominan ~imperio~."
                );
                self.say( "Comandante, en mi opinión, han seguido una evolución totalmente distinta a la
                           nuestra. Son ejemplares físicamente fuertes,
                           y se pelean entre ellos con armas primitivas,
                           vanagloriándose de las muertes hechas; nosotros, en cambio, no entramos en
                           guerras hasta desarrollar el arma espacial."
                );
                pnjLaggan.say( "Ngarr, limítese a informar de su misión, en aquellos campos
                                donde destaca su experiencia y pericia."
                );
                self.say( "Sí, señor." );
                self.say( "Los humanos son ciertamente primitivos. He asistido, en el llamado
                           ~Imperio Bizantino~, a una lucha entre el rey y su hijo. Creo que
                           el hijo deseaba ser rey, como su padre."
                );
                novelar( "El espía consultó sus notas en su pad personal." );
                self.say( "Juan ~V~, y Andrónico ~I~,~V~, padre e hijo, respectivamente." );
                novelar( "Ngarr hace una pausa, como avergonzado." );
                pnjLaggan.say( "¿~I~, ~V~?, ¡es realmente extraño!" );
                self.say( "Me temo que el rey ha hecho cegar a su hijo, por liderar
                          la rebelión. ¡Su propio hijo!");
                novelar( "Un repentino y abrupto silencio permitió que las palabras del oficial calaran
                          con todo su peso."
                );
                pnjLaggan.say( "Son claramente inmaduros, señor. Si entráramos en un
                                contacto pacífico con ellos, nos aplastarían."
                );
                pnjLaggan.say( "En caso de contactar, deberemos tomar precauciones." );
                player.say( "No, no. Es demasiado pronto para... contactar ahora.
                            En cualquier caso... Ngarr, habladnos de sus recursos.
                            ¿Merecería la pena intervenir?"
                );
                novelar( "Al espía se le iluminarion los ojos." );

                self.say( "Nadan en la abundancia, comandante. Los recursos de energía
                           caen sin más del cielo la mayor parte de las veces. Las extensiones
                           practicables son..." );
                player.say( "Lo sabemos, lo sabemos. Hemos escaneado la superficie en cuanto
                             llegamos."
                );
                novelar( "El primer oficial intervino de pronto, visiblemente excitado." );
                pnjLaggan.say( "Comandante, podríamos..." );
                player.say( "Seguiremos buscando. Sólo emplearemos la violencia en último lugar.
                            El planeta no está maduro, eso es un hecho, pero el ciclo de vida de estos
                            especímenes es muy corto. Buscaremos en otros lugares, y si no encontramos
                            nada, volveremos y evalúaremos de nuevo la situación."
                );

                preparaTransicion( self.getStatus() );
                self.status++;
            1:  ! 1553: Juana Grey y las guerras religiosas
                self.say( "Señor, estoy dispuesto a informar de mi segunda
                            misión en la Tierra, si da su permiso."
                );
                player.say( "Adelante." );
                novelar( "Ngarr consultó sus notas, y procedió a apagar y ocultar
                          su pad electrónico."
                );
                self.say( "Me temo que el planeta sigue sumido en sus luchas internas,
                           como la primera vez. He asistido, en un reino llamado
                           ~Inglaterra~, al nombramiento de la reina llamada
                           Jane Grey..."
                );
                pnjLaggan.say( "¿Cuál es el motivo de que un especimen tenga dos nombres?" );
                self.say( "Creo que está relacionado con el hecho de poder rastrear
                           su origen (~la cuna~, como ellos la llaman).
                           Por lo visto, tiene mucha importancia
                           provenir de una núcleo familiar..."
                );
                novelar( "El comandante pidió un alto. Eran demasiados datos, de golpe." );
                player.say( "¿El jefe del reino no era el Rey?" );
                self.say( "Y así sigue siendo comandante, sólo que cuando el especimen
                           elegido es de sexo femenino, lo denominan ~reina~."
                );
                player.say( "¿Sexo? ¿Femenino?" );
                novelar( "Ngarr se incomodó visiblemente." );
                self.say( "Es complejo, mi comandante. Especímenes de sexos distintos
                           se... aparean, intercambiando fluidos, para reproducirse,
                           creando nuevos especímenes."
                );
                player.say( "¡Por Alkran que tal cosa es asquerosa!" );
                novelar( "El primer oficial tapó su cara con sus propios miembros." );
                pnjLaggan.say( "No quiero ni pensar en ello." );
                self.say( "Para ellos, sin embargo, casi todos los momentos de sus
                           vidas parecen centrarse en ese rito copulatorio, o temas
                           directa o indirectamente relacionados. Eso
                           cuando no se preocupan de seguir vivos, claro. Esa necesidad
                           se acucia dependiendo de la cuna del aborigen, de sus recursos."
                );
                pnjLaggan.say( "¡Ciertamente primitivo! Pero, si uno de ellos tiene dificultades,
                             ¿no le ayudan los otros especímenes?"
                );
                novelar( "Ngarr hizo una pausa, deseando cambiar de tema cuanto antes." );
                self.say( "Por otra parte, he descubierto fuertes indicios de inteligencia." );
                self.say( "Los nativos se preocupan fuertemente por sus creencias,
                           al margen del rito copulatorio."
                );
                player.say( "¡Fantástico!¿Cuáles son esas preocupaciones?" );
                self.say( "Tiene que ver con algo llamado Deidad. Es similar a lo
                           que nosotros denominamos ~I~. Como nosotros, se
                           preguntan fuertemente por el sentido de su lugar en
                           la existencia."
                );
                novelar( "El comandante movió sus miembros vigorosamente." );
                player.say( "Si eso es cierto, quizás ahora sea el momento de contactar con ellos." );
                novelar( "El espía desvió su mirada, sacó su pad de nuevo, y simuló
                          manipularlo."
                );
                self.say( "Me temo, comandante, que no han llegado a un acuerdo
                           sobre la identidad o naturaleza de la deidad, y de hecho,
                           cuando sus creencias se ven amenazadas se vuelven violentos,
                           beligerantes hasta el extremo de... matar. Esta reina
                           tiene unas creencias, pero la mayoría del reino tiene
                           otras, y el resultado, aunque no lo puedo adivinar, bien
                           podría terminar en una guerra."
                );
                self.say( "Es una tendencia que ya existía antes, pero ahora las
                          diferencias entre distintas creencias es muy marcada."
                );
                novelar( "Un silencio sepulcral cayó pesadamente sobre ellos, y
                          su presión pareció llenar toda la sala hasta querer hacerla
                          reventar."
                );
                pnjLaggan.say( "Señor..." );
                player.say( "No es el momento. Todavía no." );
                player.say( "Todavía quedan por explorar la gran mayoría de planetas del cuadrante X11, y..." );
                pnjLaggan.say( "¡Señor! ¡Los recursos!..." );
                player.say( "Seguirán ahí cuando volvamos. La decisión está tomada,
                             y la celebración de esta reunión de informe de inteligencia
                             ha terminado."
                );
                novelar( "El comandante lanzó una mirada significativa al primer
                          oficial, y el Alkrano abandonó la sala, visiblemente
                          alterado."
                );
                novelar( "Repentinamente, se sintió muy cansado, como si el gran peso
                          de la responsabilidad se hubiera multiplicado."
                );
                player.think( "Y en realidad, así es." );

                preparaTransicion( self.getStatus() );
                self.status++;
            2: ! 2006: Desastre de la mina de Cochos
                self.say( "Preparado para informar, comandante, si da su permiso." );
                player.say( "Adelante." );
                self.say( "Ha transcurrido un tiempo significativo, para la medida
                           del tiempo de la Tierra."
                );
                self.say( "Al menos, la evolución ha sido exponencial, en cuanto
                           a avances científicos y tecnológicos."
                );
                novelar( "El comandante se impacientaba, deseando oir lo que
                          parecía sería el veredicto para la salvación de su raza,
                          y la vuelta a casa."
                );
                player.say( "¿Podemos entonces contactar con ellos?" );
                self.say( "Diría que sí, comandante, aprecio una importante
                           evolución en parte de los especímenes que parece
                           querer llevar a la raza humana a unos objetivos más
                           altos."
                );
                pnjLaggan.say( "Aprecia, parece querer... es demasiado vago,
                               oficial. Denos hechos, acontecimientos."
                );
                novelar( "El espía consultó de nuevo su pad." );
                self.say( "Bueno, comandante, han descubierto nuestra galaxia,
                           la llaman..."
                );
                novelar( "Ngarr desvió la mirada sólo un momento." );
                self.say( "NGC1512" );
                novelar( "El primer oficial y el comandante se miraron
                          sorprendidos."
                );
                player.say( "¿Cuál es el significado de esa... palabra?" );
                self.say( "Ninguno, señor. Se trata de una referencia." );
                novelar( "Ambos oficiales dejaron de contener la respiración, aliviados." );
                player.say( "Comprendo. Prosiga." );
                self.say( "Oh, y la música, ¡es fascinante!... me he permitido
                           el lujo de traer conmigo una reproducción de la
                           Sonata en mi mayor K.380, que..."
                );
                pnjLaggan.say( "¿Es esa música un medio de comunicación?" );
                self.say( "No, la crean por placer, para escuchar en momentos
                           de ocio."
                );
                pnjLaggan.say( "Pero... ¿tiene alguna utilidad?" );
                self.say( "Bueno, no en sí misma, pero..." );
                novelar( "El primer oficial hizo un gesto amplio y rápido con
                          uno de sus miembros, impacientándose."
                );
                pnjLaggan.say( "Haga el favor de centrarse en hechos significativos." );
                self.say( "Han desarrollado las matemáticas, estudian su propia
                            historia... afirman no querer cometer los mismos
                            errores del pasado."
                );
                player.say( "Parece que promete..." );
                pnjLaggan.say( "Ngarr, su informe se me antoja totalmente vago y parcial.
                                ¿Está ocultando algo?"
                );
                novelar( "El oficial de operaciones especiales se sintió muy
                          incómodo. Se dirigió directamente al primer oficial."
                );
                self.say( "Bueno señor, hace tan solo noventa y dos de sus años se produjo
                          la llamada I Guerra mundial."
                );
                player.say( "¿Mundial? ¿Qué significa eso? ¿Todos contra todos?" );
                self.say( "Me temo que sí señor. No conozco exactamente el tema
                           en disputa, pero no debió quedar totalmente claro,
                           pues repitieron más o menos la misma guerra treinta
                           de sus años más tarde."
                );
                player.say( "¡La repitieron! ¿Qué quiere decir con eso?" );
                self.say( "Se organizaron para otra contienda similar y la llamaron II
                           Guerra Mundial."
                );
                novelar( "El primer oficial dio un respingo." );
                player.say( "¡Es de locos, de locos!" );
                player.say( "Está bien. ¿Cuál es el evento más popular en este
                             momento. ¿De qué hablan entre ellos?"
                );
                novelar( "El espía hizo como que consultaba su pad, aunque sabía
                          perfectamente lo que tenía que contestar."
                );
                self.say( "Bueno, varios especímenes se han visto atrapados en
                          una mina, intentando obtener recursos minerales
                          directamente excavando su tierra." );
                pnjLaggan.say( "¿Una mina?" );
                self.say( "Un gran agujero en el suelo, muy profundo, del que
                           se extraen minerales."
                );
                pnjLaggan.say( "¿Para qué se interesan en los recursos minerales,
                                dada la cantidad de otros recursos
                                que tienen disponibles?"
                );
                self.say( "Señor, de hecho, le dan mucha importancia, basan lo que
                           ellos llaman economía en un mineral llamado ~oro~, y
                           también en otros minerales raros como el carbono,
                           que por un proceso de presión durante un largo
                           periodo de tiempo, se transforma en una especie
                           de prisma cristalino..." );
                player.say( "Bueno, de acuerdo, ¿qué pasó con esos especímenes?" );
                novelar( "El oficial interpelado sacudió sus miembros espasmódicamente." );
                self.say( "Lo llaman el desastre minero de Pasta de Cochos." );
                novelar( "El espía dirigió una mirada a sus oficiales superiores,
                          que se encontró con total incomprensión."
                );
                self.say( "Resumiendo, se sospecha que dejaron morir a varios
                           especímenes para conseguir mejores beneficios
                           económicos."
                );
                pnjLaggan.say( "¡Pero bueno! ¿Y qué pasa si no dispones de esos
                                ~beneficios económicos?"
                );
                self.say( "Los especímenes que no los tienen se mueren, señor,
                           pues no pueden conseguir alimentos."
                );
                novelar( "El capitán hizo un gesto brusco con uno de sus miembros,
                        un gesto rotundo que no dejaba lugar a dudas."
                );
                player.say( "He oído suficiente. Está bien. Retírese, oficial." );
                novelar( "El espía abandonó la sala, mientras el capitán se preparaba
                          para irse."
                );
                pnjLaggan.say( "Señor, yo..." );
                player.say( "Tomaré una decisión y se la haré saber, oficial." );
                novelar( "El comandante remarcó la última palabra con especial énfasis,
                          de manera que no quedara lugar a dudas, y abandonó
                          la sala."
                );
                preparaTransicion( self.getStatus() );
}

var pnjLagan = ctrl.personas.creaPersona( "Lagan",
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

// Arranque ------------------------------------------------------------
ctrl.personas.changePlayer( pnjUngarr );
ctrl.lugares.setStart( locCamaroteComandancia );
