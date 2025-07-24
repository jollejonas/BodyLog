import { useState, useEffect } from "react";

export default function GoalTracker({ measurements }) {
    const [goalWeight, setGoalWeight] = useState(() => {
        const saved = localStorage.getItem("bodylog-goalWeight");
        return saved ? parseFloat(saved) : "";
    });

    const [input, setInput] = useState(goalWeight);

    useEffect(() => {
        if(goalWeight) {
            localStorage.setItem("bodylog-goalWeight", goalWeight);
        }
    }, [goalWeight]);

    const latest = measurements[0];
    const start = measurements[measurements.length - 1];

    const hasData = measurements.length > 0;

    const currentWeight = hasData ? latest.weight : null;
    const startWeight = hasData ? start.weight : null;

    const weightChange = hasData ? currentWeight - startWeight : null;
    const absChange = Math.abs(weightChange).toFixed(1);

    const changeText = hasData
        ? weightChange < 0
            ? `Du har tabt ${absChange} kg siden ${start.date}. 💪`
            : weightChange > 0
            ? `Du har taget ${absChange} kg på siden ${start.date}. ⚖️`
            : `Din vægt er uændret siden ${start.date}. 😊`
        : "";

    const progress = goalWeight && hasData
        ? Math.max(
            0,
            Math.min(
                100,
                ((startWeight - currentWeight) / (startWeight - goalWeight)) * 100
            )
        )
        : 0;

        let progressColor = "bg-red-500";
        if (progress > 70) progressColor = "bg-green-500";
        else if (progress > 40) progressColor = "bg-yellow-500";
        else if (progress > 0) progressColor = "bg-orange-500";

        const progressMessage =
            progress >= 100
                ? "Mål opnået! 🎉"
            : progress >= 70
                ? "Fantastisk fremgang! Keep going! 🚀"
            : progress >= 40
                ? "God fremgang! Du er på rette vej! 👍"
            : progress > 0
                ? "Du er i gang! Fortsæt det gode arbejde! 💪"
            : "";

        return (
            <div className="w-full flex-1 mx-auto bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Vægtmål</h2>
                
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Indtast målvægt (kg)"
                    />
                    <button
                        onClick={() => setGoalWeight(parseFloat(input))}
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Gem
                    </button>
                </div>

                {goalWeight &&  hasData && (
                    <div className="space-y-1">
                        <p>
                            Start: <strong>{startWeight} kg</strong> → Nu:{" "}
                            <strong>{currentWeight} kg</strong>
                        </p>
                        <p>
                            Mål: <strong>{goalWeight} kg</strong>
                        </p>
                        <p className="text-sm text-gray-600 italic">{changeText}</p>
                        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
                            <div
                                className={`h-full ${progressColor} transition-all`}
                                style={{ width: `${progress}%` }}
                            >
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            {progress.toFixed(1)}% opnået {progressMessage && `– ${progressMessage}`}
                        </p>
                        </div>
                )}
            </div>
        );
    }