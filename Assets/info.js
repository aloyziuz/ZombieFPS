#pragma strict
var healthTexture: Texture2D;
var ammoTexture: Texture2D;
var source: GameObject[];
var guiStyle: GUIStyle;
var totalZombies: int = 30;
var zombiePrefab: GameObject;
var minX : float = 358.5;
var maxX: float = 432.2;
var y: float = 2.11;
var minZ: float = 933.8;
var maxZ: float = 1003.3;
static var bulletFired: int = 0;
static var bulletHit: int = 0;
static var hitRate: float = 0.0;
private var zombieCount: int;
private var newWeaponStatus = "Not Found";
private var keyStatus = "Not Found";

function Start () {
	Screen.showCursor = false;
	for(var i: int = 0; i < totalZombies; i++){
		Instantiate(zombiePrefab, Vector3(Random.Range(minX, maxX), y, Random.Range(minZ, maxZ)), zombiePrefab.transform.rotation);;
		zombieCount++;
	}
}

function zombieCountDecrement(){
	zombieCount -= 1;
}

function changeWeaponStatus(str: String){
	newWeaponStatus = str;
}

function changeKeyStatus(str: String){
	keyStatus = str;
}

function Update () {

}

function OnGUI(){
	var maxHP = source[0].GetComponent(player).maxHealth;
	var hp: int = source[0].GetComponent(player).health;
	var currentClip: int = source[0].GetComponent(player).currentClip;
	var maxClip: int = source[0].GetComponent(player).availableAmmo;
	//show health
	GUI.Box (Rect (0, Screen.height - 60, 60, 60), healthTexture);
	GUI.Label (Rect (80, Screen.height - 60, 100, 100), hp + " / " + maxHP, guiStyle);
	//show ammo
	GUI.Box (Rect (Screen.width - 210, Screen.height - 60, 60, 60), ammoTexture);
	GUI.Box(Rect(Screen.width-150, Screen.height-60, 150, 60),currentClip + "/" + maxClip, guiStyle);
	
	guiStyle.normal.textColor = Color.yellow;
	guiStyle.fontSize = 23;
	GUI.Label(Rect(0, 0, 30, 30), "Objectives: ", guiStyle);
	//objectives turns green when completed
	if(zombieCount == 0){
		guiStyle.normal.textColor = Color.green;
		GUI.Label(Rect(20, 30, 30, 30), "Zombies Left: " + zombieCount, guiStyle);
		guiStyle.normal.textColor = Color.yellow;
	}
	else{
		GUI.Label(Rect(20, 30, 30, 30), "Zombies Left: " + zombieCount, guiStyle);
	}
	if(newWeaponStatus != "Not Found"){
		guiStyle.normal.textColor = Color.green;
		GUI.Label(Rect(20, 60, 30, 30), "Find a New Weapon: " + newWeaponStatus, guiStyle);
		guiStyle.normal.textColor = Color.yellow;
	}
	else{
		GUI.Label(Rect(20, 60, 30, 30), "Find a New Weapon: " + newWeaponStatus, guiStyle);
	}
	if(keyStatus != "Not Found"){
		guiStyle.normal.textColor = Color.green;
		GUI.Label(Rect(20, 90, 30, 30), "Find a Key to Hospital: " + keyStatus, guiStyle);
		guiStyle.normal.textColor = Color.yellow;
	}
	else{
		GUI.Label(Rect(20, 90, 30, 30), "Find a Key to Hospital: " + keyStatus, guiStyle);
	}
	if(zombieCount == 0 && newWeaponStatus != "Not Found" && keyStatus != "Not Found"){
		var i: float = (1.0*this.bulletHit)/(1.0*this.bulletFired) * 100;
		this.hitRate = i;
		Screen.showCursor = true;
		Application.LoadLevel("win");
	}
	guiStyle.normal.textColor = Color.white;
	guiStyle.fontSize = 40;
}