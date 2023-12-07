const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

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

async function cambiarRol() {
  let driver;

  try {
    // Configurar el controlador WebDriver para Chrome
    driver = await new Builder().forBrowser('chrome').build();

    // Iniciar sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Refrescar la página principal
    //await driver.navigate().refresh();

    // Navegar a la página de administrador
    await driver.findElement(By.linkText('Administrador')).click();

    // Seleccionar "Listar Usuarios"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(7)')).click();

    // Esperar a que la página cargue completamente
    await driver.wait(until.elementLocated(By.css('#root > div > div.content-container > div > div > div.selected-item > div > ul > li:nth-child(10) > div.admin-btn-containerUser > button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSuccess.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSuccess.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.btnEditUser.css-o0kyn4')), 20000);

    // Encontrar el botón "CAMBIAR ROL"
    const cambiarRolButton = await driver.findElement(By.css('#root > div > div.content-container > div > div > div.selected-item > div > ul > li:nth-child(10) > div.admin-btn-containerUser > button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSuccess.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSuccess.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.btnEditUser.css-o0kyn4'));
  console.log("hizo click")
    // Hacer clic en el botón "CAMBIAR ROL"
    await cambiarRolButton.click();

// Esperar unos segundos para cargar el cuadro de diálogo de confirmación
await driver.sleep(2000);

// Hacer clic en el botón "Confirmar" del cuadro de diálogo
await driver.findElement(By.css('button.swal2-confirm')).click();

// Esperar unos segundos para asegurarse de que se borre la categoría
await driver.sleep(5000);

console.log('Rol cambiado correctamente.');

  } catch (error) {
    console.error('Error durante el cambio de rol:', error.message);
  } finally {
    // Cerrar el navegador al finalizar
    if (driver) {
      await driver.quit();
    }
  }
}



// Llamar a la función principal
cambiarRol();
//borrarUsuario();