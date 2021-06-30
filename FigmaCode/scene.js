let stage = 0;
let outcomes = 0;

//content for each stage
const stageNames = [
    "Start",
    "Meet the Character", 
    "Story", 
    "Police", 
    "Will excessive force be used?", 
    "Excessive force used", 
    "No excessive force",
    "Bail?", 
    "$2000 bail", 
    "Can you pay bail?", 
    "Cannot pay bail",
    "Can pay bail",  
    "No bail!", 
    "Court"];
const story = [
    "Here are the basic rules...",
    "Hey, thanks for coming. I’m Jerome, and this is my story.",
    "When he was 22 years old, Jerome and a couple other guys were struggling financially. One of his friends had the idea to break into a house in a nicer neighborhoods.",
    "The house had a security system that automatically called the police...",
    "The police often use excessive force. Will the police use excessive force on Jerome?",
    "The police used excessive force and Jerome was injured during his arrest",
    "The police arrested Jerome without the use of force",
    "Some defendents are released without financial bail - see if Jerome got lucky.",
    "Unfortunately, Jerome was held on $2000 bail.",
    "Will Jerome be able to pay his bail?",
    "He was unable to pay the $2000, so had to stay in jail.",
    "Jerome is able to pay his bail and returned home with his family.",
    "Thankfully, Jerome was released without bail. He lived at home until his next court date.",
    "He was represented by a public defender. They recommended that he take a plea bargain."
];

//title, sentence, read more (when they click on the card), path change (to be replaced with a function), feedback (TBD)
var cards = {
    1: ["Abolish Cash Bail", 
    "Judges cannot make defendants pay a deposit to be released from pre-trail detention.",
    "Background: The decision of whether a defendant should be jailed while awaiting trial (and therefore have not been convicted of any crime) is often based on a defendant’s wealth and not on public safety considerations." + 
    "This system burdens the poor and increases the pressure to accept a plea deal even when the defendant is innocent. People should not be in jail simply because they cannot afford to post bail, which has ripple effects on childcare, employment, and other essential needs.",
    "Impact: remove pre-trial detention track completely",
    "Great choice!"
    ],
    2: ["Ban Chokeholds",
    "Require the police department to ban the use of chokeholds.",
    "Background: okeholds are a tactic police use to control an individual by restricting air or blood flow, usually by kneeling on their neck, chest, or back."
    + "Individuals frequently lose consciousness as a result; Eric Garner and many others have been killed by police chokeholds",
    "Impact: no change to path",
    "It would be great if police no longer used chokeholds, but a simple ban has shown to be ineffective; NYC banned chokeholds and that was not enough to deter police from using them anyway." + 
    "It is likely more effective to criminalize chokeholds in conjection with limiting police unions to increase accountability and deterrence. However, criminalizing anything is creating the same cycle of reliance on carceral solutions.",
    ],
    3: ["Implement Civilian-Led Crisis Response",
    "Create a civilian-led department to respond to subsets of emergency calls.",
    "Background: Police currently respond to many 9-1-1 calls that do not require the use of force, and yet often escalate and result in violence. For example, police are more likely to use lethal force when responding to an emergency involving a person in psychiatric distress."+
    "Alternatively, the CAHOOTS program in Eugene, Oregon, sends a medic and crisis worker for over 20% of emergency calls. According to crisis worker Ebony Morgan, the 30-year-old program has never caused serious injury or death and has saved the city money by replacing more expensive responses.",
    "Impact: no police violence track.",
    "Great choice!"
    ]
}

const images = ["images/park.jpeg","images/character.jpeg","images/house.jpg", "images/camera.jpg", "images/scene1.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg", "images/scene2.jpeg"];
const probability = [0, 0, 0, 0, 3, 0, 0, 7, 0, 5, 0, 0, 0, 0];
const skipStages = [0, 0, 0, 0, null, 1, 0, null, 0, null, 2, 1, 0, -1];

//updates stage content when "continue" button is pressed
function nextStage(whichStage){
    // if (whichStage>stageNames.length) {
    //     document.getElementById("continue").onclick = function () {
    //         location.href = "cards.html";
    //     };
    // }
    updateElement("header", stageNames, whichStage);
    updateElement("maintext", story, whichStage);
    replaceImage(whichStage);
    probMachine(whichStage);
    showButton(whichStage, false);
    stage=whichStage;
}

//generalizes element updating
function updateElement(id, variable, whichStage){
    temp = document.getElementById(id);
    temp.innerHTML = variable[whichStage];
}

//replaces the div that contains the image with new div containing new image
function replaceImage(whichStage){
    var imagediv = document.createElement("div");
    imagediv.setAttribute("id","imagediv");
    var img = document.createElement("img");
    img.setAttribute("height", "100%");
    img.setAttribute("width", "100%");
    img.src = images[whichStage];

    var maintext = document.createElement("div");
    maintext.setAttribute("class","maintext");
    maintext.innerHTML = story[whichStage];


    imagediv.appendChild(img);
    document.getElementById("imagediv").replaceWith(imagediv);
}

// keeps track of which decision point we're at
function outcomeMessage(occur){
    switch(stage){
        case 4: 
            if (occur == true) {
                skipStages[stage] = 0; 
                return "Excessive force was used";
            } else {
                skipStages[stage] = 1; 
                return "Excessive force was not used";
            } 
        case 7: 
            if (occur == true) {
                skipStages[stage] = 0; 
                return "Bail was set at $2000.";
            } else {
                skipStages[stage] = 4; 
                return "Jerome was released without bail.";
            } 
        case 9:
            if (occur == true) {
                skipStages[stage] = 0; 
                return "Jerome cannot pay bail.";
            } else {
                skipStages[stage] = 1; 
                return "Jerome can pay bail.";
            }
        default:
            skipStages[stage] = 0;
            return "Something unexpected happened in the code."   
    }
    // if (outcomes == 0) {
    //     if (occur == true) {
    //         // removes later possibilities from the arrays. In this instance, it removes the part where "Excessive force was used" shows up
    //         // stageNames.splice(stage+2,1);
    //         // story.splice(stage+2,1);
    //         skipStages[stage] = 0; 
    //         return "Excessive force was not used";
    //     }
    //     else {
    //         // stage = stage+1;
    //         skipStages[stage] = 1; 
    //         return "Excessive force was used";
    //     } 
    // }
}

//sets up probability machine on the first real situation slide, updates color display for following slide(s)
function probMachine(whichStage){
    container = document.getElementById("prob-icons");
    var newicons = document.createElement("div");
    newicons.setAttribute("id","prob-icons");
    if (probability[whichStage] != 0){
        showContainer("probability_background", true);
        for (let j = 0; j < 10; j++){
            icon = document.createElement("i");
            icon.id = "icon"+j;
            icon.className = "bi-person-fill";
            if (j < probability[whichStage]){icon.style = "font-size: 2rem; color: red";}
            else { icon.style = "font-size: 2rem; color: black";}
            newicons.appendChild(icon);
        }
    }
    else{
        showContainer("probability_background", false);
    }
    container.replaceWith(newicons);
}

//changes colors of probability icons sequentially before landing on a random one
function changeColor(){
    //probability of desired outcome
    prob = probability[stage];
    //random outcome
    rand = 20+Math.round(Math.random()*30);
    console.log(rand)
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
            if (i === rand+1){
                clearInterval(int);
                document.getElementById("icon"+(rand%10)).style.color = "yellowgreen";
                showButton(stage, true);
                let outcome = ((rand) % 10);
                if (outcome < prob){
                    occur = true;
                    var message = outcomeMessage(occur);
                    window.alert(message);
                } else{
                    occur = false;
                    var message = outcomeMessage(occur);
                    window.alert(message);
                }
            }
            else {
                next.style.color = "yellowgreen";
                first = next;
                i++;
            }
    }, 100);
}

// let elem = document.getElementById("done");   
// let width = 1;
// let id = setInterval(frame, 100);
// function frame() {
//     if (width >= 100) {
//         clearInterval(id);
// } else {
//     width++; 
//     elem.style.width = width + '%'; 
// }
// }

function showButton(whichStage, toggle) {
    var gen = document.getElementById("generate");
    var cont = document.getElementById("continue");
    var card = document.getElementById("cards");
    if (probability[whichStage]==0 & whichStage<stageNames.length-1 | toggle==true) {
      cont.style.display = "grid";
      gen.style.display = "none";
      card.style.display = "none";
    } 
    else if (whichStage==stageNames.length-1) {
      cont.style.display = "none";
      gen.style.display = "none";
      card.style.display = "grid";
        
    }
    else {
      gen.style.display = "grid";
      cont.style.display = "none";
      card.style.display = "none";

    }
  }

function showContainer(name, toggle) {
   var contain = document.getElementById(name);
    if (toggle==true) {
      contain.style.display = "grid";
    } else {
      contain.style.display = "none";
    }
}

// function createCards() {
//     let title = document.createElement("h2");
//     let card = document.getElementById("card1");

//     for (let i = 0; i<3; i++) {

//     }
//     title.innerHTML = d;
// }
var numSelections = 0;

function selectCard(cardNum) {
    let cardTitle = cards[cardNum][0];
    var reason = prompt('Why did you pick '+cardTitle+'?');
    if (reason !=null) {
        // this part resets the cards so a new one can be selected
        var nums = [1,2,3];
        if (numSelections != 0) {
            for (let i = 0; i<3; i++) {
                var cardID = "card"+nums[i];
                var card = document.getElementById(cardID);
                card.style.opacity = '1';
                card.style.boxShadow = '0px 0px 0px 0px';
            }
        }
        var otherCards = [1,2,3];
        otherCards.splice(cardNum-1, 1); //removes selected card
        for (let i = 0; i<2; i++) {
            var cardID = "card"+otherCards[i];
            var card = document.getElementById(cardID);
            card.style.opacity = '.5';
        }
        var cardID = "card"+cardNum;
        var card = document.getElementById(cardID);
        card.style.boxShadow = '0px 0px 0px 10px green inset';
        numSelections += 1;
    }
    
}