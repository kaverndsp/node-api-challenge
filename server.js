const express = require("express");
const actionsRoutes = require("./actions/actionRouter");
const projectsRoutes = require("./projects/projectRouter");

const server = express();
server.use(express.json());

server.use("/api/actions", actionsRoutes);
server.use("/api/projects", projectsRoutes);

server.get('/', (req, res) => {
    res.send(`<h1>First Get to test if server is functional</h1>`)
 });


module.exports = server;