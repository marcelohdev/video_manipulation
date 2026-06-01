import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            Software de Manipulação de Vídeo
          </h1>
          <p className="text-zinc-400 mt-2">
            Projeto em Next.js com funcionalidades de controle de mídia e filtros de cor.
          </p>
        </header>

        <VideoPlayer />
      </div>
    </main>
  );
}