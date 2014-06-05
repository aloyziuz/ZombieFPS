#pragma strict
var sparkPrefab: GameObject;

function OnTriggerEnter(obj: Collider){
	if(obj.gameObject.tag == "zombie"){
		obj.GetComponent(zombiePathfinding).health -= Random.Range(30, 50);
		info.bulletHit += 1;
		Destroy(this);
		obj.audio.Play();
		Destroy(gameObject, 1);
	}
	else if(obj.gameObject.tag == "terrain"){
		var sparks = Instantiate(sparkPrefab, this.transform.position, this.transform.rotation);
		sparks.transform.LookAt(GameObject.FindGameObjectWithTag("Player").transform);
		Destroy(gameObject, 1);
		Destroy(sparks, 0.3);
	}
	else{}
}

function Start () {

}

function Update () {

}