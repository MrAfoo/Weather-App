
import './App.css';
import { useState } from 'react';

function App() {
  let [city,setCity]=useState('')
  let [wDetails,setWdetails]=useState()
  let [loading,setLoading]=useState(false)
  let getData=(event)=>{
    setLoading(true)
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8d654c07116d45ae91bc37c55d8a835f&units=metric`)
      .then((res)=>res.json())
      .then((finalres)=>{
        if(finalres.cod==='404'){
          setWdetails(undefined)
        }
        else{setWdetails(finalres)}
        setLoading(false)
      })
    event.preventDefault()
      setCity('')
    
  }

  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white pl-9'>Simple Weather App</h1>


        <form onSubmit={getData} className='pl-8'>
          <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name' /> <button className='bg-black text-white border-0 hover:bg-blue-600 font-bold rounded px-4 py-2'>Submit</button>
        </form>

         <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

        <img className={`absolute left-[40%] ${loading ? '' : 'hidden'} `}src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' width={100}  />

      {
      wDetails!==undefined
      ?
      <>
      <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>
        {wDetails.sys.country}</span> </h3>
      <h2 className='font-bold text-[40px]'>
        {wDetails.main.temp}
      </h2>
      <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
      <p>{wDetails.weather[0].description}</p>
      </>
      :
      "No Data"
    }
      

      </div>
      </div>
    </div>
  );
}

export default App;
