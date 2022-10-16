//CODIGO REALIZADO POR HECTOR TORIBIO GONZALEZ

/*******************************************Inicializacion de variables**********************************************/

//Tamaño de la grafica
var margin = {top: 70, right: 30, bottom: 40, left: 53},
w = 1900 - margin.left - margin.right,
h = 930 - margin.top - margin.bottom;

//Variable de color de las barras, porque van a cambiar
var colorbarra

//Variables necesarias para situar los ejes
var x = d3.scaleBand().rangeRound([0, w]).padding(.1)
var y = d3.scaleLinear()
.range([h, 0])

//formato del eje y variables para saber en cuantos puntos se van a dividir la x y la y
var formatPercent = d3.format("");
var xAxis = d3.axisBottom(x)
.scale(x)

var yAxis = d3.axisLeft(y)
 .scale(y)
 .ticks(50)
 .tickFormat(formatPercent);

//Variable para las lineas guia horizontales
 var yGrid = d3.axisLeft(y)
    .scale(y)
    .ticks(5)
    .tickSize(-w, 0, 0)
    .tickFormat("");

//Creamos el svg para añadir los elementos y las caracteristicas de la visualizacion
 var svg = d3.select("body").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")




/*******************************************Creacion de la visualizacion**********************************************/


//Abrimos los csv para realizar la gráfica
d3.csv("mediaHombres.csv").then(function(data) {
	d3.csv("mediaMujeres.csv").then(function(data2){
    

//Inicializamos variables para los botones extrayendo la referencia del html
var button = document.getElementById("data1")
var button2 = document.getElementById("data2")


//Ponemos el titulo cuando abrimos la página
var title = svg.append("g")
    .attr("class", "title")
	;
    title.append("text")
	
    .attr("x", (w / 2))
    .attr("y", -30 )
	.transition()
	.duration(1000)
	.attr("opacity", .8)
    .attr("text-anchor", "middle")
	.attr("font-family", "Candara")
    .style("font-size", "22px")
    .text("ELIGE SI QUIERES VER LOS DATOS DE COLOESTEROL DE HOMBRES O DE MUJERES");

//Si pulsamos el boton de hombres borramos el svg actual, cremaos uno nuevo y llamamos a la funcion que pinta todo de nuevo con los datos del primer csv
button.onclick = function(){
	d3.selectAll("svg").remove();
	svg = d3.select("body").append("svg")
	.attr("width", w + margin.left + margin.right)
	.attr("height", h + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
	dibujaGrafico('M')
}

//Si pulsamos el boton de mujeres borramos el svg actual, cremaos uno nuevo y llamamos a la funcion que pinta todo de nuevo con los datos del segundo csv
button2.onclick = function(){
	d3.selectAll("svg").remove();
	svg = d3.select("body").append("svg")
	.attr("width", w + margin.left + margin.right)
	.attr("height", h + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
	dibujaGrafico('F')
}

//Dibuja el eje X
function dibujaX(sexo){
	if(sexo == 'M'){
		x.domain(data.map(function(d) { return d.Edades; }));
	}else{
		x.domain(data2.map(function(d) { return d.Edades; }));
	}
		svg.append("g")
		.transition()
		.duration(1000)
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + h + ")")
		.call(xAxis);
	
}

//Dibuja el eje Y
function dibujaY(sexo){
	if(sexo == 'M'){
		y.domain([0, d3.max(data, function(d) { return (0, 600); })]);
	}else{
		y.domain([0, d3.max(data2, function(d) { return (0, 600); })]);
	}
     svg.append("g")
	 //Transicion para que el eje aparezca desde la esquina superior izquierda
	 .transition()
	 .duration(2000)
    .attr("class", "y axis")
    .call(yAxis);

    svg.append("g")
    .attr("class", "grid")
    .call(yGrid);
}
    
    
//Dibujamos las etiquetas de los ejes y el nuevo titulo dependiendo del botón que se pulse

function dibujaEtiquetas(sexo){
	if(sexo == 'M'){
		mensaje = "COLESTEROL EN HOMBRES"
	}else{
		mensaje = "COLESTEROL EN MUJERES"
	}
    var labels = svg.append("g")
    		.attr("class", "labels");
	labels.append("text")
            .attr("transform", "rotate(270)")
            .style("text-anchor", "start")
			.attr("y", -40)
			.attr("font-family", "Candara")
			.attr("font-size", "large")
			.transition()
			.duration(1000)
			.attr("x", -500)
			
			.attr("opacity", .8)
			.attr("fill", "red")
            .text("NIVEL DE COLESTEROL");
	
	labels.append("text")
            .attr("transform", "rotate(0)")
            .style("text-anchor", "start")
			.attr("x", 1800)
			.attr("y", 857)
			.transition()
			.duration(1000)
			
			.attr("x", 900)
			.attr("opacity", .8)
			.attr("fill", "red")
            .text("EDAD");
    var title = svg.append("g")
			.attr("class", "title");
			title.append("text")
			.attr("x", (w / 2))
			.attr("y", -30 )
			.attr("font-family", "Candara")
			.attr("text-anchor", "middle")
			.transition()
			.duration(1000)
			.attr("opacity", .8)
			.style("font-size", "22px")
			.text(mensaje);
}
	

//Dibujamos la barras dependiendo del boton, las añadimos animaciones para que caigan desde arriba y cuandos se pase por encima se llame a mouseOn y mouseOut
function dibujaBarras(sexo){
	if(sexo == 'M'){
		datos = data
		colorbarra = "coral"
	}else{
		datos = data2
		colorbarra = "#328dd8"
	}
	svg.selectAll(".bar")
		.data(datos)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.Edades); })
		.attr("width", x.bandwidth())
		.attr("y", 0)
		.attr("height", function(d) { return h - y(d.Media_Col); })
		.attr("stroke","black")
		.attr("fill", colorbarra)
		.attr("colesterol", function(d){ return Number.parseFloat(d.Media_Col).toFixed(1)})
		.on("mouseover", mouseOn)
		.on("mouseout", mouseOut);


		d3.selectAll(".bar")
		.transition()
		.duration(1000)
		.attr("y", function(d) { return y(d.Media_Col); })

		
		

}


//Funcion que es llamada cada vez que se pulsa un boton, encargada de llamar a las funciones necesarias para pintar el nuevo grafico
function dibujaGrafico(Sexo){

	dibujaX(Sexo);
	dibujaY(Sexo);
	dibujaEtiquetas(Sexo);
	dibujaBarras(Sexo);
	pastel.dibujar();
	pastel.ponerPorCiento("white");
	pastel.ponerLeyenda("leyenda");
}


//mouseOn, cuando se pasa por encima de una barra, esta se agranda, se pone de color rojo y aparece un recuadro encima con el nivel de colesterol medio de esa edad
function mouseOn(event) {
        d3.select(this)
    	.attr("fill", "red")

		d3.select(this)
		.transition()
		.duration(300)
		.attr("stroke","black")
		.attr("y", function(d) { return y(d.Media_Col)-5; })
		.attr("width", x.bandwidth()+5)
		.attr("height", function(d) { return h - y(d.Media_Col)+5; })
		.attr("x", function(d) { return x(d.Edades)-2.5; })
		
//generamos el rectangulo de encima y le animacion para que no aparezca bruscamente
	svg.append("rect")
		.attr("class","encima")
		.attr("stroke","black")
		.attr("fill", "red")
		.attr("opacity", .100)
		.attr("x", d3.select(this).attr('x')-50)
		.attr("y", d3.select(this).attr('y')-50)
		.attr("width",140)
		.attr("height",35)
	d3.select(".encima")
	.transition()
	.duration(500)
	.attr("opacity", .8)
		

//generamos el texto de dentro del rectangulo cogiendo el colesterol del atributo "colesterol" añadido anteriormente y le añadimos la misma animacion que al rectangulo

	svg.append('text')
		.attr('class','texto_valor')
		.attr("x", d3.select(this).attr('x')-45)
		.attr("y", d3.select(this).attr('y')-28)
		.attr("font-size",12)
		.attr("opacity", .100)
		.text("Colesterol medio: " + d3.select(this).attr("colesterol"))
	d3.select(".texto_valor")
	.transition()
	.duration(500)
	.attr("opacity", .8)
    
}


//mouseOut, cuando quitamos el ratón de encima hacemos que la barra vuelva a la noermalidad con las mismas animaciones pero al cotrario
function mouseOut(event) {

	d3.select(".encima").remove()
	d3.select('.texto_valor').remove()
	d3.select(this)
		.transition()
		.duration(300)
		.attr("stroke","black")
		.attr("y", function(d) { return y(d.Media_Col); })
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return h - y(d.Media_Col); })
		.attr("x", function(d) { return x(d.Edades); })
	

    d3.select(this)
       .attr("fill",colorbarra)
       

    d3.select("#t").remove();  
  }
});
});


//Creacion del grafico de tarta
var miPastel=function(canvasId,width,heigth,valores) {

	this.valores=valores;
	this.tamanoDonut=0;
	this.canvas=document.getElementById(canvasId);;
	this.canvas.width=width;
	this.canvas.heigth=heigth;
	this.radio=Math.min(this.canvas.width/2,this.canvas.heigth/2)
	this.context=this.canvas.getContext("2d");
	

	
	 //Dibuja el grafico de tarta
	 
	this.dibujar=function() {

		this.total=this.getTotal();
		
		var valor=0;
		var angulo=0;
		var ini=0;
		
		// Las partes del pastel
		for(var i in this.valores)
		{
			valor=valores[i]["valor"];
			color=valores[i]["color"];
			angulo=2*Math.PI*valor/this.total;

			this.context.fillStyle=color;

			this.context.beginPath();
			this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
			this.context.arc(this.canvas.width/2, this.canvas.height/2, this.radio, ini, (ini+angulo));
			this.context.closePath();
			this.context.fill();
			ini+=angulo;
		}
	}


	/**
	 * Pone el tanto por ciento de cada uno de los valores
	 * Tiene que recibir:
	 *	el color del texto
	*/
	this.ponerPorCiento=function(color){
		var valor=0;
		var etiquetaX=0;
		var etiquetaY=0;
		var ini=0;
		var angulo=0;
		var texto="";
		var incrementar=0;

		// si hemos dibujado un donut, tenemos que incrementar el valor del radio
		// para que quede centrado

		this.context.font="bold 12pt Calibri";
		this.context.fillStyle=color;
		for(var i in this.valores)
		{
			valor=valores[i]["valor"];
			angulo=2*Math.PI*valor/this.total;

			// calculamos la posición del texto
			etiquetaX=this.canvas.width/2+(incrementar+this.radio/2)*Math.cos(ini+angulo/2);
			etiquetaY=this.canvas.height/2+(incrementar+this.radio/2)*Math.sin(ini+angulo/2);

			texto=Math.round(100*valor/this.total);

			// movemos la posición unos pixels si estamos en la parte izquierda
			// del pastel para que quede mas centrado
			if(etiquetaX<this.canvas.width/2)
				etiquetaX-=10;

			// ponemos los valores
			this.context.beginPath();
			this.context.fillText(texto+"%", etiquetaX, etiquetaY);
			this.context.stroke();

			ini+=angulo;
		}
	}

	/**
	 * Function que devuelve la suma del total de los valores recibidos en el array
	 */
	this.getTotal=function() {
		var total=0;
		for(var i in this.valores)
		{
			total+=valores[i]["valor"];
		}
		return total;
	}

	/**
	 * Función que devuelve una lista (<ul><li>) con la leyenda
	 * Tiene que recibir el id donde poner la leyenda
	 */
	this.ponerLeyenda=function(leyendaId) {
		var codigoHTML="<ul class='leyenda'>";

		for(var i in this.valores)
		{
			codigoHTML+="<li style= 'font-weight: 200; color: "+valores[i]["color"]+"'>"+i+"</li>";
			console.log(valores[i]["color"])
		}
		codigoHTML+="</ul>";
		document.getElementById(leyendaId).innerHTML=codigoHTML;
	}
}

// definimos los valores de nuestra gráfica
var valores={
	"Mujeres":{valor:21,color:"#328dd8"},
	"Hombres":{valor:79,color:"coral"},
}

// generamos el primer pastel
var pastel=new miPastel("canvasgraph",150,150,valores);
