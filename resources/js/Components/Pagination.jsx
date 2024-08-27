import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
    if (links.length > 3) {
        return (
            <ul className="flex flex-row items-center gap-2">
                {links.map((link, index) => {
                    let isNull;
                    if (link.url === null) {
                        isNull = true;
                    } else isNull = false;

                    return (
                        <li key={index}>
                            <Link
                                href={link.url}
                                as="button"
                                disabled={isNull}
                                className={` rounded-md px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                                    link.active ? "bg-blue-100" : "bg-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    } else return null;
}
