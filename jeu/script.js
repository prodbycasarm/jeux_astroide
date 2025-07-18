
// 1) Création de la scène 2D avec getContext("2d')
const scene = document.getElementById('scene');
const ctx2D = scene.getContext('2d');
const viesCount = document.getElementById('vies-count');

let animFrameLoop;
//--------------------------------------------------------------------------------------
// 2) Documents & Event Listeners pour mes fonctions/boutons

document.getElementById('startButton').addEventListener('click', startGame);
function startGame() {
  console.log('Game started!');
}
startGame();


document.getElementById('detectionButton').addEventListener('click', function() {
  console.log('Detection button clicked!');
  location.reload(); 
});



document.addEventListener( evenement01, evenement02);



//--------------------------------------------------------------------------------------
// 3) Création des objets en définissant une classe 

// Début class triangle
class triangle {
  constructor() {
    this.x = scene.width / 2;
    this.y = scene.height / 2;
    this.pointX = this.x;
    this.pointY = this.y;
    this.largeur = 40;
    this.hauteur = this.largeur;
    this.vitesseX = 10;
    this.vitesseY = 10;
    // valeur de positionnement de départ
    this.x = 20;
    this.y = 350;
  }
  dessiner() {
    ctx2D.beginPath();
    ctx2D.strokeStyle = "white";
    ctx2D.lineWidth = 4;
    ctx2D.fillStyle = "black";
    //ctx2D.moveTo(10, 10); // placer au centre de la scène.
    ctx2D.moveTo(this.x, this.y);
    ctx2D.lineTo(this.x + 50, this.y + 25);
    ctx2D.lineTo(this.x, this.y + 50);
    ctx2D.lineTo(this.x, this.y);
    ctx2D.closePath();
    ctx2D.stroke();
    ctx2D.fill();
  }
}
// fin class Triangle
//--------------------------------------------------------------------------------------
// Début class Rectangle
class rectangle {
  constructor(rapport){
    // propriétés des objets : variables propres aux objets rectangles
      this.couleurStroke = "grey";
    this.couleurFill = "grey";
    this.largeur=scene.width/rapport; 
    this.hauteur=this.largeur;
	// fin class RECTANGLE   

// valeur de positionnement de départ
    this.x= 600;
    this.y= 0;
    
    // valeurs de déplacement
    this.vitesseX=-0.04;
    this.vitesseY=-0;
  }
  calculVitesseAleatoire(){
    // trajectoire aléatoire
    let alleatoire = Math.random()
    if(alleatoire<-0.01 && alleatoire>-0.05){
      this.vitesseY = -0;  //direction alléatoire
    } else if(alleatoire>-0.009){
      this.vitesseY = -0.009;
    }else{
      this.vitesseY = -0; // déplacement à l'horizontal seulement
    }
    if(Math.random()<-0.04){
      this.vitesseX = -0.04;  //direction alléatoire
    }else{
      this.vitesseX = Math.random()*-0.05; // vitesse alléatoire
    }
  }
  dessiner(){
	 
    ctx2D.fillStyle = this.couleurFill;
    ctx2D.strokeStyle = this.couleurStroke;
    // zoneObjet servira pour détecter des collisions
    this.zoneObjet  = ctx2D.fillRect(this.x, this.y, this.largeur, this.hauteur);
    ctx2D.strokeRect(this.x, this.y, this.largeur, this.hauteur);
  }// fin de la méthode dessiner
  deplacer(){
    
		// ------------ COMPORTEMENT 1 --------déplacement diagonale---
		this.x += this.vitesseX; // incrémentation de la valeur x
		this.y += this.vitesseY; // incrémentation de la valeur y
		// --------------------------------------------------------------
    
    // zone limite du déplacement
    
        if (this.x < 0) {
            this.x = scene.width;
          //lorsque sortie de scène détermine une nouvelle trajectoire
            this.calculVitesseAleatoire();
        }
        if (this.x > scene.width) {
            this.x = 0;
            this.calculVitesseAleatoire();
        }
        if (this.y < 0) {
            this.y = scene.height;
            this.calculVitesseAleatoire();
        }
        if (this.y > scene.height) {
            this.y = 0;
            this.calculVitesseAleatoire();
        }
    
    }// fin de la méthode deplacer
}
// fin class Rectangle
//--------------------------------------------------------------------------------------
// 3) Fonction pour ouvrir le canvas.

function openCanvas() { 
  window.cancelAnimationFrame(animFrameLoop);
  scene.style.display = "block";
  chrono.style.display = "block";
  chronoContainer.style.display = "block";

  document.getElementById('startButton').disabled = false;
}


//--------------------------------------------------------------------------------------

// debut function evenement01 (Touches Clavier)


function evenement02(){
	removeEventListener(evenement01);
	removeHandler(evenement01);
}
let time = 0; 
const chronoElement = document.getElementById('chrono');
let chronoRunning = true; 
let chronoInterval = setInterval(updatechrono, 1000);
function updatechrono() {
  time++; 
  chronoElement.textContent = `Votre score: ${time}`; 
}



function evenement01() {
  animLoop();
  console.clear();
  console.log("keydown. Le code de la touche est : " + event.keyCode);
  if (event.keyCode == 68) {
    triangle01.x += triangle01.vitesseX; // += est un opérateur d'incrémentation
  } else if (event.keyCode == 83) {
    triangle01.y += triangle01.vitesseY;
  }
  if (event.keyCode == 65) {
    triangle01.x -= triangle01.vitesseX; // += est un opérateur d'incrémentation
  } else if (event.keyCode == 87) {
    triangle01.y -= triangle01.vitesseY;
  }
  triangle01.dessiner();
}



document.addEventListener('keydown', function(event) {
  
  if (!chronoRunning) {
   
    chronoRunning = true;
    setInterval(updatechrono, 1000);
  }
  
 
  evenement01();

});



// fin function evenement01

//--------------------------------------------------------------------------------------

// 3) Fonction pour créer les objets
function creationDesObjets(){
	
  // création des objets issues de la classe rectangle
  carre01 = new rectangle(70);
  carre01.x = Math.random()*scene.width;
  carre01.y = Math.random()*scene.height;
  carre01.couleurFill = "#C5C3C6";
  carre04 = new rectangle(35);
  carre04.x = Math.random()*scene.width;
  carre04.y = Math.random()*scene.height;
  carre04.couleurFill = "#DCDCDD";
  carre05 = new rectangle(40);
  carre05.x = Math.random()*scene.width;
  carre05.y = Math.random()*scene.height;
  carre05.couleurFill = "#46494C";
  carre06 = new rectangle(37);
  carre06.x = Math.random()*scene.width;
  carre06.y = Math.random()*scene.height;
  carre06.couleurFill = "#4C5C68";
  carre07 = new rectangle(25);
  carre07.x = Math.random()*scene.width;
  carre07.y = Math.random()*scene.height;
  carre07.couleurFill = "white";
  carre08 = new rectangle(45);
  carre08.x = Math.random()*scene.width;
  carre08.y = Math.random()*scene.height;
  carre08.couleurFill = "DCDCDD";
  carre09 = new rectangle(75);
  carre09.x = Math.random()*scene.width;
  carre09.y = Math.random()*scene.height;
  carre09.couleurFill = "4C5C68";
  carre10 = new rectangle(90);
  carre10.x = Math.random()*scene.width;
  carre10.y = Math.random()*scene.height;
  carre10.couleurFill = "C5C3C6";
  carre02 = new rectangle(33);
  carre03 = new rectangle(44);
  triangle01 = new triangle();
  triangle01.dessiner();
  
}

//--------------------------------------------------------------------------------------

// 4) Fonction pour animer en "loop"
function animLoop(){
  
  ctx2D.clearRect(0, 0, scene.width, scene.height); 
  triangle01.dessiner(); // le placer en premier pour détecter avec le premier déplacement du carré
    
  carre01.deplacer();
  carre01.dessiner();
  
  carre02.deplacer();
  carre02.dessiner();
  
  carre03.deplacer();
  carre03.dessiner();
  
  carre04.deplacer();
  carre04.dessiner();
  
  carre05.deplacer();
  carre05.dessiner();
  
  carre06.deplacer();
  carre06.dessiner();
  
  carre07.deplacer();
  carre07.dessiner();
  
  carre08.deplacer();
  carre08.dessiner();
  
  carre09.deplacer();
  carre09.dessiner();
  
  carre10.deplacer();
  carre10.dessiner();
  
//-------------------------------------------------------------------------------------- 

// COLLISIONS
  detectCollision();
  // il faut placer la boucle dans la détection pour arrêter l'animation
}

// called only once, start.
creationDesObjets();
// 5) fonction pour détecter les collisions

let vies = 3;
function detectCollision(rectangle, triangle, viesElement){

  let gameInterval;
  
  // Place the properties in objects to simplify writing and accessing values
  var rect1 = {"x":carre01.x, "y":carre01.y, "w":carre01.largeur, "h":carre01.hauteur};
  var rectTri = {"x":triangle01.x, "y":triangle01.y, "w":triangle01.largeur, "h":triangle01.hauteur}; 
  var rect4 = {"x":carre04.x, "y":carre04.y, "w":carre04.largeur, "h":carre04.hauteur};
  var rect5 = {"x":carre05.x, "y":carre05.y, "w":carre05.largeur, "h":carre05.hauteur};
  var rect6 = {"x":carre06.x, "y":carre06.y, "w":carre06.largeur, "h":carre06.hauteur};
  var rect7 = {"x":carre07.x, "y":carre07.y, "w":carre07.largeur, "h":carre07.hauteur};
  var rect8 = {"x":carre08.x, "y":carre08.y, "w":carre08.largeur, "h":carre08.hauteur};
  var rect9 = {"x":carre09.x, "y":carre09.y, "w":carre09.largeur, "h":carre09.hauteur};
  var rect10 = {"x":carre10.x, "y":carre10.y, "w":carre10.largeur, "h":carre10.hauteur};
	  
  if (rect1.x < (rectTri.x + rectTri.w) &&
    (rect1.x + rect1.w) > rectTri.x &&
    rect1.y < (rectTri.y + rectTri.h) &&
    (rect1.y + rect1.h) > rectTri.y) {
    console.log("collision 1");
    vies--;
    
   if (vies===1){
	window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if (rect4.x < (rectTri.x + rectTri.w) &&
    (rect4.x + rect4.w) > rectTri.x &&
    rect4.y < (rectTri.y + rectTri.h) &&
    (rect4.y + rect4.h) > rectTri.y) {
    console.log("collision 4");
    vies--;
    
	if (vies===1){
	   window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if ( rect5.x < (rectTri.x + rectTri.w) &&
    (rect5.x + rect5.w) > rectTri.x &&
    rect5.y < (rectTri.y + rectTri.h) &&
    (rect5.y + rect5.h) > rectTri.y) {
    console.log("collision 5");
    vies--;
    
	if (vies===1){
	   window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if (rect6.x < (rectTri.x + rectTri.w) &&
    (rect6.x + rect6.w) > rectTri.x &&
    rect6.y < (rectTri.y + rectTri.h) &&
    (rect6.y + rect6.h) > rectTri.y) {
    console.log("collision 6");
    vies--;
    
	if (vies===1){
	   window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if (rect7.x < (rectTri.x + rectTri.w) &&
    (rect7.x + rect7.w) > rectTri.x &&
    rect7.y < (rectTri.y + rectTri.h) &&
    (rect7.y + rect7.h) > rectTri.y) {
    console.log("collision 7");
    vies--;
    
	if (vies===1){
	  window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if (rect8.x < (rectTri.x + rectTri.w) &&
    (rect8.x + rect8.w) > rectTri.x &&
    rect8.y < (rectTri.y + rectTri.h) &&
    (rect8.y + rect8.h) > rectTri.y) {
    console.log("collision 8");
    vies--;
    
	if (vies===1){
	   window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  }else if (rect9.x < (rectTri.x + rectTri.w) &&
    (rect9.x + rect9.w) > rectTri.x &&
    rect9.y < (rectTri.y + rectTri.h) &&
    (rect9.y + rect9.h) > rectTri.y) {
    console.log("collision 9");
    vies--;
    
	if (vies===1){
	   window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  } else if (rect10.x < (rectTri.x + rectTri.w) &&
    (rect10.x + rect10.w) > rectTri.x &&
    rect10.y < (rectTri.y + rectTri.h) &&
    (rect10.y + rect10.h) > rectTri.y) {
    console.log("collision 10");
    vies--;
    
	if (vies===1){
	  window.cancelAnimationFrame(animFrameLoop)
	document.getElementById('detectionButton').style.display = 'block';
    clearInterval(chronoInterval);
	
   }
  }


  else{
    animFrameLoop = requestAnimationFrame(animLoop);
	
  }
}// fin detectCollision





