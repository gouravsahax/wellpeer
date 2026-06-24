import { getMyReccs } from "@/lib/recc-action"
import Link from "next/link";

const page = async () => {
  const {reccs, count} = await getMyReccs();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-4 md:px-8 py-4 flex flex-col gap-4 lg:w-[60vw]">
        <div>
          Number of reccomendations : {count}
        </div>
        {reccs.map((recc) => (
          <div key={recc.id} className="border-1 border-zinc-800 px-4 py-2 rounded-sm flex flex-col">
            <h3 className="text-lg uppercase mb-2">{recc.title}</h3>
            <p className="mb-4">{recc.description}</p>
            <Link className="underline mb-4" href={recc.url || "/"}>{recc.type}</Link>
            <div className="flex gap-2 mb-2">
              <button className="cursor-pointer px-2 py-1 border-1 border-zinc-800 hover:bg-zinc-300 hover:text-black rounded-sm text-md">Edit</button>
              <button className="cursor-pointer px-2 py-1 border-1 border-zinc-800 hover:bg-zinc-300 hover:text-black rounded-sm text-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
