import React, { useEffect, useState } from "react";
import axios from "axios";

const SystemHealth = () => {

    const [health, setHealth] = useState(null);

    const fetchHealth = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/health"
            );

            setHealth(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchHealth();

        const interval = setInterval(() => {
            fetchHealth();
        }, 30000);

        return () => clearInterval(interval);

    }, []);

    if (!health) {
        return <div>Loading...</div>;
    }

    return (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-8">
      System Health Dashboard
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Backend Status</h3>
        <p className="text-green-600">
          {health.backendStatus}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Database Status</h3>
        <p className="text-green-600">
          {health.databaseStatus}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Node Version</h3>
        <p>
          {health.nodeVersion}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Platform</h3>
        <p>
          {health.platform}
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Server Uptime</h3>
        <p>
          {Math.floor(health.uptime)} seconds
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow">
  <h3 className="font-bold">Memory Used</h3>
  <p>{health.memory?.heapUsed} MB</p>
</div>

<div className="bg-white p-4 rounded shadow">
  <h3 className="font-bold">Total Heap</h3>
  <p>{health.memory?.heapTotal} MB</p>
</div>
<div className="bg-white p-4 rounded shadow">
  <h3 className="font-bold">Deployment Status</h3>
  <p className="text-green-600">
    {health.deploymentStatus}
  </p>
</div>

<div className="bg-white p-4 rounded shadow">
  <h3 className="font-bold">Last Deployment</h3>
  <p>
    {health.lastDeployment}
  </p>
</div>
      

    </div>
  </div>
);
};

export default SystemHealth;