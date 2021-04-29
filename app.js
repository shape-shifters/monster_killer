new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            var herida = this.calcularHeridas(3, 10);
            this.saludMonstruo -= herida;
            var evento = {
                esJugador: true,
                text: 'El jugador golpea al monstruo por ' + herida
            }
            this.registrarEvento(evento);
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var herida = this.calcularHeridas(10, 20);
            this.saludMonstruo -= herida;

            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento);
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var herida = this.calcularHeridas(5, 12);
            this.saludJugador -= herida;
            var evento = {
                esJugador: false,
                text: 'El monstruo lastima al jugador en ' + herida
            }
            this.registrarEvento(evento);
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) +  1, min);
        },

        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste =) ! Queres jugar de nuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0) {
                if (confirm('Perdiste =( ! Queres jugar de nuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});