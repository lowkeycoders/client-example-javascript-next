import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";
import { Header } from "@/components/app/header";
import { Benefits } from "@/components/app/benefits";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main
        className={`flex min-h-screen flex-col items-center p-2 pt-20 ${inter.className}`}
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-800">AI Claim assistant for Insurance Industry</h1>
          <p className="text-slate-600 text-sm mt-2">
            Talk with Priya to get help with your cashless claims and insurance questions.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Assistant />
        </div>
        <div className="w-full flex justify-center mb-12">
          <Benefits />
        </div>
      </main>
    </div>
  );
}
