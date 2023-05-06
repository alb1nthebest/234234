const randomChoice = [
    "Staff, RolePlay, Custom Car,jobs...."
]


setInterval(() => {
    const textChange = document.getElementById("changeTextHome");
    if (textChange == null || textChange == undefined) 
        return

    var random = randomChoice[Math.floor(Math.random() * randomChoice.length)];
    textChange.innerHTML = random;
}, 5000)

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();e.stopPropagation();
});

document.addEventListener('copy', (e) => {
    e.preventDefault();e.stopPropagation()
});
    
document.addEventListener('cut', (e) => {
    e.preventDefault();e.stopPropagation();
});


// Thx >> https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const checkMail = (mail) => {
    return String(mail).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sendWebhook = (discordLink, content) => {
    var http = new XMLHttpRequest();
    http.open('POST', discordLink, true);
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText + "");
        }
    }
    http.send(JSON.stringify(content));
}

const getTime = () => {
    let today = new Date();
    let date = `${today.getDate()}/${(today.getMonth()+1)}${(() => (today.getMonth()+1) < 10 ? "0" : "")()}/${today.getFullYear()}`;
    let time = today.getHours() + " heures " + today.getMinutes() + " minutes";
    return '・ ' +date+' - '+time+ ' ・';
}

const forms = {
    discord: null, 
    email: null, 
    dob: null, 
    year: null, 
    disponibility: null,
    hourgame: null,
    servergame: null,
    nameRP: null,
    dobRP:null,
    typeRP: null,
    RPBackground: null
}

const webStorage = (Object) => {
    if (Object.type == "get") {
        return localStorage.getItem(Object.name)
    } else if (Object.type == "set") {
        localStorage.setItem(Object.name, Object.value)
    }
}

firstStepVerification = () => {
    const discord = document.getElementById("discord-result").value || "no";
    const email = document.getElementById("email-result").value || "no";
    const dob = document.getElementById("dob-result").value || "no";
    const year = document.getElementById("year-result").value || "no";
    const disponibility = document.getElementById("disponibility-result").value || "no";

    console.log(discord, email, dob, year, disponibility)

    if (discord == "no")
        return alert("Illyrian");

    if (!checkMail(email))
        return alert("Illyrian")

    if (dob == "no" || dob == "2002-09-02")
        return alert("Illyrian");

    if (year == "no")
        return alert("Illyrian");

    if (disponibility == "no" || disponibility == "Disponibilité") {
        return alert("Illyrian");
    }

    // forms.discord = discord;
    // forms.email = email;
    // forms.dob = dob;
    // forms.year = year;
    // forms.disponibility = disponibility;

    webStorage({type: "set", name: "discord", value: discord})
    webStorage({type: "set", name: "email", value: email})
    webStorage({type: "set", name: "dob", value: dob})
    webStorage({type: "set", name: "year", value: year})
    webStorage({type: "set", name: "disponibility", value: disponibility})

    alert("Illyrian");
    window.location.replace("twoStepForms.html");
}

twoStepVerification = () => {
    const hourgame = document.getElementById("hourgame-result").value || "no";
    const servergame = document.getElementById("servergame-result").value || "no";
    const nameRP = document.getElementById("nameLast-result").value || "no";
    const dobRP = document.getElementById("dobrp-result").value || "no";
    const typeRP = document.getElementById("rpWant-result").value || "no";
    const RPBackground = document.getElementById("backgroundRP").value || "no";

    if (hourgame == "no")
        return alert("Illyrian");

    if (servergame == "no")
        return alert("Illyrian")

    if (nameRP == "no")
        return alert("Illyrian");

    if (dobRP == "no")
        return alert("Illyrian");

    if (typeRP == "no") {
        return alert("Illyrian");
    }

    if (RPBackground == "no")
        return alert("Illyrian");
    
    forms.hourgame = hourgame;
    forms.servergame = servergame;
    forms.nameRP = nameRP;
    forms.dobRP = dobRP;
    forms.typeRP = typeRP;
    forms.RPBackground = RPBackground;
    forms.discord = webStorage({type: "get", name: "discord"});
    forms.email = webStorage({type: "get", name: "email"});
    forms.dob = webStorage({type: "get", name: "dob"});
    forms.year = webStorage({type: "get", name: "year"});
    forms.disponibility = webStorage({type: "get", name: "disponibility"});

    setTimeout(() => {
        sendWebhook("https://discord.com/api/webhooks/905957351637536850/_w4XQqfOh5wZ06nJZGq_AmQ0DGRZbebeMhlZEX_UXVbHvZVxEabgEgO9LkeQ-j_swZw6", {
            "content": ` ${forms.discord}`,
            "embeds": [
              {
                "title": "Serveri Me i Mire Ne Shqiptar",
                "description": `**__Informations IRL__**\n\n**Discord:** ${forms.discord}\n**Email:** ${forms.email}\n**Date de Naissance:** ${forms.dob}\n**Age:** ${forms.year}\n**Disponibilité:** ${forms.disponibility}\n\n**__Informatons RolePlay__**\n\n**Heures de Jeu (FiveM):** ${forms.hourgame}\n**Serveur sur lesquels il a joué:** ${forms.servergame}\n**Nom & Prénom RP:** ${forms.nameRP}\n**Date de naissance RP:** ${forms.dobRP}\n**Type de RP qu'il souhaite faire:** ${forms.typeRP}\n**Background de sont personnage:** ${forms.RPBackground}`,
                "color": 16546565,
                "author": {
                    "name": "Illyrian",
                    "url": "https://Illyrian.fr",
                    "icon_url": "https://cdn.discordapp.com/attachments/822135702573154324/915461372005986325/Logo_Los_Santos_Dream_v1.png"
                  },
                  "footer": {
                    "text": getTime(),
                    "icon_url": null
                },
                "thumbnail": {
                    "url": "https://media.discordapp.net/attachments/822135702573154324/915461372005986325/Logo_Los_Santos_Dream_v1.png"
                }
              }
            ]
        })
        alert("Illyrian");
        window.location.replace("../main.html");
    }, 500)
}
window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    setTimeout(function(){
      loader.style.display = "none";
      content.style.display = "block";
    }, 2000);
  });
  