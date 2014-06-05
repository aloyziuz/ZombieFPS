#pragma strict
var backImg: Texture2D;
var style: GUIStyle;

function OnGUI(){
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backImg);
	GUI.Box(Rect(Screen.width/2-200, 0, 150, 150), "Main Menu", style);
	//style.onHover.textColor = Color.red;
	if(GUI.Button(Rect((Screen.width/2)-100, 80, 100, 50), "Play", style)){
		Application.LoadLevel("test");
	}
	if(GUI.Button(Rect(Screen.width/2-100, 150, 100, 50), "Help", style)){
		Application.LoadLevel("help");
	}
	if(GUI.Button(Rect(Screen.width/2-100, 220, 100, 50), "Quit", style)){
		Application.Quit();
	}
	//style.onHover.textColor = Color.black;
}