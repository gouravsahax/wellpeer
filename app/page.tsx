import Link from "next/link";
import { getAllRecs } from "@/lib/recc-action";
import ReccImage from "./components/ReccImage";
import LikeButton from "./components/LikeButton";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Feed | PeerProducts",
  description: "Browse genuine product recommendations from the PeerProducts community.",
};

function ReccCard({ recc }: { recc: any }) {
  return (
    <article
      key={recc.id}
      className="border border-zinc-800 rounded-xl px-4 py-4 bg-zinc-950/40 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <span className="text-white font-medium">
          {recc.user.name ?? "Unknown"}
        </span>
        <span>→</span>
        <span>
          recommended a{" "}
          {recc.url ? (
            <Link
              href={recc.url}
              target="_blank"
              className="text-blue-300 underline underline-offset-2"
            >
              {recc.type}
            </Link>
          ) : (
            <span className="text-white">{recc.type}</span>
          )}
        </span>
      </div>

      <h2 className="text-base font-semibold text-white">
        {recc.title}
      </h2>
      {recc.description && (
        <p className="text-sm text-zinc-400 mt-1">
          {recc.description}
        </p>
      )}

      {recc.imageUrl && (
        <ReccImage src={recc.imageUrl} alt={recc.title} />
      )}

      <div className="mt-2 flex items-center gap-5 text-sm text-zinc-400">
        <LikeButton
          reccId={recc.id}
          initialLikeCount={recc.likeCount}
          initialHasLiked={Boolean(recc.likes && recc.likes.length > 0)}
        />
        <span className="ml-auto">
          {new Date(recc.createdAt).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";

  if (!params.page) {
    redirect(`/?page=1${search ? `&search=${encodeURIComponent(search)}` : ""}`);
  }

  const currentPage = parseInt(params.page || "1", 10);
  const { reccs, totalPages } = await getAllRecs(currentPage, 8, search);

  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";

  // Split into left and right columns for desktop masonry
  const col1 = reccs.filter((_, idx) => idx % 2 === 0);
  const col2 = reccs.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[85vw] xl:w-[80vw] flex flex-col border-x border-zinc-800">

        {/* Search Bar */}
        <div className="w-full p-4 border-b border-zinc-900">
          <form action="/" method="GET" className="flex gap-2 max-w-md mx-auto">
            <input type="hidden" name="page" value="1" />
            <input
              type="text"
              name="search"
              placeholder="Search by type (e.g. Book, Sunscreen, Chair)..."
              defaultValue={search}
              className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-sm text-sm focus:outline-none focus:border-zinc-700 text-white placeholder-zinc-600"
            />
            {search && (
              <Link
                href="/?page=1"
                className="px-3 py-2 border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 rounded-sm text-sm flex items-center justify-center transition-colors"
              >
                Clear
              </Link>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-sm text-sm font-medium transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {reccs.length === 0 ? (
          <div className="w-full p-8 text-center text-zinc-400">
            No recommendations found.
          </div>
        ) : (
          <>
            {/* Mobile Layout (Single flat column) */}
            <div className="w-full flex flex-col gap-4 p-4 md:hidden">
              {reccs.map((recc) => (
                <ReccCard key={recc.id} recc={recc} />
              ))}
            </div>

            {/* Desktop Layout (Masonry 2 columns) */}
            <div className="w-full hidden md:grid grid-cols-2 gap-4 p-4 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {col1.map((recc) => (
                  <ReccCard key={recc.id} recc={recc} />
                ))}
              </div>
              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {col2.map((recc) => (
                  <ReccCard key={recc.id} recc={recc} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-6 border-t border-zinc-900 mt-auto bg-zinc-950/20">
            {currentPage > 1 ? (
              <Link
                href={`/?page=${currentPage - 1}${searchParam}`}
                className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 border border-zinc-900 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Previous
              </span>
            )}

            <span className="text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/?page=${currentPage + 1}${searchParam}`}
                className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 border border-zinc-900 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}