import ChatInterface from "./components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Modern Chat UI</h1>
        <ChatInterface />
      </div>
    </main>
  );
}