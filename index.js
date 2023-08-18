






function showPriceTop(){
  var btcPrice = document.getElementById("btcPrice")
  var ethPrice = document.getElementById("ethPrice")
  var bnbPrice = document.getElementById("bnbPrice")
  var ltcPrice = document.getElementById("ltcPrice")
  var xrpPrice = document.getElementById("xrpPrice")
  var dogePrice = document.getElementById("dogePrice")
  var perBTC = document.getElementById("PerBTC")
  var perETH = document.getElementById("PerETH")
  var perBNB = document.getElementById("PerBNB")
  var perLTC = document.getElementById("PerLTC")
  var perXRP = document.getElementById("PerXRP")
  var perDOGE = document.getElementById("PerDOGE")

  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Clitecoin%2Cripple%2Cdogecoin&vs_currencies=usd&include_24hr_change=true&precision=4`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {  
    const valueBTC = data.bitcoin.usd;     
    const valueETH = data.ethereum.usd;
    const valueBNB = data.binancecoin.usd;
    const valueLTC = data.litecoin.usd;     
    const valueXRP = data.ripple.usd;
    const valueDOGE = data.dogecoin.usd;
    

    const valuePerBTC = data.bitcoin.usd_24h_change;
    const valuePerETH = data.ethereum.usd_24h_change;
    const valuePerBNB = data.binancecoin.usd_24h_change;
    const valuePerLTC = data.litecoin.usd_24h_change;
    const valuePerXRP = data.ripple.usd_24h_change;
    const valuePerDOGE = data.dogecoin.usd_24h_change;
   



    btcPrice.innerHTML = valueBTC.toLocaleString();    
    ethPrice.innerHTML = valueETH.toLocaleString();
    bnbPrice.innerHTML = valueBNB.toLocaleString();
    ltcPrice.innerHTML = valueLTC.toLocaleString();    
    xrpPrice.innerHTML = valueXRP.toLocaleString();
    dogePrice.innerHTML = valueDOGE.toLocaleString();
    
    perBTC.innerHTML = valuePerBTC.toLocaleString()+'%';
    perETH.innerHTML = valuePerETH.toLocaleString()+'%';
    perBNB.innerHTML = valuePerBNB.toLocaleString()+'%';
    perLTC.innerHTML = valuePerLTC.toLocaleString()+'%';
    perXRP.innerHTML = valuePerXRP.toLocaleString()+'%';
    perDOGE.innerHTML = valuePerDOGE.toLocaleString()+'%';
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
showPriceTop();


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
          <img src="${imgCoin}" class="icon-coin-rank" alt="SEI">
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