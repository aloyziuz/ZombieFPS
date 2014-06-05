#pragma strict

function Start () {

}

function Update () {
	if(Input.GetMouseButtonDown(1)){
		this.animation.Play("reload");
	}
}