#pragma strict
var backgroundImg: Texture2D;
var style: GUIStyle;

function OnGUI(){
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundImg);
	style.fontSize = 30;
	GUI.Box(Rect(0, 0, 50, 50), "Statistics", style);
	style.fontSize = 16;
	GUI.Box(Rect(0, 30, 50, 50), "Bullets Fired: " + info.bulletFired, style);
	GUI.Box(Rect(0, 60, 50, 50), "Bullets Hit: " + info.bulletHit, style);
	GUI.Box(Rect(0, 90, 50, 50), "Hit Rate: " + info.hitRate.ToString("F1")+"%", style);
	style.fontSize = 25;
	GUI.Box(Rect(Screen.width-600, 30, 50, 50), "I managed to clear the area", style);
	GUI.Box(Rect(Screen.width-600, 80, 50, 50), "More importantly, I found a new gun", style);
	GUI.Box(Rect(Screen.width-600, 130, 50, 50), "I also found a key to a nearby hospital", style);
	GUI.Box(Rect(Screen.width-600, 180, 50, 50), "May be I can find something there", style);
	if(GUI.Button(Rect((Screen.width/2), 500, 100, 50), "Main Menu")){
		Application.LoadLevel("mainMenu");
	}
}