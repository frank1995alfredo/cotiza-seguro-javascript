//constructor para seguro
function Seguro(marca, anio, tipo){
   this.marca = marca;
   this.anio = anio;
   this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    // 1 = americano 1.15, 2 = asiatico  1.05, 3 = europeo 1.35

    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    //leer el anio
    const diferencia = new Date().getFullYear() - this.anio;
    //cada anio de diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;

}

//todo lo que se muestra
function Interaz(){

}
//mensaje que se imprime en el html
Interaz.prototype.mostrarMensaje  = function(mensaje, tipo){
   const div = document.createElement('div');
   if(tipo === 'error'){
       div.classList.add('mensaje','error');
   }else{
       div.classList.add('mensaje','error');
   }
   div.innerHTML = `${mensaje}`;
   formulario.insertBefore(div,document.querySelector('.form-group'));

   setTimeout(function(){
        document.querySelector('.mensaje').remove();
   },3000);
}

//imprime el resultado de la cotizacion
Interaz.prototype.mostratResultado = function(seguro, total){
     const resultado = document.getElementById('resultado');
     let marca;
     switch(seguro.marca){
         case '1':
             marca = 'Americano';
             break;
         case '2':
             marca = 'Asiatico';
             break;
         case '3':
             marca = 'Europeo';
             break;
     }

     const div = document.createElement('div');
     div.innerHTML =  `
        <p class='header'>Tu Resumen: </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: $${total}</p>
     `;
     const spinner = document.querySelector('#cargando img');
     spinner.style.display = 'block';
     setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
     }, 3000);
     
     
}

//event listeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interaz();
    // reivisamos que los campos no esten vacios
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo.','error'); 
    }else{
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro();
        //mostrar el resultado
        interfaz.mostratResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...','exito');
    }
});

const max = new Date().getFullYear(),
      min = max - 20;
      
const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

