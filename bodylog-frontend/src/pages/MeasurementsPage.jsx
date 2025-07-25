import { useEffect, useState } from "react";
import api from "../api/axios";
import MeasurementForm from "../components/MeasurementForm";
import MeasurementList from "../components/MeasurementList";
import WeightChart from "../components/WeightChart";
import GoalTracker from "../components/GoalTracker";

export default function MeasurementsPage() {
    const [measurements, setMeasurements] = useState([]);
    const [goalWeight, setGoalWeight] = useState(null);

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get("/measurement/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMeasurements(response.data);
            } catch (error) {
                console.error("Error fetching measurements:", error);
            }
        };
        fetchMeasurements();
    }, []);
    
    useEffect(() => {
    const fetchGoalWeight = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get("/user/goalweight", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched goal weight:", response.data);
            setGoalWeight(response.data);
        } catch (error) {
            console.error("Error fetching goal weight:", error);
            return null;
        }
    }
    fetchGoalWeight();
    }, []);
    
    const updateGoalWeight = async (newGoalWeight) => {
        try {
            const token = localStorage.getItem('token');
            await api.put("/user/goalweight", { goalWeight: newGoalWeight }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoalWeight(newGoalWeight);
        } catch (error) {
            console.error("Error updating goal weight:", error);
        }
    }

    async function handleAdd(measurement) {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post("/measurement", measurement, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeasurements([response.data, ...measurements]);
        } catch (error) {
            console.error("Error adding measurement:", error);
        }
    }

    async function handleDelete(index) { 
        const id = measurements[index].id;
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/measurement/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeasurements(measurements.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Error deleting measurement:", error);
        }
    }

    async function handleUpdate(index, updated) {
        const id = measurements[index].id;
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/measurement/${id}`, updated, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const newList = [...measurements];
            newList[index] = response.data;
            setMeasurements(newList);
        } catch (error) {
            console.error("Error updating measurement:", error);
        }
    }

    return (
    <main className="mx-auto mt-10 space-y-10 px-4">
      <div className="w-full bg-white p-6 rounded shadow">
        <WeightChart measurements={measurements} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <MeasurementForm onAdd={handleAdd} />
        <GoalTracker measurements={measurements} goalWeight={goalWeight} onGoalWeightChange={updateGoalWeight} />
        <MeasurementList
          measurements={measurements}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
    );
}
