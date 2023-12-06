const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const assert = require('assert');

async function Id_00009(resolucion) {
  const [width, height] = resolucion;
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });
  const driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

  try {
    await driver.manage().window().setSize(width, height);

    // Navegar a la página principal (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/');

    // Esperar a que se cargue la página
    await driver.wait(until.elementLocated(By.css('.home')), 5000);

    // Obtener el tamaño total de la página, incluyendo la barra de desplazamiento si está presente
    const totalPageHeight = await driver.executeScript(`
      return Math.max(
        document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
      );
    `);

    // Verificar que la altura del cuerpo sea igual o mayor al alto de la pantalla
    assert.ok(totalPageHeight >= height, `La altura del cuerpo no ocupa el 100% del alto de la pantalla para la resolución ${width}x${height}`);

    console.log(`Verificación de altura del cuerpo exitosa para resolución ${width}x${height}`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

const resoluciones = [
  [360, 640],
  [375, 667],
  [720, 1280],
  [1366, 768],
  [1440, 900],
  [1920, 1080]
];

// Iterar sobre las resoluciones y ejecutar la prueba para cada una secuencialmente
async function ejecutarPruebasId_00009() {
  for (const resolucion of resoluciones) {
    await Id_00009(resolucion);
  }
}


async function Id_00011() {
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', { args: ['--headless'] });
  const driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

  try {
    // Navegar a la página principal (ajusta la URL según tu aplicación)
    await driver.get('https://onlybooks.isanerd.club/');

    // Esperar a que se cargue la página
    await driver.wait(until.elementLocated(By.css('.home')), 5000);

    // Verificar visibilidad del bloque de buscador
    const buscadorVisible = await driver.findElement(By.className('buscador-section')).isDisplayed();
    assert.ok(buscadorVisible, 'El bloque de buscador no es visible en la página principal');

    // Verificar visibilidad del bloque de categorías
    const categoriasVisible = await driver.findElement(By.className('columnCategorias')).isDisplayed();
    assert.ok(categoriasVisible, 'El bloque de categorías no es visible en la página principal');

    // Verificar visibilidad del bloque de recomendaciones de productos
    const recomendacionesVisible = await driver.findElement(By.className('_recomendacion_1gh60_1')).isDisplayed();
    assert.ok(recomendacionesVisible, 'El bloque de recomendaciones de productos no es visible en la página principal');

    console.log('Verificación de visibilidad de secciones Buscador,Categorias y Recomendado EXITOSA en la página principal');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Cerrar el navegador después de la prueba
    await driver.quit();
  }
}

async function Id_00012() {
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', { args: ['--headless'] });
    const driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
  
    try {
      await driver.manage().window().maximize();
  
      // Navegar a la página principal (ajusta la URL según tu aplicación)
      await driver.get('https://onlybooks.isanerd.club/');
  
      // Verificar la sección de productos
      await verificarSeccionProductos(driver);
  
      // Verificar la sección de categorías
      await verificarSeccionCategorias(driver);
  
      // Verificar la sección de recomendaciones
      await verificarSeccionRecomendaciones(driver);
  
      console.log('Verificación de contenido en todas las secciones exitosa en la página principal');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Cerrar el navegador después de la prueba
      await driver.quit();
    }
  }
  
  async function verificarSeccionProductos(driver) {
    // Verificar la existencia de la sección de productos
    const seccionProductos = await driver.findElement(By.className('listaPaginada'));
    assert.ok(await seccionProductos.isDisplayed(), 'La sección de productos no es visible');
  
    // Verificar que haya al menos 10 cards en dos filas y 5 columnas
    const cards = await driver.findElements(By.className('body-cards'));
    assert.strictEqual(cards.length, 10, 'La sección de productos no contiene 10 cards');
  
    console.log('Verificación de contenido en la sección de productos exitosa');
  }
  
  async function verificarSeccionCategorias(driver) {
    // Verificar la existencia de la sección de categorías
    const seccionCategorias = await driver.findElement(By.className('category-title'));
    assert.ok(await seccionCategorias.isDisplayed(), 'La sección de categorías no es visible');
  
    // Verificar la existencia de al menos una categoría seleccionada
    const categoriaSeleccionada = await driver.findElement(By.className('category-square'));
    assert.ok(await categoriaSeleccionada.isDisplayed(), 'No hay categorías seleccionadas');
  
    console.log('Verificación de contenido en la sección de categorías exitosa');
  }
  
  async function verificarSeccionRecomendaciones(driver) {
    // Verificar la existencia de la sección de recomendaciones
    const seccionRecomendaciones = await driver.findElement(By.className('_listaContainer_1gh60_131'));
    assert.ok(await seccionRecomendaciones.isDisplayed(), 'La sección de recomendaciones no es visible');
  
    // Verificar la existencia de al menos un título y un elemento en la lista
    const tituloRecomendaciones = await driver.findElement(By.className('_recomendacion_1gh60_1'));
    assert.ok(await tituloRecomendaciones.isDisplayed(), 'No hay título de recomendaciones visible');
  
    const listaRecomendaciones = await driver.findElement(By.className('_listaPaginada_1gh60_41'));
    const elementosLista = await listaRecomendaciones.findElements(By.className('_book_1gh60_69'));
    assert.ok(elementosLista.length > 0, 'No hay elementos en la lista de recomendaciones');
  
    console.log('Verificación de contenido en la sección de recomendaciones exitosa');
  }
  
  async function verificarInteraccionesUsuario() {
    const driver = await new Builder().forBrowser('chrome').build();
  
    try {
      // Navegar a la página principal
      await driver.get('https://onlybooks.isanerd.club/');
  
      // Realizar una búsqueda
      await realizarBusqueda(driver, 'Aladin');
  
      // Seleccionar una categoría
      await seleccionarCategoria(driver, 'NOVELAS');
  
      // Visualizar recomendaciones y hacer clic en un elemento de la lista
      await visualizarRecomendaciones(driver);
  
      console.log('Verificación de interacciones del usuario exitosa.');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Cerrar el navegador después de la prueba
      await driver.quit();
    }
  }
  
  async function realizarBusqueda(driver, terminoBusqueda) {
    const campoBusqueda = await driver.findElement(By.className('inputBusqueda'));
    await campoBusqueda.sendKeys(terminoBusqueda);
    await campoBusqueda.submit();
    await driver.wait(until.elementLocated(By.id('busqueda')), 5000);

    console.log('Verificación de busqueda "Aladin" exitosa.');
  }
  
  async function seleccionarCategoria(driver, valorCategoria) {
    const xpathSelector = `//label[@class='asdasd' and @value='${valorCategoria}']`;
  
    // Esperar a que el elemento sea visible
    const categoria = await driver.wait(until.elementLocated(By.xpath(xpathSelector)), 5000);
  
    // Hacer clic en la categoría
    await categoria.click();
  
    // Esperar a que se carguen los productos de la categoría (ajustar según tu aplicación)
    await driver.wait(until.elementLocated(By.className("body-cards")), 5000);

    console.log('Verificación de visualización productos de una categoria exitosa.');
  }
  
  async function visualizarRecomendaciones(driver) {
    // Esperar a que se cargue la lista de recomendaciones (ajustar según tu aplicación)
    await driver.wait(until.elementLocated(By.className('_listaPaginada_1gh60_41')), 5000);
  
    // Hacer clic en el primer elemento de la lista de recomendaciones
    const primerElementoRecomendacion = await driver.findElement(By.className('_book_1gh60_69'));
    await primerElementoRecomendacion.click();
  
    // Esperar a que se cargue la página de detalle del producto (ajustar según tu aplicación)
    await driver.wait(until.elementLocated(By.className('content-container')), 5000);
  
    console.log('Verificación de visualización del detalle del producto Reconmendado exitosa.');
  }
  
  // Llamar a la función principal
  verificarInteraccionesUsuario();
  
  


//Ejetutar funciones

// Llamar a la función para ejecutar las pruebas secuencialmente
//ejecutarPruebasId_00009();
//Id_00011();
//Id_00012();