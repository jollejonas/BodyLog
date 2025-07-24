import { useState, useEffect } from "react";
import MeasurementForm from "./components/MeasurementForm";
import MeasurementList from "./components/MeasurementList";
import WeightChart from "./components/WeightChart";
import GoalTracker from "./components/GoalTracker";

function App() {
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem("bodylog-measurements")
    if(saved) {
      console.log("Loading measurements from localStorage");
      console.log("Saved data:", saved);
      const parsed = JSON.parse(saved);
      return parsed.map((m) => ({
        ...m,
        weight: parseFloat(m.weight),
        waist: m.waist ? parseFloat(m.waist) : null,
        chest: m.chest ? parseFloat(m.chest) : null,
        thigh: m.thigh ? parseFloat(m.thigh) : null,
      }));
    }
    return [];
  });

  useEffect(() => {
    console.log("Saving measurements to localStorage");
    localStorage.setItem("bodylog-measurements", JSON.stringify(measurements));
  }, [measurements]);

  function handleAdd(measurement) {
    setMeasurements([measurement, ...measurements]);
  }

  function handleDelete(index) {
    const updated = [...measurements];
    updated.splice(index, 1);
    setMeasurements(updated);
  }

  function handleDeleteAll() {
    const confirmed = window.confirm("Er du sikker på, at du vil slette alle målinger?");
    if (confirmed){
      console.log("Deleting all measurements");
      setMeasurements([]);
    }
  }

  function handleUpdate(index, updated) {
    const newList = [...measurements];
    newList[index] = {
      ...updated,
      weight: parseFloat(updated.weight),
      waist: updated.waist ? parseFloat(updated.waist) : null,
      chest: updated.chest ? parseFloat(updated.chest) : null,
      thigh: updated.thigh ? parseFloat(updated.thigh) : null,
    };
    setMeasurements(newList);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800">
      <header className="py-8 px-2 text-center bg-white shadow">
        <h1 className="text-3xl font-bold text-gray-800">BodyLog</h1>
        <p className="text-gray-600 mt-2">Hold styr på dine kropsmål og vægt over tid</p>
      </header>

    <main className="mx-auto mt-10 space-y-10 px-4">
      <div className="w-full bg-white p-6 rounded shadow">
        <WeightChart measurements={measurements} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <MeasurementForm onAdd={handleAdd} />
        <GoalTracker measurements={measurements} />
        <MeasurementList measurements={measurements} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>

      {measurements.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleDeleteAll}
            className="text-sm text-red-600 hover:underline"
          >
            Slet alle målinger
          </button>
        </div>
      )}
      </main>
    </div>
  );
}

export default App;
