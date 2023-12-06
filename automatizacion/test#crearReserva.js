const { Builder, By, Key, until } = require('selenium-webdriver');


async function reservarProducto() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // Iniciar sesión
    await driver.get('https://onlybooks.isanerd.club/login');
    await driver.manage().window().maximize();
    await driver.findElement(By.name('email')).sendKeys('informatico33asse@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('Password123');
    await driver.findElement(By.className('btn-lr')).click();

    // Esperar a que se cargue la página de inicio después del inicio de sesión
    await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 30000);

    // Buscar el producto "1984"
    await driver.get('https://onlybooks.isanerd.club/');
    await driver.wait(until.elementLocated(By.css('input[name="busqueda"]')), 10000);
    await driver.findElement(By.css('input[name="busqueda"]')).sendKeys('1984', Key.RETURN);

    // Esperar hasta que el elemento con el título esté presente en la página
    const tituloElement = await driver.wait(until.elementLocated(By.css('.cantLibros')), 10000);

    // Obtener el texto del elemento con el título
    const titulo = await tituloElement.getText();
    console.log('Título de la página:', titulo);

    // Hacer clic en el primer resultado (suponiendo que es el correcto)
    await driver.findElement(By.css('.listaPaginada .card-title h3')).click();
    console.log("Hace click en la card");

    // Obtener el ID del producto de la URL en los resultados de búsqueda
    const urlResultados = await driver.getCurrentUrl();
    const idProducto = urlResultados.split('/').pop();
    console.log(idProducto);

    // Construir la URL de la página de detalle con el ID del producto
    const urlDetalle = `https://onlybooks.isanerd.club/detail/14`;
    console.log(urlDetalle);

    // Esperar a que se cargue la página del producto específico usando la URL construida
    await driver.get(urlDetalle);
    
    console.log("carga detalle");

await driver.sleep(10000);

// Desplazar la ventana de visualización hasta el elemento
const fechaInput = await driver.findElement(By.css('input.rmdp-input'));
await fechaInput.click(); // Abre el calendario
console.log("acá llega");


// Hacer clic en el rango de fechas del calendario
const fechaRange = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/div/div/div[2]/div/div/div/div/div[2]/div[1]'));
await fechaRange.click();
console.log("acá llega");

// Esperar un breve momento
await driver.sleep(2000);

// Ahora puedes interactuar con el calendario
// Por ejemplo, seleccionar la fecha de inicio (2023-12-01)
await driver.findElement(By.xpath('//div[@aria-label="Choose Tuesday December 05 of 2023"]/span')).click();

// Seleccionar la fecha de fin (2023-12-15)
await driver.findElement(By.xpath('//div[@aria-label="Choose Friday December 15 of 2023"]/span')).click();

// Esperar un breve momento
await driver.sleep(10000);
// Hacer clic en Reservar
await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]')).click();

console.log("hace click en reserva");

// Esperar a que cargue la siguiente pantalla
// Esperar a que el elemento con XPath '/html/body/div[1]/div/div[2]/form/h2' esté presente y visible
const headerElement = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[2]/form/h2')), 10000);
await driver.wait(until.elementIsVisible(headerElement), 10000);
await driver.sleep(10000);
// Ingresar "Uruguay" en el campo de país
const paisInput = await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/form/div/div[1]/div[5]/input'));
await paisInput.sendKeys('Uruguay');

// Hacer clic en Reservar
await driver.findElement(By.css('button._btn_1tb3t_67')).click();

// Esperar a que aparezca el popup
await driver.wait(until.elementLocated(By.css('button.swal2-confirm')), 5000);

// Hacer clic en OK en el popup
await driver.findElement(By.css('button.swal2-confirm')).click();

console.log('Proceso completado con éxito!');


    console.log('Producto reservado con éxito!');
  } finally {
    // Cerrar el navegador al finalizar
    await driver.quit();
  }
}

reservarProducto();