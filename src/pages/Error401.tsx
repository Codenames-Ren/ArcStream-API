import Error401Image from "@/assets/errors/401.png";
import { ErrorPage } from "@/components/ErrorPage";

export default function Error401() {
    return (
        <ErrorPage code="401" message="Unauthorized" image={Error401Image} />
    )
}