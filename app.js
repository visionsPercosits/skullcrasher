const express = require("express"),
  app = express(),
  ejs = require("ejs"),
  { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const crossID = "1181343603277180980";
const pedro7ID = "1132067138081919047";
const dznID = "1169435365053038675";

async function getUserActivity(userId) {
  const user = await client.users.fetch(userId, { force: true });

  if (
    user.presence &&
    user.presence.activities &&
    user.presence.activities.length > 0
  ) {
    return { user, activity: user.presence.activities[0] };
  } else {
    return { user, activity: null };
  }
}

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
];

const client = new Client({ intents });

client.on("ready", async () => {
  console.log("[BOT] Iniciado");
  await client.user.setStatus("invisible");
});

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.removeHeader("x-powered-by");
  next();
});

app.post("*", async (req, res) => {
  return res.send("foi mal mano nao vai rolar request aq");
});

app.get("/", async (req, res, next) => {
  const crossData = await getUserActivity(crossID);
  const pedro7Data = await getUserActivity(pedro7ID);
  const dznData = await getUserActivity(dznID);

  const profiles = [
    {
      user: crossData.user,
      activity: crossData.activity,
      instagramLink: "https://www.instagram.com/usoversace",
    },
    {
      user: pedro7Data.user,
      activity: pedro7Data.activity,
      instagramLink: "https://www.instagram.com/capotaviatura",
    },
    {
      user: dznData.user,
      activity: dznData.activity,
      instagramLink: "https://www.instagram.com/souzxa2",
    },
  ];

  res.render("index", { profiles });
});

app.use(function (req, res) {
  res.status(404).render("404");
});


client.login(process.env["TOKEN"]);

app.listen(process.env.PORT, () => {
  console.log("[EXPRESS] Iniciado");
});

setTimeout(() => process.exit(), 600000);
