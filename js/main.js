const url =
  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,BRL";

document.querySelector("span").innerText = new Date().getFullYear();

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const dolar = document.getElementById("dolar");
    const euro = document.getElementById("euro");
    const real = document.getElementById("real");
    const date = new Date();

    dolar.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
    }).format(data.USD);
    euro.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(data.EUR);
    real.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(data.BRL);
    document.querySelector(
      "h4"
    ).innerText = `Última atualização ás ${formatarData(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )}`;

    return;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function formatarData(hora, minutos, segundos) {
  const padraoZero = (valor) => String(valor).padStart(2, "0");

  const horaFormatada = padraoZero(hora);
  const minutosFormatados = padraoZero(minutos);
  const segundosFormatados = padraoZero(segundos);

  return `${horaFormatada}:${minutosFormatados}:${segundosFormatados}`;
}

fetchData(url);
AOS.init();

setInterval(() => fetchData(url), 15000);
