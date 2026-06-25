import Link from "next/link";
import { getAllRecs } from "@/lib/recc-action";
import ReccImage from "./components/ReccImage";
import LikeButton from "./components/LikeButton";

export default async function Home() {
  const reccs = await getAllRecs();

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[85vw] xl:w-[80vw] flex flex-col border-x border-zinc-800">

        <div className="w-full columns-1 md:columns-2 gap-4 p-4">
          {reccs.length === 0 ? (
            <p className="px-4 py-8 text-center text-zinc-400">
              No recommendations yet.
            </p>
          ) : (
            reccs.map((recc) => (
              <article
                key={recc.id}
                className="border border-zinc-800 rounded-xl px-4 py-4 mb-4 break-inside-avoid bg-zinc-950/40"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
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

                <div className="mt-4 flex items-center gap-5 text-sm text-zinc-400">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}