const creaUInput = document.getElementById("creatininaUrinaraInput");
const creaSInput = document.getElementById('creatininaSericaInput');
const diuInput = document.getElementById('diurezaInput');

const errU = document.getElementById("errCreaU");
const errS = document.getElementById("errCreaS");
const errD = document.getElementById("errDiu");
    
let timerCreaU;
let timerCreaS;
let timerDiu;

let creaUValid = false;
let creaSValid = false;
let diuValid = false;

function validareCreatininaU() {

    let creaU = parseFloat(creaUInput.value);
    creaUValid = true;

    errU.classList.remove("alert-danger", "alert-warning");
    errU.classList.add("alert-danger", "d-none");

    creaUInput.classList.remove("is-valid", "is-invalid", "border-warning");
    creaUInput.classList.add("is-valid");

    document.getElementById("rezultatContainer").classList.add("d-none");
    document.getElementById("eroareRezClearance").classList.add("d-none");

    if (isNaN(creaU)) {
        errU.classList.remove("d-none");
        errU.innerText = "Introduceti doar numere!";
        creaUInput.classList.remove("is-valid");
        creaUInput.classList.add("is-invalid");
        creaUValid = false; 
    } else  if ((creaU <= 0) || (creaU >= 1000)) {
        errU.classList.remove("d-none");
        errU.innerText = "Introduceti o valoare valida, mai mica de 1000 mg/dL!";
        creaUInput.classList.remove("is-valid");
        creaUInput.classList.add("is-invalid");
        creaUValid = false; 
    } else {
        if (creaU < 10){
            errU.classList.remove("d-none", "alert-danger");
            errU.classList.add("alert-warning");
            errU.innerText = "Atentie! Creatinina urinara e mai mica de 10 mg/dL";
            creaUInput.classList.remove("is-valid");
            creaUInput.classList.add("is-invalid", "border-warning");
        }

        if (creaU > 400 ){
            errU.classList.remove("d-none", "alert-danger");
            errU.classList.add("alert-warning");
            errU.innerText = "Atentie! Creatinina urinara e mai mare de 400 mg/dL";
            creaUInput.classList.remove("is-valid");
            creaUInput.classList.add("is-invalid", "border-warning");
        }
    }
}

//poate fi si redus codul dar e mai lizibil asa chiar daca e repetitiv, am redus doar la creatinina serica
function validareCreatininaS() {
    let creaS = parseFloat(creaSInput.value);
    creaSValid = true;

    errS.classList.remove("alert-danger", "alert-warning");
    errS.classList.add("alert-danger", "d-none");

    creaSInput.classList.remove("is-valid", "is-invalid", "border-warning");
    creaSInput.classList.add("is-valid");

    document.getElementById("rezultatContainer").classList.add("d-none");
    document.getElementById("eroareRezClearance").classList.add("d-none");

    if (isNaN(creaS) || ((creaS <= 0) || (creaS >= 30))) {
        errS.classList.remove("d-none");
        creaSInput.classList.remove("is-valid");
        creaSInput.classList.add("is-invalid");
        creaSValid = false;
        if (isNaN(creaS)) {
            errS.innerText = "Introduceti doar numere!";
        } else {
            errS.innerText = "Introduceti o valoare valida, mai mica de 30 mg/dL!";
        }
    } else {
        if ((creaS < 0.3) || (creaS > 15)){
            errS.classList.remove("d-none", "alert-danger");
            errS.classList.add("alert-warning");
            creaSInput.classList.remove("is-valid");
            creaSInput.classList.add("is-invalid", "border-warning");
            if (creaS < 0.3) {
                errS.innerText = "Atentie! Creatinina serica e mai mica de 0.3 mg/dL";
            } else {
                errS.innerText = "Atentie! Creatinina serica e mai mare de 15 mg/dL!";
            }
        }

    }
    


}

function validareDiureza() {
    let diu = parseFloat(diuInput.value);
    diuValid = true;

    errD.classList.remove("alert-danger", "alert-warning");
    errD.classList.add("alert-danger", "d-none");

    diuInput.classList.remove("is-valid", "is-invalid", "border-warning");
    diuInput.classList.add("is-valid");


    document.getElementById("rezultatContainer").classList.add("d-none");
    document.getElementById("eroareRezClearance").classList.add("d-none");

    if (isNaN(diu)) {
        errD.classList.remove("d-none");
        errD.innerText = "Introduceti doar numere!";
        diuInput.classList.remove("is-valid");
        diuInput.classList.add("is-invalid");
        diuValid = false; 
    } else if ((diu <= 0 ) || (diu > 22000)) {
        errD.classList.remove("d-none");
        errD.innerText = "Introduceti o valoare valida, mai mica de 22000 ml!";
        diuValid = false; 
        diuInput.classList.remove("is-valid");
        diuInput.classList.add("is-invalid");
    } else {
        if (diu < 400) {
            errD.classList.remove("d-none", "alert-danger");
            errD.classList.add("alert-warning");
            errD.innerText = "Atentie! Diureza e mai mica de 400ml!";
            diuInput.classList.remove("is-valid");
            diuInput.classList.add("is-invalid", "border-warning");
        }

        if (diu >= 10000) {
            errD.classList.remove("d-none", "alert-danger");
            errD.classList.add("alert-warning");
            errD.innerText = "Atentie! Diureza e mai mare de 10000 ml!";
            diuInput.classList.remove("is-valid");
            diuInput.classList.add("is-invalid", "border-warning");
        }
    }
}

// AICI E ADDEVENTLISTENERUL CARE VERIFICA DACA SE MAI TASTEAZA la creatinina URINARA
creatininaUrinaraInput.addEventListener("input", function() { 
    clearTimeout(timerCreaU); 
    timerCreaU = setTimeout(function() { 
        validareCreatininaU(); 
        verificaSiCalculeaza(); 
    }, 500); });

// AICI E ADDEVENTLISTENERUL CARE VERIFICA DACA SE MAI TASTEAZA la creatinina SERICA
creatininaSericaInput.addEventListener("input", function() { 
    clearTimeout(timerCreaS); 
    timerCreaS = setTimeout(function() { 
        validareCreatininaS(); 
        verificaSiCalculeaza(); 
    }, 500); });

// AICI E ADDEVENTLISTENERUL CARE VERIFICA DACA SE MAI TASTEAZA la DIUREZA
diurezaInput.addEventListener("input", function() { 
    clearTimeout(timerDiu); 
    timerDiu = setTimeout(function() { 
        validareDiureza(); 
        verificaSiCalculeaza(); 
    }, 500); });


function verificaSiCalculeaza() {
    if (creaUValid && creaSValid && diuValid) {

        let creaU = parseFloat(creaUInput.value);
        let creaS = parseFloat(creaSInput.value);
        let diu = parseFloat(diuInput.value);
    
        /*calcularea rezultatelor, pe pasi*/
        let rezPas1 = creaU / creaS;
        rezPas1 = parseFloat(rezPas1.toFixed(5))

        let rezPas2 = diu / 1440;
        rezPas2 = parseFloat(rezPas2.toFixed(5))

        let rezPas3 = rezPas1 * rezPas2;
        rezPas3= parseFloat(rezPas3.toFixed(5))

        let rezPas4 = parseFloat(rezPas3.toFixed(2));

        if (!isNaN(rezPas4)) {
            document.getElementById("rezultatContainer").classList.add("d-none");
            /*afisarea rezultatelor */

            document.getElementById('rezultat').innerText = `${rezPas4} ml/min`;

            /* Afisare pasi verificare*/
            document.getElementById('textPas1').innerText = `Pasul 1: ${creaU} / ${creaS} = ${rezPas1}`;
            document.getElementById('textPas2').innerText = `Pasul 2: ${diu} / 1440 = ${rezPas2}`;
            document.getElementById('textPas3').innerText = `Pasul 3: ${rezPas1} * ${rezPas2} = ${rezPas3}`;
            document.getElementById('textPas4').innerText = `Pasul 4: ${rezPas4}`;
            

            /* Scroll la rezultat si afisare comentariu in functie de rezultat */
            let comentariu = document.getElementById("rezultatComentariu");

            if (rezPas4 >= 90) {
                comentariu.innerText = "Funcție renală normală (optim)";
            } else if (rezPas4 >= 60) {
                comentariu.innerText = "Scădere ușoară a funcției renale (BCR stadiul 2)";
            } else if (rezPas4 >= 30) {
                comentariu.innerText = "Scădere moderată a funcției renale (BCR stadiul 3)";
            } else if (rezPas4 >= 15) {
                comentariu.innerText = "Scădere severă a funcției renale (BCR stadiul 4)";
            } else {
                comentariu.innerText = "Insuficiență renală severă (BCR stadiul 5)";
            }
            
            let creaUValid = false;
            let creaSValid = false;
            let diuValid = false;   

            document.getElementById("eroareRezClearance").classList.add("d-none");

            if (rezPas4 <= 0) {
                document.getElementById("eroareRezClearance").classList.remove("d-none");
            } else if (rezPas4 >= 150) {
                document.getElementById("eroareRezClearance").classList.remove("d-none");
                document.getElementById("eroareRezClearance").innerText = `Rezultat foarte improbabil: (${rezPas4} ml/min). Verificați valorile introduse.`;
            } else {
                document.getElementById("rezultatContainer").classList.remove("d-none");
                document.getElementById("rezultatContainer").scrollIntoView({ behavior: "smooth" });
                document.getElementById("eroareRezClearance").classList.add("d-none");
            }



            eroareRezClearance
        } else (
            console.log("rezultat NaN")
        )
    }
} 


function resetare() {
    document.getElementById('creatininaUrinaraInput').value = '';
    document.getElementById('creatininaSericaInput').value = '';
    document.getElementById('diurezaInput').value = '';
    document.getElementById('rezultat').innerText = '';

    document.getElementById("errCreaU").classList.add("d-none");
    document.getElementById("errCreaS").classList.add("d-none");
    document.getElementById("errDiu").classList.add("d-none");

    document.getElementById("rezultatContainer").classList.add("d-none");
    document.getElementById('pasiContainer').classList.add('d-none')

    creaUInput.classList.remove("is-valid", "is-invalid", "border-warning");
    creaSInput.classList.remove("is-valid", "is-invalid", "border-warning");
    diuInput.classList.remove("is-valid", "is-invalid", "border-warning");

    let creaUValid = false;
    let creaSValid = false;
    let diuValid = false;
}

function afiseazaPasiContainer() {
    document.getElementById('pasiContainer').classList.remove('d-none');
    document.getElementById("pasiContainer").scrollIntoView({ behavior: "smooth" });
}