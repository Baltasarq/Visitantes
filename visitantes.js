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
     ${infinito tiempo..., ex pensamientos}"
);
locCamaroteComandancia.pic = "res/alk-c34.jpg";

var objPensamientos = ctrl.creaObj(
    "pensamientos",
    [ "mente", "pensamiento" ],
    "",
    locCamaroteComandancia,
    Ent.Scenery
);

objPensamientos.preExamine = function() {
    ctrl.print( dates_presentation.getDatePresentation() );

    pnjUngarr.say( "Ha pasado mucho tiempo... demasiado, desde que la \
                      ALK-C34 comenzó la búsqueda." );
    pnjUngarr.say( "Casi demasiado para contarlo. Da miedo. Pero la \
                      misión es importante. El futuro de nuestra raza, de \
                      nuestra galaxia, depende de ello." );
    pnjUngarr.say( "Tantos planetas, tantas razas... pero ninguno maduro, \
                      ninguno preparado para lo que se nos viene encima." );

    return "${Demasiado tiempo, sur}...";
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
