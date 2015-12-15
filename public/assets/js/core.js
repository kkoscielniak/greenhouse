Vue.config.debug = true;

var config = {
    LIGHTS: 'http://192.168.1.141/light',
    LIGHT_UP: 'http://192.168.1.141/light_up',
    LIGHT_DOWN: 'http://192.168.1.141/light_down',
    // LIGHT_INTENSITIVITY: 'http://192.168.1.141/p_light'
    LIGHT_INTENSITIVITY: 'assets/mocks/light-intensivity.html',
    LIGHT_MEASURE: 'assets/mocks/light-intensivity.html',
    TEMP: 'assets/mocks/light-intensivity.html',
    AIR_HUMIDITY: 'assets/mocks/light-intensivity.html'

};

new Vue({
    el: '#lightToggles',

    data: {
        lightSensitivity: 0
    },

    methods: {

        lights: function() {
            this.$http.get(config.LIGHTS)
                .success(function(res){
                    console.log(res);
                })
                .error(function(err){
                    console.log(err);
                });
        },

        lightsUp: function() {
            this.$http.get(config.LIGHT_UP)
                .success(function(res){
                    console.log(res);

                    this.getLightsIntensivity();
                })
                .error(function(err){
                    console.log(err);
                });
        },

        lightsDown: function() {
            this.$http.get(config.LIGHT_DOWN)
                .success(function(res){
                    console.log(res);

                    this.getLightsIntensivity();
                })
                .error(function(err){
                    console.log(err);
                });
        },

        getLightsIntensivity: function() {
            this.$http.get(config.LIGHT_INTENSITIVITY)
                .success(function(res){

                    this.lightSensitivity = parseInt(res);
                })
                .error(function(err){
                    console.log(err);
                });
        }
    },

    ready: function() {
        this.getLightsIntensivity();
    }
});


var statusTable = new Vue({
    el: '#statusTable',
    data: {
        lightIntensity: 0,
        temp: 0,
        humidity: 0
    },

    ready: function() {
        this.$http.get(config.LIGHT_MEASURE)  // @todo
            .success(function(res){

                this.lightIntensity = parseInt(res);
            })
            .error(function(err){
                console.log(err);
            });

        this.$http.get(config.TEMP) // @todo
            .success(function(res){

                this.temp = parseInt(res);
            })
            .error(function(err){
                console.log(err);
            });

        this.$http.get(config.AIR_HUMIDITY) // @todo
            .success(function(res){

                this.humidity = parseInt(res);
            })
            .error(function(err){
                console.log(err);
            });
    }
});
