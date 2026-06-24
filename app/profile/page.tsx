import { SignOut } from "@/lib/auth-action";
import { getProfile } from "@/lib/user-action";

const page = async () => {
  const data = await getProfile();


  return (
    <div className="px-4 md:px-8 py-4 flex flex-col items-center mt-8 gap-4">
      <div className="flex gap-2">
        <h1>Name : </h1>
        <h2>{data?.name}</h2>
      </div>

      <div className="flex gap-2">
        <h1>Email : </h1>
        <h2>{data?.email}</h2>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2">
          <h1>Following : </h1>
          <h2>{data?.followingCount}</h2>
        </div>
        <div className="flex gap-2">
          <h1>Followers : </h1>
          <h2>{data?.followerCount}</h2>
        </div>
      </div>

      <div className="flex gap-2">
        <h1>Number of reccomendations : </h1>
        <h2>{data?.reccCount}</h2>
      </div>

      <form action={SignOut}>
        <button className="cursor-pointer px-2 py-1 border-1 border-white hover:bg-white hover:text-black rounded-sm text-md mt-4" type="submit">SignOut</button>
      </form>
    </div>
  )
}

export default page
