import Error500Image from "@/assets/errors/500.png";
import { ErrorPage } from "@/components/ErrorPage";

export default function Error500() {
    return (
        <ErrorPage code="500" message="Internal Server Error." image={Error500Image} />
    )
}