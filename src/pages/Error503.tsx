import Error503Image from "@/assets/errors/503.png";
import { ErrorPage } from "@/components/ErrorPage";

export default function Error503() {
    return (
        <ErrorPage code="503" message="Service Unavailable." image={Error503Image} />
    )
}