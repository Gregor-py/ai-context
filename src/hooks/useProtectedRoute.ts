import {useAuth} from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const useProtectedRoute = () => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) {
        router.push('/');
    }
}