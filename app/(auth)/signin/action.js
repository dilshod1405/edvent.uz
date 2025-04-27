"use server";

import { signIn } from "../authConfig/googleConfig";

export async function signInAction() {
    await signIn("google", {redirectTo: `/api/dashboard`});
    localStorage.setItem("access", "google");
    localStorage.setItem("role", "google");
    localStorage.setItem("refresh", "google");
    return { access: "google", role: "google", refresh: "google" };
}