import { useEffect, useState } from "react";
import api from "../api/axios";
import MeasurementForm from "../components/MeasurementForm";
import MeasurementList from "../components/MeasurementList";
import WeightChart from "../components/WeightChart";
import GoalTracker from "../components/GoalTracker";
import { useAuth } from "../contexts/AuthContext";

export default function MeasurementsPage() {
    const [measurements, setMeasurements] = useState([]);
    const [goalWeight, setGoalWeight] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                const response = await api.get("/Measurement/my", {
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
            await api.post("/measurement", measurement, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeasurements([measurement, ...measurements]);
        } catch (error) {
            console.error("Error adding measurement:", error);
        }
    }

    async function handleDelete(id) { 
        try {
            await api.delete(`/measurement/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeasurements((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Error deleting measurement:", error);
        }
    }

    async function handleUpdate(id, updated) {
        try {
            const response = await api.put(`/measurement/${id}`, updated, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const newList = [...measurements];
            const index = newList.findIndex((m) => m.id === id);
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
          oldNumToShow={3}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
    );
}
