import DrillCard from "@/Components/DrillCard";
import DrillListItem from "@/Components/DrillListItem";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, categories }) {
    // console.log(categories);
    return (
        <div className="bg-gray-50">
            <Head title="Home" />
            <div className=" max-w-7xl mx-auto px-4">
                <header className="grid grid-cols-2 items-center gap-2 py-10">
                    <Link
                        href="/"
                        className="text-2xl text-gray-700 font-light hover:underline"
                    >
                        VD
                    </Link>
                    <nav className="-mx-3 flex flex-1 justify-end ">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] :text-white :hover:text-white/80 :focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] :text-white :hover:text-white/80 :focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] :text-white :hover:text-white/80 :focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mt-6">
                    <div className="">
                        <h1 className="text-center text-4xl font-light">
                            VolleyDrills
                        </h1>
                        <p className="text-center mt-4 font-light tracking-wide text-gray-700">
                            Your saviour to finding drills and planning your
                            volleyball training session.
                        </p>
                    </div>

                    {categories.map((category, index) => (
                        <div className="py-10" key={index}>
                            <div className="inline-flex items-center justify-between w-full">
                                <h2 className="text-2xl font-light">
                                    {category.name}
                                </h2>
                                <Link href="/" className="hover:underline">
                                    View more
                                </Link>
                            </div>
                            <div className="flex flex-row gap-3 mt-4 w-full">
                                {category.drills.map((drill, index) => {
                                    return (
                                        <DrillListItem
                                            drill={drill}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </main>

                <footer className="py-16 text-center text-sm text-black :text-white/70">
                    <a href="https://www.joshgretton.co.uk">Josh Gretton</a>
                </footer>
            </div>
        </div>
    );
}
