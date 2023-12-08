const { Builder, Capabilities, By, until } = require('selenium-webdriver');

async function registrarUsuario(name, lastname, email, dni, password, repeatPassword) {
  let driver;

  try {
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', { args: ['--headless'] });

    // Crear el driver de Selenium
    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();

    // Navegar a la página de registro
    await driver.get('https://onlybooks.isanerd.club/registrarse');

    // Ingresar el correo electrónico en el campo de entrada con la clase "input"
	
    await driver.findElement(By.id('name')).sendKeys(name);
    await driver.findElement(By.id('lastname')).sendKeys(lastname);
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('dni')).sendKeys(dni);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('repeatPassword')).sendKeys(repeatPassword);

    // Hacer clic en el botón de registro (ajustar según sea necesario)
    await driver.findElement(By.className('btn-lr')).click();
    await driver.sleep(15000);
    

    console.log('Usuario registrado exitosamente.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}



async function eliminarUsuario(email) {
  let driver;

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
    await iniciarSesionComoAdmin(driver);

    // Navegar a la página principal
    await driver.get('https://onlybooks.isanerd.club/');

    // Realizar la eliminación del usuario con el email proporcionado
    await eliminarUsuarioPorEmail(driver, email);

    console.log('Usuario eliminado correctamente.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}

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

// Función para listar usuarios y eliminar uno específico
async function eliminarUsuario(email) {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();
    // Iniciar sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

     // Refrescar la página principal
     await driver.navigate().refresh();
     await driver.sleep(5000);
    // Navegar a la página de administrador
    await driver.findElement(By.linkText('Administrador')).click();
    await driver.sleep(2000);
    // Hacer clic en el botón "Listar Usuarios"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(7)')).click();
    await driver.sleep(5000);
    // Encontrar el usuario por email y hacer clic en el botón "Eliminar"
  const userRow = await driver.findElement(By.xpath(`//div[@class='nombreUser' and contains(text(), '${email}')]//ancestor::li[@class='listaUser']`));
  const deleteButton = await userRow.findElement(By.css('.btnEditUser'));
  await deleteButton.click();

    // Hacer clic en "Sí, eliminar"
    await driver.findElement(By.css('.swal2-confirm')).click();

    console.log(`Usuario con email ${email} eliminado correctamente.`);
  } catch (error) {
    console.error('Error durante la eliminación de usuario:', error.message);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

// Ejemplo de uso
//eliminarUsuario('informatico33asse@gmail.com');




// Ejemplo de uso
//

registrarUsuario('pascual2', 'Camandulle', 'informatico33asse@gmail.com', '123456789', 'Password123', 'Password123');