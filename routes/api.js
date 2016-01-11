var express = require('express');
var router = express.Router();

var YQL = require('yql');

var ErrInvalidWeatherRequest = new Error('Invalid weather request');

router.get('/weather', function(req, res, next) {
  var query = new YQL('select * from weather.forecast where woeid = @woeid');

  query.setParam('woeid', req.query.location)
    .exec(function(err, data) {
      if (err || !data.query.results.channel.item.condition) {
        return next(ErrInvalidWeatherRequest);
      }

      res.json(data.query.results.channel.item);

      // var location = data.query.results.channel.location;
      // var condition = data.query.results.channel.item.condition;
      //
      // console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
    });

});

module.exports = router;
