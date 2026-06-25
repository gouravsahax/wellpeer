import { getProfile } from "@/lib/user-action";
import EditProfileForm from "./EditProfileForm";

const page = async () => {
  const data = await getProfile();

  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
      <EditProfileForm user={data} />
    </div>
  );
};

export default page;
