import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface IframePreviewProps {
    url: string;
    title: string;
}

const IFRAME_WIDTH = 1440;

export function IframePreview({ url, title }: IframePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.4);
    const [modalOpen, setModalOpen] = useState(false);

    // Dynamically compute scale from container width
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            if (width > 0) setScale(width / IFRAME_WIDTH);
        });
        ro.observe(el);
        setScale(el.getBoundingClientRect().width / IFRAME_WIDTH);
        return () => ro.disconnect();
    }, []);

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

    const iframeHeight = scale > 0 ? Math.ceil(400 / scale) : 1000;

    return (
        <>
            {/* ── Scaled preview card ── */}
            <div
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px] cursor-pointer"
                onClick={() => setModalOpen(true)}
                role="button"
                aria-label={`Open ${title} in fullscreen`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
            >
                {/* Scaled-down live website */}
                <div className="w-full h-full relative">
                    <iframe
                        src={url}
                        title={title}
                        className="absolute top-0 left-0 origin-top-left"
                        style={{
                            width: `${IFRAME_WIDTH}px`,
                            height: `${iframeHeight}px`,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                            border: 'none',
                            pointerEvents: 'none',
                        }}
                        tabIndex={-1}
                    />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <Maximize2 size={24} className="text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">Click to interact</span>
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
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                        {/* Close button — floating top-right corner of the card */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-colors shadow-lg"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        {/* Full-size interactive iframe */}
                        <iframe
                            src={url}
                            title={title}
                            className="w-full h-full border-none"
                            allow="fullscreen"
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
