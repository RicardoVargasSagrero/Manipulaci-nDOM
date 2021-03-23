/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
console.log("Happy haking");
const URL = "https://platzi-avo.vercel.app/api/avo";
const baseURL = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('div#app');

const formatPrice = (price) =>{
  //Api de internalización 
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: "currency",
    currency: "USD",
  }).format(price);
  return newPrice;
}
/**
 * Web api
 * Conectarnos al servidor 
 * Procesar la respuesta, y convertirla en JSON 
 * JSON -> data -> renderizar info  browser 
 */

/* window.fetch(URL)
  //procesar la respuesta, y convertirla en JSON 
  .then((respuesta) => respuesta.json())
  //JSON -> Data -> Renderizar info browser
  .then(data =>{
    data.data.forEach((item) => {
      console.log(item.name);
    });
}) */

async function fetchData(){
  const response = await fetch(URL),
  data = await response.json(),
  allItems = [];
  const allItemsforEach = [];
  data.data.forEach((item) => {
    /**
     * Crear imagen, título y precio
     */
    //Imagen
    const img = document.createElement('img');
    img.src = `${baseURL}${item.image}`;
    img.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
    console.log(`${baseURL}${item.image}`);

    //Título
    const title = document.createElement('h2');
    title.textContent = item.name;
    // title.style = "font-size: 3rem";
    // title.style.fontSize = "3rem"
    /**
     * La información de text-2xl viene del 
     * framework de tailwindcss 
     * https://tailwindcss.com/
     */
    title.className = "text-l text-indigo-600 antialiased"

    //Precio
    const price = document.createElement('div');
    price.textContent = formatPrice(item.price);
    price.className = "text-center md:text-left text-gray-600";


    const container = document.createElement('div');
    container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
    container.append(img, title, price);
    allItemsforEach.push(container);  
  });
  appNode.append(...allItemsforEach);
}

fetchData();