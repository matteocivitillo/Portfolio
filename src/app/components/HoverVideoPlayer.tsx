import { useRef, useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface HoverVideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
  title: string;
}

export function HoverVideoPlayer({ videoUrl, posterUrl, title }: HoverVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device (touch screen)
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // Play when at least 50% visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || modalOpen) return; // Don't auto-play tiny preview if modal is open

    // For desktop hover
    if (!isMobile) {
      if (isHovered) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    } 
    // For mobile intersection
    else {
      if (isInView) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    }
  }, [isHovered, isMobile, isInView, modalOpen]);

  // Close on Escape
  useEffect(() => {
      if (!modalOpen) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Lock body scroll
  useEffect(() => {
      document.body.style.overflow = modalOpen ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <>
      {/* ── Scaled preview card ── */}
      <div 
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer w-full h-[400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label={`Open ${title} in fullscreen`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          title={title}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover overlay with maximize icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Maximize2 size={24} className="text-white" />
            </div>
            <span className="text-white font-medium text-sm">Click to view fullscreen</span>
        </div>
      </div>

      {/* ── Fullscreen modal ── */}
      {modalOpen && createPortal(
          <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-10"
              style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.45)' }}
              onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
              role="dialog"
              aria-modal="true"
              aria-label={title}
          >
              {/* Floating card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex items-center justify-center">
                  {/* Close button — floating top-right corner of the card */}
                  <button
                      onClick={() => setModalOpen(false)}
                      className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-colors shadow-lg"
                      aria-label="Close"
                  >
                      <X size={18} />
                  </button>

                  {/* Full-size interactive video */}
                  <video
                      src={videoUrl}
                      title={title}
                      className="w-full h-full object-contain"
                      autoPlay
                      controls
                      loop
                      playsInline
                  />
              </div>
          </div>,
          document.body
      )}
    </>
  );
}
