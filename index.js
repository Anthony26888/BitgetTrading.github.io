
var btcPrice = document.getElementById("btcPrice")
var ethPrice = document.getElementById("ethPrice")
var bnbPrice = document.getElementById("bnbPrice")
var perBTC = document.getElementById("PerBTC")
var perETH = document.getElementById("PerETH")
var perBNB = document.getElementById("PerBNB")



const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Cdogecoin%2Cbitget-token&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true&precision=2`;


function showPrice(){
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {   
    const valueBTC = data.bitcoin.usd;     
    const valueETH = data.ethereum.usd;
    const valueBNB = data.binancecoin.usd; 

    const valuePerBTC = data.bitcoin.usd_24h_change;
    const valuePerETH = data.ethereum.usd_24h_change;
    const valuePerBNB = data.binancecoin.usd_24h_change;



    btcPrice.innerHTML = valueBTC.toLocaleString();    
    ethPrice.innerHTML = valueETH.toLocaleString();
    bnbPrice.innerHTML = valueBNB.toLocaleString();
    perBTC.innerHTML = valuePerBTC.toLocaleString()+'%';
    perETH.innerHTML = valuePerETH.toLocaleString()+'%';
    perBNB.innerHTML = valuePerBNB.toLocaleString()+'%';
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
showPrice();



