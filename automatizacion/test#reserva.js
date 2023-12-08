const { Builder, By, Key, until } = require('selenium-webdriver');

async function realizarLogin(driver, email, password, btnClass) {
  try {
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
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
  }
}




async function eliminarReserva() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');
    await driver.navigate().refresh();

    // Navegar al administrador de reservas
    const adminLink = await driver.findElement(By.xpath('//a[@href="/administrador"]'));
    await adminLink.click();

    // Seleccionar ADMINISTRAR RESERVAS
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(8)')).click();
// Hacer clic en el botón "Eliminar" después de esperar y manejar el cuadro de diálogo de carga
   
    await manejarDialogoConfirmacion(driver);

    // Agregar espera implícita
await driver.manage().setTimeouts({ implicit: 5000 });
    // Esperar a que aparezca la lista de reservas
    await driver.wait(until.elementLocated(By.css('ul.elementsCaractR')), 30000);

   
    // Espera a que el elemento con el texto "1984" sea visible
const elemento1984 = await driver.wait(until.elementLocated(By.xpath('//div[@class="listaTitleR" and contains(text(), "1984")]')), 15000);

// Encuentra el botón "Eliminar" dentro del mismo elemento padre
const botonEliminar = await elemento1984.findElement(By.xpath('./parent::li/div[5]/button'));

// Haz clic en el botón "Eliminar"
await botonEliminar.click();

    // Espera a que aparezca el popup de confirmación
const esperaPopup = await driver.wait(until.elementLocated(By.css('body > div.swal2-container.swal2-center.swal2-backdrop-show')), 15000);

// Encuentra y haz clic en el botón "Sí, eliminar"
const btnEliminarPopup = await esperaPopup.findElement(By.css('button.swal2-confirm.swal2-styled.swal2-default-outline'));
await btnEliminarPopup.click();



await manejarDialogoConfirmacion(driver)

await manejarDialogoConfirmacion(driver)

await manejarDialogoConfirmacion(driver)





    
    

    console.log('Reserva eliminada correctamente');
  } catch (error) {
    console.error('Se produjo un error:', error);
  } finally {
    try {
      await driver.quit();
    } catch (error) {
      console.error('Error al cerrar el navegador:', error.message);
    }
  }
}

async function manejarDialogoConfirmacion(driver) {
  try {
    const dialogButton = await driver.wait(until.elementLocated(By.css('button.swal2-confirm')), 15000);
    await dialogButton.click();
    console.log("Hizo clic en el botón de confirmación");
  } catch (error) {
    console.warn('No se encontró el botón de confirmación:', error.message);
  }
}


// Llamar a la función
eliminarReserva();




//reservarProducto();