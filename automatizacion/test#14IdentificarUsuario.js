const { Builder, Capabilities, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function login(email, password) {
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });
  
let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

  try {
    await driver.get('https://onlybooks.isanerd.club/login/');
    await driver.manage().window().maximize();

    // Ingresa el correo electrónico y la contraseña
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);

    // Hacer clic en el botón de inicio de sesión
    await driver.findElement(By.className('btn-lr')).click();

    // Esperar a que se cargue la página después del inicio de sesión
    await driver.sleep(10000);

    return driver;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function testInvalidCredentials(email, password, expectedErrorMessage) {
  let driver = await login(email, password);

  if (driver) {
    try {
      // Esperar a que aparezca el mensaje de error
      await driver.wait(until.elementLocated(By.className('error-message')), 1000);

      // Verificar que el mensaje de error es correcto
      let errorMessage = await driver.findElement(By.className('error-message')).getText();
      assert.strictEqual(errorMessage, expectedErrorMessage);

      console.log("Login Test con credenciales incorrectas PASADO");
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Cerrar el navegador después de la prueba
      await driver.quit();
    }
  }
}

async function Id_00069() {
  let driver = await login('dani@gmail.com', 'Daniel12');

  if (driver) {
    try {
      let userMenu = await driver.findElement(By.className('user-menu'));

      // Utiliza assert para verificar si el user-menu está presente en la página
      assert.ok(userMenu);

      console.log("Login Exitoso");
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Cerrar el navegador después de la prueba
      await driver.quit();
    }
  }
}

async function Id_00070() {
  
  
await testInvalidCredentials(
    'correoIncorrecto@gmail.com',
    'Daniel12',
    'Credenciales incorrectas. Inténtelo de nuevo.'
  );
}

async function Id_00071() {
  await testInvalidCredentials(
    'dani@gmail.com',
    'contrasenaIncorrecta',
    'Credenciales incorrectas. Inténtelo de nuevo.'
  );
}

async function Id_00072() {
  let driver = await login('dani@gmail.com', 'Daniel12');

  if (driver) {
    try {
      // Localizar el elemento que contiene las iniciales del usuario en el user-menu
      let userMenu = await driver.findElement(By.className('user-menu'));
      let initialsElement = await userMenu.findElement(By.className('MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault avatar css-rgxo5k'));

      // Obtener las iniciales del usuario
      let userInitials = await initialsElement.getText();

      // Verificar que las iniciales coincidan con las esperadas (ajusta según tus necesidades)
      assert.strictEqual(userInitials, "DC");

      console.log("Login Exitoso con iniciales de Usuario correctas");
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Cerrar el navegador después de la prueba
      await driver.quit();
    }
  }
}

Id_00069();
Id_00070();
Id_00071();
Id_00072();