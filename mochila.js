/*
  Programa que trata de resolver el problema de la mochila con algoritmos geneticos, los genes son los numeros binarios que se forman si 
  se toma o no el objeto en los posibles esenarios, cada digito del numero binrario corresponde a un objeto segun su orden, por ejemplo
  el escenario2 no se tomo ningun objeto mas que el ultimo, por lo tanto se obtiene un peso de 3 y un valor/dinero de 1, el problema surge
  de un ciclo que tome como variables cada arreglo de esenario y diferencie si es 1 o 0 para que sume o no determinado valor y saber cual 
  es el valor mas optimo para al el algoritmo, se puede hacer con un arreglo bidimensional [Escenarios][objetos] y asi intercalar entre los 
  posibles 35 escenarios y los objetos, el segundo obstaculo es la comparacion y creacion de cadenas "geneticas"
  
                 objeto1   objeto2   objeto3 objeto4 objeto5
  escenario1 = [   0,        0,        0       0       0    ];
  escenario2 = [   0,        0,        0       0       1    ];
  escenario3 = [   1,        0,        0       0       1    ];
  .
  . 
  .
  escenarioN = [   0         0         0       0       1    ];
  
  el 0 quiere decir que no se tomo y se guardo en la mochila 
*/

var capacidad = parseInt("35");

//variables de control de ciclos para el manejo de los arreglos espejo y escenario
var i = parseInt("0");
var j = parseInt("0");
var x = parseInt("0");
var l = parseInt("0");
var m = parseInt("0");
//variables de mutacion
var mutacion  = Math.round(Math.random()*100);
var porcentajeMutacion = parseInt("13");
//declaracion del arreglo bidimensional
var escenario = new Array(4);
for(i = 0; i<4; i++){
    
    escenario[i] = new Array(5);
}

//declaracion del arreglo espejo
var espejo = new Array(4);
for(i = 0; i<4; i++){
    
    espejo[i] = new Array(5);
}
//declaracion del arreglo para guardar los factibles  
var factibles = new Array(10);
for(i = 0; i < 10; i++){
    factibles[i] = new Array(5);
}

for(i = 0; i < 10 ; i++){
    
    factibles[i][5] = 0;
    
}
  

//declaracion del arreglo para las aptitudes
var aptitudes = new Array(3);

var sumaPeso = 0;
var sumaValor = 0;

//Variables de los pesos
var peso1 = 8;
var peso2 = 7;
var peso3 = 15;
var peso4 = 10;
var peso5 = 5;

// variables de los valores
var valor1 = 15;
var valor2 = 15;
var valor3 = 30;
var valor4 = 30;
var valor5 = 10;

// variables de las aptitudes
var aptitud1 = 0;
var aptitud2 = 0;
var aptitud3 = 0;
var aptitud4 = 0;

function generarpoblacion(){
    
    for(i = 0; i<4; i++){
	for(j = 0; j<5; j++){
	    escenario[i][j] = Math.round(Math.random()*1);
	}
    }
}

function clonarpoblacion(){
    for(i = 0;i < 4; i++){
	for(j = 0; j < 5; j++){
	    espejo[i][j] = escenario[i][j];
	}
    }
    
}


function condiciones( i ){
    i = parseInt(i);        
    if(espejo[i][0] == 1){
	
	sumaPeso = sumaPeso + peso1;
	sumaValor = sumaValor + valor1;
    }
    
    if(espejo[i][1] == 1){
	sumaPeso = sumaPeso + peso2;
	sumaValor = sumaValor + valor2;  
    }
    
    if(espejo[i][2] == 1){
	sumaPeso = sumaPeso + peso3;
	sumaValor = sumaValor + valor3;  
    }
    
    if(espejo[i][3] == 1){
	sumaPeso = sumaPeso + peso4;
	sumaValor = sumaValor + valor4;  
    }
    
    if(espejo[i][4] == 1){
	sumaPeso = sumaPeso + peso5;
	sumaValor = sumaValor + valor5;  
    }
    
    document.write("<br/>Esta es la suma del peso :"+sumaPeso+"<br/>");
    document.write("<br/>Esta es la suma del valor :"+sumaValor+"<br/>");
    if(sumaPeso > capacidad){
	sumaValor = 0;
	document.write("No es factible<br/>");
    }else{
	document.write("Es factible<br/>");
    }
}

function imprimirpoblacion(){
    
    document.write("<hr/><strong>Poblacion:</strong><br/>");
    
    for(i = 0; i < 4; i++){
	
	for(j = 0; j<5; j++){
	    
	    document.write("| "+escenario[i][j]+"  ");
	}
	document.write("<em>| Escenario </em>"+i+"|   <hr/>");
	
    }
}

function evaluacion(){
    for(i = 0;i < 4;i++)
	switch(i){
	case 0:
	    condiciones(i);
	    aptitudes[i] = (sumaValor/100)*10;
	    guardarFactible();
	    document.write("<hr/>");
	    sumaPeso = parseInt("0");
	    sumaValor = parseInt("0");
	    break;
	    
	case 1:
	    condiciones(i);
	    aptitudes[i] = (sumaValor/100)*10;
	    guardarFactible(i);
	    document.write("<hr/>");
	    sumaPeso = parseInt("0");
	    sumaValor = parseInt("0");
	    break;
	    
	case 2:
	    condiciones(i);
	    aptitudes[i] = (sumaValor/100)*10;
	    guardarFactible(i);
	    document.write("<hr/>");
	    sumaPeso = parseInt("0");
	    sumaValor = parseInt("0");
	    break;
	    
	case 3:
	    condiciones(i);
	    aptitudes[i] = (sumaValor/100)*10;
	    guardarFactible(i);
	    document.write("<hr/>");
	    sumaPeso = parseInt("0");
	    sumaValor = parseInt("0");
	    break;
	}
    //se manda llamar a la funcion ruleta enviando las aptitudes de cada escenario genetico para seleccionar los candidatos a la reproduccion
    aptitud1 = aptitudes[0];
    aptitud2 = aptitudes[1];
    aptitud3 = aptitudes[2];
    aptitud4 = aptitudes[3];
    ruleta(aptitud1, aptitud2, aptitud3, aptitud4);
}

function cruza(padre , madre){
    i = parseInt("0");

    //primer hijo
    escenario[i][0] = espejo[padre][0];
    escenario[i][1] = espejo[padre][1];
    escenario[i][2] = espejo[padre][2];
    escenario[i][3] = espejo[madre][3];
    escenario[i][4] = espejo[madre][4];
    //mutacion
    if(mutacion <= porcentajeMutacion ){
	if(escenario[i][4] == 1){
	    escenario[i][4] = parseInt("0");
	}else{
	    escenario[i][4] = parseInt("1");
	}
    }
    //segundo hijo
    escenario[i+1][0] = espejo[madre][0];
    escenario[i+1][1] = espejo[madre][1];
    escenario[i+1][2] = espejo[padre][2];
    escenario[i+1][3] = espejo[padre][3];
    escenario[i+1][4] = espejo[padre][4];
    //mutacion
    mutacion = Math.round(Math.random()*100);
    if(mutacion <= porcentajeMutacion ){
	if(escenario[i+1][3] == 1){
	    escenario[i+1][3] = parseInt("0");
	}else{
	    escenario[i+1][3] = parseInt("1");
	}
    }
    //tercer hijo
    escenario[i+2][0] = espejo[madre][0];
    escenario[i+2][1] = espejo[madre][1];
    escenario[i+2][2] = espejo[madre][2];
    escenario[i+2][3] = espejo[padre][3];
    escenario[i+2][4] = espejo[padre][4];
    //mutacion
    mutacion = Math.round(Math.random()*100);
    if(mutacion <= porcentajeMutacion ){
	if(escenario[i+2][2] == 1){
	    escenario[i+2][2] = parseInt("0");
	}else{
	    escenario[i+2][2] = parseInt("1");
	}
    }
    //cuarto hijo
    escenario[i+3][0] = espejo[padre][0];
    escenario[i+3][1] = espejo[padre][1];
    escenario[i+3][2] = espejo[madre][2];
    escenario[i+3][3] = espejo[madre][3];
    escenario[i+3][4] = espejo[madre][4];
    //mutacion
    mutacion = Math.round(Math.random()*100);
    if(mutacion <= porcentajeMutacion ){
	if(escenario[i+3][2] == 1){
	    escenario[i+3][2] = parseInt("0");
	}else{
	    escenario[i+3][2] = parseInt("1");
	}
    }
    
}

function ruleta(aptitud1, aptitud2, aptitud3 , aptitud4){
    var random = Math.round(Math.random()*10);
    
    //seleccion del padre
    if(random <= aptitud1){
	padre = parseInt("0");
    }else{
	padre = parseInt("1");
    }
    
    random = Math.round(Math.random()*10);
    
    //seleccion de la madre
    if(random <= aptitud3){
	madre = parseInt("2");
    }else{
	madre = parseInt("3");
    }
    
    cruza(padre , madre);
}

function guardarFactible(){

    if(x < 10){
	if(sumaPeso <= capacidad){
	    for(j = 0;j < 5;j++){
		factibles[x][j] = espejo[i][j];
	    }
	    factibles[x][5] = aptitudes[i];
	    x = x+1;
	}
    }else{
	for(x = 0; x < 10; x++){
	    if(aptitudes[i] > factibles[x][5]){
		for(j = 0; j < 5; j++){
		    factibles[x][j] = espejo[i][j];
		}
		factibles[x][5] = aptitudes[i];
	    }
	}
    }
}

function imprimirFactibles(){
    document.write("<hr/><strong>Poblacion  mas apta</strong><br/>");
    
    for(i = 0; i < 10; i++){
	
	for(j = 0; j<5; j++){
	    
	    document.write("| "+factibles[i][j]+"  ");
	}
	document.write("<em>| Escenario </em>"+i+"| y su aptitud es de :"+factibles[i][5]+"   <hr/>");
	
    }
}

generarpoblacion();
clonarpoblacion();
document.write("<hr/><strong>Primera Poblacion</strong><br/>");
imprimirpoblacion();
for(m = 0;m < 10; m++){
    evaluacion();
    document.write("<hr/><strong>Poblacion con cruza</strong><br/>");
    clonarpoblacion();
    imprimirpoblacion();
}
imprimirFactibles();
