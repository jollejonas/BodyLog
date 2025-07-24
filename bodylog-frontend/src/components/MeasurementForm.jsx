import { useState } from "react";

export default function MeasurementForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    waist: "",
    chest: "",
    thigh: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(formData); // send data videre
    setFormData({ ...formData, weight: "", waist: "", chest: "", thigh: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex-1 mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Ny måling</h2>

      <div>
        <label className="block text-sm font-medium">Dato</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange}
          className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Vægt (kg)</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleChange}
          className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Talje (cm)</label>
        <input type="number" name="waist" value={formData.waist} onChange={handleChange}
          className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Bryst (cm)</label>
        <input type="number" name="chest" value={formData.chest} onChange={handleChange}
          className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Lår (cm)</label>
        <input type="number" name="thigh" value={formData.thigh} onChange={handleChange}
          className="w-full border p-2 rounded" />
      </div>

      <button type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Gem måling
      </button>
    </form>
  );
}
