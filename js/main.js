document.querySelector("span").innerText = new Date().getFullYear();



async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let dolar = document.getElementById("dolar");
      let euro = document.getElementById("euro");
      let real = document.getElementById("real");
      
      dolar.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(data.USD);
      euro.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(data.EUR);
      real.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.BRL);
      return;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
const url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,BRL";

fetchData(url);
AOS.init();

setInterval(() => fetchData(url), 5000)
