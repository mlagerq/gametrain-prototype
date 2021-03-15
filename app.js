//This is a story-based game for exploring the criminal justice system and its impact.

//tracks progress
let stage = 0;

//content for each stage
const stageNames = ["Start", "Meet the Character", "Story", "Police", "Bail?", "$2000 bail", "No bail!", "Court"];
const story = [
    "Here are the basic rules...",
    "Hey, thanks for coming. I’m Jerome, and this is my story.",
    "When he was 22 years old, Jerome and a couple other guys were struggling financially. One of his friends had the idea to break into a house in a nicer neighborhoods.",
    "The house had a security system that automatically called the police...",
    "Some defendents are released without financial bail - see if Jerome got lucky.",
    "Unfortunately, Jerome was held on $2000 bail. He was unable to pay the $2000, so had to stay in jail.",
    "Thankfully, Jerome was released without bail. He lived at home until his next court date.",
    "He was represented by a public defender. They recommended that he take a plea bargain."
];
const images = ["images/rules.jpeg","images/character1.png","images/scene1.jpeg", "images/scene1.jpeg", "images/scene2.jpeg", "images/scene2.jpeg"];
const probability = [0, 0, 0, 0, 3, 0, 0, 9];

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
    //random outcome
    rand = 20+Math.round(Math.random()*30);
    first = document.getElementById("icon0");
    first.style.color = "yellowgreen";
    let i = 1;
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
                    window.alert("$2000 bail");
                    nextStage(5);
                } else{
                    window.alert("No bail!");
                    nextStage(6);
                }
            }
    }, 100);  
}