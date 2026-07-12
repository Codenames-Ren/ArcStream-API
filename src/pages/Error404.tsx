import Error404Image from "@/assets/errors/404.png";
import { ErrorPage } from "@/components/ErrorPage";

export default function Error404() {
    return (
        <ErrorPage code="404" message="Page Not Found." image={Error404Image} />
    )
}