const cardano = {
  get() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=cardano"
    );
    xhr.responseType = "json";
    xhr.send();
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        console.log(`Received ${event.loaded} of ${event.total} bytes`);
      } else {
        console.log(`Received ${event.loaded} bytes`);
      }
    };
    xhr.onload = this.callback;
    xhr.onerror = () => alert("Request failed");
  },
  callback() {
    const data = this.response[0];
    /* const keys = Object.keys(data);
    console.log(keys);
    const values = Object.values(data); */
    appendLogo("#logo", data.image);
    appendText("#name", data.name);
    appendText("#price", data.current_price);
    appendText("#rank", data.market_cap_rank);
  },
};

function appendLogo(selector, data) {
  const el = document.querySelector(selector);
  const image = document.createElement("img");
  image.src = data;
  image.height = 24;
  image.width = 24;
  el.append(image);
}

function appendText(selector, text) {
  const el = document.querySelector(selector);
  const node = document.createTextNode(text);
  el.append(node);
}

function render() {
  const td = document.querySelector("td");
  const tds = document.querySelectorAll("td");
  if (td.childElementCount > 0) {
    tds.forEach(removeElements);
    cardano.get();
  }
}

function removeElements(node) {
  while (node.firstChild) node.removeChild(node.lastChild);
}

const button = document.querySelector("#get");
button.addEventListener("click", render);
cardano.get();
