







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


