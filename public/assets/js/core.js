var config = {
    CHANGE_LIGHTS_URL: 'http://localhost:8081/api/baby'
};

new Vue({
    el: '#toggles',

    methods: {

        changeLightsState: function() {
            console.log('aa');
            this.$http.get(config.CHANGE_LIGHTS_URL)
                .success(function(res){
                    console.log(res);
                })
                .error(function(err){
                    console.log(err);
                });
        }
    }
});
