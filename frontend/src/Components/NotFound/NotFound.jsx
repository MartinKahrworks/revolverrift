import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-800/25 blur-3xl" />
        <div className="absolute left-[20%] top-[25%] h-56 w-56 rounded-full bg-orange-500/15 blur-2xl" />
        <div className="absolute right-[20%] bottom-[20%] h-64 w-64 rounded-full bg-amber-400/15 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-black/70 p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-sm md:p-12">
        <p className="mb-2 text-xs uppercase tracking-[0.45em] text-red-400/90">Transmission Lost</p>
        <h1 className="mb-3 text-6xl font-extrabold leading-none text-white md:text-8xl">404</h1>
        <h2 className="mb-4 text-xl font-semibold text-white md:text-3xl">This realm does not exist.</h2>
        <p className="mx-auto mb-2 max-w-xl text-sm text-white/75 md:text-base">
          The path you requested could not be found. It may have moved, expired, or never existed.
        </p>
        <p className="mx-auto mb-8 max-w-xl break-all text-xs text-white/45 md:text-sm">
          Requested route: {location.pathname}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-w-40 items-center justify-center rounded-md border border-red-500/60 bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Return Home
          </Link>
          <Link
            to="/news"
            className="inline-flex min-w-40 items-center justify-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Read News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
