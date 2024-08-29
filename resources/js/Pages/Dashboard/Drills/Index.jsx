import DrillCard from "@/Components/DrillCard";
import DrillListItem from "@/Components/DrillListItem";
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
                    Drills
                </h2>
            }
        >
            <Head title="Your Drills" />
            <div className="max-w-7xl mx-auto p-10">
                <Link href={route("dashboard.drills.create")} className="">
                    + Add new drill
                </Link>
                <ul className="grid grid-cols-1 rounded-md p-6  mt-10 bg-white divide-y">
                    {drills.data.map((drill, index) => (
                        <DrillListItem key={index} drill={drill} />
                    ))}
                </ul>

                <div className="flex items-center w-full justify-center mt-20">
                    <Pagination links={drills.links} />
                </div>
            </div>
        </Authenticated>
    );
}
