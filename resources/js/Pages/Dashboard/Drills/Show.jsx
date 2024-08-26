import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function Show({ auth, drill }) {
    console.log(drill);
    return (
        <Authenticated user={auth.user}>
            <p>This is the single drill page</p>
        </Authenticated>
    );
}
