const url = require("url");

const newUrl = new URL(process["argv"][2]);

console.log(`The protocol is ${newUrl.protocol}
The host is ${newUrl.host}
The hostname is ${newUrl.hostname}
The port is ${newUrl.port}
The pathname is ${newUrl.pathname}
The query is ${newUrl.searchParams}`);

newUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
