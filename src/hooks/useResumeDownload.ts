import { useCallback, useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { selectResumeDownloadFormat } from '../utils/portfolioLogic';

export function useResumeDownload(onFallbackModal: () => void) {
  const [docxAvailable, setDocxAvailable] = useState<boolean>(false);
  const [pdfAvailable, setPdfAvailable] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    fetch(PERSONAL_INFO.resumeDocxPath, { method: 'HEAD', credentials: 'same-origin' })
      .then((res) => {
        if (!active) return;
        const contentType = res.headers.get('content-type') || '';
        const isRealDocx =
          res.ok &&
          !contentType.includes('text/html') &&
          (contentType.includes('wordprocessingml') ||
            contentType.includes('octet-stream') ||
            contentType.includes('zip'));
        setDocxAvailable(isRealDocx);
      })
      .catch(() => {
        if (active) setDocxAvailable(false);
      });

    fetch(PERSONAL_INFO.resumePdfPath, { method: 'HEAD', credentials: 'same-origin' })
      .then((res) => {
        if (!active) return;
        const contentType = res.headers.get('content-type') || '';
        const isRealPdf =
          res.ok &&
          !contentType.includes('text/html') &&
          (contentType.includes('pdf') || contentType.includes('octet-stream'));
        setPdfAvailable(isRealPdf);
      })
      .catch(() => {
        if (active) setPdfAvailable(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const triggerResumeDownload = useCallback(
    async (preferred?: 'docx' | 'pdf') => {
      if (downloading) return;
      const format = selectResumeDownloadFormat(docxAvailable, pdfAvailable, preferred);
      if (format === 'modal') {
        onFallbackModal();
        return;
      }

      const targetPath =
        format === 'docx' ? PERSONAL_INFO.resumeDocxPath : PERSONAL_INFO.resumePdfPath;
      const targetFilename =
        format === 'docx' ? PERSONAL_INFO.resumeDocxFilename : PERSONAL_INFO.resumePdfFilename;
      const mimeType =
        format === 'docx'
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'application/pdf';

      setDownloading(true);
      try {
        const res = await fetch(targetPath, { credentials: 'same-origin' });
        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || contentType.includes('text/html')) {
          throw new Error('Resume file unavailable');
        }

        const rawBlob = await res.blob();
        if (rawBlob.size === 0) {
          throw new Error('Empty resume file');
        }

        const typedBlob = new Blob([rawBlob], { type: mimeType });
        const objectUrl = URL.createObjectURL(typedBlob);

        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = targetFilename;
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
        }, 4000);
      } catch {
        onFallbackModal();
      } finally {
        setDownloading(false);
      }
    },
    [docxAvailable, pdfAvailable, downloading, onFallbackModal]
  );

  return { docxAvailable, pdfAvailable, downloading, triggerResumeDownload };
}
