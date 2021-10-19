import {motion} from 'framer-motion'
import './weather.css'
import cloudy from './Images/animated/cloudy.svg'
import day from './Images/animated/day.svg'
import night from './Images/animated/night.svg'
import snow from './Images/animated/snowy-6.svg'
import cloudyNight from './Images/animated/cloudy-night-3.svg'
import rain from './Images/animated/rainy-6.svg'

import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { IoIosPeople } from "react-icons/io";
import { BiBody } from "react-icons/bi";


function Weather({whetherData}){
    const hours = new Date().getHours()

    const getWeatherImg = (str)=>{
        let strLower = str.toLowerCase()
        if(strLower === "clouds"){
            if(hours < 17){
                return cloudy
            }else if (hours > 17){
                return cloudyNight 
            }
        }

        if(strLower === "snow"){
            return snow
        }

        if(strLower === 'rain'){
            return rain
        }

        if(strLower === 'clear'){
            if(hours < 17){return day}
            else if(hours > 17){return night}
        }
    }

    const convertToCelsius = (K)=>{
        let celsius = K - 273.15
        return celsius.toFixed(2)
    }
    
    const detailsContainer = {
        initial:{},
        animate:{opacity:1,  transition:{when: 'beforeChildren', staggerChildren:0.4}},
    }

    const detailsBox = {
        initial:{opacity:0, y:-20,},
        animate:{opacity:1, y:0}
    }

    return <div>
        <div>
            <section className="date-display">
                <MdLocationOn />
                <span className="w-country ml-2" style={{margin:'1rem auto'}}>{whetherData.city.name}, {whetherData.city.country}</span>
            </section>
          
            <motion.div className="main-weather" initial={{opacity:0, scale:.5}} animate={{opacity:1, scale:1}}>
                <section className="temp-main">
                    <p className="w-temp">{convertToCelsius(whetherData.list[0].main.temp)} °C</p>
                    <p className="w-desc" style={{textAlign: 'center'}}>{whetherData.list[0].weather[0].main}</p>
                </section>
                <img className="w-img" src={getWeatherImg(whetherData.list[0].weather[0].main)} />
            </motion.div>
        </div>

        <motion.div className="alt-desc" variants={detailsContainer} initial="initial" animate="animate">
        
            <motion.section className="sub-weather" variants={detailsBox}>
                <span className="desc-text">Feels Like</span>
                <BiBody className="desc-icon"/>
            <span className="val">{convertToCelsius(whetherData.list[0].main.feels_like)} °C</span>

            </motion.section>

            <motion.section className="sub-weather" variants={detailsBox}>
                <span className="desc-text">Humidity</span>
                <WiHumidity className="desc-icon"/>
                <span className="val">{whetherData.list[0].main.humidity} %</span>
            </motion.section>

            <motion.section className="sub-weather" variants={detailsBox}>
                <span className="desc-text">Wind-Speed</span>
                <WiStrongWind className="desc-icon"/>
                <span className="val">{whetherData.list[0].wind.speed} m/s</span>

            </motion.section>

            <motion.section className="sub-weather" variants={detailsBox}>
                <span className="desc-text">Population</span>
                <IoIosPeople className="desc-icon"/>
                <span className="val">{whetherData.city.population} citizens</span>

            </motion.section>

            {/* <p>Description: <span className="val">{whetherData.list[0].weather[0].description}</span></p>
            <p>humidity: <span className="val">{whetherData.list[0].main.humidity}</span> % </p>
            <p>feels like: <span className="val">{convertToCelsius(whetherData.list[0].main.feels_like)} °C</span></p>
            <p>wind-speed: <span className="val">{whetherData.list[0].wind.speed}</span> m/s</p>
            <p>wind-degrees: <span className="val">{whetherData.list[0].wind.deg}</span> °</p>
            <p>population: <span className="val">{whetherData.city.population} citizens</span></p> */}
        </motion.div>
    </div>
}

export default Weather