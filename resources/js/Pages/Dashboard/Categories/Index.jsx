import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, categories }) {
    console.log(categories);
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
                <div className="px-6 py-10 bg-white rounded-md">
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>{category.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Authenticated>
    );
}
