"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = (function (_React$Component) {
  _inherits(Photo, _React$Component);

  function Photo() {
    _classCallCheck(this, Photo);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).apply(this, arguments));
  }

  _createClass(Photo, [{
    key: "render",
    value: function render() {
      return React.createElement("img", { alt: this.props.caption, src: this.props.src });
    }
  }]);

  return Photo;
})(React.Component);

var WeatherIcon = (function (_React$Component2) {
  _inherits(WeatherIcon, _React$Component2);

  function WeatherIcon() {
    _classCallCheck(this, WeatherIcon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WeatherIcon).apply(this, arguments));
  }

  _createClass(WeatherIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(Photo, { src: "/images/weather/Cloud-Sun.svg", caption: "Partly Cloudy" });
    }
  }]);

  return WeatherIcon;
})(React.Component);

var Weather = (function (_React$Component3) {
  _inherits(Weather, _React$Component3);

  function Weather(props) {
    _classCallCheck(this, Weather);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Weather).call(this, props));

    _this3.state = { condition: false };
    return _this3;
  }

  _createClass(Weather, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      superagent.get('/api/weather').query({ location: this.props.location }).set('X-Requested-With', 'XMLHttpRequest').end(function (err, res) {
        if (err || !res.ok) {
          console.log("There was an error getting the weather " + err);
          return;
        }

        _this4.setState({ condition: res.body.condition });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.condition) {
        return React.createElement(
          "div",
          null,
          React.createElement(WeatherIcon, { code: this.state.condition.code }),
          React.createElement(
            "p",
            null,
            "Currently ",
            this.state.condition.text,
            " at ",
            this.state.condition.temp,
            "°C"
          )
        );
      } else {
        return React.createElement(
          "p",
          null,
          "Loading weather..."
        );
      }
    }
  }]);

  return Weather;
})(React.Component);

var App = (function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(Weather, { location: "8775" });
    }
  }]);

  return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('.container'));