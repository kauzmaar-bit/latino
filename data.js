const db = {
    "headers_1": ["", "19-01-2026", "", "", "04-02-2026", "", "", "", "", "16-02-2026", "", "", "", "", "01-03-2026", "", "", "", "", "17-03-2026", "", "", "", "", "29-03-2026", "", "", "", "", "26-04-2026", "", "", "", "", "15-06-2026", "", "", "", "", "27-07-2026", "", "", "", ""],
    "headers_2": ["Nombre", "Tier", "Oleada", "Reliquias", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo", "Tier", "Oleada", "Reliquias", "liga torneo", "Pos. en Torneo"],
    "rows": [
        ["aang", "12", "10", "37", "12", "10", "43", "Oro", "10", "12", "10", "46", "Oro", "10", "12", "10", "48", "Oro", "8", "12", "10", "51", "Oro", "8", "12", "11", "54", "Oro", "8", "12", "31", "68", "Oro", "8", "12", "31", "91", "Oro", "7", "12", "31", "112", "Oro", "5"],
        ["andryN", "16", "104", "126", "16", "132", "131", "Campeón", "21", "16", "132", "136", "Campeón", "21", "16", "132", "139", "Campeón", "21", "16", "132", "143", "Campeón", "21", "16", "203", "146", "Campeón", "21", "16", "204", "157", "Campeón", "21", "17", "132", "182", "Campeón", "13", "17", "174", "197", "Campeón", "11"],
        ["Arcangelgamer7", "3", "91", "3", "3", "91", "4", "Plata", "26", "3", "91", "6", "Plata", "26", "4", "308", "7", "Plata", "21", "4", "308", "8", "Plata", "21", "4", "308", "11", "Plata", "20", "11", "41", "17", "Oro", "26", "12", "20", "25", "Oro", "15", "12", "31", "31", "Oro", "15"],
        ["Babel", "-", "-", "-", "-", "-", "-", "-", "-", "13", "82", "93", "Oro", "6", "13", "82", "98", "Oro", "6", "13", "82", "103", "Oro", "6", "14", "63", "108", "Oro", "6", "14", "63", "116", "Platino", "30", "14", "63", "136", "Platino", "27", "14", "63", "152", "Platino", "26"],
        ["Baltar", "-", "-", "-", "16", "106", "134", "Campeón", "24", "16", "106", "141", "Campeón", "24", "16", "106", "143", "Campeón", "23", "16", "106", "147", "Campeón", "23", "16", "217", "151", "Campeón", "23", "16", "264", "158", "Campeón", "23", "16", "264", "174", "Campeón", "11", "17", "204", "187", "Campeón", "11"],
        ["conker_6", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "12", "61", "54", "Platino", "25", "12", "72", "61", "Platino", "25"],
        ["Demian", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3", "55", "1", "Cobre", "7", "4", "97", "7", "Cobre", "4", "10", "121", "16", "Plata", "9"],
        ["Dv99", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "4", "27", "3", "Plata", "23"],
        ["Elbowe", "12", "92", "20", "12", "92", "25", "Oro", "11", "13", "50", "33", "Oro", "6", "13", "70", "41", "Platino", "22", "14", "81", "47", "Platino", "22", "14", "81", "47", "Platino", "22", "15", "56", "57", "Platino", "14", "15", "104", "86", "Platino", "10", "15", "155", "98", "Platino", "10"],
        ["fer", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "13", "61", "74", "Oro", "5", "13", "61", "89", "Oro", "4"],
        ["Fidesin", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3", "42", "3", "Cobre", "5"],
        ["Infrit", "12", "40", "17", "12", "56", "22", "Oro", "14", "12", "70", "30", "Oro", "11", "13", "51", "32", "Oro", "7", "13", "70", "38", "Oro", "5", "14", "63", "44", "Oro", "5", "15", "65", "54", "Platino", "21", "15", "141", "72", "Platino", "12", "15", "223", "85", "Platino", "10"],
        ["jonytan", "12", "31", "39", "12", "31", "43", "Oro", "10", "12", "31", "47", "Oro", "10", "12", "40", "48", "Oro", "10", "12", "40", "52", "Oro", "10", "12", "60", "57", "Oro", "10", "13", "4", "67", "Oro", "7", "13", "80", "83", "Oro", "7", "14", "56", "98", "Oro", "6"],
        ["jugox2", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "8", "91", "10", "Plata", "16"],
        ["LaParka", "12", "51", "27", "13", "50", "37", "Oro", "4", "13", "50", "44", "Platino", "26", "13", "50", "49", "Platino", "26", "15", "80", "59", "Platino", "15", "15", "120", "66", "Platino", "12", "15", "138", "86", "Campeón", "27", "17", "157", "130", "Campeón", "7", "18", "160", "163", "Campeón", "6"],
        ["Maguilera", "15", "115", "43", "15", "144", "46", "Platino", "8", "15", "144", "51", "Platino", "7", "15", "177", "54", "Platino", "7", "15", "178", "58", "Platino", "7", "15", "276", "63", "Platino", "3", "16", "105", "73", "Campeón", "22", "16", "176", "108", "Campeón", "12", "17", "132", "128", "Campeón", "12"],
        ["Mawgan", "13", "61", "96", "13", "61", "102", "Platino", "20", "13", "61", "106", "Platino", "20", "13", "61", "107", "Platino", "20", "13", "61", "111", "Platino", "20", "13", "61", "114", "Platino", "20", "13", "61", "121", "Platino", "20", "14", "73", "141", "Platino", "19", "14", "73", "159", "Platino", "19"],
        ["Name2Sho", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "14", "83", "179", "Platino", "10", "14", "83", "194", "Platino", "10"],
        ["NaVaJa", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "12", "13", "15", "Oro", "23"],
        ["Neizu", "-", "-", "-", "-", "-", "-", "-", "-", "11", "21", "6", "Plata", "9", "11", "41", "8", "Oro", "27", "11", "41", "13", "Oro", "22", "12", "10", "14", "Oro", "21", "12", "31", "20", "Oro", "20", "12", "40", "29", "Oro", "15", "12", "70", "42", "Oro", "12"],
        ["NightFury", "12", "93", "22", "12", "93", "26", "Oro", "9", "12", "93", "30", "Oro", "9", "13", "61", "31", "Oro", "9", "13", "61", "34", "Oro", "8", "13", "61", "38", "Oro", "8", "13", "61", "42", "Oro", "5", "14", "36", "54", "Oro", "5", "14", "72", "59", "Oro", "5"],
        ["RawXwaR", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "12", "41", "16", "Oro", "16", "12", "71", "28", "Oro", "11"],
        ["Rick", "12", "30", "21", "12", "41", "25", "Oro", "8", "12", "80", "28", "Oro", "6", "12", "80", "30", "Oro", "5", "14", "27", "40", "Platino", "25", "14", "54", "44", "Platino", "25", "15", "56", "58", "Platino", "22", "15", "56", "93", "Platino", "14", "15", "112", "115", "Platino", "14"],
        ["SOL", "13", "91", "53", "13", "91", "58", "Platino", "27", "13", "91", "60", "Platino", "27", "14", "25", "61", "Platino", "27", "14", "62", "66", "Platino", "27", "14", "62", "70", "Platino", "26", "14", "62", "79", "Platino", "26", "14", "78", "94", "Platino", "20", "14", "78", "106", "Platino", "19"],
        ["Sting", "13", "61", "45", "13", "61", "49", "Platino", "21", "13", "61", "53", "Platino", "21", "13", "61", "55", "Platino", "21", "14", "55", "59", "Platino", "18", "14", "55", "63", "Platino", "18", "14", "81", "80", "Platino", "18", "15", "65", "117", "Platino", "18", "15", "66", "148", "Platino", "17"],
        ["thejorgemylio", "12", "41", "22", "12", "41", "25", "Oro", "11", "12", "41", "28", "Oro", "11", "12", "41", "29", "Oro", "11", "12", "41", "33", "Oro", "11", "12", "41", "35", "Oro", "11", "12", "41", "44", "Oro", "6", "12", "50", "53", "Oro", "6", "12", "51", "69", "Oro", "6"],
        ["Zaqmauri", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "14", "63", "134", "Platino", "25", "14", "63", "148", "Platino", "25"],
        ["zeruel", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "19", "246", "210", "Leyenda", "9", "19", "246", "222", "Leyenda", "9"]
    ]
};

const casterNotes = {
    "LaParka": {
        category: "vip",
        title: "💀 El Jinete del Apocalipsis",
        quote: "El que tenga miedo al resumen 💀 hubiera subido sus tiers antes 💀🥵",
        text: "Como profetizó el buen Jason en La Cantina: 'El que tenga miedo al resumen, hubiera subido sus tiers antes'. Y LaParka no es puro chisme en el teclado: respaldó sus 3,580 mensajes pateando la puerta del temible Tier 18 y robándose +33 reliquias. ¡El Jinete del Apocalipsis sigue cobrando peaje en la cima!",
        anthem: {
            title: "Réquiem por un DC — Kauz Maar",
            file: "Réquiem por un DC - Kauz Maar.mp3"
        }
    },
    "Maguilera": {
        category: "vip",
        title: "👑 El Patrón y Líder Soberano",
        quote: "Soy del 85... no sé qué es la ansiedad 😎",
        text: "Nuestro querido Miguel, jefe de la casa, líder del gremio y diplomático oficial de La Cantina. Finalmente rompió las cadenas del Tier 16 y clavó su bandera soberana en el Tier 17 con 132 oleadas, mandando torretas con precisión suiza entre reunión y reunión de la oficina para dar el ejemplo al escuadrón. ¡Un ascenso de jerarquía pura!",
        anthem: {
            title: "Frena",
            file: "Frena.mp3"
        }
    },
    "andryN": {
        category: "vip",
        title: "🙏 El Hombre de Dios y de la Pólvora",
        quote: "Ahora soy un hombre de Dios pero antes fui pecador 😔",
        text: "El hombre que juró por WhatsApp que 'antes fue pecador pero ahora es un hombre de Dios' 🤣. En la arena de batalla no tiene compasión ni piedad y sigue pecando de goloso: metió +42 oleadas bestiales en el brutal Tier 17 y cosechó tesoros de élite. ¡Un pilar inquebrantable de La Cantina!",
        anthem: {
            title: "El Inspector de Cariñosas",
            file: "El Inspector de Cariñosas.mp3"
        }
    },
    "Baltar": {
        category: "vip",
        title: "🚜 El Tractor del Tier 17",
        quote: "Cuando el tractor arranca, es mejor quitarse de la vía 🔥",
        text: "Otro general de La Cantina con más de mil mensajes en el chat que demuestra cómo se hace: abandonó la zona de confort del Tier 16 y debutó en el 17 rompiendo en mil pedazos la barrera de las 200 olas (204 exactas). Cuando Baltar arranca el motor, arrolla todo a su paso."
    },
    "Infrit": {
        category: "vip",
        title: "🚀 El Torpedo Teledirigido",
        quote: "Rompiendo la barrera de las 200 olas a máxima velocidad 🌊",
        text: "El torpedo de La Cantina. Mientras otros dormían la siesta, Infrit le puso nitro a su torre en Tier 15 y escaló la monstruosidad de +82 oleadas, pulverizando la marca de las 200. ¡Cátedra pura de farmeo competitivo en el grupo!"
    },
    "Rick": {
        category: "vip",
        title: "🧪 El Científico del Duplicador",
        quote: "Ecuación resuelta: oleada 56 x 2 = ¡112 oleadas al bolsillo! 🔬",
        text: "¡El científico de La Cantina se metió a su laboratorio! Rick calculó la ecuación perfecta y ¡DUPLICÓ matemáticamente su récord exactito de 56 a 112 oleadas en Tier 15 de un solo pestañazo! Se embolsó +22 reliquias al bolsillo y dio un golpe sobre la mesa. ¡Espectacular, Rick!"
    },
    "Elbowe": {
        category: "vip",
        title: "🛡️ Roca y Baluarte del Gremio",
        quote: "Paciencia de acero y constancia de diamante 💎",
        text: "Paciencia de acero y constancia de diamante. Elbowe es una roca confiable en el chat y en el campo de batalla: sumó 51 oleadas firmes de un mes para otro en Tier 15, consolidándose con una autoridad incuestionable."
    },
    "zeruel": {
        category: "vip",
        title: "👑 El Emperador de la Estratosfera",
        quote: "Observando a los mortales desde el Olimpo del Tier 19 🏔️",
        text: "El Emperador que nos observa a todos desde la estratosfera en el Tier 19. En La Cantina habla poco pero asesta golpes de experiencia, y en el mapa se mantiene en su trono inamovible, cosechando tesoros pasivos (222 reliquias) sin que nadie le haga sombra. ¡Larga vida al monarca Zeruel!",
        anthem: {
            title: "El Dios Silencioso",
            file: "El Dios Silencioso.mp3"
        }
    },
    "jonytan": {
        category: "vip",
        title: "🎯 El Cazador del Tier 14",
        quote: "Adiós al número 13, ¡bienvenida la gloria del 14! ⚔️",
        text: "Se despidió del número 13 de la mala suerte y pisó con fuerza el escalón del Tier 14. Excelente constancia en silencio y sin hacer tanto ruido en el chat. ¡Esa es la actitud vencedora, Jony!"
    },
    "Arcangelgamer7": {
        category: "vip",
        title: "⚔️ El Arcángel de Oro",
        quote: "Construyendo la fortaleza ladrillo a ladrillo 🛡️",
        text: "El Arcángel guardián de las ligas de oro. Sumó 11 oleadas a paso firme y elegante; se nota que viene construyendo su fortaleza en Tier 12 ladrillo a ladrillo sin prisa pero sin pausa."
    },
    "Neizu": {
        category: "vip",
        title: "🌶️ Ritmo y Sabor Latino en Torre",
        quote: "Acelerador a fondo, 30 oleadas conquistadas 🏁",
        text: "¡Le metió verdadero sazón y ritmo latino al Tier 12! Neizu pisó el acelerador a fondo, trepó 30 oleadas de un jalón y se acercó peligrosamente a la cima en Oro. ¡Hermosa racha de farmeo!"
    },
    "NightFury": {
        category: "vip",
        title: "🦇 Sombra y Terror Nocturno",
        quote: "Duplicando el poder bajo la luna del Tier 14 🌑",
        text: "El Furia Nocturna abrió las alas en serio este mes: ¡dobló su marca personal exacto de 36 a 72 oleadas en Tier 14 como una sombra fulminante en la noche! Ya infunde terror en su división."
    },
    "conker_6": {
        category: "vip",
        title: "🐿️ El Recolector Inagotable",
        quote: "Sin ruido ni estrés, ganando terreno en la torre 🌰",
        text: "Conker sigue la fiesta silenciosa y prudente en el Tier 12, sumando oleadas y reliquias sin estresarse, como ardilla juntando provisiones de oro para la hermandad. ¡Bien jugado!"
    },

    "Babel": {
        category: "sleep",
        title: "😴 El Rey de la Siesta y la Tertulia",
        quote: "Casi 1,000 mensajes en WhatsApp... y 0 oleadas nuevas 🗣️🤣",
        text: "¡AQUÍ VIENE EL TIRÓN DE OREJAS DEL SIGLO! El buen Babel se pasó todo el mes de fiesta y tertulia en La Cantina (¡casi mil mensajes de chisme y camaradería!), pero en el juego nos dejó la torreta tirada ECHANDO LA SIESTA exactamente en la misma ola 63 del mes pasado. ¡Mucho bla-bla en el chat y poca pólvora en la torre, Babel! ¡A soltar el teclado y prender los cañones en agosto!"
    },
    "SOL": {
        category: "sleep",
        title: "☀️ El Eclispe del Tier 14",
        quote: "Mucha luz en el chat, pero congelado en la ola 78 🕶️",
        text: "Otro rey de la charla que le echó más ganas al café de La Cantina que al juego 🤣. El Sol iluminó el chat con 620 mensajes de sabiduría, pero en la torre se nos quedó eclipsado y congelado en las mismas 78 olas de junio. ¡Sol querido, necesitamos una tormenta solar reventando récords para el próximo corte!"
    },
    "fer": {
        category: "sleep",
        title: "☕ El Freno de Mano Apagado",
        quote: "Asomando a saludar mientras la torre se enfría en 61 🛑",
        text: "Fer asomó por La Cantina para saludar a la banda, pero en el juego nos dejó el camión con freno de mano en las mismas 61 oleadas de junio. Sumó sus reliquias pasivas para pagar el alquiler, ¡pero el gremio te exige progresión vertical en agosto, Fer!"
    },
    "aang": {
        category: "sleep",
        title: "🧘‍♂️ El Avatar Levitante",
        quote: "Estado de trance profudo: ola 31 inamovible 💨",
        text: "El Avatar Angg entró en trance de meditación pura: no movió ni un milímetro sus 31 olas del mes pasado... ¡pero cosechó 21 reliquias mientras levitaba! ¡A despertar de la meditación y dominar los elementos el próximo corte, Avatar!"
    },
    "Mawgan": {
        category: "sleep",
        title: "⚠️ Batería del Control Apagada",
        quote: "Estacionado con precisión en las mismas 73 olas 🔋",
        text: "Mawgan se nos quedó estacionado milimétricamente en las mismas 73 olas del corte anterior. ¡Un tirón de orejas amable con cariño, a cambiar la batería al control y romper ese techo en agosto!"
    },
    "Name2Sho": {
        category: "sleep",
        title: "🚨 Ferrari a Velocidad de Bicicleta",
        quote: "¡194 reliquias colosales en el banco y sin saltar de Tier! 🏎️",
        text: "¡Alerta roja! Con una cuenta bancaria bestial de 194 reliquias, es pecado mortal seguir estacionado en 83 oleadas, hermano. ¡Tienes potencia de sobra para aplastar el Tier 15, te exigimos verte en acción ya!"
    },
    "Zaqmauri": {
        category: "sleep",
        title: "😴 Hamaca en el Campo de Batalla",
        quote: "Disfrutando el paisaje de la ola 63 junto a Babel 🏝️",
        text: "Otro guerrero que se nos acomodó en la hamaca de la ola 63 sin saltar adelante este mes. ¡A quitar el freno al camión para demostrar la garra latina en la próxima fecha!"
    },

    "Demian": {
        category: "ninja",
        title: "🦾 EL MONSTRUO DEL SALTO DE 6 TIERS",
        quote: "Del Tier 4 al 10 en un parpadeo. Pura acción, nada de palabras 🌋",
        text: "¡EL MONSTRUO INDISCUTIDO DEL MES! No sabremos mucho de su vida diaria en el chat, pero en silencio se despachó el salto de la década: ¡trepó 6 TIERS ENTEROS de un solo tirón (del 4 al 10)! ¡Un Titán digno de ovación de pie de toda América!"
    },
    "Sting": {
        category: "ninja",
        title: "💎 El Ladrón de Tesoros en las Sombras",
        quote: "+31 Reliquias arrebatadas a la torre con guante blanco 🧤",
        text: "El rey indiscutible del botín silencioso. Cosechó una salvajada de 31 reliquias este mes. Está amasando un arsenal nuclearesco para su inminente salto de Tier."
    },
    "RawXwaR": {
        category: "ninja",
        title: "🛡️ Soldado de Infantería Pesada",
        quote: "Honor al 'WAR' de su nombre: 30 olas extra conquistadas ⚔️",
        text: "Haciendo honores al 'WAR' de su nombre: guerra pura sin mediar palabra. Sumó 30 oleadas extras de golpe. ¡Un soldado de infantería ejemplar para el gremio!"
    },
    "thejorgemylio": {
        category: "ninja",
        title: "🎯 Cirujano de Precisión Minimalista",
        quote: "1 oleada ganada + 16 reliquias al bolsillo. Economía perfecta 📐",
        text: "¡Avanzó exactamente una (1) oleada heroica en el campo de batalla, pero se embolsó un motín de 16 reliquias de oro! Trabajo quirúrgico y minimalista, ¡a seguir empujando Jorge!"
    },

    "NaVaJa": {
        category: "recruit",
        title: "🔪 El Debut de Filo Letal",
        quote: "Entrando sin tocar la puerta directo al Tier 12 ⚔️",
        text: "Llegó al gremio cortando fino y debutando directo en las grandes ligas del Tier 12. ¡Bienvenido a la familia de LATINO, NaVaJa! Aquí se respeta a quienes vienen con filo."
    },
    "jugox2": {
        category: "recruit",
        title: "🥤 Doble Dosis de Destrucción",
        quote: "91 oleadas arrasadas al noveno asalto en su llegada 🔥",
        text: "¡Con dosis doble de jugo refrescante debutó arrasando con 91 oleadas al octavo asalto! Si mantiene este ritmo feroz, en agosto ya lo tendremos derribando las puertas del Tier 10."
    },
    "Dv99": {
        category: "recruit",
        title: "🚀 El Nuevo Cadete Valeroso",
        quote: "Arrancando los motores en Tier 4 con respaldo total 🛡️",
        text: "El nuevo cadete Dv99 viene arrancando con orgullo y valentía los motores de sus primeras torres. En este gremio nos respaldamos todos de norte a sur de América, ¡a darle con todo al farmeo!"
    },
    "Fidesin": {
        category: "recruit",
        title: "🌟 El Consentido del Barrio",
        quote: "¡Todos los gigantes del gremio empezamos en la arena del Tier 3! 🦾",
        text: "El recluta y consentido más fresco de nuestra casa. No importa empezar en el escalón 3: ¡todos los gigantes y emperadores de esta tabla nacieron picando piedra desde la arena! ¡Tienes al gremio entero alentándote a subir como espuma, Fidesin!"
    }
};

const abbreviationsData = [
    // ARMAS SUPREMAS (UW)
    { cat: 'uw', sigla: 'UW', en: 'Ultimate Weapon', es: 'Arma Suprema', desc: 'Las armas especiales del juego que se compran y mejoran con Piedras Verdes ganadas en los torneos.' },
    { cat: 'uw', sigla: 'BH', en: 'Black Hole', es: 'Agujero Negro', desc: 'Atrae enemigos a su centro de gravedad y multiplica masivamente las monedas ganadas con su investigación de laboratorio. ¡Esencial para economía!' },
    { cat: 'uw', sigla: 'GT', en: 'Golden Tower', es: 'Torre Dorada', desc: 'El rey indiscutibly de la economía en el juego. Multiplica de forma colosal tus ingresos de monedas y dinero en efectivo en cada activación.' },
    { cat: 'uw', sigla: 'DW', en: 'Death Wave', es: 'Ola de la Muerte', desc: 'Anillo de energía letal. Vital para la estrategia "Devo", aportar daño amplificado y multiplicar tu salud máxima (HP) hasta por x12.5 veces en batalla (con las últimas mejoras del laboratorio e investigación).' },
    { cat: 'uw', sigla: 'SL / SLM', en: 'Spotlight / Spotlight Missiles', es: 'Foco (Reflector) & Misiles de Foco', desc: 'Ilumina conos del mapa aumentando exponencialmente el daño infligido, monedas ganadas y disparando misiles autoguiados de apoyo.' },
    { cat: 'uw', sigla: 'CF / CFR', en: 'Chrono Field / CF Reduction', es: 'Campo Crono & Reducción de Daño', desc: 'Campo de tiempo que ralentiza el movimiento del enemigo y otorga reducción de daño pasiva indispensable para sobrevivir al late-game.' },
    { cat: 'uw', sigla: 'CL', en: 'Chain Lightning', es: 'Rayo en Cadena', desc: 'Relámpagos que saltan de enemigo en enemigo; causa estragos inmensos en sinergia con el módulo Dimension Core (DC).' },
    { cat: 'uw', sigla: 'SM', en: 'Smart Missiles', es: 'Misiles Inteligentes', desc: 'Ráfaga de proyectiles guiados y devastadores. Es el motor principal para causar billones de daño en builds ofensivas.' },
    { cat: 'uw', sigla: 'ILM', en: 'Inner Land Mines', es: 'Minas Terrestres Internas', desc: 'Anillos de minas alrededor del muro que explotan y aturden jefes, dándote segundos vitales en oleadas avanzadas.' },
    { cat: 'uw', sigla: 'PS', en: 'Poison Swamp', es: 'Pantano Venenoso', desc: 'Genera nubes tóxicas en el suelo que dañan y aturden constantemente en masa (Control de Multitudes).' },

    // CARTAS (CARDS)
    { cat: 'cards', sigla: 'AS / ASPD', en: 'Attack Speed', es: 'Velocidad de Ataque', desc: 'La carta más importante de todo el juego. Permite a tus cañones disparar ráfagas ultrasónicas y empujar a los enemigos lejos del muro.' },
    { cat: 'cards', sigla: 'EB', en: 'Enemy Balance', es: 'Equilibrio de Enemigos', desc: 'Incrementa la densidad de enemigos en pantalla y el dinero en efectivo (cash) que sueltan al morir. ¡Imprescindible para farmear!' },
    { cat: 'cards', sigla: 'WS (Carta)', en: 'Wave Skip', es: 'Salto de Oleada', desc: 'Otorga probabilidad de saltar instantáneamente una oleada entera reclamando las recompensas de monedas y dinero de inmediato.' },
    { cat: 'cards', sigla: 'WA', en: 'Wave Accelerator', es: 'Acelerador de Oleadas', desc: 'Reduce drásticamente el tiempo de descanso entre una oleada y otra, comprimiendo horas largas de farmeo en pocos minutos.' },
    { cat: 'cards', sigla: 'IS', en: 'Intro Sprint', es: 'Sprint Inicial (Turbo)', desc: 'Acelera a velocidad relámpago tus primeras oleadas al iniciar la partida. Ideal para farmear misiones de reintentos rápidos.' },
    { cat: 'cards', sigla: 'CC / CritC', en: 'Critical Coin', es: 'Moneda Crítica', desc: 'Los ataques con daño crítico al destruir enemigos básicos o especiales tienen probabilidad de soltar monedas extras al bolsillo.' },
    { cat: 'cards', sigla: 'PC (Carta)', en: 'Plasma Cannon', es: 'Cañón de Plasma', desc: 'Dispara un cañonazo láser masivo a cada Jefe apenas aparece en pantalla, quitándole hasta el 54% de su vida máxima al instante.' },
    { cat: 'cards', sigla: 'EN', en: 'Energy Net', es: 'Red de Energía', desc: 'Inmoviliza al Jefe entrante en la línea de tus orbes por varios segundos, exponiéndolo al daño de tus torres antes de tocarte.' },
    { cat: 'cards', sigla: 'ES', en: 'Energy Shield', es: 'Escudo de Energía', desc: 'Campo de fuerza con hasta 3 cargas que bloquea al 100% cualquier golpe enemigo que sea mortal o de altísimo impacto.' },
    { cat: 'cards', sigla: 'SW (Carta)', en: 'Second Wind', es: 'Segundo Aliento', desc: 'Una vida extra por partida; al recibir un golpe mortal revives restaurando tu torre con invulnerable temporal para seguir pelando.' },
    { cat: 'cards', sigla: 'DM', en: 'Demon Mode', es: 'Modo Demonio', desc: 'Botón de activación manual que transforma tu torre en una entidad de llamas invencible por varios segundos.' },
    { cat: 'cards', sigla: 'DR / DDR', en: 'Death Ray / Double Death Ray', es: 'Rayo de la Muerte (y Doble Rayo)', desc: 'Láser giratorio violento que desintegra automáticamente al contacto a los enemigos normales (no afecta jefes). Su laboratorio te permite tener 2 activos.' },
    { cat: 'cards', sigla: 'SA', en: 'Slow Aura', es: 'Aura de Lentitud', desc: 'Ralentiza pasivamente la velocidad de avance de todo enemigo que se acerque al perímetro de tu torre.' },
    { cat: 'cards', sigla: 'ST', en: 'Super Tower', es: 'Súper Torre', desc: 'Se activa periódicamente multiplicando tus estadísticas de ataque corporal por una cantidad descomunal.' },
    { cat: 'cards', sigla: 'RPC', en: 'Recovery Package Chance', es: 'Prob. Paquetes de Recuperación', desc: 'Probabilidad al terminar una oleada de recibir un paquete dorado que sobrecura tu torre por encima de tu salud máxima.' },
    { cat: 'cards', sigla: 'EO', en: 'Extra Orbs', es: 'Orbes Extra', desc: 'Agrega hasta 3 orbes orbitales con distancia ajustable para triturar enemigos a medida de tu rango táctico.' },
    { cat: 'cards', sigla: 'ZERK', en: 'Berserker', es: 'Berserker (Furia)', desc: 'Absorbe el daño que te hacen los enemigos y lo convierte al instante en un multiplicador bestial para tu propio ataque (hasta x8).' },
    { cat: 'cards', sigla: 'LMS', en: 'Land Mine Stun', es: 'Aturdidor de Minas', desc: 'Otorga a las minas que plantas en el taller la capacidad de paralizar en seco a todo enemigo o jefe que las pise.' },

    // LABORATORIOS & TALLER (LABS & WS)
    { cat: 'labs', sigla: 'WS / WS+', en: 'Workshop / Enhancements', es: 'Taller / Mejoras Avanzadas (+)', desc: 'El menú principal donde subes tus estadísticas de Ataque, Defensa y Utilidad con monedas. WS+ son las mejoras evolutivas para jugadores veteranos.' },
    { cat: 'labs', sigla: 'CPK / C/K', en: 'Coins per Kill', es: 'Monedas por Muerte', desc: 'El laboratorio de economía más importante a largo plazo. Subirlo multiplica de forma geométrica tu botín al destruir enemigos.' },
    { cat: 'labs', sigla: 'EALS / EHLS', en: 'Enemy Attack / Health Level Skip', es: 'Salto de Nivel (Ataque / Vida)', desc: 'Probabilidad de que en cada nueva oleada el enemigo NO aumente su vida ni su ataque. ¡La clave definitiva para llegar a más de 5000 oleadas!' },
    { cat: 'labs', sigla: 'DD', en: 'Death Defy', es: 'Desafío a la Muerte', desc: 'Estadística de utilidad que te da hasta un 30% de probabilidad de esquivar un golpe letal, salvándote en el último segundo.' },
    { cat: 'labs', sigla: 'Def% / DABS', en: 'Defense % / Defense Absolute', es: 'Porcentaje / Defensa Absoluta', desc: 'Def% reduce el daño entrante de forma porcentual (¡imprescindible!). DABS resta un número fijo al daño, útil solo en Tier 1.' },
    { cat: 'labs', sigla: 'KB', en: 'Knockback', es: 'Retroceso (Empuje)', desc: 'Fuerza con la que tus proyectiles empujan hacia atrás a los cubos enemigos en dirección a los orbes y agujeros negros.' },
    { cat: 'labs', sigla: 'SCC / SCM', en: 'Super Critical Chance / Mult', es: 'Súper Crítico (Prob. e Impacto)', desc: 'Probabilidad de que un golpe crítico ordinario evolucione a Súper Crítico dorado reventando al enemigo con daño extremo.' },
    { cat: 'labs', sigla: 'MSC / RFC', en: 'Multishot / Rapid Fire Chance', es: 'Disparo Múltiple / Ráfaga Rápida', desc: 'Probabilidad del taller de disparar múltiples balas en distintos ángulos o descargar ametralladoras veloces continuas.' },
    { cat: 'labs', sigla: 'BSC / BST', en: 'Bounce Shot (Chance / Targets)', es: 'Disparo de Rebote', desc: 'Permite que tus balas reboten de cubo en cubo cual bola de pinball empujando y dañando multitudes a la vez.' },

    // MÓDULOS (MODS)
    { cat: 'mods', sigla: 'DC / Dimcore', en: 'Dimension Core', es: 'Núcleo de Dimensión', desc: 'Módulo de Core legendario. Hace que tu Rayo en Cadena (CL) golpee al mismo objetivo varias veces con daño multiplicador aplastante.' },
    { cat: 'mods', sigla: 'GComp / GC', en: 'Galaxy Compressor', es: 'Compresor Galáctico', desc: 'Módulo de Generador. Al recoger un Paquete de Recuperación, ¡reduce de inmediato el enfriamiento de TODAS tus Armas Supremas en segundos!' },
    { cat: 'mods', sigla: 'BHD', en: 'Black Hole Digestor', es: 'Digestor de Agujero Negro', desc: 'Módulo de Generador. Aumenta tu bonus de monedas por cada paquete recogido y congela inteligentemente tu rango de torre.' },
    { cat: 'mods', sigla: 'MVN / Nexus', en: 'Multiverse Nexus', es: 'Nexo Multiverso', desc: 'Módulo de Core. ¡Sincroniza automáticamente los tiempos de activación de tu Agujero Negro, Torre Dorada y Ola de Muerte (promediándolos)!' },
    { cat: 'mods', sigla: 'WHR / WR', en: 'Wormhole Redirector', es: 'Redireccionador de Agujero de Gusano', desc: 'Módulo de Armadura. Permite que tu Regeneración de Vida llene tu escudo por encima del 100% de salud (hasta un 100% extra si es Ancestral).' },
    { cat: 'mods', sigla: 'ACP', en: 'Anti-Cube Portal', es: 'Portal Anti-Cubo', desc: 'Módulo de Armadura. Los enemigos alcanzados por tu onda de choque quedan sentenciados con una marca, recibiendo daño masivamente superior.' },
    { cat: 'mods', sigla: 'DP', en: 'Death Penalty', es: 'Pena de Muerte', desc: 'Módulo de Cañón. Otorga probabilidad de que un enemigo (¡incluso un Jefe poderoso de oleada alta!) aparezca marcado para morir a tu primer hit.' },
    { cat: 'mods', sigla: 'AS (Módulo)', en: 'Amplifying Strike', es: 'Golpe Amplificador', desc: 'Módulo de Cañón. Si no recibes ningún golpe o daño en los últimos segundos, tu daño corporal de disparo se multiplica frenéticamente.' },
    { cat: 'mods', sigla: 'BA', en: 'Being Annihilator', es: 'Aniquilador de Seres', desc: 'Módulo de Cañón. Ocasionalmente transforma tu disparo en un proyectil devastador aumentando tu daño de Súper Crítico mil veces.' },
    { cat: 'mods', sigla: 'MH / Om / NMP', en: 'Magnetic / Om Chip / Negative Mass', es: 'Módulos Tácticos de Core y Armadura', desc: 'MH retiene cubos fuera del alcance; Om Chip hace que el Foco apunte directo a los Jefes; NMP encoge y frena enemigos que entran al rango.' },
    { cat: 'mods', sigla: 'PH / SD / SH', en: 'Pulsar Harvester / Space Disp / Singularity', es: 'Módulos de Control y Bot', desc: 'PH reduce el nivel del enemigo que te golpea; SD genera minas en todo el borde exterior; SH expande el radio de farmeo de tu Bot Dorado.' },

    // JERGA & ESTRATEGIA (SLANG & TACTICS)
    { cat: 'slang', sigla: 'eHP', en: 'Effective Health Points', es: 'Puntos de Salud Efectivos (eHP)', desc: 'La capacidad de supervivencia REAL de tu torre. Es el resultado de tu Salud Máxima (HP) + Porcentaje de Defensa + Escudos y reducción pasiva. ¡El concepto más importante del juego!' },
    { cat: 'slang', sigla: 'Devo', en: 'Devolution Strategy', es: 'Estrategia Devo / Involución', desc: 'Táctica de nivel medio donde "involucionas" (quitas) mejoras del taller para acumular cientos de enemigos en pantalla y matarlos a todos en un solo disparo con tu Ola de la Muerte (DW), amasando billones de monedas y alcanzando el tope máximo de vida de x12.5.' },
    { cat: 'slang', sigla: 'GC (Build)', en: 'Glass Cannon', es: 'Cañón de Cristal', desc: 'Estrategia del late-game. Como en los Tiers más altos los enemigos pegan billones de daño en un segundo y la salud (eHP) es inútil, ignoras la vida y te concentras en daño 100% puro y sobrevivir con escudos ES y campo CF.' },
    { cat: 'slang', sigla: 'WAWSIS', en: 'Wave Accel + Wave Skip + Intro Sprint', es: 'Estrategia de Sprint Final en Torneos', desc: 'Táctica donde te equipas Sprint Inicial + Salto de Oleada + Acelerador y entras a un torneo cuando faltan pocos minutos para el cierre. Dependiendo de la suerte (RNG) saltas oleadas rápido para ganar buenos premios sin pelear horas. (En Discord bromean llamándola "Runs Gonzales" o corridas a lo Speedy Gonzales 🐭💨).' },
    { cat: 'slang', sigla: 'CPM / CPH', en: 'Coins per Minute / Hour', es: 'Monedas por Minuto / Hora', desc: 'El termómetro de farmeo económico. Siempre debes comparar tus CPH reales para saber qué Tier te conviene repetir para ganar más rápido.' },
    { cat: 'slang', sigla: 'LTx (LTC / LTS)', en: 'Lifetime Coins / Stones / X', es: 'Total Histórico de Monedas / Piedras', desc: 'La suma total de toda la riqueza, piedras o gemas que has juntado desde tu primer día en The Tower.' },
    { cat: 'slang', sigla: 'PB', en: 'Personal Best', es: 'Récord Personal', desc: 'La oleada más alta o cosecha histórica más grande que has alcanzado jamás en un Tier de La Cantina.' },
    { cat: 'slang', sigla: 'PWR', en: 'Perk Wave Requirement', es: 'Reducción de Oleadas para Perks', desc: 'El Perk más importante y sagrado del juego. Al reclamarlo reduce cuántas oleadas requieres para desbloquear todos tus siguientes beneficios.' },
    { cat: 'slang', sigla: 'CTO', en: 'Coin Trade Off Perk (+1.80x a 1.98x Coin)', es: 'Perk de Sacrificio de Monedas', desc: 'El beneficio favorito para farmear agresivamente; multiplica tus ingresos de monedas un +80% extra (o hasta +98% con el laboratorio al máximo) a cambio de sacrificar el 70% de la vida de tu torre.' },
    { cat: 'slang', sigla: '50/50 TO', en: 'Damage Trade Off (-50% Enemy Dmg)', es: 'Perk de Daño 50/50', desc: 'Reduce el daño enemigo a la MITAD, pero tu torre también hace -50% de daño corporal. Excelente protección si juegas con build eHP.' },
    { cat: 'slang', sigla: 'BC / EAS / GB', en: 'Battle Conditions / Golden Bot', es: 'Condiciones de Batalla & Bot Dorado', desc: 'Mutadores difíciles que complican los torneos (como EAS = Enemigos súper veloces) y el Bot Dorado que compras con medallas para multiplicar monedas en el suelo.' },

    // ÓRDENES DE MAGNITUD (MATH)
    { cat: 'math', sigla: 'K / M / B / T', en: 'Thousand / Million / Billion / Trillion', es: 'Miles / Millones / Billones / Trillones', desc: 'Escala clásica mundial: K (Miles), M (Millones - 10⁶), B (Billones o Mil Millones - 10⁹), T (Trillón o Millón de Millones - 10¹²).' },
    { cat: 'math', sigla: 'q / Q', en: 'Quadrillion / Quintillion', es: 'Cuadrillones (q) / Quintillones (Q)', desc: 'Escala media de veterano: la "q" minúscula significa Cuadrillones (10¹⁵). La "Q" MAYÚSCULA significa Quintillones (10¹⁸).' },
    { cat: 'math', sigla: 's / S', en: 'Sextillion / Septillion', es: 'Sextillones (s) / Septillones (S)', desc: 'Escala de titán: la "s" minúscula representa Sextillones (10²¹). La "S" MAYÚSCULA representa Septillones (10²⁴).' },
    { cat: 'math', sigla: 'O / N / D', en: 'Octillion / Nonillion / Decillion', es: 'Octillones (O) / Nonillones (N) / Decillones (D)', desc: 'Los altos mandos del Olimpo de costos del Taller: Octillones (10²⁷), Nonillones (10³⁰) y Decillones (10³³).' },
    { cat: 'math', sigla: 'aa, ab, ac...', en: 'Undecillion / Duodecillion / Tredecillion', es: 'Notación Alfabética Científica', desc: 'Cuando se acaban las letras simples, el juego salta a dos letras: aa (Undecillones 10³⁶), ab (Duodecillones 10³⁹), ac (Tredecillones 10⁴²)... ¡Cifras cósmicas!' }
];