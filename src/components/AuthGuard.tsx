// src/components/AuthGuard.tsx
import { useAtomValue } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { userAtom } from "../store/store";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const user = useAtomValue(userAtom);
    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate
            to="/login"
            state={{ from: location.pathname + location.search }}
            replace
        />
    );
};