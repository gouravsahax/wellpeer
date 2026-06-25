import { createRecc } from "@/lib/recc-action"
import SubmitButton from "../components/SubmitButton"

const page = () => {
  return (
    <div className='w-screen h-full flex justify-center items-center'>
        <form action={createRecc} encType="multipart/form-data" className="px-4 py-4 flex flex-col mt-6 w-[96%] md:w-[70%] lg:w-[40%] gap-4">

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="title" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label htmlFor="title" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Title</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="desc" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label htmlFor="desc" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Describe why you recommend this ?</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="url" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label htmlFor="url" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">URL of the product ?</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="type" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
                <label htmlFor="type" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">What is this product ? ( eg : Book, Hat, Chair, Sunscreen etc )</label>
            </div>

            <div className="flex flex-col gap-2 w-full mb-5">
                <label htmlFor="image" className="text-sm text-zinc-400">Recommendation Image (Optional)</label>
                <input type="file" id="image" name="image" accept="image/*" className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer" />
            </div>
            
            <SubmitButton className="border-1 border-white cursor-pointer hover:bg-white hover:text-black rounded-sm py-2 mt-4 w-full">Submit</SubmitButton>

        </form>
    </div>
  )
}

export default page
