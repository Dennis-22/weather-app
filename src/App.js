import React, {useState} from 'react'
import Weather from './weather'
import './weather.css'
import loadingImg from './Images/loading.gif'
import earth from './Images/earth.png'

import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaGlobeEurope } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { RiSignalWifiErrorLine } from "react-icons/ri";



const api = {
  key: "0f39c7ab873d2a4b2c58a3b9f9a3a455"
  // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
}


function App(){
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [whetherData, setWhetherData] = useState(null)
  const [error, setError] = useState(false)

  const getData = async(e)=>{
    e.preventDefault()
    if(input === ""){
      window.alert("Type a city name")
    }else{
      setLoading(true)
      try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${api.key}`)
        const data = await response.json()
        setWhetherData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
  }

  const dateBuilder = (d)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]

    let date = d.getDate()
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year} `;
  }

  const displayWhat = ()=>{
    if(loading){
      return <div className="loading-div mt-4">
        <img src={loadingImg} width="300px"/>
      </div>
    }

    else if(whetherData){
      if(whetherData.message === 0){
        return <Weather whetherData={whetherData}/>
      }
      return <div className="ins-div">
        <h4 className="instruction">City not found</h4>
        <TiCancel className="ins-icon"/>
      </div>
    }

    else if(error){
      return <div className="ins-div">
          <h4 className="instruction" style={{color:'#dc3545'}}>Something went wrong</h4>
          <RiSignalWifiErrorLine className="ins-icon"/>           
      </div>
    }
    
    else {
      return  <div className="ins-div">
          <h4 className="instruction">Type the name of city or country</h4>
       <img src={earth} width={150} height={150} style={{marginTop:"2rem"}}/>
    </div>
    }
      
  }

  return (
    <>
      <div className="body">

        <div className="container">
          <div className="date-display">
            <FaRegCalendarAlt/> 

            <span className="ml-2">{dateBuilder(new Date())}</span>
          </div>
      
          <form className="whether-form-input container mt-4">
            <input className="input mt-4" placeholder="Type a city name. eg: Accra" onChange={(e)=>setInput(e.target.value)} value={input}/> &nbsp;
            <button onClick={getData} className="btn btn-primary search-btn">Search <BiSearchAlt2 /></button>
          </form>

         
          {displayWhat()}
         
          
        </div>
      </div>
      <footer className="footer">
        <p>&copy;Official Dennis Jeminal</p>
      </footer>
    </>
  )

  }

export default App;

//clear

// main:
// feels_like: 304.57
// grnd_level: 1007
// humidity: 73
// pressure: 1011
// sea_level: 1011
// temp: 302.36
// temp_kf: -0.22
// temp_max: 302.58
// temp_min: 302.36

//temp = kelvin
//wind = meter per sec

//convert kelvin to celsius
// K − 273.15 = °C
