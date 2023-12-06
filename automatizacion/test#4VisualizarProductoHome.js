const { Builder, Capabilities, By, until } = require('selenium-webdriver');

async function realizarLogin(driver, email, password) {
  // Navegar a la página de inicio de sesión
  await driver.get('https://onlybooks.isanerd.club/login');

  // Ingresar el usuario y contraseña
  await driver.findElement(By.name('email')).sendKeys(email);
  await driver.findElement(By.name('password')).sendKeys(password);

  // Hacer clic en el botón de inicio de sesión
  await driver.findElement(By.className('btn-lr')).click();

  // Esperar a que se cargue la página de inicio después del inicio de sesión (ajustar según tu aplicación)
  await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 5000);
}

async function Id_00021() {
  // Crear el objeto de configuración de Chrome
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

  // Crear el driver de Selenium
  const driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  try {
    // Navegar a la página principal (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/');
    // Esperar a que se cargue la página principal
    await driver.wait(until.elementLocated(By.className('home')), 5000);

    // Realizar el inicio de sesión
    await realizarLogin(driver, 'dani@gmail.com', 'Daniel12');

    // Esperar a que se carguen los productos aleatorios (ajustar según tu aplicación)
    await driver.wait(until.elementLocated(By.className('body-cards')), 5000);

    // Obtener la lista de productos aleatorios
    const productosAleatorios = await driver.findElements(By.className('card-info'));

    // Verificar que hay como máximo 10 productos aleatorios
    if (productosAleatorios.length <= 10) {
      console.log('La comprobación de productos aleatorios exitosa.');
    } else {
      console.error('Error: Se muestran más de 10 productos aleatorios en la página.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function verificarProductosNoRepetidos() {
  // Crear el objeto de configuración de Chrome
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

  // Crear el driver de Selenium
  const driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  try {
    // Navegar a la página principal (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/');
    // Esperar a que se cargue la página principal
    await driver.wait(until.elementLocated(By.className('home')), 5000);

    // Realizar el inicio de sesión
    await realizarLogin(driver, 'dani@gmail.com', 'Daniel12');

    // Verificar que no haya productos repetidos en diferentes cargas
    await verificarProductosNoRepetidosEnCargas(driver);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function verificarProductosNoRepetidosEnCargas(driver) {
  const productosCargas = [];

  for (let carga = 1; carga <= 3; carga++) {
    // Esperar a que se carguen los productos aleatorios (ajustar según tu aplicación)
    await driver.wait(until.elementLocated(By.className('body-cards')), 5000);

    // Obtener la lista de productos aleatorios
    const productosAleatorios = await driver.findElements(By.className('card-info'));

    // Obtener nombres de productos
    const nombresProductos = await obtenerNombresProductos(driver, productosAleatorios);

    // Verificar que no haya productos repetidos en la carga actual
    const productosRepetidos = nombresProductos.filter(producto => productosCargas.includes(producto));
    if (productosRepetidos.length === 0) {
      console.log(`Carga ${carga}: La verificación de productos no repetidos es exitosa.`);
    } else {
      console.error(`Carga ${carga}: Error - Se encontraron productos repetidos en la página.`);
    }

    // Agregar nombres de productos a la lista general
    productosCargas.push(...nombresProductos);

    // Recargar la página para obtener una segunda carga
    await driver.navigate().refresh();
  }
}

async function obtenerNombresProductos(driver, productos) {
  const nombresProductos = [];

  for (const producto of productos) {
    const tituloElemento = await producto.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div/div[2]/div[2]/ul/div[1]/div/div[3]/h3'));    
    const nombre = await tituloElemento.getText();
    nombresProductos.push(nombre);
  }

  return nombresProductos;
}

// Llamar a las funciones según sea necesario
//Id_00021();
verificarProductosNoRepetidos();