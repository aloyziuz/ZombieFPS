#pragma strict
var crosshairTexture: Texture2D;
var position: Rect;

function OnGUI(){
	position = Rect((Screen.width - crosshairTexture.width)/2, (Screen.height - crosshairTexture.height)/2, crosshairTexture.width, crosshairTexture.height);
	GUI.DrawTexture(position, crosshairTexture);
}

function Start () {

}

function Update () {

}