#pragma strict

function OnTriggerEnter(obj: Collider){
	if(obj.gameObject.tag == "Player"){
		GameObject.Find("Main Camera").GetComponent(info).changeKeyStatus("Found");
		Destroy(gameObject);
	}
}