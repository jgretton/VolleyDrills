import { Link } from "@inertiajs/react";
import React from "react";
import { ClockIcon, TagIcon } from "@heroicons/react/24/outline";

export default function DrillListItem({ drill }) {
    console.log(drill);
    return (
        <li className="max-w-full block  rounded-lg p-6 bg-white">
            <div className="flex-1 flex flex-col">
                <Link
                    href={route("dashboard.drills.show", drill.id)}
                    className="mt-3 text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600 hover:underline"
                >
                    {drill.title}
                </Link>
                <div className="divide-x-2 divide-gray-300 mt-3 line">
                    <p className="text-sm text-gray-700 inline-flex items-center gap-1 pr-2">
                        <ClockIcon className="size-4 text-black" />-{" "}
                        {drill.duration} mins
                    </p>
                    {drill.category && (
                        <p className="text-sm text-gray-700 inline-flex items-center gap-1 pl-2">
                            <TagIcon className="size-4 text-black" />-{" "}
                            {drill.category?.name}
                        </p>
                    )}
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {drill.small_description}
                </p>
            </div>
        </li>
    );
}
