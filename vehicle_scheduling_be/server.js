require("dotenv").config();

const express = require("express");
const Log = require("./logger");

const app = express();
app.use(express.json());

app.listen(3000, async () => {
    console.log("Server running on port 3000");

    await Log(
        "backend",
        "info",
        "service",
        "Server started successfully"
    );
});
async function fetchVehicles() {

    await Log(
        "backend",
        "info",
        "service",
        "Fetching vehicles"
    );

    const response = await fetch(
        "http://4.224.186.213/evaluation-service/vehicles",
        {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`
            }
        }
    );

    const data = await response.json();

    return data;
}
async function fetchDepots() {

    await Log(
        "backend",
        "info",
        "service",
        "Fetching depots"
    );

    const response = await fetch(
        "http://4.224.186.213/evaluation-service/depots",
        {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`
            }
        }
    );

    const data = await response.json();

    return data;
}

app.get("/depots", async (req, res) => {

    try {

        const depots = await fetchDepots();

        res.json(depots);

    } catch(err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        res.status(500).json({
            error: err.message
        });
    }
});


app.get("/vehicles", async (req, res) => {

    try {

        const vehicles = await fetchVehicles();

        res.json(vehicles);

    } catch(err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        res.status(500).json({
            error: err.message
        });
    }
});