import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [num, setNum] = useState();
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const apiKey = '3e145e3d5d7342df958123040230503'; // Замените YOUR_API_KEY на ваш API ключ OpenWeatherMap
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    try {
      const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setError('');  
        let a = Math.ceil(Math.random() * (2 - 0) + 0);
        setNum(a);
      
    } catch (error) {
      setWeatherData('');
      setError(error);
    }
  };

  const img = [
    'https://static.vecteezy.com/system/resources/previews/000/225/476/original/vector-beautiful-landscape-illustration.jpg',
    'https://papik.pro/uploads/posts/2021-11/1636002427_2-papik-pro-p-priroda-vektornii-risunok-2.jpg',
    'https://static.vecteezy.com/system/resources/previews/000/229/817/original/vector-beautiful-landscape-illustration.jpg'
  ];


  return (
    <div className='m-24'> 
      <form onSubmit={handleFormSubmit} className="text-center mb-5">
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={handleInputChange}
          className="p-2 border-b border-black"
        />
        <button type="submit" className='text-white font-lg bg-black p-2 rounded-md'>Search</button>
      </form>
      {weatherData && (
        <div className='rounded-xl relative h-[600px]'>
          <h2 className='absolute right-5 bottom-32 text-5xl font-bold text-white'>{weatherData.location.country}</h2>
          <h2 className='absolute right-5 bottom-20 text-3xl font-bold text-white'>{weatherData.location.name}</h2>
          <h2 className='absolute right-5 bottom-5 text-3xl font-5xl text-white'>{weatherData.location.localtime}</h2>
          <h2 className='absolute bottom-5 left-5 text-8xl font-bold text-white'>{weatherData.current.temp_c} &deg;</h2>
          <img src={img[num]} alt="" className='w-full absolute top-0 object-cover	rounded-xl h-full -z-10'/>
        </div>
      )
      }
      {error && (
        <div>Город не найдён</div>
      )}
    
    </div>
  );
}

export default App;
