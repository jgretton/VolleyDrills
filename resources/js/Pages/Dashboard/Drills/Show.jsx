import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Show({ auth, drill }) {
    const { flash } = usePage().props;

    const {
        title,
        small_description,
        description,
        duration,
        equipment,
        objectives,
        created_at,
        updated_at,
        category_id,
        difficulty,
    } = drill;

    const InitialData = {
        title,
        small_description,
        description,
        duration,
        difficulty,
        equipment,
        objectives,
        category_id,
    };

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, processing, reset, errors } = useForm({
        title,
        small_description,
        description,
        duration,
        difficulty,
        equipment,
        objectives,
        category_id,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("drills.update", drill.id), {
            onSuccess: () => setEditing(false),
            onError: (errors) => console.error(errors),
        });
    };
    return (
        <Authenticated user={auth.user}>
            <Head title={title} />
            {flash.success && (
                <div className="max-w-7xl mx-auto p-3 bg-green-200 text-green-800">
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="max-w-7xl mt-10 mx-auto px-6">
                <button
                    className={`rounded-md border-2 px-3 py-1.5 ${
                        editing
                            ? "bg-red-100 border-red-300"
                            : "bg-green-100 border-green-300"
                    }`}
                    type="button"
                    onClick={() => {
                        if (editing) {
                            setData(InitialData);
                        }
                        setEditing((prevState) => !prevState);
                    }}
                >
                    {editing ? "cancel" : "edit"}
                </button>
                {editing && (
                    <button
                        type="submit"
                        className={`rounded-md border-2 px-3 py-1.5 ml-2`}
                    >
                        Update
                    </button>
                )}
                <Link
                    className="rounded-md bg-red-100 text-red-700 border-red-600 border-2 px-3 mx-2 py-1.5"
                    href={route("drills.destroy", drill.id)}
                    as="button"
                    method="delete"
                >
                    Delete
                </Link>

                <div className="w-full p-6 bg-white rounded-md mt-10 flex flex-col gap-3">
                    {editing ? (
                        <div className="">
                            <label className="font-semibold">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <h2 className="font-bold text-2xl">{title}</h2>
                    )}
                    <p>{duration} mins</p>
                    <div className="">
                        <h3 className="font-semibold">
                            Brief overview of the drill
                        </h3>
                        {editing ? (
                            <div className="">
                                <input
                                    type="text"
                                    value={data.small_description}
                                    onChange={(e) =>
                                        setData(
                                            "small_description",
                                            e.target.value
                                        )
                                    }
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.small_description}
                                    className="mt-2"
                                />
                            </div>
                        ) : (
                            <p>{small_description}</p>
                        )}
                    </div>
                    <div className="">
                        <h3 className="font-semibold">Objectives</h3>
                        {editing ? (
                            <div className="">
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
                                            {index == 0 &&
                                            data.objectives.length <=
                                                1 ? null : (
                                                <button
                                                    className="px-3 py-1.5 bg-red-100 rounded-md"
                                                    type="button"
                                                    onClick={() => {
                                                        const newObjectives =
                                                            data.objectives.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            );
                                                        setData(
                                                            "objectives",
                                                            newObjectives
                                                        );
                                                    }}
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
                                <InputError
                                    message={errors.objectives}
                                    className="mt-2"
                                />
                            </div>
                        ) : (
                            <ul className="list-disc pl-6">
                                {objectives.map((objective, index) => (
                                    <li key={index}>{objective}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {editing ? (
                        <div className="">
                            <label>Description</label>
                            <textarea
                                value={data.description}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <p>{description}</p>
                    )}
                </div>
            </form>
        </Authenticated>
    );
}
