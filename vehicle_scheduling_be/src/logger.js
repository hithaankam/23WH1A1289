require("dotenv").config();

const TOKEN = process.env.TOKEN;

async function Log(stack, level, pkg, message) {

    try {

        const response = await fetch(
            "http://4.224.186.213/evaluation-service/logs",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`
                },

                body: JSON.stringify({
                    stack,
                    level,
                    package: pkg,
                    message
                })
            }
        );

        const data = await response.json();

        console.log("LOG RESPONSE:", data);

        return data;

    } catch (err) {

        console.error("Logging failed:", err.message);
    }
}

module.exports = Log;