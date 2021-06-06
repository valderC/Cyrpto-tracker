import React, { useState, useEffect } from 'react'; 
import './App.css'; 
import Coin from './Coin'; 
import axios from 'axios'; 


function App() {

  const [coins, setCoins] = useState([]); 
  const [search, setSearch] = useState(''); 

  const api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'; 

  useEffect(() => {
    axios.get(api_url).then(res => {
      setCoins(res.data);
      //console.log(res.data)
    }).catch(err => {
      console.log(err)
    }); 
  }, []); 

  const handleChange = evt => {
    setSearch(evt.target.value)
  }; 

  const filterCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  ); 



  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency </h1>
        <form>
          <input 
          type='text' 
          placeholder='Search' 
          className='coin-input' 
          onChange={handleChange}
          /> 
        </form>
      </div>
      {filterCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
          /> 
        ); 
      })}
    </div>
  );
}

export default App;
