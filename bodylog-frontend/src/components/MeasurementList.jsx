import { useState } from "react";

export default function MeasurementList({ measurements, oldNumToShow, onDelete, onUpdate }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [numToShow, setNumToShow] = useState(oldNumToShow || 3);

  const sortedMeasurements = [...measurements].sort((a, b) => new Date(b.date) - new Date(a.date));
  const visibleMeasurements = sortedMeasurements.slice(0, numToShow);

  function showMoreMeasurements() {
    setNumToShow((prev) => Math.min(prev + 3, measurements.length));
    console.log("Showing more measurements:", numToShow);
    setEditIndex(null);
  }

  function showLessMeasurements() {
    setNumToShow((prev) => Math.max(prev - 3, oldNumToShow || 3));
    console.log("Showing fewer measurements:", numToShow);
    setEditIndex(null);
  }


  if (measurements.length === 0) {
    return (
    
    <div className="w-full flex-1 mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <p className="text-center text-gray-500 mt-4">Ingen målinger endnu.</p>
    </div>
    );
  }

  return (
    <div className="w-full flex-1 mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Tidligere målinger</h2>
{
  visibleMeasurements.map((m, index) => {
  const isEditing = m.id === editIndex;
console.log("Rendering measurement:", m, "isEditing:", isEditing);
  if (isEditing) {
    return (
      <div key={m.id} className="bg-white p-4 rounded shadow space-y-2">
        <input
          type="date"
          value={editData.date ? editData.date.split('T')[0] : ''}

          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={editData.weight}
          onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
          placeholder="Vægt (kg)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={editData.waist || ''}
          onChange={(e) => setEditData({ ...editData, waist: e.target.value })}
          placeholder="Talje (cm)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={editData.chest || ''}
          onChange={(e) => setEditData({ ...editData, chest: e.target.value })}
          placeholder="Bryst (cm)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={editData.thigh || ''}
          onChange={(e) => setEditData({ ...editData, thigh: e.target.value })}
          placeholder="Lår (cm)"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => {
              onUpdate(m.id, editData);
              setEditIndex(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Gem
          </button>
          <button
            onClick={() => setEditIndex(null)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Annuller
          </button>
        </div>
      </div>
    );
  }
  return (
    <div key={m.id} className="bg-gray-100 p-4 rounded shadow">
      <p><strong>Dato:</strong> {new Date(m.date).toLocaleDateString('da-DK')}</p>
      <p><strong>Vægt:</strong> {m.weight} kg</p>
      {m.waist && <p><strong>Talje:</strong> {m.waist} cm</p>}
      {m.chest && <p><strong>Bryst:</strong> {m.chest} cm</p>}
      {m.thigh && <p><strong>Lår:</strong> {m.thigh} cm</p>}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => {
            const confirmed = window.confirm("Er du sikker på, at du vil slette denne måling?");
            if (confirmed) onDelete(m.id);
          }}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Slet
        </button>

        <button
          onClick={() => {
            setEditIndex(m.id);
            setEditData({ ...m });
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Rediger
        </button>
      </div>
    </div>
  );
})}

{oldNumToShow < numToShow && (
  <div className="text-center mt-4">
    <button
      onClick={showLessMeasurements}
      className="text-sm text-blue-600 hover:underline"
    >
      Vis færre målinger
    </button>
  </div>
)}
{numToShow < measurements.length && (
  <div className="text-center mt-4">
    <button
      onClick={showMoreMeasurements}
      className="text-sm text-blue-600 hover:underline"
    >
      Vis flere målinger
    </button>
  </div>
)}
    </div>
  );
}
