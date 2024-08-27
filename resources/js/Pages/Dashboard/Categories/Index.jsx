import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index({ auth, categories }) {
    const [creating, setCreating] = useState(false);

    const { data, setData, processing, post, reset, errors, clearErrors } =
        useForm({
            name: "",
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("categories.store"), {
            onSuccess: () => {
                reset();
                setCreating(false);
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

            <div className="max-w-7xl mx-auto py-12 px-6">
                <button onClick={() => setCreating((prevState) => !prevState)}>
                    + Add new category
                </button>
                <div className="px-6 mt-10 py-10 bg-white rounded-md">
                    <ul className="flex flex-col gap-4">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className="flex flex-row max-w-sm items-center "
                            >
                                <p className="pl-4">{category.name}</p>
                            </li>
                        ))}
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
                                            setCreating(
                                                (prevState) => !prevState
                                            );
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
                    </ul>
                </div>
            </div>
        </Authenticated>
    );
}
