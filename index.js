const config = require('./config.json');

const { Client } = require('discord.js');
const bot = new Client({ intents: config.intents });
const { WillClient } = require('./src/test');
const wc = new WillClient({ client: bot, prefix: config.prefix });

const { Soup } = require('stews');

let compiles = Soup.from(config.compile);

compiles = compiles.map( (call, dir) => {
	return wc.compile(call, dir);
});

let stuff = Soup.from({ wc, bot });
let exp = stuff.merge(compiles);

module.exports = exp;
if (config.plugins && Soup.from(config.plugins).length > 0) {
	Soup.from(config.plugins).forEach( (call, dir) => {
		wc.addon(call, dir);
	});
}
config.build.forEach( (dir) => {
	wc.build(dir);
});
	

bot.login(config.token);
