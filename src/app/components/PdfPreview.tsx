import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import * as pdfjsLib from 'pdfjs-dist';

// Point pdfjs to the worker bundled with the package
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

interface PdfPreviewProps {
  pdfUrl: string;
  title: string;
}

export function PdfPreview({ pdfUrl, title }: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [coverReady, setCoverReady] = useState(false);

  // Render the first page of the PDF onto the canvas as a cover image
  useEffect(() => {
    let cancelled = false;

    async function renderCover() {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || cancelled) return;

        const containerWidth = container.getBoundingClientRect().width || 600;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = (containerWidth * 2) / baseViewport.width; // 2x for retina
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        if (!ctx || cancelled) return;

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setCoverReady(true);
      } catch (err) {
        console.error('Failed to render PDF cover:', err);
      }
    }

    renderCover();
    return () => { cancelled = true; };
  }, [pdfUrl]);

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
      {/* ── Cover preview card ── */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px] cursor-pointer bg-gray-100 dark:bg-gray-800"
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label={`Open ${title} PDF`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
      >
        {/* PDF first-page cover rendered on canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${coverReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />

        {/* Loading placeholder */}
        {!coverReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading PDF preview…</div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Maximize2 size={24} className="text-white" />
          </div>
          <span className="text-white font-medium text-sm">Click to view PDF</span>
        </div>
      </div>

      {/* ── Fullscreen PDF modal ── */}
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
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full transition-colors shadow-lg"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Full interactive PDF via iframe (native browser viewer) */}
            <iframe
              src={pdfUrl}
              title={title}
              className="w-full h-full border-none bg-white"
              allow="fullscreen"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
