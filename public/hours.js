const map = {
    'san-carlos':{
        'direccion':'Colonia San Carlos, a media cuadra del restaurante Mirawa',
        'telefono':'9467-0261',
        'horas':'Lunes - Viernes: 7:00 AM - 3:30 PM Sabado:7:00 AM - 11:30 AM' 
    },
    'san-felipe':{
        'direccion':'Frente a hospital San Felipe, contiguo a Funeraria La Milagrosa',
        'telefono':'2236-2074',
         'horas':'Lunes - Viernes: 6:30 AM - 3:30 PM Sabado:6:30 AM - 11:30 AM'
    },
    'valle-de-angeles':{
        'direccion':'Frente a Mercado Principal, Comercial Vallejo',
        'telefono':'2766-3276',
        'horas':'Lunes - Viernes: 7:00 AM - 3:00 PM Sabado:Cerrado'
    },
    'zamorano':{
        'direccion':'Centro comercial La Plaza, carretera a Danlí, 150m antes de la gasolinera Puma',
        'telefono':'9904-0291',
        'horas':'Lunes - Viernes: 7:00 AM - 3:00 PM Sabado:7:00 AM - 11:00 AM'
    }
}

const sucursales = Array.from(document.querySelectorAll('.bar .sucursal'));
const columns = Array.from(document.querySelectorAll('tr td'));
sucursales
    .forEach((sucursal)=>{
        sucursal.
            addEventListener('click',(e)=>{
                let selectedOption = e.target.innerText.toLowerCase().replace(/\s+/g,'-',);
                let currentOption = map[selectedOption];
                let properties = Object.keys(currentOption);
                properties
                    .forEach((prop)=>{
                        document.getElementById(prop).innerText=map[selectedOption][prop]   
                    })
        })
    })

    
    window.addEventListener('load',function(){
        console.log("Running hours");
        let currentOption = map['san-carlos'];
        let properties = Object.keys(currentOption);
        properties
            .forEach((prop)=>{
                document.getElementById(prop).innerText=map['san-carlos'][prop];
        })
    });
    