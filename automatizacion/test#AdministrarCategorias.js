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

async function crearCategoria() {
  let driver;

  try {
    // Configurar el controlador WebDriver para Chrome
    driver = await new Builder().forBrowser('chrome').build();

    // Iniciar sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Refrescar la página principal
    await driver.navigate().refresh();

    // Navegar a la página de administrador
    await driver.findElement(By.linkText('Administrador')).click();

    // Seleccionar "Agregar Categoria"
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(4)')).click();

    // Esperar unos segundos
    await driver.sleep(2000);

   

    // Completar el campo de texto para la nueva categoria
    const inputTitCategoria = await driver.findElement(By.css('input[name="titulo"]'));
    await inputTitCategoria.sendKeys('CategoriaTest');

    // Completar el campo descripción

    const inputDescripcion = await driver.findElement(By.css('textarea[name="descripcion"]'));
    await inputDescripcion.sendKeys('Descripcion Test');

    // Ruta completa de la imagen que deseas cargar
    const rutaImagen = path.resolve('C:\\Users\\infor\\OneDrive\\Imágenes\\categoria.jpg');

// Encontrar el campo de carga de imágenes por su selector
const campoImagen = await driver.findElement(By.css('input.input[type="file"][name="imagen"]'));

// Enviar la ruta de la imagen al campo de carga
await campoImagen.sendKeys(rutaImagen);

    // Esperar unos segundos para asegurarse de que la carga se complete
    await driver.sleep(2000);

    console.log('Imagen cargada correctamente.');

    // Hacer clic en el botón Guardar
    await driver.findElement(By.className('FormBtn')).click();

    // Esperar unos segundos
    await driver.sleep(1000);

    // Verificar si hay un popup de error
    const errorPopup = await driver.findElements(By.className('clase-del-popup-de-error'));

    if (errorPopup.length > 0) {
      // Si existe un popup de error, manejarlo según sea necesario
      console.error('Se ha producido un error:', await errorPopup[0].getText());
    } else {
      // Si no hay popup de error, imprimir un mensaje de éxito
      console.log('Categoría creada correctamente.');
    }
  } catch (error) {
    console.error('Error durante la creación de categoría:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}

 async function editarCategoria() {
  let driver;

  try {
    // Configurar el controlador WebDriver para Chrome
    driver = await new Builder().forBrowser('chrome').build();

    // Iniciar sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Refrescar la página principal
    await driver.navigate().refresh();

    // Navegar a la página de administrar características
    await driver.findElement(By.css('#root > div > div.subnavbar > a:nth-child(6)')).click();
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(6)')).click();

    // Esperar unos segundos para cargar la página de características
    await driver.sleep(2000);

    // Buscar el elemento con nombre "Caracteristica Test"
    const elementoCaracteristica = await driver.findElement(By.xpath("//div[@class='listaTitle' and contains(text(), 'caracteristicaTest')]"));
    await driver.sleep(2000);
    
    // Hacer clic en el botón "Editar" del elemento
    const botonEditar = await elementoCaracteristica.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div/div[2]/div/ul/li[9]/div[3]/button[2]'));
    await botonEditar.click();

    // Esperar unos segundos para cargar la página de edición
    await driver.sleep(2000);

    // Cambiar el título de la característica
    const inputTitulo = await driver.findElement(By.css('input.inputTitCaract'));
    await inputTitulo.clear();
    await inputTitulo.sendKeys('CaracteristicaTest Editada');

    // Hacer clic en el botón "Guardar"
    const botonGuardar = await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div/div[2]/div/div/div/button[2]'));
    await botonGuardar.click();

    // Esperar unos segundos para asegurarse de que se guarden los cambios
    await driver.sleep(2000);
    
    // Hacer clic en el botón "OK" del siguiente cuadro de diálogo
await driver.findElement(By.xpath('/html/body/div[3]/div/div[6]/button[1]')).click();
await driver.sleep(10000);
    console.log('Característica editada correctamente.');
  } catch (error) {
    console.error('Error durante la edición de característica:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
} 


async function borrarCategoria() {
  let driver;

  try {
    // Configurar el controlador WebDriver para Chrome
    driver = await new Builder().forBrowser('chrome').build();

    // Iniciar sesión como administrador
    await realizarLogin(driver, 'admin@gmail.com', 'Admin123', 'btn-lr');

    // Refrescar la página principal
    await driver.navigate().refresh();

    // Navegar a la página de administrar características
    await driver.findElement(By.css('#root > div > div.subnavbar > a:nth-child(6)')).click();
    await driver.findElement(By.css('#root > div > div.content-container > div > div > div.buttons-container > button:nth-child(5)')).click();

    // Esperar unos segundos para cargar la página de características
    await driver.sleep(2000);

    // Buscar el elemento con nombre "Categoria Test"
    const elementoCategoria = await driver.findElement(By.xpath("//div[@class='textCat' and text()='CategoriaTest']"));
    
    // Hacer clic en el botón "Borrar" del elemento
    const btnContainer = await elementoCategoria.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div/div[2]/div/ul/li[11]/div[3]/button'));
    await btnContainer.click();

    // Esperar unos segundos para cargar el cuadro de diálogo de confirmación
    await driver.sleep(2000);

    // Hacer clic en el botón "Confirmar" del cuadro de diálogo
    await driver.findElement(By.css('button.swal2-confirm')).click();

    // Esperar unos segundos para asegurarse de que se borre la categoría
    await driver.sleep(5000);

    console.log('Categoría borrada correctamente.');
  } catch (error) {
    console.error('Error durante la eliminación de categoría:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    if (driver) {
      await driver.quit();
    }
  }
}

// Llamar a la función principal
//crearCategoria();
//editarCaracteristica();
//borrarCategoria();