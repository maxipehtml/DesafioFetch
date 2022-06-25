//dar la bienvenida me sirve para resetear el carro
Swal.fire({
    position: 'center',
    backdrop: false,
    color: 'rgb(0,150,255)',
    title: 'WELCOME',
    showConfirmButton: false,
    timer: 1500
}).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
       
            localStorage.removeItem("cart");
            sessionStorage.removeItem("cart");
            crearCarrito();
            randomQuote();
        
          }
})

const Events =
[
    {   
        id:1,
        name: "Evento Rojo",
        price: 210.00,
        description: "Evento para disfrutar del buen sonido rojo",
        type: "publico",
        img:"img/rojo.jpg",
        age: "mayor",
        place: "La Plata",
        capacity: 300,
        time: "21:30",
        category: "Electronica",
        date: "5/22/2022",
        artist: "Sahar Z, Mariano Mellino, Khen",
    },
    {   
        id:2,
        name: "Evento Verde",
        price: 120.00,
        description: "Evento para disfrutar del buen sonido verde",
        type: "publico",
        img:"img/verde.jpg",
        age: "mayor",
        place: "Ensenada",
        capacity: 500,
        time: "20:00",
        category: "Reggae",
        date: "2/24/2022",
        artist: "Marley, Nonpa, Sumo",
    },
    {   
        id:3,
        name: "Evento Azul",
        price: 310.00,
        description: "Evento para disfrutar del buen sonido azul",
        type: "publico",
        img:"img/azul.jpg",
        age: "mayor",
        place: "Berisso",
        capacity: 1000,
        time: "22:30",
        category: "Rock",
        date: "12/31/2022",
        artist: "Pappo, Pity, Muddy Waters",
        
    },
    
];
//fetch
const quoteText = document.getElementById("quote-text"),
    quoteAutor = document.getElementById("quote-author"),
    genQuoteBtn = document.getElementById("gen-quote-btn");


function randomQuote(){
fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        console.log(data.content,data.author);
        quoteText.textContent = data.content;
        quoteAutor.textContent = ` ...${data.author}...`;
    });
}   

genQuoteBtn.addEventListener('click', () => {
    quoteText.textContent = "Pensando en algo para ti";
    quoteAutor.textContent = "Y el autor elegido es...";
    setTimeout(() => {
        randomQuote();
    },3000);
    
});


let totalCompra = 0; 

let timerInterval;

/* let totalTiempo = 0;

let suma = {};

let guardarTiempo = 0; */

// agrego producto al carrito
const addProduct = (index) =>
{
    
    let cart = JSON.parse(localStorage.getItem("cart")); // me traigo el carrito //
    
    let cartContent = []; // creo un nuevo array para guardar los nuevos elementos (en el nuevo carrito)
    
    if(cart)
    {   
        
        for (const element of cart)
        {
         
            if(element.id == index)
            {
                element.quantity++; // agrego un producto al carrito sumandole una unidad
                nombreEvent = element.name;
                cantidad = element.quantity;
                element.total = element.price * element.quantity;
                
            }
            cartContent.push(element);
            console.log(element.total);
            console.log(totalCompra);
        }
        
    }



    localStorage.removeItem("cart"); // limpio el anterior // 
    localStorage.setItem("cart" , JSON.stringify(cartContent)); // lo vuelvo a guardar

    let totalisimo = 0;
    for (let index = 0; index < cart.length; index++) {
        totalisimo += cart[index].total;
        console.log(totalisimo);
        
    }

    totalCompra = totalisimo;
    mostrarTotal();
    
/*     mostrarTimeOut(); */
    console.log("cart: " + JSON.stringify(cartContent));
    console.log(nombreEvent);
    // alert //
    let message = 'AÑADISTE '+cantidad+' ENTRADAS \n DEL ' + nombreEvent.toUpperCase() + '\n TOTAL DE COMPRA ES: $ ' + totalCompra;
     toast1(message);
    sweet1(message);
    mostrarAlert();

}
/* didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  }, */
function mostrarAlert() {	
    
    Swal.fire({
      title: 'Tenes entradas en el carrito',
      html: 'Te quedan <b></b> milisegundos para confirmar tu compra!',
      width: "25rem",
      /* heightAuto: false, */
      timer: 30000,
      color: "white",
      confirmButtonColor: "rgb(255, 150, 0)",
      background: "rgb(50, 0, 255,0.5)",
      timerProgressBar: false,
      position: "top-start",
      backdrop: false,
      confirmButtonText: 'IR AL CARRITO',
      didOpen: () => {
        /* Swal.showLoading() */
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('vamos al carrito!', '', 'success');
            
        }else if (result.dismiss === Swal.DismissReason.timer) {
       
            localStorage.removeItem("cart");
            sessionStorage.removeItem("cart");
            crearCarrito()
    
          }
    
    })
}


//practica de boton comprar
const loadEvents = () => {
    
    let buttons = document.getElementsByClassName('botonComprar');

    for (let i = 0; i < buttons.length; i++) {
        let item = document.getElementsByClassName('botonComprar')[i];
        item.addEventListener('click',() => {
            addProduct(item.id);
        });
    }
}


function toast1(texto){

    Toastify({
      text: texto,
      gravity: "bottom",
      position: 'right',
      close: false,
      style: {
        color:  "rgb(255,255,255)",
        background: "rgb(80, 0, 255,0.6)",
      }

    }).showToast();
}


function sweet1(texto){

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
      })
}



function crearCarrito() {

    let cart = [];

    for (const element of Events) {
        cart.push({
            id: element.id,
            name: element.name,
            price: element.price,
            description: element.description,
            type: element.type,
            img: element.img,
            age: element.age,
            place: element.place,
            capacity: element.capacity,
            time: element.time,
            category: element.category,
            date: element.date,
            artist: element.artist,
            quantity: 0,
            total: 0,
            timeofBuy: new Date()
        });


    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.stringify(cart));

}


//crear cards de js a html
let divID = document.getElementById("cards");

const eventoCards = (array) => {
    for (let element of array) {
        let div = document.createElement('div');
        div.className = 'col-12 col-sm-12 card ';
        div.innerHTML = `
        <div class=" card-group">
        <div class="card-body d-flex flex-column ">
        <h5 class="card-title mb-4">${element.name.toUpperCase()}</h5>
        <img src="${element.img}" alt="" class="col-1" >
        <p class="card-text mt-3">${element.category.toUpperCase()}</p>
        <p class="card-text">DESCRIPCION: ${element.description}</p>
        <p class="card-text">FECHA: ${element.date}</p>
        <p class="card-text">HORARIO: ${element.time} hs</p>
        <p class="card-text">ARTISTAS: ${element.artist}</p>
        <p class="card-text">PRECIO: $ ${element.price}</p>
        <button id="${element.id}" type="button" class="btn btn-success botonComprar" data-bs-toggle="modal" data-bs-target="#exampleModal">
          AÑADIR 1 ENTRADA AL CARRITO
        </button>
        </div>
        </div>
        `
        divID.append(div);
    }
    
    loadEvents();


}


eventoCards(Events);

let cart = localStorage.getItem("cart");

!cart && crearCarrito(); //sugar

let mailReg = document.getElementById('emailLogin');
let nameReg = document.getElementById('nameLogin');
let recordar = document.getElementById('recordarme');
let btnLogin = document.getElementById('login');
let modalEl = document.getElementById('modalLogin');

let modal = new bootstrap.Modal(modalEl);

let toggles = document.querySelectorAll('.toggles');



function guardarDatos(storage) {
    let user = mailReg.value;
    let nameUser = nameReg.value;

    const usuario = {
        'user': user,
        'name': nameUser
    }

    storage === 'sessionStorage' && sessionStorage.setItem('usuario', JSON.stringify(usuario));
    storage === 'localStorage' && localStorage.setItem('usuario', JSON.stringify(usuario));

}

function borrarDatos() {

    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
    localStorage.removeItem("cart");
    sessionStorage.removeItem("cart");
    location.reload()

}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenidx ! <span>${usuario.name.toUpperCase()}</span> Aprovecha tus Descuentos !`
    mostrarTotal();
}

function mostrarTotal() {
    
    totalCarrito.innerHTML = `TOTAL DE COMPRA: <b>$ ${totalCompra} </b>`
}

function mostrarTimeOut() {
    
    tiempoParaConfirmar.innerHTML = `Tienes <b>${totalCompra} </b> para confirmar la compra`;
}


function isLogged(usuario) {
/* 
    usuario && saludar(usuario);
    usuario && presentarInfo(toggles, 'd-none'); */
    if (usuario) {
        saludar(usuario);
      
        presentarInfo(toggles, 'd-none');
    }
}


function presentarInfo(array, clase) {

    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//introduccion de email
btnLogin.addEventListener('click', (e) => {

    e.preventDefault();
    if (!mailReg.value || mailReg.value.indexOf("@") === -1 || !nameReg.value) { // si no hay valor y si no se encuentra "@"
        alert('Ingrese sus datos correctamente');
    } else {
        if (recordar.checked) {
            guardarDatos('localStorage');
            saludar(recuperarUsuario(localStorage));
        } else {
            guardarDatos('sessionStorage');
            saludar(recuperarUsuario(sessionStorage));
        }
        modal.hide();

        presentarInfo(toggles, 'd-none');
    }


});

btnLogout.addEventListener('click', () => {

    borrarDatos();
    presentarInfo(toggles, 'd-none');
});




isLogged(recuperarUsuario(localStorage));











