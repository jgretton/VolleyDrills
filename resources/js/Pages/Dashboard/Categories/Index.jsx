import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage, useRemember } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Index({ auth, categories }) {
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);
    const { flash } = usePage().props;

    const {
        data,
        setData,
        processing,
        post,
        reset,
        errors,
        clearErrors,
        patch,
    } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("categories.store"), {
            onSuccess: () => {
                reset();
                setCreating(false);
            },
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        patch(route("categories.update", editing), {
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />
            {flash.success && (
                <div className="max-w-7xl mx-auto p-3 bg-green-200 text-green-800">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="max-w-7xl mx-auto p-3 bg-red-200 text-red-800">
                    {flash.error}
                </div>
            )}
            <div className="max-w-7xl mx-auto py-12 px-6">
                <button
                    onClick={() => {
                        setCreating((prevState) => !prevState);
                        setEditing(null);
                        reset();
                        clearErrors();
                    }}
                >
                    + Add new category
                </button>
                <div className="px-6 mt-10 py-10 bg-white rounded-md">
                    <table className="table-fixed w-full space-y-2">
                        <thead className="text-left">
                            <tr>
                                <th scope="col"> Category</th>
                                <th scope="col"> # of drills</th>
                                <th scope="col"> Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {categories.map((category, index) => (
                                <tr key={index} className="">
                                    {editing === category.id ? (
                                        <td>
                                            <form onSubmit={submitUpdate}>
                                                <label className="sr-only">
                                                    edit
                                                </label>
                                                <div className="inline-flex gap-3">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        value={data.name}
                                                        onChange={(e) => {
                                                            setData({
                                                                name: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                                    />
                                                    <PrimaryButton>
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </form>
                                        </td>
                                    ) : (
                                        <td>{category.name}</td>
                                    )}
                                    <td className="">
                                        {category.drills_count}
                                    </td>
                                    <td className="space-x-3">
                                        {editing === category.id ? (
                                            <SecondaryButton
                                                onClick={() => {
                                                    setEditing(null);
                                                    reset();
                                                    clearErrors();
                                                }}
                                            >
                                                Cancel
                                            </SecondaryButton>
                                        ) : (
                                            <SecondaryButton
                                                onClick={() => {
                                                    setCreating(
                                                        (prevState) => false
                                                    );
                                                    setEditing(category.id);
                                                    setData({
                                                        name: category.name,
                                                    });
                                                }}
                                            >
                                                Edit
                                            </SecondaryButton>
                                        )}
                                        {/* <DangerButton
                                            onClick={() =>
                                                route(
                                                    "categories.destroy",
                                                    category.id
                                                )
                                            }
                                        >
                                            Delete
                                        </DangerButton> */}
                                        <Link
                                            className="rounded-md bg-red-100 text-red-700 border-red-600 border-2 px-3 mx-2 py-1.5"
                                            href={route(
                                                "categories.destroy",
                                                category.id
                                            )}
                                            as="button"
                                            method="delete"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {creating ? (
                        <form onSubmit={submit} className="">
                            <label>New Category</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                            <div className="space-x-2 mt-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                                <SecondaryButton
                                    disabled={processing}
                                    onClick={() => {
                                        setCreating((prevState) => !prevState);
                                        reset();
                                        clearErrors();
                                    }}
                                >
                                    Cancel
                                </SecondaryButton>
                            </div>
                        </form>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
