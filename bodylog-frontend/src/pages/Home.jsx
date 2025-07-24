import { useState, useEffect } from "react";
import MeasurementForm from "../components/MeasurementForm";
import MeasurementList from "../components/MeasurementList";
import WeightChart from "../components/WeightChart";
import GoalTracker from "../components/GoalTracker";

function Home() {
  const [measurements, setMeasurements] = useState(() => {
  // helper til at generere datoer
  const generateDate = (weeksAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - weeksAgo * 7);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  // fast liste med 5 målinger
  return [
    {
      id: 1,
      date: generateDate(0),
      weight: 80.5,
      waist: 90.0,
      chest: 100.0,
      thigh: 60.0,
    },
    {
      id: 2,
      date: generateDate(1),
      weight: 81.0,
      waist: 91.0,
      chest: 101.0,
      thigh: 61.0,
    },
    {
      id: 3,
      date: generateDate(2),
      weight: 81.8,
      waist: 92.0,
      chest: 101.5,
      thigh: 61.5,
    },
    {
      id: 4,
      date: generateDate(3),
      weight: 82.2,
      waist: 93.0,
      chest: 102.0,
      thigh: 62.0,
    },
    {
      id: 5,
      date: generateDate(4),
      weight: 83.0,
      waist: 94.0,
      chest: 103.0,
      thigh: 63.0,
    },
  ];
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

export default Home;
