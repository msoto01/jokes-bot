var request = require("request")
const Slackbot = require('slackbots');
const bot = new Slackbot({
  name: "jokes-bot2",
  token: "xoxb-995113115968-1015291159733-yzdzzPqSvvdyGY1ClgqQ7hZq"
})
const getRandomJoke = (callback, user) => {
  return request("https://icanhazdadjoke.com/slack", (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      let jokeJSON = JSON.parse(response.body)
      let joke = jokeJSON.attachments[0].text
      return callback(joke, user)
    }
  })
}
const postMessage = (message, user) => {
  bot.postMessage(user, message, { as_user: true })
}
bot.on("message", msg => {
  switch (msg.type) {
  case "message":
    if (msg.channel[0] === "D" && msg.bot_id === undefined) {
      getRandomJoke(postMessage, msg.user)
    }
    break
  }
  bot.postMessageToGroup('private_group', 'meow!', params);
});

