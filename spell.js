// Richard McNew
// CS 5400
//    Assignment 05:  Fingerspelling
//
//    Write a program that uses a hierarchical model of a hand to finger spell a 3 letter word in ASL.  
//    The choice of word is up to you (not the user).  
//    Word selection will impact the overall difficulty of the assignment so be wise.
//   
//    Due: Nov 16 by 11:59pm
//   
//    Word to fingerspell:  SEA

// scene 
var scene = new THREE.Scene();

// camera 
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 0);
camera.position.z = 43;
camera.position.y = 19;

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

// axes for debugging
//var axes = new THREE.AxisHelper(20);
//scene.add(axes);

// lighting
var light = new THREE.DirectionalLight( 0xffffff, 1.5);
light.position.set(10, 15, 10);
light.castShadow = true;
scene.add(light);
var ambiLight = new THREE.AmbientLight( 0x404040 );
scene.add(ambiLight);

var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();

var handElements = [];
var fingers = [];

function createHandElement(geometry, material, name, x, y, z) {
	var handElement = new THREE.Mesh(geometry, material);
	handElement.name = name;
	handElement.castShadow = true;
	handElement.receiveShadow = true;
	handElement.position.x = x;
	handElement.position.y = y;
	handElement.position.z = z;
	handElements.push(handElement);
	scene.add(handElement);
	if ( (name.includes("Joint") && !name.startsWith("thumb")) ) {
		fingers.push(handElement);
	}
	return handElement;	
}

const LOOK = new THREE.Vector3(0, 10, 0);
const COUNT = 30;

// skin texture and hand elements
var skinTextureFile = "skin.png";
var skinMaterial;
var wrist;
var wristGeometry = new THREE.CylinderGeometry(2, 2, 6, COUNT, COUNT);
var wristTheta = 0.0;
var palm;
var palmLeft;
var palmRight
var palmGeometry = new THREE.BoxGeometry(6, 6, 2, COUNT, COUNT);
var palmLeftGeometry = new THREE.CylinderGeometry(1, 1, 6, COUNT, COUNT);
var palmRightGeometry = new THREE.CylinderGeometry(1, 1, 6, COUNT, COUNT);
var palmTheta = 0.0;
var knuckle;
var knuckleLeft;
var knuckleRight;
var knuckleTop;
var knuckleTopLeft;
var knuckleTopRight;
var knuckleGeometry = new THREE.BoxGeometry(6, 2, 2, COUNT, COUNT);
var knuckleLeftGeometry = new THREE.CylinderGeometry(1, 1, 2, COUNT, COUNT);
var knuckleRightGeometry = new THREE.CylinderGeometry(1, 1, 2, COUNT, COUNT);
var knuckleTopGeometry = new THREE.CylinderGeometry(1, 1, 6, COUNT, COUNT).rotateZ(-Math.PI / 2);
var knuckleTopLeftGeometry = new THREE.SphereGeometry(1, COUNT, COUNT);
var knuckleTopRightGeometry = new THREE.SphereGeometry(1, COUNT, COUNT);
var knuckleTheta = 0.0;
var pinkyBase;
var pinkyBaseGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3, COUNT, COUNT);
var pinkyJointBaseToMid;
var pinkyJointBaseToMidGeometry = new THREE.SphereGeometry(0.75, COUNT, COUNT);
var pinkyMid;
var pinkyMidGeometry = new THREE.CylinderGeometry(0.65, 0.75, 2.5, COUNT, COUNT);
var pinkyJointMidToTip;
var pinkyJointMidToTipGeometry = new THREE.SphereGeometry(0.65, COUNT, COUNT);
var pinkyTip;
var pinkyTipGeometry = new THREE.CylinderGeometry(0.35, 0.65, 1.2, COUNT, COUNT);
var ringBase;
var ringBaseGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3.8, COUNT, COUNT);
var ringJointBaseToMid;
var ringJointBaseToMidGeometry = new THREE.SphereGeometry(0.75, COUNT, COUNT);
var ringMid;
var ringMidGeometry = new THREE.CylinderGeometry(0.65, 0.75, 3, COUNT, COUNT);
var ringJointMidToTip;
var ringJointMidToTipGeometry = new THREE.SphereGeometry(0.65, COUNT, COUNT);
var ringTip;
var ringTipGeometry = new THREE.CylinderGeometry(0.35, 0.65, 2, COUNT, COUNT);
var middleBase;
var middleBaseGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3.8, COUNT, COUNT);
var middleJointBaseToMid;
var middleJointBaseToMidGeometry = new THREE.SphereGeometry(0.75, COUNT, COUNT);
var middleMid;
var middleMidGeometry = new THREE.CylinderGeometry(0.65, 0.75, 3, COUNT, COUNT);
var middleJointMidToTip;
var middleJointMidToTipGeometry = new THREE.SphereGeometry(0.65, COUNT, COUNT);
var middleTip;
var middleTipGeometry = new THREE.CylinderGeometry(0.35, 0.65, 3, COUNT, COUNT);
var pointerBase;
var pointerBaseGeometry = new THREE.CylinderGeometry(0.75, 0.75, 3.8, COUNT, COUNT);
var pointerJointBaseToMid;
var pointerJointBaseToMidGeometry = new THREE.SphereGeometry(0.75, COUNT, COUNT);
var pointerMid;
var pointerMidGeometry = new THREE.CylinderGeometry(0.65, 0.75, 3, COUNT, COUNT);
var pointerJointMidToTip;
var pointerJointMidToTipGeometry = new THREE.SphereGeometry(0.65, COUNT, COUNT);
var pointerTip;
var pointerTipGeometry = new THREE.CylinderGeometry(0.35, 0.65, 2.8, COUNT, COUNT);
var fingerTheta = 0.0;  // Move all fingers together
var thumbBase;
var thumbBaseGeometry = new THREE.CylinderGeometry(0.85, 0.85, 1.2, COUNT, COUNT).rotateZ(-Math.PI / 2);
var thumbJointBaseToMid;
var thumbJointBaseToMidGeometry = new THREE.SphereGeometry(0.85, COUNT, COUNT);
var thumbMid;
var thumbMidGeometry = new THREE.CylinderGeometry(0.75, 0.85, 3, COUNT, COUNT).rotateZ(-Math.PI / 2);
var thumbJointMidToTip;
var thumbJointMidToTipGeometry = new THREE.SphereGeometry(0.75, COUNT, COUNT);
var thumbTip;
var thumbTipGeometry = new THREE.CylinderGeometry(0.35, 0.75, 3.5, COUNT, COUNT).rotateZ(-Math.PI / 2);
var thumbUpTheta = 0.0;
var thumbAcrossTheta = 0.0;

// letters to print
var letterMaterial = new THREE.MeshPhongMaterial(0xFF0000);
var letterS;
var letterE;
var letterA;

// keyPoints for each letter
var keyPoints = [];
keyPoints.push({ curlFingers: 90, bendKnuckle: 90, thumbUp: 18, thumbAcross: 90, sVisible: 1, eVisible: 0, aVisible: 0});  // "S"
keyPoints.push({ curlFingers: 90, bendKnuckle: 50, thumbUp: 3,  thumbAcross: 90, sVisible: 1, eVisible: 1, aVisible: 0});  // "E"
keyPoints.push({ curlFingers: 90, bendKnuckle: 90, thumbUp: 68, thumbAcross: 25, sVisible: 1, eVisible: 1, aVisible: 1});  // "A"

// variables that Tweens will update for animation
var handAngles = {
    curlFingers : 0,
    bendKnuckle : 0,
    thumbUp : 0,
    thumbAcross : 0,
    sVisible : 0,
    eVisible : 0,
    aVisible : 0
};

function updateHandAngles() {
    curlFingersAction(handAngles.curlFingers);
    bendKnuckleAction(handAngles.bendKnuckle);
    thumbUpAction(handAngles.thumbUp);
    thumbAcrossAction(handAngles.thumbAcross);
    if ( (handAngles.sVisible === 1) && (handAngles.eVisible === 0) && (handAngles.aVisible === 0) ) {
        scene.add(letterS);
    } 
    if ( (handAngles.sVisible === 1) && (handAngles.eVisible === 1) && (handAngles.aVisible === 0) ) {
        scene.add(letterE);
    } 
    if ( (handAngles.sVisible === 1) && (handAngles.eVisible === 1) && (handAngles.aVisible === 1) ) {
        scene.add(letterA);
    } 
}

// tweens to animate movements to each ASL letter
const FRAMES = 1000;
const LETTER_PAUSE = 2000; // milliseconds
var toFirstLetter = new TWEEN.Tween(handAngles).to(keyPoints[0], FRAMES).delay(LETTER_PAUSE).start();
var toSecondLetter = new TWEEN.Tween(handAngles).to(keyPoints[1], FRAMES).delay(LETTER_PAUSE);
var toThirdLetter = new TWEEN.Tween(handAngles).to(keyPoints[2], FRAMES).delay(LETTER_PAUSE);
toFirstLetter.chain(toSecondLetter);
toSecondLetter.chain(toThirdLetter);

function buildHandElementHierarchy() {
	// link hand elements into hierarchy
	wrist.add(palm);
    palm.add(palmLeft);
    palm.add(palmRight);
    palmLeft.add(knuckleTopLeft);
    palmRight.add(knuckleTopRight);
	palm.add(knuckle);
    knuckle.add(knuckleLeft);
    knuckle.add(knuckleRight);
    knuckle.add(knuckleTop);
	knuckleTop.add(pinkyBase);
	pinkyBase.add(pinkyJointBaseToMid);
    pinkyJointBaseToMid.add(pinkyMid);
	pinkyMid.add(pinkyJointMidToTip);
    pinkyJointMidToTip.add(pinkyTip);
	knuckleTop.add(ringBase);
	ringBase.add(ringJointBaseToMid);
    ringJointBaseToMid.add(ringMid);
	ringMid.add(ringJointMidToTip);
    ringJointMidToTip.add(ringTip);
	knuckleTop.add(middleBase);
	middleBase.add(middleJointBaseToMid);
    middleJointBaseToMid.add(middleMid);
	middleMid.add(middleJointMidToTip);
    middleJointMidToTip.add(middleTip);
	knuckleTop.add(pointerBase);
	pointerBase.add(pointerJointBaseToMid);
    pointerJointBaseToMid.add(pointerMid);
	pointerMid.add(pointerJointMidToTip);
    pointerJointMidToTip.add(pointerTip);
	palmRight.add(thumbBase);
	thumbBase.add(thumbJointBaseToMid);
    thumbJointBaseToMid.add(thumbMid);
	thumbMid.add(thumbJointMidToTip);
    thumbJointMidToTip.add(thumbTip);
}

function textureLoadSuccess( texture ) {  
	skinMaterial = new THREE.MeshPhongMaterial( {map: texture} ); 
	// build all of the hand elements in their starting positions
	wrist = createHandElement(wristGeometry, skinMaterial, "wrist", 0, 0, 0);
	palm = createHandElement(palmGeometry, skinMaterial, "palm", 0, 5, 0);
    palmLeft = createHandElement(palmLeftGeometry, skinMaterial, "palmLeft", -3.5, 0, 0);
    palmRight = createHandElement(palmRightGeometry, skinMaterial, "palmRight", 3.5, 0, 0);
	knuckle = createHandElement(knuckleGeometry, skinMaterial, "knuckle", 0, 4, 0);
    knuckleLeft = createHandElement(knuckleLeftGeometry, skinMaterial, "knuckleLeft", -3.5, 0, 0);
    knuckleRight = createHandElement(knuckleRightGeometry, skinMaterial, "knuckleRight", 3.5, 0, 0);
    knuckleTop = createHandElement(knuckleTopGeometry, skinMaterial, "knuckleTop", 0, 1, 0);
    knuckleTopLeft = createHandElement(knuckleTopLeftGeometry, skinMaterial, "knuckleTopLeft", 0, 5, 0);
    knuckleTopRight = createHandElement(knuckleTopRightGeometry, skinMaterial, "knuckleTopRight", 0, 5, 0);

	pinkyBase = createHandElement(pinkyBaseGeometry, skinMaterial, "pinkyBase", -3.5, 1, 0);
    pinkyJointBaseToMid = createHandElement(pinkyJointBaseToMidGeometry, skinMaterial, "pinkyJointBaseToMid", 0, 1.5, 0);
	pinkyMid = createHandElement(pinkyMidGeometry, skinMaterial, "pinkyMid", 0, 1, 0);
    pinkyJointMidToTip = createHandElement(pinkyJointMidToTipGeometry, skinMaterial, "pinkyJointMidToTip", 0, 0.9, 0);
	pinkyTip = createHandElement(pinkyTipGeometry, skinMaterial, "pinkyTip", 0, 1, 0);

	ringBase = createHandElement(ringBaseGeometry, skinMaterial, "ringBase", -1.25, 1, 0);
    ringJointBaseToMid = createHandElement(ringJointBaseToMidGeometry, skinMaterial, "ringJointBaseToMid", 0, 1.5, 0);
	ringMid = createHandElement(ringMidGeometry, skinMaterial, "ringMid", 0, 2, 0);
    ringJointMidToTip = createHandElement(ringJointMidToTipGeometry, skinMaterial, "ringJointMidToTip", 0, 1.1, 0);
	ringTip = createHandElement(ringTipGeometry, skinMaterial, "ringTip", 0, 1.5, 0);

	middleBase = createHandElement(middleBaseGeometry, skinMaterial, "middleBase", 1, 1, 0);
    middleJointBaseToMid = createHandElement(middleJointBaseToMidGeometry, skinMaterial, "middleJointBaseToMid", 0, 1.5, 0);
	middleMid = createHandElement(middleMidGeometry, skinMaterial, "middleMid", 0, 2, 0);
    middleJointMidToTip = createHandElement(middleJointMidToTipGeometry, skinMaterial, "middleJointMidToTip", 0, 1.5, 0);
	middleTip = createHandElement(middleTipGeometry, skinMaterial, "middleTip", 0, 1.7, 0);

	pointerBase = createHandElement(pointerBaseGeometry, skinMaterial, "pointerBase", 3.5, 1, 0);
    pointerJointBaseToMid = createHandElement(pointerJointBaseToMidGeometry, skinMaterial, "pointerJointBaseToMid", 0, 1.5, 0);
	pointerMid = createHandElement(pointerMidGeometry, skinMaterial, "pointerMid", 0, 2, 0);
    pointerJointMidToTip = createHandElement(pointerJointMidToTipGeometry, skinMaterial, "pointerJointMidToTip", 0, 1.5, 0);
	pointerTip = createHandElement(pointerTipGeometry, skinMaterial, "pointerTip", 0, 1.5, 0);

	thumbBase = createHandElement(thumbBaseGeometry, skinMaterial, "thumbBase", 1, 2, 0.5);
    thumbJointBaseToMid = createHandElement(thumbJointBaseToMidGeometry, skinMaterial, "thumbJointBaseToMid", 1, 0, 0);
	thumbMid = createHandElement(thumbMidGeometry, skinMaterial, "thumbMid", 1.5, 0, 0);
    thumbJointMidToTip = createHandElement(thumbJointMidToTipGeometry, skinMaterial, "thumbJointMidToTip", 1.5, 0, 0);
	thumbTip = createHandElement(thumbTipGeometry, skinMaterial, "thumbTip", 1.5, 0, 0);

	buildHandElementHierarchy()
	camera.lookAt(LOOK);
	render();
}

function textureLoadProgress( xhr ) {
	console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
}

function textureLoadError( xhr ) {
	console.log( 'An error occurred while loading the texture' );
}

fontLoader.load('optimer_regular.typeface.json', fontLoadSuccess);
var skinTexture = textureLoader.load(skinTextureFile, textureLoadSuccess, textureLoadProgress, textureLoadError);

function createLetter(text, font, x, y, z) {
    var letterGeometry = new THREE.TextGeometry(text, {font: font, size: 10, weight: 'normal', style: 'normal', height: 1});
	var letter = new THREE.Mesh(letterGeometry, letterMaterial);
	letter.castShadow = true;
	letter.receiveShadow = true;
	letter.position.x = x;
	letter.position.y = y;
	letter.position.z = z;
	return letter;
}

function fontLoadSuccess(font) {
    letterS = createLetter("S", font, -12, 14, 0);
    letterE = createLetter("E", font, -4, 14, 0);
    letterA = createLetter("A", font, 4, 14, 0);
}


function rotateWrist() {
	var angle = parseFloat(document.getElementById("wristRotation").value);
    rotateWristAction(angle);
}

function rotateWristAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = wristTheta - radAngle;
	wristTheta = radAngle;
	wrist.rotateY(angleDiff);
}


function bendPalm() {
	var angle = parseFloat(document.getElementById("bendPalm").value);
    bendPalmAction(angle);
}

function bendPalmAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = palmTheta - angle;
	palmTheta = angle;
	palm.rotateX(-angleDiff);
}


function bendKnuckle() {
	var angle = parseFloat(document.getElementById("bendKnuckle").value);
    bendKnuckleAction(angle);
}

function bendKnuckleAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = knuckleTheta - radAngle;
	knuckleTheta = radAngle;
	knuckleTop.rotateX(-angleDiff);
}


function curlFingers() {
	var angle = parseFloat(document.getElementById("curlFingers").value);
    curlFingersAction(angle);
}

function curlFingersAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = fingerTheta - radAngle;
	fingerTheta = radAngle;
	for (var i = 0; i < fingers.length; i++) {
	    fingers[i].rotateX(-angleDiff);
	}
}


function thumbUp() {
	var angle = parseFloat(document.getElementById("thumbUp").value);
    thumbUpAction(angle);
}

function thumbUpAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = thumbUpTheta - radAngle;
	thumbUpTheta = radAngle;
    thumbJointBaseToMid.rotateZ(-angleDiff);
    thumbJointMidToTip.rotateZ(-angleDiff);
}


function thumbAcross() {
	var angle = parseFloat(document.getElementById("thumbAcross").value);
    thumbAcrossAction(angle);
}

function thumbAcrossAction(angle) {
    var radAngle = THREE.Math.degToRad(angle);
	var angleDiff = thumbAcrossTheta - radAngle;
	thumbAcrossTheta = radAngle;
    palmRight.rotateY(angleDiff/3);
    thumbJointBaseToMid.rotateY(angleDiff);
    thumbJointMidToTip.rotateY(angleDiff/3);
}


function logCoordinates() {
    console.log("curlFingers: " + document.getElementById("curlFingers").value + ", bendKnuckle: " + document.getElementById("bendKnuckle").value +  ", thumbUp: " + document.getElementById("thumbUp").value + ", thumbAcross: " + document.getElementById("thumbAcross").value);
}


var render = function() {
	requestAnimationFrame( render );
    TWEEN.update();
    updateHandAngles();
	renderer.render(scene, camera);
};
