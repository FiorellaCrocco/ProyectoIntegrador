const { Builder, Capabilities, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function Id_00001() {
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });
  let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

  try {
    await driver.manage().window().maximize();
    // Navegar a la página principal (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/');

    // Esperar a que se cargue la página principal
    await driver.wait(until.elementLocated(By.className('home')), 5000);

    // Obtener el tamaño del encabezado
    const headerSize = (await driver.findElement(By.css('#navbar')).getRect());

    // Obtener el tamaño de la pantalla
    const screenSize = await driver.manage().window().getSize();

    // Verificar que el ancho del encabezado sea al menos el 90% del ancho de la pantalla
    const expectedWidth = screenSize.width * 0.97;
    assert.ok(headerSize.width >= expectedWidth, 'El encabezado no ocupa al menos el 98% del ancho de la pantalla');

    console.log('El encabezado ocupa el 100% del ancho de la pantalla en la página principal');

    // Navegar a la página de registrarse 
    await driver.get('https://onlybooks.isanerd.club/registrarse');

    // Esperar a que se cargue la página de registrarse
    await driver.wait(until.elementLocated(By.className('navbar')), 5000);

    // Navegar a la página de detalle del libro id 22 
    await driver.get('https://onlybooks.isanerd.club/detail/22');

    // Esperar a que se cargue la página de detalle del libro id 22
    await driver.wait(until.elementLocated(By.className('navbar')), 5000);

    // Navegar a la página de inicio de sesión (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/login');

    // Esperar a que se cargue la página de inicio de sesión
    await driver.wait(until.elementLocated(By.className('navbar')), 5000);

    console.log('Verificación de encabezado en páginas de registro, detalle del libro id:22 e inicio de sesión exitosa');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}


async function Id_00002() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://onlybooks.isanerd.club/');
    await driver.manage().window().maximize();
    await driver.sleep(10000);

    // Obtener el encabezado por su clase, ID u otro selector
    const encabezado = await driver.findElement(By.css('#navbar'));

    // Simular scroll de usuario hacia abajo
    await driver.executeScript('window.scrollTo(0, 1000);');

    // Esperar a que se realice el scroll y se estabilice la página
    await driver.sleep(3000);

    // Verificar si el encabezado está en la vista (fixed)
    const isHeaderFixed = await driver.executeScript(
      'const rect = arguments[0].getBoundingClientRect(); return rect.top >= 0 && rect.bottom <= window.innerHeight;',
      encabezado
    );

    if (isHeaderFixed) {
      console.log('El encabezado permanece fijo después del scroll.');
    } else {
      console.log('El encabezado no permanece fijo después del scroll.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function Id_00005() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://onlybooks.isanerd.club/');
    await driver.manage().window().maximize();

    // Esperar a que la página se cargue completamente
    await driver.wait(until.elementLocated(By.className('home')), 5000);

    // Obtener el elemento del encabezado
    const encabezado = await driver.findElement(By.css('#navbar'));

    // Obtener el elemento del bloque alineado a la izquierda dentro del encabezado
    const bloqueIzquierda = await encabezado.findElement(By.className("header-left"));

    // Verificar que el bloque contiene el logotipo y el lema
    const logotipoPresente = await bloqueIzquierda.findElement(By.className('logo')).isDisplayed();
    const lemaPresente = await bloqueIzquierda.findElement(By.className('lema')).isDisplayed();

    assert.strictEqual(logotipoPresente, true, 'Logotipo no presente en el bloque izquierdo del encabezado.');
    assert.strictEqual(lemaPresente, true, 'Lema no presente en el bloque izquierdo del encabezado.');

    console.log('Verificación de bloque alineado a la izquierda que contiene el logotipo y el lema de la empresa. EXITOSA.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function Id_00004() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    
    
await driver.get('https://onlybooks.isanerd.club/');
    await driver.manage().window().maximize();

    // Esperar a que la página se cargue completamente
    await driver.wait(until.elementLocated(By.className('home')), 10000);

    // Obtener el elemento del encabezado
    const encabezado = await driver.findElement(By.css('#navbar'));

    // Obtener las dimensiones del encabezado
    const dimensionesEncabezado = await encabezado.getRect();

    // Verificar si las dimensiones son aceptables para dispositivos y resoluciones comunes
    const anchoMinimo = 320; // Ancho mínimo para dispositivos móviles
    const anchoMaximoDesktop = 1920; // Ancho máximo para dispositivos de escritorio

    assert.ok(dimensionesEncabezado.width >= anchoMinimo, 'El encabezado no cumple con el ancho mínimo para dispositivos móviles.');
    assert.ok(dimensionesEncabezado.width <= anchoMaximoDesktop, 'El encabezado excede el ancho máximo para dispositivos de escritorio.');

    console.log('Verificación de resoluciones, EXITOSA.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function Id_00006() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página principal
    await driver.get('https://onlybooks.isanerd.club/');
    await driver.manage().window().maximize();

    // Localizar el logotipo por su selector (puede ser por ID, clase, u otro)
    const logotipo = await driver.findElement(By.className('logo'));

    // Obtener el enlace de la página principal antes de hacer clic en el logotipo
    const enlaceAntesDeClicLogotipo = await driver.getCurrentUrl();

    // Hacer clic en el logotipo
    await logotipo.click();

    // Esperar a que la URL cambie después de hacer clic en el logotipo
    await driver.wait(until.urlIs(enlaceAntesDeClicLogotipo), 6000);

    // Localizar el lema por su selector
    const lema = await driver.findElement(By.className('lema'));

    // Obtener el enlace de la página principal antes de hacer clic en el lema
    const enlaceAntesDeClicLema = await driver.getCurrentUrl();

    // Hacer clic en el lema
    await lema.click();

    // Esperar a que la URL cambie después de hacer clic en el lema
    await driver.wait(until.urlIs(enlaceAntesDeClicLema), 5000);

    console.log('Click en logo o lema redirecciona en forma EXITOSA.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function Id_00007() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página principal
    await driver.get('https://onlybooks.isanerd.club/'); 

    // Esperar a que la página se cargue completamente
    await driver.wait(until.urlIs('https://onlybooks.isanerd.club/'), 5000);

    // Localizar el contenedor del encabezado por su selector
    const encabezado = await driver.findElement(By.className('navbar')); 

    // Localizar los botones "Crear cuenta" e "Iniciar sesión" dentro del encabezado
    const botonCrearCuenta = await encabezado.findElement(By.linkText('Crear cuenta'));
    const botonIniciarSesion = await encabezado.findElement(By.linkText('Iniciar sesión'));

    // Verificar la existencia de los botones
    if (await botonCrearCuenta.isDisplayed() && await botonIniciarSesion.isDisplayed()) {
      console.log('Los botones "Crear cuenta" e "Iniciar sesión" existen en el encabezado.');
    } else {
      console.log('Error: No se encontraron los botones "Crear cuenta" e "Iniciar sesión" en el encabezado.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

  

// Ejecutar el test
Id_00001();
/* Id_00002();
Id_00004();
Id_00005();
Id_00006();
Id_00007(); */