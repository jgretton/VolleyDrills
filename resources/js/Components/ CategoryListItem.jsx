import React, { useState } from "react";
import SecondaryButton from "./SecondaryButton";
import { Link, useForm } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";

export default function CategoryListItem({ category }) {
    const [editing, setEditing] = useState(false);
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
        patch(route("categories.update", editing), {
            onSuccess: () => {
                reset();
                setEditing(null);
            },
        });
    };
    return (
        <div className="max-w-full block bg-gray-50 hover:bg-gray-100 rounded-lg p-6">
            <form
                onSubmit={submit}
                className="flex items-center justify-between"
            >
                <div className="">
                    <div className=" text-lg">
                        {editing === category.id ? (
                            <div className="inline-flex gap-3">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={data.name}
                                    onChange={(e) => {
                                        setData({
                                            name: e.target.value,
                                        });
                                    }}
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <PrimaryButton>Save</PrimaryButton>
                            </div>
                        ) : (
                            <p>{category.name}</p>
                        )}
                    </div>
                    <p className="text-base font-light">
                        {category.drills_count}
                        {category.drills_count === 1 ? " drill" : " drills"}
                    </p>
                </div>
                <div className="space-x-3">
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
                                setEditing(category.id);
                                setData({
                                    name: category.name,
                                });
                            }}
                        >
                            Edit
                        </SecondaryButton>
                    )}

                    <Link
                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        href={route("categories.destroy", category.id)}
                        as="button"
                        method="delete"
                    >
                        Delete
                    </Link>
                </div>
            </form>
        </div>
    );
}
