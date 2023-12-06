const { Builder, By, Key, until } = require('selenium-webdriver');


async function agregarFavorito() {
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

    // Buscar el producto "Blancanieves"
    await driver.get('https://onlybooks.isanerd.club/');
    await driver.wait(until.elementLocated(By.css('input[name="busqueda"]')), 10000);
    await driver.findElement(By.css('input[name="busqueda"]')).sendKeys('Blancanieves', Key.RETURN);

    // Esperar hasta que el elemento con el título esté presente en la página
    const tituloElement = await driver.wait(until.elementLocated(By.css('.cantLibros')), 10000);

    // Obtener el texto del elemento con el título
    const titulo = await tituloElement.getText();
    console.log('Título de la página:', titulo);

    // Hacer clic en boton favorito en el primer resultado (suponiendo que es el correcto)
    await driver.findElement(By.css('.listaPaginada .FavCardCorazon')).click();
    console.log("Hace click en la card");

    await driver.sleep(10000);

    console.log('Click en favorito con éxito!');

  } finally {
    // Cerrar el navegador al finalizar
    await driver.quit();
  }
}

agregarFavorito();