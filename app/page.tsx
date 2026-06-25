import Link from "next/link";
import { getAllRecs } from "@/lib/recc-action";
import { ThumbsUp, MessageCircle } from "lucide-react";

export default async function Home() {
  const reccs = await getAllRecs();

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[40vw] flex flex-col border-x border-zinc-800">

        <div className="w-full flex flex-col">
          {reccs.length === 0 ? (
            <p className="px-4 py-8 text-center text-zinc-400">
              No recommendations yet.
            </p>
          ) : (
            reccs.map((recc) => (
              <article
                key={recc.id}
                className="border border-zinc-800 rounded-xl px-4 py-4 m-3"
              >
                {/* Header: username → recommended a [type link] */}
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
                        className="text-white underline underline-offset-2"
                      >
                        {recc.type}
                      </Link>
                    ) : (
                      <span className="text-white">{recc.type}</span>
                    )}
                  </span>
                </div>

                {/* Body */}
                <h2 className="text-base font-semibold text-white">
                  {recc.title}
                </h2>
                {recc.description && (
                  <p className="text-sm text-zinc-400 mt-1">
                    {recc.description}
                  </p>
                )}

                {/* Footer */}
                <div className="mt-4 flex items-center gap-5 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <ThumbsUp size={14} />
                    {recc.likeCount}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} />
                    {recc.commentCount}
                  </span>
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