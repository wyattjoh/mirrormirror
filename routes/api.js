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
    });

});

module.exports = router;
