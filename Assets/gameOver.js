#pragma strict
var gameOverImage: Texture2D;
var style: GUIStyle;

function Awake(){
	Screen.showCursor = true;
	this.audio.Play();
}

function OnGUI(){
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), gameOverImage);
	GUI.Box(Rect(Screen.width/2-200, 0, 150, 150), "Game Over", style);
	style.fontSize = 30;
	GUI.Box(Rect(Screen.width-150, 0, 50, 50), "Statistics", style);
	style.fontSize = 16;
	GUI.Box(Rect(Screen.width-150, 30, 50, 50), "Bullets Fired: " + info.bulletFired, style);
	GUI.Box(Rect(Screen.width-150, 60, 50, 50), "Bullets Hit: " + info.bulletHit, style);
	GUI.Box(Rect(Screen.width-150, 90, 50, 50), "Hit Rate: " + info.hitRate.ToString("F1")+"%", style);
	if(GUI.Button(Rect((Screen.width/2), 80, 100, 50), "Main Menu")){
		Application.LoadLevel("mainMenu");
	}style.fontSize = 80;
}