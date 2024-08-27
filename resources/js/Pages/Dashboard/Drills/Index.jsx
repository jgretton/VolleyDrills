import DrillCard from "@/Components/DrillCard";
import Pagination from "@/Components/Pagination";
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
                <Link href={route("dashboard.drills.create")} className="">
                    + Add new drill
                </Link>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-md p-6 gap-10 mt-10">
                    {drills.data.map((drill, index) => (
                        <li key={index} className="">
                            <DrillCard drill={drill} />
                        </li>
                    ))}
                </ul>

                <div className="flex items-center w-full justify-center mt-20">
                    <Pagination links={drills.links} />
                </div>
            </div>
        </Authenticated>
    );
}
