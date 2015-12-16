Vue.config.debug = true;

var config = {
    LIGHTS: '/api/light',
    LIGHT_UP: '/api/light_up',
    LIGHT_DOWN: '/api/light_down',
    LIGHT_INTENSITIVITY: '/api/p_light',

    LIGHT_MEASURE: '/api/light_measure',
    TEMP: '/api/temp',
    AIR_HUMIDITY: '/api/humidity'
};

var lightToggles = new Vue({
    el: '#lightToggles',

    data: {
        lightSensitivity: 0
    },

    methods: {

        lights: function() {
            this.$http.get(config.LIGHTS)
                .success(function(res){
                    console.log(res);
                    this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.log(err);
                });
        },

        lightsUp: function() {
            this.$http.get(config.LIGHT_UP)
                .success(function(res){
                    console.log(res);

                    this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.log(err);
                });
        },

        lightsDown: function() {
            this.$http.get(config.LIGHT_DOWN)
                .success(function(res){
                    console.log(res);

                    this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.log(err);
                });
        },

        getLightsIntensivity: function() {
            this.$http.get(config.LIGHT_INTENSITIVITY)
                .success(function(res){

                    console.log(res);
                    this.lightSensitivity = parseInt(res.message);
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

    methods: {
        checkEverything: function() {
            this.$http.get(config.LIGHT_MEASURE)
                .success(function(res){
                    this.lightIntensity = res.message;
                })
                .error(function(err){
                    console.log(err);
                });

            this.$http.get(config.TEMP)
                .success(function(res){

                    this.temp = res.message;
                })
                .error(function(err){
                    console.log(err);
                });

            this.$http.get(config.AIR_HUMIDITY) // @todo
                .success(function(res){

                    this.humidity = res.message;
                })
                .error(function(err){
                    console.log(err);
                });
        }
    },

    ready: function() {
        this.checkEverything();
        var that = this;
        setInterval(function(){
            that.checkEverything();
        }, 1000);
    }
});

var clock = new Vue({
    el: '#clock',
    data: {
        time: null,
        date: null
    },

    methods: {
        setDateTime: function() {
            this.time = moment().format("HH:mm:ss");
            this.date = moment().format("YYYY-MM-DD");
        }
    },

    ready: function() {
        this.setDateTime();
        var that = this;
        setInterval(function(){
            that.setDateTime();
        }, 1000);
    }
});

