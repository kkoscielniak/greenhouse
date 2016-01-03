var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio');
    scheduler = require('node-schedule');

var api = express.Router();

var greenhouseIp = 'http://192.168.1.141';

api.use(function(req, res, next) {
    console.log('Something is happening: %s %s %s', req.method, req.url, req.path);
    next();
});

api.get('/', function(req, res){
    res.json({
        message: 'Welcome to Greenhouse API.'
    });
});

api.get('/p_light', function(req, res) {

    url = greenhouseIp + '/p_light';
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            res.json({
                message: $('body').html()
            });
        }
    });
});

api.get('/light', function(req, res) {
    url = greenhouseIp + '/light';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {

            url = greenhouseIp + '/p_light';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/light_up', function(req, res) {
    url = greenhouseIp + '/light_up';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_light';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/light_down', function(req, res) {
    url = greenhouseIp + '/light_down';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_light';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/light_measure', function(req, res) {
    url = greenhouseIp + '/light_measure';

    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            res.json({
                message: $('body').html()
            });
        }
    });
});

api.post('/light_start', function(req, res) {
    var cronEntry = req.body.min + ' ' + req.body.hour + ' * * *';

    var job = scheduler.scheduleJob(cronEntry, function(){
        url = greenhouseIp + '/light';

        request(url, function(error, response, html) {
            if (error) {
                console.log(error);
            }
        });
    });

    res.json({
        messate: 'OK'
    })
});

api.post('/light_end', function(req, res) {
    var cronEntry = req.body.min + ' ' + req.body.hour + ' * * *';

    var job = scheduler.scheduleJob(cronEntry, function(){
        url = greenhouseIp + '/light';
        request(url, function(error, response, html) {
            if (error) {
                console.log(error);
            }
        });
    });

    res.json({
        messate: 'OK'
    })
});

api.get('/temp', function(req, res) {
    url = greenhouseIp + '/temp';

    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            res.json({
                message: $('body').html()
            });
        }
    });
});

api.get('/humidity', function(req, res) {
    url = greenhouseIp + '/hum';

    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            res.json({
                message: $('body').html()
            });
        }
    });
});

api.get('/heat', function(req, res) {
    url = greenhouseIp + '/p_heat';

    request(url, function(error, response, html) {
       if (error) {
           console.log(error);
       } else {
           var $ = cheerio.load(html);

           res.json({
               message: $('body').html()
           });
       }
   });
});

api.get('/heat_up', function(req, res) {
    url = greenhouseIp + '/heat_up';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_heat';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/heat_down', function(req, res) {
    url = greenhouseIp + '/heat_down';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_heat';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/pump', function(req, res) {
    url = greenhouseIp + '/pump';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            res.json({
                message: 'OK'
            });
        }
    });
});

api.get('/pump_time', function(req, res) {
    url = greenhouseIp + '/p_pump';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            res.json({
                message: $('body').html()
            });
        }
    });
});

api.get('/pump_up', function(req, res) {
    url = greenhouseIp + '/pump_up';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_pump';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.get('/pump_down', function(req, res) {
    url = greenhouseIp + '/pump_down';
    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            url = greenhouseIp + '/p_pump';
            request(url, function(error, response, html) {
                var $ = cheerio.load(html);

                res.json({
                    message: $('body').html()
                });
            });
        }
    });
});

api.post('/pump_start_time', function(req, res) {
    var cronEntry = req.body.min + ' ' + req.body.hour + ' * * *';

    var job = scheduler.scheduleJob(cronEntry, function(){
        url = greenhouseIp + '/pump';

        request(url, function(error, response, html) {
            if (error) {
                console.log(error);
            }
        });
    });

    res.json({
        messate: 'OK'
    })
});


module.exports = api;
