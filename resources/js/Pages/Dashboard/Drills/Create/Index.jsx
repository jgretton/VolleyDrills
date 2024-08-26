import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        small_description: "",
        description: "",
        duration: "",
        difficulty: "",
        equipment: [],
        objectives: [""],
        category_id: "1",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("drills.store"), { onSuccess: () => reset() });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Drill
                </h2>
            }
        >
            <Head title="Add new drill" />

            <div className="max-w-7xl mt-10 mx-auto px-6">
                <div className="w-full p-6 bg-white rounded-md mt-10">
                    <form onSubmit={submit} className="grid gap-4">
                        <div className="">
                            <label>Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="">
                            <label>Small Description</label>
                            <input
                                type="text"
                                value={data.small_description}
                                onChange={(e) =>
                                    setData("small_description", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="">
                            <label>Description</label>
                            <textarea
                                value={data.description}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div className="">
                            <label>Duration</label>
                            <input
                                type="number"
                                value={data.duration}
                                onChange={(e) =>
                                    setData("duration", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="">
                            <label>Difficulty</label>
                            <select
                                value={data.difficulty}
                                onChange={(e) =>
                                    setData("difficulty", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            >
                                <option value="" disabled hidden>
                                    Select difficulty
                                </option>

                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">
                                    Intermediate
                                </option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="">
                            <label>Equipment</label>
                            <div className="flex flex-col gap-3">
                                {data.equipment.map((item, index) => (
                                    <div
                                        className="flex flex-row gap-5"
                                        key={index}
                                    >
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const newEquipment = [
                                                    ...data.equipment,
                                                ];
                                                newEquipment[index] =
                                                    e.target.value;
                                                setData(
                                                    "equipment",
                                                    newEquipment
                                                );
                                            }}
                                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        />
                                        <button
                                            className="px-3 py-1.5 bg-red-100 rounded-md"
                                            type="button"
                                            onClick={() =>
                                                data.equipment.splice(index, 1)
                                            }
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-md bg-blue-100 my-2"
                                onClick={() =>
                                    setData("equipment", [
                                        ...data.equipment,
                                        "",
                                    ])
                                }
                            >
                                {data.equipment.length === 0 ? (
                                    <span>Add equipment +</span>
                                ) : (
                                    <span>Add another equipment +</span>
                                )}
                            </button>
                        </div>
                        <div className="">
                            <label>Objectives</label>
                            <div className="flex flex-col gap-3">
                                {data.objectives.map((item, index) => (
                                    <div
                                        className="flex flex-row gap-5"
                                        key={index}
                                    >
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const newObjective = [
                                                    ...data.objectives,
                                                ];
                                                newObjective[index] =
                                                    e.target.value;
                                                setData(
                                                    "objectives",
                                                    newObjective
                                                );
                                            }}
                                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        />
                                        {index == 0 ? null : (
                                            <button
                                                className="px-3 py-1.5 bg-red-100 rounded-md"
                                                type="button"
                                                onClick={() =>
                                                    data.objectives.splice(
                                                        index,
                                                        1
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-md bg-blue-100 my-2"
                                onClick={() =>
                                    setData("objectives", [
                                        ...data.objectives,
                                        "",
                                    ])
                                }
                            >
                                Add another objectives +
                            </button>
                        </div>

                        <InputError message={errors.title} className="mt-2" />
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
