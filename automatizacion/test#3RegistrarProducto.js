const { Builder, Capabilities, By, until } = require('selenium-webdriver');

async function realizarLogin(driver, email, password, btnClass) {
  // Navegar a la página de inicio de sesión
  await driver.get('https://onlybooks.isanerd.club/login');
  await driver.manage().window().maximize();

  // Ingresar el usuario y contraseña
  await driver.findElement(By.name('email')).sendKeys(email);
  await driver.findElement(By.name('password')).sendKeys(password);

  // Hacer clic en el botón de inicio de sesión
  await driver.findElement(By.className(btnClass)).click();

  // Esperar a que se cargue la página de inicio después del inicio de sesión (ajustar según tu aplicación)
  await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 10000);
  
}

async function Id_00014() {
  // Crear el objeto de configuración de Chrome
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

  // Crear el driver de Selenium
  const driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  try {
    // Realizar el inicio de sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Recargar la página principal
    await driver.navigate().refresh();

    // Ir a la página de administración
    await driver.findElement(By.css('.subnavbar a:nth-child(6)[href="/administrador"]')).click();
    
    // Seleccionar "Listar Productos"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(3)')).click();
    
    // Esperar a que se cargue la lista de productos
    await driver.wait(until.elementLocated(By.css('#root > div > div.content-container > div > div > div.selected-item > div > ul')), 5000);
    
    // Obtener la lista de productos
    const listaProductos = await driver.findElements(By.className('listaContainerAdmin'));

    // Verificar que haya al menos un elemento en la lista
    if (listaProductos.length > 0) {
      console.log('La verificación de productos en el listado es exitosa.');
    } else {
      console.error('Error: No se encontraron productos en el listado.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function agregarProducto() {
  // Crear el objeto de configuración de Chrome
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

  // Crear el driver de Selenium
  const driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  try {
    // Realizar el inicio de sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Recargar la página principal
    await driver.navigate().refresh();

    // Hacer clic en el enlace de la página de administración usando nth-child y la referencia
    await driver.findElement(By.css('.subnavbar a:nth-child(6)[href="/administrador"]')).click();

    // Seleccionar "Agregar Productos"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(2)')).click();

    // Completar el formulario
    await driver.findElement(By.id('title')).sendKeys('Auto3');
    await driver.findElement(By.id('author')).sendKeys('Auto');
    await driver.findElement(By.id('description')).sendKeys('Test Automatizado');
    await driver.findElement(By.id('isbn')).sendKeys('473878291');
    await driver.findElement(By.id('publication_year')).sendKeys('25/03/2015');
    await driver.findElement(By.id('price')).sendKeys('960');

    // Seleccionar la categoría
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.selected-item > div > div > form > div.ccSelect > div:nth-child(1) > div:nth-child(6) > label')).click();

    // Seleccionar las características
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.selected-item > div > div > form > div.ccSelect > div:nth-child(2) > div:nth-child(2) > label')).click();
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.selected-item > div > div > form > div.ccSelect > div:nth-child(2) > div:nth-child(5) > label')).click();
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.selected-item > div > div > form > div.ccSelect > div:nth-child(2) > div:nth-child(9) > label')).click();

    // Ingresar la ubicación de la imagen
    await driver.findElement(By.id('image')).sendKeys('C:\\Users\\infor\\OneDrive\\Imágenes\\Sentra-Reveal-696x427.jpg');
    
    // Hacer clic en el botón "FormBtn"
    await driver.findElement(By.className('FormBtn')).click();
    await driver.sleep(5000);

    const Swal2Container = By.css('.swal2-container');
const botonOK = By.css('button.swal2-confirm');

// Esperar a que el botón "OK" esté presente
await driver.wait(until.elementLocated(botonOK), 10000);

// Hacer clic en el botón "OK"
await driver.findElement(botonOK).click();

// Esperar a que el contenedor Swal2 desaparezca
await driver.wait(until.stalenessOf(await driver.findElement(Swal2Container)), 10000);
    // Hacer clic en "Listar Productos"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(3)')).click();

    // Esperar a que se cargue la lista de productos
    await driver.wait(until.elementLocated(By.css('#root > div > div.content-container > div > div > div.selected-item > div > ul')), 5000);

    // Obtener la lista de productos
    const listaProductos = await driver.findElements(By.css('#root > div > div.content-container > div > div > div.selected-item > div > ul > li'));

    // Verificar que haya al menos un elemento en la lista
    if (listaProductos.length > 0) {
      console.log('La verificación de productos en el listado es exitosa.');
    } else {
      console.error('Error: No se encontraron productos en el listado.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function editarProducto() {
  let driver; // Declarar driver fuera del bloque try-catch-finally

  try {
    // Crear el objeto de configuración de Chrome
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

    // Crear el driver de Selenium
    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();

    // Realizar el inicio de sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Recargar la página principal
    await driver.navigate().refresh();

    // Navegar a la página de administrador
    await driver.findElement(By.css('#root > div > div.subnavbar > a:nth-child(6)')).click();

    // Seleccionar "Listar Productos"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(3)')).click();

    // Esperar a que se cargue la lista de productos en la página de administrador
    await driver.wait(until.elementLocated(By.css('.listaContainerAdmin .lista')), 10000);

    // Buscar el elemento con nombre "Auto"
    const elementoAuto = await driver.findElement(By.xpath("//div[contains(@class, 'nombre') and contains(text(), 'Auto')]"));

    // Hacer clic en el botón "Editar" del elemento encontrado
    await elementoAuto.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div/div[2]/div/ul/li[19]/div[3]/button[2]')).click();

    await driver.sleep(1000);

     // Realizar la edición del producto
     await driver.findElement(By.name('title')).clear();
     await driver.findElement(By.name('title')).sendKeys('Auto Editado');
     await driver.findElement(By.name('author')).clear();
     await driver.findElement(By.name('author')).sendKeys('Auto Editado');
     await driver.findElement(By.name('description')).clear();
     await driver.findElement(By.name('description')).sendKeys('Test Automatizado Editado');
     await driver.findElement(By.name('isbn')).clear();
     await driver.findElement(By.name('isbn')).sendKeys('47387829153');
     await driver.findElement(By.name('publication_year')).clear();
     await driver.findElement(By.name('publication_year')).sendKeys('25/03/2019');
     await driver.findElement(By.name('price')).clear();
     await driver.findElement(By.name('price')).sendKeys('1000');
 

    // Hacer clic en el botón "Editar Categoría"
    await driver.findElement(By.css('body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div > form > div:nth-child(8) > button')).click();

    // Cambiar categoría
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div:nth-child(1)')).click();

    // Cerrar la ventana de categoría
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-1vskg8q > button')).click();

    // Hacer clic en el botón "Editar Características"
    await driver.findElement(By.css('body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div > form > div:nth-child(9) > button')).click();

    // Editar características
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div:nth-child(1)')).click();
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div:nth-child(3)')).click();
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div:nth-child(6)')).click();

    // Cerrar la ventana de características
    await driver.findElement(By.css('body > div:nth-child(8) > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.css-1vskg8q > button')).click();

    // Guardar cambios
    await driver.findElement(By.css('body > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.css-1ty026z > div > form > button')).click();
    await driver.sleep(5000);
    
    console.log('Producto editado correctamente.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}

async function eliminarProducto() {
  let driver; // Declarar driver fuera del bloque try-catch-finally

  try {
    // Crear el objeto de configuración de Chrome
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

    // Crear el driver de Selenium
    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();

    // Realizar el inicio de sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Recargar la página principal
    await driver.navigate().refresh();

    // Navegar a la página de administrador
    await driver.findElement(By.css('#root > div > div.subnavbar > a:nth-child(6)')).click();

    // Seleccionar "Listar Productos"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(3)')).click();

    // Esperar a que se cargue la lista de productos en la página de administrador
    await driver.wait(until.elementLocated(By.css('.listaContainerAdmin .lista')), 10000);

    // Buscar el elemento "Auto3" en la lista
const elementoAuto3 = await driver.findElement(By.xpath("//div[contains(@class, 'nombre') and text()='Auto Editado']"));

// Encontrar el botón "Eliminar" dentro del elemento "Auto3"
const botonEliminarAuto3 = await elementoAuto3.findElement(By.xpath(".//following-sibling::div/button[contains(@class, 'MuiButton-outlinedError')]"));

// Hacer clic en el botón "Eliminar" para "Auto3"
await botonEliminarAuto3.click();
    
    // Esperar unos segundos (ajustar según sea necesario)
    await driver.sleep(2000);

    // Hacer clic en el botón de confirmación en el cuadro de diálogo de eliminación
    await driver.findElement(By.css('button.swal2-confirm')).click();
    // Esperar unos segundos antes de hacer clic en OK en el siguiente cuadro de diálogo
await driver.sleep(5000);

// Hacer clic en el botón "OK" del siguiente cuadro de diálogo
const Swal2Container = By.css('.swal2-container');
const botonOK = By.css('button.swal2-confirm');

// Esperar a que el botón "OK" esté presente
await driver.wait(until.elementLocated(botonOK), 10000);

// Hacer clic en el botón "OK"
await driver.findElement(botonOK).click();
    console.log('Producto eliminado correctamente.');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}

// Llamar a la función principal




// Llamar a la función principal

// Llamar a la función principal
//Id_00014();
//agregarProducto();
//editarProducto();
eliminarProducto();
