//This is a story-based game for exploring the criminal justice system and its impact.

//tracks progress
let stage = -1;
let outcomes = 0;

//content for each stage
const stageNames = [
    "Start",
    "Meet the Character", 
    "Story", 
    "Police", 
    "Will excessive force be used?", 
    "No excessive force",
    "Excessive force used", 
    "Bail?", 
    "$2000 bail", 
    "Can you pay bail?", 
    "Can pay bail", 
    "Cannot pay bail", 
    "No bail!", 
    "Court"];
const story = [
    "Here are the basic rules...",
    "Hey, thanks for coming. I’m Jerome, and this is my story.",
    "When he was 22 years old, Jerome and a couple other guys were struggling financially. One of his friends had the idea to break into a house in a nicer neighborhoods.",
    "The house had a security system that automatically called the police...",
    "The police often use excessive force. Will the police use excessive force on Jerome?",
    "The police arrested Jerome without the use of force",
    "The police used excessive force and Jerome was injured during his arrest",
    "Some defendents are released without financial bail - see if Jerome got lucky.",
    "Unfortunately, Jerome was held on $2000 bail.",
    "Will Jerome be able to pay his bail?",
    "Jerome is able to pay his bail and returned home with his family.",
    "He was unable to pay the $2000, so had to stay in jail.",
    "Thankfully, Jerome was released without bail. He lived at home until his next court date.",
    "He was represented by a public defender. They recommended that he take a plea bargain."
];
const images = ["images/rules.jpeg","images/character1.png","images/scene1.jpeg", "images/scene1.jpeg", "images/scene2.jpeg", "images/scene2.jpeg"];
const probability = [0, 0, 0, 0, 3, 0, 0, 9, 0, 4, 0, 0, 0];

//updates stage content when "continue" button is pressed
function nextStage(whichStage){
    updateElement("header", stageNames, whichStage);
    updateElement("maintext", story, whichStage);
    replaceImage();
    probMachine();
    stage=whichStage;
}

//generalizes element updating
function updateElement(id, variable, whichStage){
    temp = document.getElementById(id);
    temp.innerHTML = variable[whichStage];
}

//replaces the div that contains the image with new div containing new image
function replaceImage(){
    var imagediv = document.createElement("div");
    imagediv.setAttribute("id","imagediv");
    var img = document.createElement("img");
    img.setAttribute("height", "500");
    img.setAttribute("width", "800");
    img.src = images[stage];
    imagediv.appendChild(img);
    document.getElementById("imagediv").replaceWith(imagediv);
}

// keeps track of which decision point we're at
function outcomeMessage(occur){
    if (outcomes == 0) {
        if (occur == true) {
            // removes later possibilities from the arrays. In this instance, it removes the part where "Excessive force was used" shows up
            stageNames.splice(stage+2,1);
            story.splice(stage+2,1);
            return "Excessive force was not used";
        }
        else {
            stage = stage+1;
            return "Excessive force was used";
        } 
    }
}

//sets up probability machine on the first real situation slide, updates color display for following slide(s)
function probMachine(){
    container = document.getElementById("prob-icons");
    var newicons = document.createElement("div");
    newicons.setAttribute("id","prob-icons");
    console.log(probability[stage]);
    if (probability[stage+1] != 0){
        for (let j = 0; j < 10; j++){
            icon = document.createElement("i");
            icon.id = "icon"+j;
            icon.className = "bi-person-fill";
            if (j < probability[stage+1]){icon.style = "font-size: 2rem; color: red";}
            else { icon.style = "font-size: 2rem; color: black";}
            newicons.appendChild(icon);
        }
    }
    container.replaceWith(newicons);
}

//changes colors of probability icons sequentially before landing on a random one
function changeColor(){
    //probability of desired outcome
    prob = probability[stage];
    console.log(prob);
    //random outcome
    rand = 20+Math.round(Math.random()*30);
    console.log(rand);
    first = document.getElementById("icon0");
    first.style.color = "yellowgreen";
    let i = 1;
    let occur = true;
    //changes every 1/10 second
    let int = setInterval(function(){ 
            next = document.getElementById("icon"+(i%10)); 
            if (((i-1)%10) < prob){
                first.style.color = "red";
            }
            else{
                first.style.color = "black";
            }
            next.style.color = "yellowgreen";
            first = next;
            i++;
            if (i === rand){
                clearInterval(int);
                let outcome = (rand % 10);
                if (outcome > prob){
                    occur = true;
                    let message = outcomeMessage(occur);
                    window.alert(message);
                } else{
                    occur = false;
                    let message = outcomeMessage(occur);
                    window.alert(message);
                }
            }
    }, 100);  
}