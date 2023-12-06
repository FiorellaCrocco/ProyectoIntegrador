const { Builder, By, until } = require('selenium-webdriver');

async function realizarLogin(driver, email, password, btnClass) {
  try {
    // Navegar a la página de inicio de sesión
    await driver.get('https://onlybooks.isanerd.club/login');
    await driver.manage().window().maximize();

    // Ingresar el usuario y contraseña
    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('password')).sendKeys(password);

    // Hacer clic en el botón de inicio de sesión
    await driver.findElement(By.className('btn-lr')).click();

    // Esperar a que se cargue la página de inicio después del inicio de sesión (ajustar según tu aplicación)
    await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 10000);

    console.log('Inicio de sesión exitoso');
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
  }
}

async function realizarCierreSesion(driver) {
  try {
    // Hacer clic en el avatar para abrir el menú
    const avatarElement = await driver.findElement(By.xpath('/html/body/div[1]/div/header/div/div[2]/div[1]/div'));
    await avatarElement.click();
    
    
    // Hacer clic en el enlace de cerrar sesión
    const cerrarSesionLink = await driver.findElement(By.xpath('/html/body/div[1]/div/header/div/div[2]/div[2]/div'));
    await cerrarSesionLink.click();

    // Esperar a que se complete el cierre de sesión (ajustar según tu aplicación)
    await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 10000);
    await driver.sleep(10000);
    console.log('Cierre de sesión exitoso');
  } catch (error) {
    console.error('Error durante el cierre de sesión:', error.message);
  }
}

// Crear el driver
const driver = new Builder().forBrowser('chrome').build();

// Ejecutar la función de login
realizarLogin(driver, 'dani@gmail.com', 'Daniel12', 'btn-lr')
  .then(() => {
    // Supongamos que el XPath del avatar es /html/body/div[1]/div/header/div/div[2]/div[2]/div
    // Ajusta el XPath según la estructura real de tu aplicación
    const avatarXPath = '/html/body/div[1]/div/header/div/div[2]/div[2]/div';

    // Ejecutar la función de cierre de sesión después de un tiempo de espera (ajusta según tu aplicación)
    setTimeout(() => {
      realizarCierreSesion(driver, avatarXPath).finally(() => driver.quit());
    }, 5000);
  })
  .catch((error) => console.error('Error durante el inicio de sesión:', error.message));