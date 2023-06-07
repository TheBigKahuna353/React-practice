// This is the main component of the app
import './App.css';
import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="App-form-body">
        <form onSubmit={this.handleSubmit}>
          <label className='App-label'>
            Input Something:
            <input className='App-input-box' name="inp" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className='App-button' type="submit" value="Submit" />
        </form>
        <button className='App-button' onClick={this.props.handleClear}>Clear</button>
      </div>
    );
  }
}

class Panels extends React.Component {

  constructor(props) {
    super(props);
    this.render_panel = this.render_panel.bind(this);
  }

  onClick = (i) => {
    console.log("delete: " + i);
    this.props.delete_pan(i);
  }

  render_panel(value, i) {
    return (
      <div className="App-panel-main" key={i}>
        <div className='App-panel'>
          <button class="close" onClick={() => {this.onClick(i)}}>&times;</button>
          <p>{value}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App-panels">
        {this.props.panels.map(this.render_panel)}
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { click: false, panels: [] };

    this.On_Click = this.On_Click.bind(this);
    this.Add_Panel = this.Add_Panel.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.Delete_Panel = this.Delete_Panel.bind(this);
  }

  On_Click() {
    this.setState({ click: !this.state.click });
  }

  Add_Panel(value) {
    this.setState({ panels: [...this.state.panels, value] });
  }

  Delete_Panel(i) {
    this.setState({ panels: this.state.panels.filter((_, j) => j !== i) });
  }

  handleClear() {
    this.setState({ panels: [] });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Practice</h1>
        </header>
        <div className={this.state.click ? "App-body-white" : "App-body-blue"}>
          <button className="App-button" onClick={this.On_Click} >Click Me</button>
          <Form handleSubmit = {this.Add_Panel} handleClear={this.handleClear}/>
          <Panels panels={this.state.panels} delete_pan={this.Delete_Panel}/>
        </div>
        <div className="App-footer">
            <p>Footer</p>
          </div>
      </div>
    );
  }
}

export default App;
