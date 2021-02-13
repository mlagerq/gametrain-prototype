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

//updates stage content when "continue" button is pressed
function nextStage(){
    updateElement("header1", stageNames);
    updateElement("maintext", story);
    stage++;
}

//generalizes element updating
function updateElement(id, variable){
    temp = document.getElementById(id);
    temp.innerHTML = variable[stage];
}