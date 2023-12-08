const { Builder, By, until } = require('selenium-webdriver');

async function realizarLogin(driver, email, password, btnClass) {
  try {
    await driver.get('https://onlybooks.isanerd.club/login');
    await driver.manage().window().maximize();

    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.className(btnClass)).click();

    await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 10000);

    // Hacer clic en "Mis Favoritos"
    const misFavoritosButton = await driver.findElement(By.css('#root > div > div.subnavbar > a:nth-child(2)'));
    await misFavoritosButton.click();

    console.log('Inicio de sesión exitoso y clic en "Mis Favoritos" realizado con éxito');
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
  }
}

async function clicEnFavorito(driver, tituloProducto) {
  try {
    // Esperar a que el botón Favorito del título sea clickable
    const botonFavorito = await driver.wait(until.elementLocated(By.xpath(`//h3[text()="${tituloProducto}"]/ancestor::div[@class="card"]/div[@class="buttonFavContainer"]//div[@id="favIcon"]`)), 15000);

    // Hacer clic en el botón Favorito
    await botonFavorito.click();

    console.log('Clic en Favorito realizado con éxito');
  } catch (error) {
    console.error('Error al hacer clic en Favorito:', error.message);
  }
}

// Uso de las funciones
(async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await realizarLogin(driver, 'informatico33asse@gmail.com', 'Password123', 'btn-lr');

    const productoXPath = '/html/body/div[1]/div/div[2]/div/div/div';
    const tituloProducto = 'Blancanieves';

    

    // Buscar el producto y hacer clic en Favorito en la misma página
    await driver.wait(until.elementLocated(By.xpath(productoXPath)), 10000);
    await clicEnFavorito(driver, tituloProducto);
  } finally {
    await driver.sleep(10000);
    await driver.quit();
  }
})();