const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.magenta('[ ❕ WARNING] » ')  + data );
			break;
		case "error":
			console.log(chalk.red('[ ❗ ERROR ] » ') + data );
			break;
		default:
			console.log(chalk.blue(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.magenta('[𝐖𝐀𝐑𝐍𝐈𝐍𝐆] ') + data );
			break;
		case "error":
			console.log(chalk.red('[𝐄𝐑𝐑𝐎𝐑] ') + chalk.red(data) + chalk.bold.hex("1000FF")("\n✦────────────────────────────────────────✦" ));
			break;
		default:
			console.log(chalk.blue('[𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋]  ') + data );
			break;
	}
}