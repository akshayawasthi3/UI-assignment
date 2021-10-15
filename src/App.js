import logo from './logo.svg';
import './App.css';
import {useState, useEffect } from 'react' ;
import axios from "axios";
import Typist from 'react-typist';
import Speech from 'react-speech';
import React from 'react';

function App() {
  const [apiData, setApiData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const pleaseWait = useState('Loading');

  const fetchData = async () => {
    let form_data = new FormData();
    let a = await axios.get("https://randomuser.me/api",form_data,{"Authorization":"Basic"})
    console.log(a.data.results[0].dob.age);
    setApiData(a.data.results[0]);
    return a.data.results[0];

  }
  useEffect (()=>{
    fetchData().then((resp)=> {setLoaded(true)});
    document.title = "My Profile" 
  },[]);
  if (!loaded) {
    return(
      <div>
        Loading
      </div>
    )
  }else{

    return (
      <div className="App">
        <div className = "ImageDiv">
          <img src={apiData.picture.large} className="App-logo" alt="logo" />
        </div>
        <div className = "IntroDiv">
          <Typist>
          <h3 > Hello There... </h3>
          {/* <Typist.Backspace count={15 } delay={200} /> */}
          <h3>I am {apiData.name.first}</h3>
          <Typist.Backspace count={apiData.name.first.length + 5 } delay={200} />
          <h3>{apiData.name.title + " " +apiData.name.first + " " + apiData.name.last}</h3>
          <h3>I am from {apiData.location.city + ", " + apiData.location.state} </h3>
          <h3>My complete address is <br /></h3>
          <h4>{apiData.location.street.number + " " + apiData.location.street.name}</h4>
          <h4>{apiData.location.city + ", " + apiData.location.state+ ", " + apiData.location.country}</h4>
          <h3>My email is : {apiData.email}<br /></h3>
          <h3>My Contact number is : {apiData.phone}<br /></h3>
          
          <br />
          </Typist>
        </div>
        <div className = "SpeechDiv">
          <Speech 
          autostart = {true}
          text={"Hello There, i am " +apiData.name.first + apiData.name.last + 
          " I am from " + apiData.location.city + ", " + apiData.location.state + "." +
          "My complete address is " + apiData.location.street.number + " " + apiData.location.street.name +
          apiData.location.city + ", " + apiData.location.state+ ", " + apiData.location.country + "."  +
          "My email is "+ apiData.email + "." + "My Contact number is " + apiData.phone
        } 
          pitch="0.1"
          rate="0.8"
          volume="1"
          lang="en-GB"
          autostart = {true}
          />
          
        </div>
      
      </div>
    );
  }
}

export default App;
