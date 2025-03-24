import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-6 ${inter.className}`}
    >
      <div className="text-center mb-4">
        <h1 className="text-3xl">Onsurity Health Insurance Claims Assistant</h1>
        <p className="text-slate-600">
          Talk with Priya to get help with your cashless claims and insurance questions.
        </p>
      </div>
      <div className="flex-grow flex items-center justify-center w-full">
        <Assistant />
      </div>
    </main>
  );
}
