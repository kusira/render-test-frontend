"use client";

import { useState } from "react";

export default function Home() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [response, setResponse] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://render-test-backend-ddg7.onrender.com/api/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, age: parseInt(age, 10) }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.message);
        } catch (error) {
            console.error("Error:", error);
            setResponse("An error occurred while processing your request.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Next.js + FastAPI</h1>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-4 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border px-4 py-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Submit
                </button>
            </form>
            {response && <p className="mt-4">{response}</p>}
        </div>
    );
}
