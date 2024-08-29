import { LoaderCircle } from "lucide-react"

const Loading = () => {
    return <div className="text-center w-full px-10 flex justify-center items-center">
        <LoaderCircle className="animate-spin" />
    </div>
}

export default Loading