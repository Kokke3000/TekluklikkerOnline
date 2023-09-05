//Setting a cookie with name, value and expiry
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Reading a specific cookie by name
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}



//Upgrade prices
MoneyPerClickPrice = 10;
CriticalClickPrice = 100;
MoneyPerSecondPrice = 100;
MoneyMultiplierPrice = 100;
MAOLPrice = 10000;
NspirePrice = 50000;
UnlockGoldenEsPrice = 10000;
ChatGPTPrice = 1000000;
PrestigePrice = 10000000;

//Item prices
MelatoninPrice = 300;
GoldenEsPrice = 1000;
Kahviprice = 150;
PullaPrice = 500;

//Stats
Money = 0;
CriticalClickChance = 1;
MoneyPerClick = 1;
LogoSize = 150  ;
TotalClicks = 0;
MoneyPerSecond = 0;
MoneyMultiplier = 1;
PrestigeLevel = 0;


//Misc
rotation = 0;
KahviMultiplier = 1;
MelatoninMultiplier = 1;
PullaBought = 0;
PullaMultiplier = 1;
MelatoniiniBought = 0;
MAOLBought = 0;
GoldenESUnlocked = 0;
NspireBought = 0;
ChatGPTBought = 0;
ClicksThisSecond = 0;
PatchNotesOpen = 0;

//Check if the cookies have been set
function checkAndSetCookieValues(floatCookies) {
    for (const variable in floatCookies) {
        const cookieName = floatCookies[variable];
        const cookieValue = getCookie(cookieName);
        
        if (cookieValue !== null) {
            // Convert the cookie value to the appropriate data type
            if (!isNaN(cookieValue)) {
                // If the cookie value is a number, parse it as a float
                window[variable] = parseFloat(cookieValue);
            }
        }
    }
}

// List of variables to check
const floatCookies = {
    //Stats
    Money : "Money",
    CriticalClickChance : "CriticalClickChance",
    MoneyPerClick : "MoneyPerClick",
    TotalClicks : "TotalClicks",
    MoneyPerSecond : "MoneyPerSecond",
    MoneyMultiplier : "MoneyMultiplier",
    PrestigeLevel : "PrestigeLevel",

    //Upgrade prices
    MoneyPerClickPrice : "MoneyPerClickPrice",
    MoneyPerSecondPrice : "MoneyPerSecondPrice",
    MoneyMultiplierPrice : "MoneyMultiplierPrice",
    CriticalClickPrice : "CriticalClickPrice",
    PrestigePrice : "PrestigePrice",

    MAOLBought : "MAOLBought",
    ChatGPTBought : "ChatGPTBought",
    NspireBought : "NspireBought"
};

checkAndSetCookieValues(floatCookies);


//Set buttons to red if stuff is bought
function CheckIfBought() {
if (ChatGPTBought == 1) {
    document.getElementById("ChatGPTButton").disabled = true;
    document.getElementById("ChatGPTButton").style.backgroundColor = "red";
    document.getElementById("ChatGPTButton").innerHTML = "ChatGPT on jo ostettu!";
}

if (MAOLBought == 1) {
    document.getElementById("MAOLButton").disabled = true;
    document.getElementById("MAOLButton").style.backgroundColor = "red";
    document.getElementById("MAOLButton").innerHTML = "MAOL on jo ostettu!";
}

if (NspireBought == 1) {
    document.getElementById("NspireButton").disabled = true;
    document.getElementById("NspireButton").style.backgroundColor = "red";
    document.getElementById("NspireButton").innerHTML = "TI-nspire on jo ostettu!";
}
}

CheckIfBought();

//Set the Logo variable and make it not respond to right clicks
var Logo = document.getElementById('LogoImg');
const element = document.getElementById("LogoImg"); 
element.addEventListener("contextmenu", (event) => event.preventDefault());
Logo.style.height = LogoSize + 'px';
Logo.style.width = LogoSize + 'px';   

//Function ran when a player clicks (Includes crit chance)
function Painettu() {
    if (CriticalClickChance > Math.random() * 101) {
        ClicksThisSecond += 1;
        Money += MoneyPerClick * MoneyMultiplier * KahviMultiplier * 5;
        rotation += 10 + MoneyPerClick * 2;
        document.getElementById('critical').style.display = "block";
        document.getElementById('critical').style.setProperty("top", 10 + Math.random()* 10 + "%");
        document.getElementById('critical').style.setProperty("left", 45 + Math.random()* 10 + "%");
        TotalClicks += 1;  
        setTimeout(() => {  
            document.getElementById("critical").style.display = "none";
        }, 1000);
    } else {
            ClicksThisSecond += 1;
            Money += MoneyPerClick * MoneyMultiplier * KahviMultiplier;
            rotation += 10 + MoneyPerClick;
            TotalClicks += 1;  

    }
}

//Function ran every seccond to give the player money
setInterval(function () {
    Money += (MoneyPerSecond * MoneyMultiplier * MelatoninMultiplier * PullaMultiplier)/10;
    rotation += MoneyPerSecond * MoneyMultiplier * MelatoninMultiplier * PullaMultiplier;
}, 100);


// Here lie all the damn functions for buying stuff by pressing buttons

function BuyMoneyPerClick() {
    if (Money >= MoneyPerClickPrice) {
        Money -= MoneyPerClickPrice;
        MoneyPerClick += 1;
        MoneyPerClickPrice += 10 * MoneyPerClick;
    }
    
}

function BuyCritChance() {
    if (Money >= CriticalClickPrice && CriticalClickChance < 100) {
        Money -= CriticalClickPrice;
        CriticalClickChance += 1;
        CriticalClickPrice += 10 * CriticalClickChance;
    }
    
}

function BuyMPS() {
    if (Money >= MoneyPerSecondPrice) {
        Money -= MoneyPerSecondPrice;
        MoneyPerSecondPrice += MoneyPerSecond * 20;
        MoneyPerSecond += 1;
        
    }
   
}

function BuyMultiplier() {
    if (Money >= MoneyMultiplierPrice) {
        Money -= MoneyMultiplierPrice;
        MoneyMultiplierPrice += 100 * MoneyMultiplier;
        MoneyMultiplier += 0.1;    
    }
   
}

function BuyMAOL() {
    if (Money >= MAOLPrice && MAOLBought == 0) {
        Money -= MAOLPrice;
        MoneyPerSecond += 10;
        MAOLBought = 1;
        document.getElementById("MAOLButton").disabled = true;
        document.getElementById("MAOLButton").style.backgroundColor = "red";
        document.getElementById("MAOLButton").innerHTML = "MAOL on jo ostettu!";
    }
   
}

function BuyNspire() {
    if (Money >= NspirePrice && NspireBought == 0) {
        Money -= NspirePrice;
        MoneyMultiplier += 5;
        NspireBought = 1;
        document.getElementById("NspireButton").disabled = true;
        document.getElementById("NspireButton").style.backgroundColor = "red";
        document.getElementById("NspireButton").innerHTML = "TI-nspire on jo ostettu!";
    }
   
}

function BuyChatGPT() {
    if (Money >= ChatGPTPrice && ChatGPTBought == 0) {
        Money -= ChatGPTPrice;
        MoneyPerClick += 100;
        ChatGPTBought = 1;
        document.getElementById("ChatGPTButton").disabled = true;
        document.getElementById("ChatGPTButton").style.backgroundColor = "red";
        document.getElementById("ChatGPTButton").innerHTML = "ChatGPT on jo ostettu!";
    }
   
}



function BuyKahvi() {
    if (Money >= Kahviprice) {
        Money -= Kahviprice
        KahviMultiplier = 2;
        document.getElementById("Status").innerHTML = "Kofeiinia! 2x opintopisteet per klikkaus (10 sec)";
        setTimeout(() => {  
            KahviMultiplier = 1;
            document.getElementById("Status").innerHTML = " ";
        }, 10000);
    }
}


function BuyPulla() {
    if (Money >= PullaPrice && PullaBought == 0) {
        Money -= PullaPrice;
        PullaMultiplier += 1;
        PullaBought = 1;
        document.getElementById("Status").innerHTML = "Mmm... Hyvää amispullaa! Opintopiste kerroin +1 (30 sec)";
        setTimeout(() => {  
            PullaBought = 0;
            PullaMultiplier -= 1
            document.getElementById("Status").innerHTML = " ";
        }, 30000);
    }
}


function BuyADHD() {
    if (Money >= MelatoninPrice && MelatoniiniBought == 0) {
        if (Math.random() * 10 != 1) {
        MelatoniiniBought = 1;
        Money -= MelatoninPrice
        MelatoninMultiplier = 2;
        document.getElementById("Status").innerHTML = "Hyvät yö unet: 2x opintopisteitä per sekuntti! (30 sec)";
        setTimeout(() => {  
            MelatoniiniBought = 0;
            MelatoninMultiplier = 1;
            document.getElementById("Status").innerHTML = " ";
        }, 30000);
        } else {
            Money -= (Money * 0.10);
            document.getElementById("Status").innerHTML = "Nukuit pommiin melatoniinin takia! Menetit 10% opintopisteistäsi!";
            setTimeout(() => {  
            document.getElementById("Status").innerHTML = " ";
            }, 2000);
        }
    }
}

function Prestige() {
if(Money > PrestigePrice) {
    PrestigeLevel += 1;

    //Upgrade prices
    MoneyPerClickPrice = 10;
    CriticalClickPrice = 100;
    MoneyPerSecondPrice = 100;
    MoneyMultiplierPrice = 100;
    MAOLPrice = 10000;
    NspirePrice = 50000;
    UnlockGoldenEsPrice = 10000;
    ChatGPTPrice = 1000000;
    PrestigePrice = PrestigePrice * 5;

    //Item prices
    MelatoninPrice = 100;
    GoldenEsPrice = 1000;
    Kahviprice = 100;
    PullaPrice = 300;

    //Stats
    Money = 0;
    CriticalClickChance = 1;
    MoneyPerClick = 1;
    LogoSize = 150  ;
    TotalClicks = 0;
    MoneyPerSecond = 0;
    MoneyMultiplier = 1 + PrestigeLevel;
    PrestigeLevel = 0;


    //Misc
    rotation = 0;
    KahviMultiplier = 1;
    MelatoninMultiplier = 1;
    MelatoniiniBought = 0;
    PullaMultiplier = 1;
    PullaBought = 0;
    MAOLBought = 0;
    GoldenESUnlocked = 0;
    NspireBought = 0;
    ChatGPTBought = 0;
    ClicksThisSecond = 0;

    CheckIfBought();
    }
}

function HardReset() {
    if (document.getElementById('resetconfirm').checked) {
        //Upgrade prices
        MoneyPerClickPrice = 10;
        CriticalClickPrice = 100;
        MoneyPerSecondPrice = 100;
        MoneyMultiplierPrice = 100;
        MAOLPrice = 10000;
        NspirePrice = 50000;
        UnlockGoldenEsPrice = 10000;
        ChatGPTPrice = 1000000;
        PrestigePrice = 10000000;

        //Item prices
        MelatoninPrice = 300;
        GoldenEsPrice = 1000;
        Kahviprice = 150;
        PullaPrice = 500;

        //Stats
        Money = 0;
        CriticalClickChance = 1;
        MoneyPerClick = 1;
        LogoSize = 150  ;
        TotalClicks = 0;
        MoneyPerSecond = 0;
        MoneyMultiplier = 1;
        PrestigeLevel = 0;


        //Misc
        rotation = 0;
        KahviMultiplier = 1;
        MelatoninMultiplier = 1;
        MAOLBought = 0;
        GoldenESUnlocked = 0;
        NspireBought = 0;
        ChatGPTBought = 0;
        ClicksThisSecond = 0;

        CheckIfBought();
    }
}


//Here lies the function to load all the variables into their html elements
setInterval(function () {
    document.getElementById("Counter").innerHTML = "opintopisteitä: " + (Math.round(Money * 100) / 100);
    Logo.style.rotate = rotation + 'deg';
    document.getElementById("MoneyPerClick").innerHTML = "opintopisteitä per klikkaus: " + MoneyPerClick;
    document.getElementById("PrestigePrice").innerHTML = "Tarvittavat opintopisteet: " + PrestigePrice;
    document.getElementById("CriticalClickChance").innerHTML = "Critical click mahdollisuus: " + CriticalClickChance + "%";
    document.getElementById("MoneyPerSecond").innerHTML = "opintopisteitä per sekuntti: " + MoneyPerSecond;
    document.getElementById("MPCPrice").innerHTML = " +1 opintopiste per klikkaus hinta: " + MoneyPerClickPrice;
    document.getElementById("MPSPrice").innerHTML = "+1 opintopiste per sekuntti hinta: " + MoneyPerSecondPrice;
    document.getElementById("TotalClicks").innerHTML = "Klikkauksia: " + TotalClicks;
    document.getElementById("MoneyMultiplier").innerHTML = "Opintopiste kerroin: " + (Math.round(MoneyMultiplier * 100) / 100) + " x";
    document.getElementById("MMPrice").innerHTML = "+0.1 Opintopiste kerroin hinta: " + MoneyMultiplierPrice;
    document.getElementById("CritPrice").innerHTML = "+1% Critical chance hinta: " + CriticalClickPrice;
    document.getElementById("MAOLPrice").innerHTML = "MAOL hinta: " + MAOLPrice;
    document.getElementById("NspirePrice").innerHTML = "TI-nspire hinta: " + NspirePrice;
    document.getElementById("KahviPrice").innerHTML = "Kahvi hinta: " + Kahviprice;
    document.getElementById("PullaPrice").innerHTML = "Amispulla hinta: " + PullaPrice;
    document.getElementById("MPrice").innerHTML = "Melatoniini hinta: " + MelatoninPrice;
    document.getElementById("ChatGPTPrice").innerHTML = "ChatGPT hinta: " + ChatGPTPrice;
    document.getElementById("PrestigeLevel").innerHTML = "Prestige taso: " + PrestigeLevel;

    if (document.getElementById("resetconfirm").checked) {
        document.getElementById("ResetButton").style.backgroundColor = "red";
    } else {
        document.getElementById("ResetButton").style.backgroundColor = "darkred";
    }
}, 100);

//Save player's data to cookies
setInterval(function () {
    //Stats  
    setCookie("Money", Money, 365);
    setCookie("TotalClicks", TotalClicks, 365);
    setCookie("MoneyPerClick", MoneyPerClick, 365);
    setCookie("MoneyPerSecond", MoneyPerSecond, 365);
    setCookie("MoneyMultiplier", MoneyMultiplier, 365);
    setCookie("CriticalClickChance", CriticalClickChance, 365);
    setCookie("PrestigeLevel", PrestigeLevel, 365);

    //UpgradePrices (Only the one's that can be bought multiple times)
    setCookie("MoneyPerClickPrice", MoneyPerClickPrice, 365);
    setCookie("MoneyPerSecondPrice", MoneyPerSecondPrice, 365);
    setCookie("MoneyMultiplierPrice", MoneyMultiplierPrice, 365);
    setCookie("CriticalClickPrice", CriticalClickPrice, 365);
    setCookie("PrestigePrice", PrestigePrice, 365);

    //Misc (One time upgrades, etc)
    setCookie("MAOLBought", MAOLBought, 365);
    setCookie("NspireBought", NspireBought, 365);
    setCookie("ChatGPTBought", ChatGPTBought, 365);
    CheckMoney();

}, 1000);    


//Just a quick and dirty way to check if the player has cheated in money and punish them for it
function CheckMoney() {
    const lastMoney = Money;
    const possibleMoney = (lastMoney + MoneyPerClick * MoneyMultiplier * KahviMultiplier * (ClicksThisSecond + 1) * 5 + (MoneyPerSecond * MoneyMultiplier * PullaMultiplier)) * 4;
    ClicksThisSecond = 0;
    
    setTimeout(function() {
        if (possibleMoney > 0) {
        if (Money > possibleMoney) {
            console.log("Nice try!");
            alert("Jäit kiinni lunttaamisesta! Menetit kaikki opintopisteesi.");
            Money = 0;
        }
    }
    }, 1000);
}

function OpenPatchnotes() {
    if(PatchNotesOpen == 0) {
    fetch('patchnotes.txt')
    .then(response => response.text())
    .then(patchNotes => {
        PatchNotesShow = patchNotes.replace(/\!/g, '<br><br>');
        document.getElementById("PatchnotesBox").style.display = "block";
        document.getElementById("Patchnotes").innerHTML = PatchNotesShow;
        PatchNotesOpen = 1;
    })
    } else {
        PatchNotesOpen = 0;
        document.getElementById("PatchnotesBox").style.display = "none";
    }
}