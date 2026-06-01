'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  ListVideo,
} from 'lucide-react';

interface VideoTrack {
  id: number;
  title: string;
  src: string;
}

type FilterType = 'Normal' | 'Sem-cores' | 'Cinza' | 'Vermelho' | 'Verde' | 'Azul';

const playlist: VideoTrack[] = [
  { id: 1, title: 'Ghost Rider trailer', src: '/video1.mp4' },
  { id: 2, title: 'The Lord of the Rings: The Two Towers trailer', src: '/video2.mp4' },
  { id: 3, title: 'The Amazing Spider-Man trailer', src: '/video3.mp4' },
];

const filterStyles: Record<FilterType, string> = {
  Normal: 'none',
  'Sem-cores': 'grayscale(100%)',
  'Cinza': 'grayscale(100%) contrast(85%) brightness(95%)',
  'Vermelho': 'sepia(100%) hue-rotate(320deg) saturate(350%)',
  'Verde': 'sepia(100%) hue-rotate(60deg) saturate(300%)',
  'Azul': 'sepia(100%) hue-rotate(195deg) saturate(300%)',
};

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Normal');

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const changeTrack = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const skipTime = (amount: number) => {
    if (videoRef.current) videoRef.current.currentTime += amount;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none text-zinc-800">

      {/* Interface Principal */}
      <div className="bg-zinc-200 border border-zinc-400 rounded shadow-2xl flex flex-col overflow-hidden">

        {/* Tela do Vídeo */}
        <div className="bg-black aspect-video relative flex items-center justify-center border-b border-zinc-400">
          <video
            ref={videoRef}
            style={{ filter: filterStyles[activeFilter] }}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={nextTrack}
            onClick={togglePlay}
          >
            <source src={playlist[currentIndex].src} type="video/mp4" />
          </video>
        </div>

        {/* Barra de Controle */}
        <div className="bg-zinc-100 p-2 flex flex-col gap-2 border-t border-white">

          {/* Barra de Progresso */}
          <div className="flex items-center gap-2 px-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none accent-orange-600"
              style={{
                background: `linear-gradient(to right, #ea580c ${progressPercentage}%, #d4d4d8 ${progressPercentage}%)`,
              }}
            />
          </div>

          {/* Botões e Volume */}
          <div className="flex items-center justify-between px-1 text-sm">

            {/* Esquerda: controles de playback */}
            <div className="flex items-center gap-1">

              <button
                onClick={togglePlay}
                className="p-1.5 hover:bg-zinc-300 active:bg-zinc-400 border border-transparent hover:border-zinc-400 rounded transition"
                title="Reproduzir / Pausar"
              >
                {isPlaying
                  ? <Pause size={18} />
                  : <Play size={18} />}
              </button>

              <button
                onClick={stopVideo}
                className="p-1.5 hover:bg-zinc-300 active:bg-zinc-400 border border-transparent hover:border-zinc-400 rounded transition"
                title="Parar"
              >
                <Square size={18} />
              </button>

              <button
                onClick={prevTrack}
                className="p-1.5 hover:bg-zinc-300 active:bg-zinc-400 border border-transparent hover:border-zinc-400 rounded transition"
                title="Anterior"
              >
                <SkipBack size={18} />
              </button>

              <button
                onClick={nextTrack}
                className="p-1.5 hover:bg-zinc-300 active:bg-zinc-400 border border-transparent hover:border-zinc-400 rounded transition"
                title="Próximo"
              >
                <SkipForward size={18} />
              </button>

              <div className="h-5 w-[1px] bg-zinc-400 mx-1" />

              <button
                onClick={() => skipTime(-10)}
                className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 rounded text-xs font-semibold"
              >
                -10s
              </button>
              <button
                onClick={() => skipTime(10)}
                className="px-2 py-0.5 bg-zinc-200 hover:bg-zinc-300 border border-zinc-400 rounded text-xs font-semibold"
              >
                +10s
              </button>
            </div>

            {/* Direita: tempo e volume */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-700 font-medium">

              <div>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-200 px-2 py-0.5 border border-zinc-300 rounded">
                <Volume2 size={16} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 rounded-full appearance-none cursor-pointer outline-none accent-zinc-600"
                  style={{
                    background: `linear-gradient(to right, #52525b ${volumePercentage}%, #d4d4d8 ${volumePercentage}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Painéis Inferiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Painel de Filtros */}
        <div className="md:col-span-2 bg-zinc-200 border border-zinc-400 rounded shadow p-4 flex flex-col">
          <div className="border-b border-zinc-400 pb-1.5 mb-3 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-600">
            <span className="flex items-center gap-1.5">
              <Settings size={14} />
              Efeitos
            </span>
            <span className="text-orange-600 lowercase font-normal">filtros de vídeo</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(filterStyles) as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${activeFilter === filter
                    ? 'bg-orange-500 text-white border-orange-600 shadow-inner'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-400 hover:bg-zinc-50'
                  }`}
              >
                {filter === 'Normal' ? 'Sem Filtro' : filter.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-zinc-200 border border-zinc-400 rounded shadow p-4 flex flex-col">
          <div className="border-b border-zinc-400 pb-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
            <ListVideo size={14} />
            Lista de Reprodução
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto max-h-32">
            {playlist.map((video, index) => (
              <button
                key={video.id}
                onClick={() => changeTrack(index)}
                className={`text-left px-2 py-1.5 text-xs rounded transition-all ${currentIndex === index
                    ? 'bg-orange-500/10 text-orange-700 font-bold border-l-4 border-orange-500'
                    : 'text-zinc-600 hover:bg-zinc-300/50'
                  }`}
              >
                {index + 1}. {video.title}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}