import mongoose from "mongoose";
import fs from "fs";

const healthCheck = async (req, res) => {
    try {

        const dbState =
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected";

        const uptime = process.uptime();

        const memoryUsage = process.memoryUsage();
        const deployment = JSON.parse(
            fs.readFileSync("./deployment-status.json", "utf8")
        );

        return res.status(200).json({
            success: true,
            deploymentStatus: deployment.deploymentStatus,
            lastDeployment: deployment.lastDeployment,

            backendStatus: "Healthy",

            databaseStatus: dbState,

            uptime,

            nodeVersion: process.version,

            platform: process.platform,

            memory: {
                rss: Math.round(memoryUsage.rss / 1024 / 1024),
                heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
                heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
            },

            timestamp: new Date(),
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            error: "Health check failed",
        });
    }
};

export { healthCheck };