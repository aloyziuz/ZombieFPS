#pragma strict
var backgroundImg: Texture2D;
var style: GUIStyle;

function OnGUI(){
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundImg);
	GUI.Box(Rect(0, 20, 50, 50), "Controls:", style);
	GUI.Box(Rect(0, 70, 50, 50), "W, A, S, D to move", style);
	GUI.Box(Rect(0, 120, 50, 50), "Space to jump", style);
	GUI.Box(Rect(0, 170, 50, 50), "Left Mouse Button to fire", style);
	GUI.Box(Rect(0, 220, 50, 50), "Right Mouse Button to reload", style);
	GUI.Box(Rect(0, 270, 50, 50), "Objectives:", style);
	GUI.Box(Rect(0, 320, 50, 50), "1)Neutralize the area for survivors ", style);
	GUI.Box(Rect(0, 370, 50, 50), "2)Find a new gun ", style);
	GUI.Box(Rect(0, 420, 50, 50), "3)Find the key to hospital ", style);
	if(GUI.Button(Rect(0, 500, 100, 50), "Main Menu")){
		Application.LoadLevel("mainMenu");
	}
}
