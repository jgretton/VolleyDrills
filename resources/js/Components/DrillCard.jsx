import { Link } from "@inertiajs/react";
import React from "react";

export default function DrillCard({ drill }) {
    const { title, small_description, duration, category } = drill;

    return (
        <div
            // href={`dashboard/drills/${drill.id}`}
            className=" bg-white px-4 py-6 max-w-md w-full block rounded-lg shadow-sm h-full"
        >
            <span className="bg-gray-100 px-3 py-1.5 rounded-md">
                {category.name}
            </span>

            <h2 className="capitalize font-semibold text-xl mt-4">{title}</h2>
            <div className="mt-2 inline-flex items-center gap-2">
                <p className="font-light text-sm">{duration} mins</p>-
            </div>
            <p className="my-4">{small_description}</p>
            <Link
                className="hover:underline mt-4"
                href={route("dashboard.drills.show", drill.id)}
            >
                View Drill
            </Link>
        </div>
    );
}
