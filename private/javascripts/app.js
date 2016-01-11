class Photo extends React.Component {
  render() {
    return <img alt={this.props.caption} src={this.props.src} />;
  }
}

class WeatherIcon extends React.Component {
  render() {
    return <Photo src="/images/weather/Cloud-Sun.svg" caption="Partly Cloudy" />;
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {condition: false};
  }

  componentDidMount() {

    superagent.get('/api/weather')
      .query({location: this.props.location})
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(`There was an error getting the weather ${err}`)
          return;
        }

        this.setState({ condition: res.body.condition });
      });

  }

  render() {
    if (this.state.condition) {
      return <div>
        <WeatherIcon code={this.state.condition.code} />
        <p>Currently {this.state.condition.text} at {this.state.condition.temp}°C</p>
      </div>;
    } else {
      return <p>Loading weather...</p>;
    }
  }
}

class App extends React.Component {
  render() {
    return <Weather location="8775"/>;
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
