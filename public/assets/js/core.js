Vue.config.debug = true;

var config = {
    LIGHTS: '/api/light',
    LIGHT_UP: '/api/light_up',
    LIGHT_DOWN: '/api/light_down',
    LIGHT_INTENSITIVITY: '/api/p_light',

    LIGHT_MEASURE: '/api/light_measure',
    TEMP: '/api/temp',
    AIR_HUMIDITY: '/api/humidity',

    HEAT: '/api/heat',
    HEAT_UP: '/api/heat_up',
    HEAT_DOWN: '/api/heat_down',

    RUN_PUMP: '/api/pump',
    PUMP_UP: '/api/pump_up',
    PUMP_DOWN: '/api/pump_down',
    PUMP_TIME: '/api/pump_time'
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
                   this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        lightsUp: function() {
            this.$http.get(config.LIGHT_UP)
                .success(function(res){
                    this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        lightsDown: function() {
            this.$http.get(config.LIGHT_DOWN)
                .success(function(res){
                    this.lightSensitivity = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        getLightsIntensivity: function() {
            this.$http.get(config.LIGHT_INTENSITIVITY)
                .success(function(res){
                   this.lightSensitivity = parseInt(res.message);
                })
                .error(function(err){
                    console.error(err);
                });
        },

        debug: function() {
            console.log('debug');
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
                    console.error(err);
                });

            this.$http.get(config.TEMP)
                .success(function(res){
                    this.temp = res.message;
                })
                .error(function(err){
                    console.error(err);
                });

            this.$http.get(config.AIR_HUMIDITY) // @todo
                .success(function(res){
                    this.humidity = res.message;
                })
                .error(function(err){
                    console.error(err);
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

var heatToggles = new Vue({
    el: '#heatToggles',
    data: {
        heat: 0
    },

    methods: {
        getHeat: function() {
            this.$http.get(config.HEAT)
                .success(function(res){
                   this.heat = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        heatUp: function() {
            this.$http.get(config.HEAT_UP)
                .success(function(res){
                    this.heat = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        heatDown: function() {
            this.$http.get(config.HEAT_DOWN)
                .success(function(res){
                    this.heat = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        }
    },

    ready: function() {
        this.getHeat();
    }
});

var pumpToggles = new Vue({
    el: '#pumpToggles',
    data: {
        pumpTime: 0
    },

    methods: {
        runPump: function() {
            this.$http.get(config.RUN_PUMP)
                .success(function(res){
                   console.log('Pump running');
                })
                .error(function(err){
                    console.error(err);
                });
        },

        getPumpTime: function() {
            this.$http.get(config.PUMP_TIME)
                .success(function(res){
                    console.log(res);
                    this.pumpTime = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        pumpTimeUp: function() {
            this.$http.get(config.PUMP_UP)
                .success(function(res){
                    this.pumpTime = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        },

        pumpTimeDown: function() {
            this.$http.get(config.PUMP_DOWN)
                .success(function(res){
                    this.pumpTime = res.message;
                })
                .error(function(err){
                    console.error(err);
                });
        }
    },

    ready: function() {
        this.getPumpTime();
    }
});
