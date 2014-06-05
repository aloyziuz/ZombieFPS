#pragma strict
var maxHealth: int = 100;
var clipMax: int = 30;
var maxAmmo: int = 150;
var health: int;
var availableAmmo: int;
var currentClip: int;
var bulletPrefab: GameObject;
var muzzleFlash: GameObject;
var muzzleFlashLength = 0.1;
var bloodGUI1: GUITexture;
var bloodGUI2: GUITexture;
var bloodGUI3: GUITexture;
var noAmmo: AudioSource;
var poltergeist: AudioSource;
var backgroundAudio: AudioSource;
var shotTimer: float = 0;
var shotCool: float = 0.1;
var audioTimer: float = 30;
var audioCool: float = 120;
private var reloading: boolean = false;

function Start () {
	backgroundAudio.Play();
	//initiate health and ammo
	health = maxHealth;	
	currentClip = clipMax;
	availableAmmo = maxAmmo - currentClip;
	//set GUITexture.pixelInset to fit the screen
	var r = Rect(-Screen.width/2, -Screen.height/2, Screen.width, Screen.height);
	bloodGUI1.pixelInset = r;
	bloodGUI2.pixelInset = r;
	bloodGUI3.pixelInset = r;
}

function Update () {
	//shooting and reload
	if(Input.GetMouseButton(0) && shotTimer < 0 && currentClip > 0 && reloading == false){
		shoot();
		muzzleflashOn();		
	}
	else if(Input.GetMouseButton(0) &&  shotTimer < 0 && currentClip <= 0 && reloading == false){
		noAmmo.Play();
	}
	if(Input.GetMouseButtonDown(1)){
		if(currentClip < clipMax){
			reload();
		}
	}
	shotTimer -= Time.deltaTime;
	audioTimer -= Time.deltaTime;
	if(audioTimer < 0){
		poltergeist.Play();
		audioTimer = audioCool;
	}
	//show blood damage on the screen
	bloodGUI1.color.a = bloodAlpha(70);
	bloodGUI2.color.a = bloodAlpha(20);
	bloodGUI3.color.a = bloodAlpha(10);
	if(health <= 0){
		Die();
	}
}

function Die(){
	health = 0;
	var i: float = (1.0*info.bulletHit)/(1.0*info.bulletFired) * 100;
	info.hitRate = i;
	//Time.timeScale = 0.0;
	yield WaitForSeconds(1);
	//Time.timeScale = 1.0;
	Application.LoadLevel("gameOver");
}
//transparency of blod damage
function bloodAlpha(start:float): float{
	var alpha = 1 - (100 * health)/(start * maxHealth);
	return Mathf.Clamp(alpha, 0, 1);
}

//turn muzzleflash on
function muzzleflashOn(){
	muzzleFlash.SetActive(true);
	yield WaitForSeconds(muzzleFlashLength);
	muzzleFlash.SetActive(false);
}

function shoot(){
	currentClip--;
	maxAmmo--;
	info.bulletFired += 1;
	var bullet = Instantiate(bulletPrefab, GameObject.Find("crosshair").transform.position, GameObject.Find("crosshair").transform.rotation);
	bullet.rigidbody.AddForce(GameObject.Find("crosshair").transform.forward * 4000);
	shotTimer = shotCool;
	Destroy(bullet, 1);
	if(currentClip <= 0 && availableAmmo > 0){
		reload();
	}
}

function reload(){
	if(availableAmmo > 0){
		reloading = true;
		GameObject.Find("ak47").animation.Play("reload");
		audio.Play();
		yield WaitForSeconds(GameObject.Find("ak47").animation.clip.length);
		var difference = clipMax - currentClip;
		if(difference <= availableAmmo){
			availableAmmo -= difference;
			currentClip += difference;
		}
		else if(difference > availableAmmo){
			currentClip += availableAmmo;
			availableAmmo = 0;
		}
		reloading = false;
	}
}

