//This is a story-based game for exploring the criminal justice system and its impact.

//tracks progress
let stage = 0;

//content for each stage
const stageNames = ["Start", "Meet the Character", "Police", "Court"];
const story = [
    "Here are the basic rules...",
    "Hi, I'm your guide...my name is ___. Follow me through various interactions with the criminal justice system.",
    "I was at the park with some friends doing heroin...police came...",
    "I was represented by a public defender. They recommended I take a plea bargain."
];
const images = ["scene1","scene2","scene3","scene4"];
const probability = [0, 0, 3, 5];

//updates stage content when "continue" button is pressed
function nextStage(){
    updateElement("header", stageNames);
    updateElement("maintext", story);
    if (stage > 1){
        probMachine();
    }
    stage++;
}

//generalizes element updating
function updateElement(id, variable){
    temp = document.getElementById(id);
    temp.innerHTML = variable[stage];
}

//sets up probability machine on the first real situation slide, updates color display for following slide(s)
function probMachine(){
    container = document.getElementById("prob-icons");
    if (stage == 2){
        for (let j = 0; j < 10; j++){
            icon = document.createElement("i");
            icon.id = "icon"+j;
            icon.className = "bi-person-fill";
            if (j < probability[stage]){icon.style = "font-size: 2rem; color: red";}
            else { icon.style = "font-size: 2rem; color: black";}
            container.appendChild(icon);
        }
    } else {
        for (let j = 0; j < 10; j++){
            icon = document.getElementById("icon"+j);
            if (j < probability[stage]){icon.style.color = "red";}
            else { icon.style.color = "black";} 
        }
    }
}

//changes colors of probability icons sequentially before landing on a random one
function changeColor(){
    //probability of desired outcome
    prob = probability[stage-1];
    //random outcome
    rand = 20+Math.round(Math.random()*30);
    first = document.getElementById("icon0");
    first.style.color = "yellowgreen";
    let i = 1;
    //changes every 1/10 second
    let int = setInterval(function(){ 
        console.log(i);
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
            }
    }, 100);  
}