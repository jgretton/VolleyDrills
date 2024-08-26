import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, drills }) {
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Your Drills
                </h2>
            }
        >
            <Head title="Your Drills" />

            <div className="max-w-7xl mx-auto p-10">
                <ul className="flex flex-col bg-white rounded-md p-6 gap-10">
                    {drills.map((drill, index) => (
                        <Link href="" key={index} className="hover:underline">
                            {drill.title}
                        </Link>
                    ))}
                </ul>
            </div>
        </Authenticated>
    );
}
