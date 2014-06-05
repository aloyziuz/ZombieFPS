#pragma strict
//game object reference
var zombieAnimation: GameObject;
var dieParticle: GameObject;
var dieParticleLength: float = 0.2;
var dieAudio: AudioSource;
var summonAudio: AudioSource;
var roarAudio: AudioSource;
//zombie information variable
private var target: Transform;
var health: int = 100;
//wandering variables
var wanderingSpeed:float = 2.0;
var wanderingRotSpeed: float = 5.0;
var wanderingRadius: float = 40.0;
private var currentDestination: Vector3;
private var basePosition: Vector3;
//chasing variables
var chaseDistance: float = 15.0;
var chaseSpeed: float = 3.0;
var chaseRotSpeed: float = 5.0;
//attacking variable
var attackDistance: float = 3.0;
var attackRate: float = 2.6;
private var attackTimer: float = 0.0;
var attackCool: float = 2.6;
//terrain positions
private var minX: float;
private var maxX: float;
private var minZ: float;
private var maxZ: float;
private var y: float;
//pathfinding variables
private var seeker: Seeker;
private var currentWaypoint = 0;
var path: Pathfinding.Path;
var nextWaypointDistance : float = 3;
private var currentWp: int = 0;

function Start () {
	// boundary of the terrain
	minX =  GameObject.Find("Main Camera").GetComponent(info).minX;
	maxX =  GameObject.Find("Main Camera").GetComponent(info).maxX;
	minZ =  GameObject.Find("Main Camera").GetComponent(info).minZ;
	maxZ =  GameObject.Find("Main Camera").GetComponent(info).maxZ;
	y = GameObject.Find("Main Camera").GetComponent(info).y;
	seeker = this.GetComponent(Seeker);
	//set target ot player
	if(target == null){
		target = GameObject.FindWithTag("Player").transform;
	}
	summonAudio.Play();
	//choose destination and create first path
	ChooseNextDestination();
	seeker.StartPath(this.transform.position, currentDestination, OnPathComplete);
}

function ChooseNextDestination(){
	basePosition = this.transform.position;
	//choose random point in a circle
	var randOffset: Vector2 = Random.insideUnitCircle * wanderingRadius;
	currentDestination = basePosition + new Vector3(randOffset.x, 0, randOffset.y);
	if(currentDestination.x < minX || currentDestination.x > maxX || currentDestination.z < minZ || currentDestination.z > maxZ){
		ChooseNextDestination();
	}
	//Debug.DrawLine(this.transform.position, currentDestination, Color.white);
}

function Update () {
	attackTimer -= Time.deltaTime;
	if(health <= 0){
		Die();
	}
	if(target != null){
		var targetDistance = (target.position - this.transform.position).magnitude;
		//if target is inside the attack range, zombie will change to attack mode
		if(targetDistance <= attackDistance){
			if(attackTimer < 0){
				zombieAnimation.animation.Play("attack");
				roarAudio.Play();
				target.GetComponent(player).health -= Random.Range(8, 20);
				attackTimer = attackCool;
			}
		}
		//if target is inside the chasing range, zombie will chase the target
		else if(targetDistance <= chaseDistance){
			seeker.StartPath(this.transform.position, target.position, OnPathComplete);
			rotateToward(target.position, chaseRotSpeed);
			zombieAnimation.animation.Play("walk");
			zombieAnimation.animation["walk"].wrapMode = WrapMode.Loop;
			moveForward(chaseSpeed);
		}
		//if no target is inside the chasing range, it will wandering around
		else if(path != null && targetDistance > chaseDistance){
			zombieAnimation.animation.Play("walk");
			zombieAnimation.animation["walk"].wrapMode = WrapMode.Loop;
			if(currentWp < path.vectorPath.Count){
				rotateToward(path.vectorPath[currentWp], wanderingRotSpeed);
				moveForward(wanderingSpeed);
			}
			if (currentWp < path.vectorPath.Count && Vector3.Distance(transform.position, path.vectorPath[currentWp]) < nextWaypointDistance) {
				currentWp++;
				return;
			}
			if ((this.transform.position - currentDestination).magnitude < 3.0 && currentWp >= path.vectorPath.Count) {
				ChooseNextDestination();
				seeker.StartPath(this.transform.position, currentDestination, OnPathComplete);
				return;
			}
		}
	}
}	

function Die(){
	target = null;
	if(this.rigidbody != null){
		Destroy(this.rigidbody);
		Destroy(this.collider);
		dieAudio.Play();
		zombieAnimation.animation.Play("die");
		GameObject.Find("Main Camera").GetComponent(info).zombieCountDecrement();
		yield WaitForSeconds(2.075);
		dieParticle.SetActive(true);
		yield WaitForSeconds(0.05);
		Destroy(zombieAnimation);
		yield WaitForSeconds(1.15);
		Destroy(gameObject);
	}
}

//rotate towards  the next waypoint
function rotateToward(targetPosition: Vector3, rotSpeed: float){
	targetPosition.y = this.transform.position.y;
	var rotation = Quaternion.LookRotation(targetPosition - this.transform.position);
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, rotation, Time.deltaTime * rotSpeed);
}

//move toward the next waypoint
function moveForward(moveSpeed: float){
	this.transform.position += this.transform.forward * moveSpeed * Time.deltaTime;
}

function OnPathComplete(p : Pathfinding.Path){
	Debug.Log("Yey, we got a path back. Did it have an error? "+p.error);
	if(!p.error){
		path = p;
		currentWp = 0;
	}
}