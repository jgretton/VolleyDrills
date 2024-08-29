import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Show({ auth, drill, categories, category }) {
    const { flash } = usePage().props;
    dayjs.extend(relativeTime);

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
        min_required_players,
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

            {/* <form onSubmit={submit} className="max-w-7xl mt-10 mx-auto px-6">
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

                    {editing ? (
                        <div className="">
                            <label>Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            >
                                <option value="" disabled hidden>
                                    Select category
                                </option>

                                {categories.map((category, index) => (
                                    <option value={category.id} key={index}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.difficulty}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <p>{category.name}</p>
                    )}
                </div>
            </form> */}

            <div className="max-w-7xl mx-auto px-6 mt-12">
                <Link href={route("dashboard.drills")}>Back</Link>

                <div className="w-full rounded-md  mt-10 flex gap-10">
                    <div className="w-3/4 rounded-lg bg-white shadow-sm p-10">
                        <div className="flex gap-4 flex-col">
                            <h2 className="font-bold text-3xl  capitalize">
                                {title}
                            </h2>
                            <p className="font-light text-gray-700 -mt-2">
                                {small_description}
                            </p>
                            <div className="inline-flex items-center  divide-x mt-4">
                                <div className="pr-6">
                                    <p className="font-semibold">Difficulty</p>
                                    <p className="text-sm">{difficulty}</p>
                                </div>
                                <div className="px-6">
                                    <p className="font-semibold">Duration</p>
                                    <p className="inline-flex items-center gap-1 text-sm">
                                        <ClockIcon className="size-4" />{" "}
                                        {duration}{" "}
                                        {duration === 1 ? " min" : "mins"}
                                    </p>
                                </div>
                                <div className="px-6">
                                    <p className="font-semibold">
                                        Min required players
                                    </p>
                                    <p className="inline-flex items-center gap-1 text-sm text-gray-600">
                                        <UserGroupIcon className="size-4" />{" "}
                                        {min_required_players}
                                    </p>
                                </div>
                            </div>
                            {equipment.length > 1 ? (
                                <div className=" mt-4">
                                    <p className="font-semibold">Equipment</p>
                                    <ul className="list-disc pl-6">
                                        {equipment.map((item, index) => (
                                            <li
                                                className="text-gray-600 leading-6"
                                                key={index}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className=" mt-4">
                                    <p className="font-semibold">Equipment</p>
                                    <p className="inline-flex items-center gap-1 text-gray-600">
                                        No equipment required for this drill
                                    </p>
                                </div>
                            )}
                            <div className="mt-4">
                                <p className="font-semibold">Objectives</p>
                                <small className=" text-sm text-gray-600">
                                    Outlining the objectives of the drill.
                                    Things that the players should be aiming to
                                    achieve.
                                </small>
                                <ul className="list-disc pl-6 mt-1.5">
                                    {objectives.map((objective, index) => (
                                        <li
                                            className="text-gray-600 leading-6"
                                            key={index}
                                        >
                                            {objective}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600">{description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/4 h-fit rounded-lg bg-white p-6 flex gap-5 flex-col shadow-sm max-h-fit">
                        <div className="">
                            <p className="font-semibold">Last Updated:</p>
                            <small className="ml-1 text-sm text-gray-600">
                                {dayjs(updated_at).fromNow()}
                            </small>
                        </div>
                        <div className="">
                            <p className="font-semibold">Created:</p>
                            <small className="ml-1 text-sm text-gray-600">
                                {new Date(created_at).toLocaleString()}
                            </small>
                        </div>

                        <div className="space-x-2 mt-2">
                            <SecondaryButton>Edit</SecondaryButton>
                            <DangerButton>Delete</DangerButton>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
