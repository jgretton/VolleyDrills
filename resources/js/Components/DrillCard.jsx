import { Link } from "@inertiajs/react";
import React from "react";

export default function DrillCard({ drill }) {
    const { title, small_description, duration, category } = drill;

    return (
        <Link
            // href={`dashboard/drills/${drill.id}`}
            href={route("dashboard.drills.show", drill.id)}
            className="group bg-white px-4 py-6 max-w-md w-full block rounded-lg shadow-sm h-full"
        >
            <h2 className="group-hover:underline capitalize font-semibold text-xl">
                {title}
            </h2>
            <div className="mt-2 inline-flex items-center gap-2">
                <p className="font-light text-sm">{duration} mins</p>-
                <span>{category.name}</span>
            </div>
            <p className="mt-4">{small_description}</p>
        </Link>
    );
}
