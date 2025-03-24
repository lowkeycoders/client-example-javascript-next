import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-2 ${inter.className}`}
    >
      <div style={{ height: '40px' }}></div>
      <div className="text-center" style={{ marginBottom: '-25px' }}>
        <h1 className="text-xl">Onsurity Health Insurance Claims Assistant</h1>
        <p className="text-slate-600 text-xs">
          Talk with Priya to get help with your cashless claims and insurance questions.
        </p>
      </div>
      <div className="w-full flex justify-center" style={{ marginTop: '-10px' }}>
        <Assistant />
      </div>
    </main>
  );
}
