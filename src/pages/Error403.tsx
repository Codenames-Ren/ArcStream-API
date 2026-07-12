import Error403Image from "@/assets/errors/403.png";
import { ErrorPage } from "@/components/ErrorPage";

export default function Error403() {
    return (
        <ErrorPage code="403" message="Access Denied." image={Error403Image} />
    )
}