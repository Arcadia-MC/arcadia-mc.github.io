/*
Configuration
------------------------
If something doesn't work please contact me on discord (Astronawta#0012).
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.webp", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "Arcadia", /*Server name*/
        serverIp: "play.arcadia-mc.eu", /*Server IP (if you want to add online user counter, you must have true the enable-status and enable-query of server.properties)*/
        discordServerID: "684458471516798990" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },

    /*Admin-Team
    ------------
    If you want to create new group, you must add this structure to adminTeamPage:
    <nameOfGroup>: [
        {
            inGameName: "Astronavta",
            rank: "Owner",
            skinUrlOrPathToFile: "",
            rankColor: ""
        },
    ]
    then you must add this group with same name to atGroupsDefaultColors and set the color you want for the group.
    You can also set a special color for a specific user, just put it in the rankColor of that user.

    All skins for original players are generate automaticaly. If you want to add skins to warez players, yout must add url for skin to skinUrlOrPathToFile
        {
            inGameName: "Astronavta",  <--- In-Game name
            rank: "Owner",  <-- rank
            skinUrlOrPathToFile: "",  <-- url or file path for skin image for warez players (if you have original minecraft leave it be empty)
            rankColor: "rgba(255, 3, 3, 1)"  <-- special rank color
        },

    If you want to change skin type replace userSKinTypeInAdminTeam with something you want from array in comments
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        admins: "rgba(255, 124, 124, 0.5)",
        staff: "rgba(124, 255, 124, 0.5)",

    },
    adminTeamPage: {
        admins: [
            {
                inGameName: "Neplex",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
            {
                inGameName: "EpioneChlorys",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            }
        ],
        
        staff: [
            {
                inGameName: "Aela__",
                rank: "Gardienne",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(3, 3, 255, 1)"
            },
            {
                inGameName: "Zoryynn",
                rank: "Gardien",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(3, 3, 255, 1)"
            },
            {
                inGameName: "Usapii",
                rank: "Historien",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ]
    },

    /*
    Contact form
    ------------
    To activate, you need to send the first email via the contact form and confirm it in the email.
    Emails are sent via https://formsubmit.co/
    */
    contactPage: {
        email: "arcadia@bitbaker.fr"
    }
}

/*If you want to change website color go to /css/global.css and in :root {} is a color pallete (don't change names of variables, change only values)*/
















/*If you want everything to work as it should and you don't understand what is written here, don't touch it :D*/


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "0";
        else return (await data.presence_count);
    } catch (e) {
        return "0";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "0";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getSkinByUuid = async (username) => {
    try {
        const uuid = await getUuidByUsername(username) || 'ec561538f3fd461daff5086b22154bce';
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${uuid}`;

        return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
    }
}

/*IP copy only works if you have HTTPS on your website*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;

        const [discordUsers, minecraftPlayers] = await Promise.all([
            getDiscordOnlineUsers(),
            getMinecraftOnlinePlayer()
        ]);

        discordOnlineUsers.value = discordUsers;
        discordOnlineUsers.innerHTML = discordUsers;

        minecraftOnlinePlayers.value = minecraftPlayers;
        minecraftOnlinePlayers.innerHTML = minecraftPlayers;
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        await Promise.all(Object.entries(config.adminTeamPage).map(async ([team, users]) => {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            const groupUsers = document.querySelector(`.${team} .users`);
            await Promise.all(config.adminTeamPage[team].map(async (user) => {
                const userDiv = document.createElement("div");
                userDiv.classList.add("user");
                userDiv.setAttribute("itemscope", "");
                userDiv.setAttribute("itemtype", "https://schema.org/Person");

                const userSkin = user.skinUrlOrPathToFile || await getSkinByUuid(user.inGameName);
                const rankColor = user.rankColor || config.atGroupsDefaultColors[team];

                userDiv.innerHTML = `
                    <img src="${userSkin}" alt="${user.inGameName}" loading="lazy" itemprop="image">
                    <h5 class="name" itemprop="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}" itemprop="jobTitle">${user.rank}</p>
                `;

                groupUsers.appendChild(userDiv);
            }));
        }));
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();