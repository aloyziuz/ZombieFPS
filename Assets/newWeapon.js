#pragma strict

function OnTriggerEnter(obj: Collider){
	if(obj.gameObject.tag == "Player"){
		GameObject.Find("Main Camera").GetComponent(info).changeWeaponStatus("Found");
		Destroy(gameObject);
	}
}

function Start () {

}

function Update () {

}