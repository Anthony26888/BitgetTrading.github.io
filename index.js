

function showTop(){
  const slide1 = document.getElementById("slide1")
  const slide2 = document.getElementById("slide2")
  const coin1 = "bitcoin";
  const coin2 = "ethereum";
  const coin3 = "binancecoin";
  const coin4 = "litecoin";
  const coin5 = "ripple";
  const coin6 = "dogecoin";
  const apiUrl1 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin1}%2C${coin2}%2C${coin3}&page=1&sparkline=true&price_change_percentage=24h&locale=en&precision=3`;
  const apiUrl2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin4}%2C${coin5}%2C${coin6}&page=1&sparkline=true&price_change_percentage=24h&locale=en&precision=3`;

  fetch(apiUrl1)
  .then(response => response.json())
  .then(data => { 
    data.forEach(value =>{      
      const nameCoin = value.symbol;
      const priceCoin = value.current_price;
      const imageCoin = value.image;
      const percentCoin = value.price_change_percentage_24h;   
      const sparklineCoin = value.sparkline_in_7d.price.join(', ');  
      console.log(sparklineCoin)
      let newDiv = document.createElement("div")
      newDiv.innerHTML = `
        <div class="listItem d-block">
          <div class="container p-xl-4 d-flex align-items-center">
              <img src="${imageCoin}" alt="" style="width: 45px; height:45px">                        
              <p class="nameCoin">${nameCoin}</p>
              <p class="nameCoinUsdt">/USDT</p>                        
          </div>
          <div class="container  d-flex align-content-center justify-content-between">
            <span class="priceCoin">$${priceCoin.toLocaleString()}</span>
            <span class="percentCoin">${percentCoin.toFixed(2)}%</span>
          </div>
          <img class="container justify-content-center pt-xxl-3 ps-3 sparkline" src="https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{fill:false,borderWidth:5,borderColor:'red',data:[${sparklineCoin}]}]}}" />
        </div>
      `
      slide1.appendChild(newDiv);
    })
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  fetch(apiUrl2)
  .then(response => response.json())
  .then(data => { 
    data.forEach(value =>{
      const nameCoin = value.symbol;
      const priceCoin = value.current_price;
      const imageCoin = value.image;
      const percentCoin = value.price_change_percentage_24h;
      const sparklineCoin = value.sparkline_in_7d.price.join(', ');  
      let newDiv = document.createElement("div")
      newDiv.innerHTML = `
        <div class="listItem d-block">
          <div class="container p-xl-4 d-flex align-items-center">
              <img src="${imageCoin}" alt="" style="width: 45px; height:45px">                        
              <p class="nameCoin">${nameCoin}</p>
              <p class="nameCoinUsdt">/USDT</p>                        
          </div>
          <div class="container  d-flex align-content-center justify-content-between">
            <span class="priceCoin">$${priceCoin.toLocaleString()}</span>
            <span class="percentCoin">${percentCoin.toFixed(2)}%</span>
          </div>
          <img class="container justify-content-center pt-xxl-3 ps-3 sparkline" src="https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{fill:false,borderWidth:5,borderColor:'red',data:[${sparklineCoin}]}]}}" />
        </div>
      `
      slide2.appendChild(newDiv);
    })
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  
}
showTop();


function showTrending(){
  const rankTrending = document.getElementById("rank-table-trending");
  const apiUrl = `https://api.coingecko.com/api/v3/search/trending`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {    
    const trendingCoin = data.coins
    trendingCoin.slice(0, 5).forEach(value => {
      
      const imgCoin = value.item.small;
      const nameCoin = value.item.symbol;
      const priceCoin = value.item.price_btc
      const maketcap = value.item.market_cap_rank;
      let newTd = document.createElement("tr");
      newTd.classList.add("trend-coin")
      newTd.innerHTML=`        
        <td style="background-color:transparent; color: #fff; font-size:14px">
          <img src="${imgCoin}" class="icon-coin-rank" alt="SEI">
          <span>${nameCoin}/BTC</span>
        </td>
        <td style="background-color:transparent; color: #1DA2B4; font-size:14px">${priceCoin.toFixed(8)}</td>
        <td style="background-color:transparent; color: #1DA2B4; text-align: center;" >#${maketcap}</td>      
      `
      rankTrending.appendChild(newTd);
    });
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
showTrending();


function showGainer(){
  const rankGainer = document.getElementById("rank-table-gainer");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
      const valueSort = data.sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      valueSort.slice(0, 5).forEach(value =>{      
      const imgCoin = value.image;
      const nameCoin = value.symbol;
      const priceCoin = value.current_price
      const maketcap = value.price_change_percentage_24h;
      let newTd = document.createElement("tr");      
      newTd.innerHTML=`        
        <td style="background-color:transparent; color: #fff; font-size:14px; ">
          <img src="${imgCoin}" class="icon-coin-rank" alt="SEI">
          <span style="text-transform: uppercase;">${nameCoin}/USDT</span>
        </td>
        <td style="background-color:transparent; color: #1DA2B4; font-size:14px; text-align: center;">${priceCoin.toFixed(8)}</td>
        <td style="background-color:transparent; color: #1DA2B4; text-align: center;">${maketcap.toFixed(2)}%</td>      
      `
      rankGainer.appendChild(newTd);
    })
  })
}
showGainer();


function showNewCoin(){
  const rankNew = document.getElementById("rank-table-new");
 
  const coin1 = "fasttoken";
  const coin2 ="aibot";
  const coin3 ="teso";
  const coin4 ="bad-idea-ai";
  const coin5 ="harrypotterobamapacman8inu";
  

  
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin1}%2C${coin2}%2C${coin3}%2C${coin4}%2C${coin5}&page=1&sparkline=false&price_change_percentage=24h&locale=en&precision=8`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach(value =>{      
      const imgCoin = value.image;
      const nameCoin = value.symbol;
      const priceCoin = value.current_price
      const percentCoin = value.price_change_percentage_24h;
      let newTd = document.createElement("tr");      
      newTd.innerHTML=`        
        <td style="background-color:transparent; color: #fff; font-size:14px; ">
          <img src="${imgCoin}" class="icon-coin-rank" alt="${nameCoin}">
          <span style="text-transform: uppercase;">${nameCoin}/USDT</span>
        </td>
        <td style="background-color:transparent; color: #1DA2B4; font-size:14px; text-align: center;">${priceCoin.toFixed(8)}</td>
        <td style="background-color:transparent; color: #1DA2B4; text-align: center;">${percentCoin.toFixed(2)}%</td>      
      `
      rankNew.appendChild(newTd);
    })
  })
}
showNewCoin();


function spotTable(){
  
  const spotTable = document.getElementById("spot-table");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&locale=en`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    data.slice(0,10).forEach(value =>{                
      const imgCoin = value.image;
      const nameCoin = value.symbol;
      const priceCoin = value.current_price;
      const marketCapCoin = value.market_cap;
      const percentCoin = value.price_change_percentage_24h;       
      const volCoin = value.total_volume;  
      const sparklineCoin = value.sparkline_in_7d.price.join(', ');     
      let newTd = document.createElement("tr");      
      newTd.innerHTML=`        
        <td style="background-color:transparent; color: #fff; font-size:18px; padding:15px;">
          <img src="${imgCoin}" class="icon-coin-rank" alt="SEI">
          <span style="text-transform: uppercase;">${nameCoin}/USDT</span>
        </td>
        <td style="background-color:transparent; color: #fff; font-size:16px;">${priceCoin.toFixed(8)}</td>
        <td style="background-color:transparent; color: #fff; font-size:16px; ">${percentCoin.toFixed(2)}%</td>      
        <td style="background-color:transparent; color: #fff; font-size:16px;">${marketCapCoin}</td>    
        <td style="background-color:transparent; color: #fff; font-size:16px;">${volCoin}</td>  
        <td style="background-color:transparent; color: #fff; font-size:16px;"><img class="sparkline-spot" src="https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{fill:false,borderWidth:3,borderColor:'red',data:[${sparklineCoin}]}]}}" /></td> 
        <td style="background-color:transparent; color: #1DA2B4;font-size:16px;">Trade</td> 
        
      `
      spotTable.appendChild(newTd);
    })
  })
}
spotTable();

