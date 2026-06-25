require("dotenv").config();

const express = require("express");
const Log = require("./logger");
const knapsack = require("./knapsack");

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

app.get("/vehicle-management-service", async (req, res) => {

    try {

        await Log(
            "backend",
            "info",
            "route",
            "Schedule generation started"
        );

        const vehiclesData = await fetchVehicles();
        const depotsData = await fetchDepots();

        const depots = depotsData.depots;
        const vehicles = vehiclesData.vehicles;

        const ans = [];

        for (const depot of depots) {

            const schedule = knapsack(
                vehicles,
                depot.MechanicHours
            );

            ans.push({
                depotId: depot.ID,
                mechanicHours: depot.MechanicHours,
                totalImpact: schedule.totalImpact,
                totalDuration: schedule.totalDuration,
                selectedTasks: schedule.selectedTasks
            });

            await Log(
                "backend",
                "info",
                "repository",
                `Depot ${depot.ID} completed`
            );
        }

        res.json(ans);

    } catch (err) {

        await Log(
            "backend",
            "error",
            "handler",
            err.message
        );

        res.status(500).json({
            message: err.message
        });
    }
});