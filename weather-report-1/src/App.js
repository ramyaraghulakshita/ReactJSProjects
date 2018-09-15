import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state = {
      pageHeading: "WEATHER REPORT",
      cityName: "",
      countryName: "",      
      column1Heading:"",
      column2Heading:"",
      column3Heading:"",
      column4Heading:"",
      column5Heading:"",
      weatherReportItems: []
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFieldChange(event){
    this.setState({
      [event.target.name]:event.target.value      
    });
  }

  handleSubmit(event){
    event.preventDefault();     
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q='+this.state.cityName+','+this.state.countryName+'&appid=5ebcd8397d0a2f425417b437b47ca68a';
    this.setState({
      column1Heading:"DATE TIME"
    });
    this.setState({
      column2Heading:"TEMPARATURE"     
    });
    this.setState({
      column3Heading:"PRESSURE"
    });
    this.setState({
      column4Heading:"WIND"
    });
    this.setState({
      column5Heading:"WEATHER"
    });
    fetch(url)
      .then(response => response.json())
      .then(({list:weatherReportItems}) => this.setState({weatherReportItems}))
  }  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.pageHeading}</h1>
        <br/>
        <div class="form-style-8">
          <input type="text" name="cityName" value={this.state.cityName} placeholder="City Name" onChange={this.onFieldChange} />
          <input type="text" name="countryName" value={this.state.countryName} placeholder="Country Name" onChange={this.onFieldChange} />
          <br/>
          <input type="submit" value="CHECK"/>
          <br/> 
        </div>
        <br/>
        <table>
          <tr>
            <th>{this.state.column1Heading}</th>
            <th>{this.state.column2Heading}</th>
            <th>{this.state.column3Heading}</th>
            <th>{this.state.column4Heading}</th>
            <th>{this.state.column5Heading}</th>            
          </tr>
         {(this.state.weatherReportItems ? (
            this.state.weatherReportItems.map(item=>            
              <tr>
                <td>{item.dt_txt}</td>
                <td>{item.main.temp}</td>
                <td>{item.main.pressure}</td>
                <td>{item.wind.speed}</td>
                <td>{item.weather[0].main}</td>            
              </tr>
            )
          ) : <tr></tr>)}
        </table>
      </form>
    );  
  }

}

export default App;
