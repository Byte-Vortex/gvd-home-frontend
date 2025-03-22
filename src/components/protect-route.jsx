import { redirect } from "next/navigation"

export function ProtectedRoute({ children, visitCondition, redirectTo = "/" }) {
    return visitCondition ? children : redirect(redirectTo, "replace");
}