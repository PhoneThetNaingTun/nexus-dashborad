"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-blue-200 blur-3xl rounded-full opacity-50 w-32 h-32 mx-auto -top-4" />
          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow">
            <Stethoscope className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h1 className="text-8xl font-black text-slate-200 absolute left-1/2 -translate-x-1/2 -top-10 z-0 select-none">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-900 relative z-10">
            Page Not Found
          </h2>
          <p className="text-slate-500 text-lg max-w-xs mx-auto relative z-10">
            Oops! The medical record or page you're looking for seems to have
            moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
            <Link
              href="/dashboard/appointments"
              className="hover:text-blue-600 transition-colors"
            >
              Appointments
            </Link>
            <Link
              href="/dashboard/patients"
              className="hover:text-blue-600 transition-colors"
            >
              Patients
            </Link>
            <Link
              href="/dashboard/settings"
              className="hover:text-blue-600 transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
