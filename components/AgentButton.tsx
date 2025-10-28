"use client";

import {useState, useCallback} from "react";
import dynamic from 'next/dynamic';
const LanguageSwitcher = dynamic(() => import('@/components/LanguageSwitcher'), { ssr: false });
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from "@heroui/react";

export const AgentIcon = ({size = 18}: {size?: number}) => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 3.9999C7.93043 3.9999 8.31257 4.27533 8.44868 4.68367L9.91557 9.08433L14.3162 10.5512C14.7246 10.6873 15 11.0695 15 11.4999C15 11.9303 14.7246 12.3125 14.3162 12.4486L9.91557 13.9155L8.44868 18.3161C8.31257 18.7245 7.93043 18.9999 7.5 18.9999C7.06957 18.9999 6.68743 18.7245 6.55132 18.3161L5.08443 13.9155L0.683772 12.4486C0.27543 12.3125 0 11.9303 0 11.4999C0 11.0695 0.27543 10.6873 0.683772 10.5512L5.08443 9.08433L6.55132 4.68367C6.68743 4.27533 7.06957 3.9999 7.5 3.9999ZM7.5 8.16218L6.82368 10.1911C6.72415 10.4897 6.48983 10.7241 6.19123 10.8236L4.16228 11.4999L6.19123 12.1762C6.48983 12.2758 6.72415 12.5101 6.82368 12.8087L7.5 14.8376L8.17632 12.8087C8.27585 12.5101 8.51017 12.2758 8.80877 12.1762L10.8377 11.4999L8.80877 10.8236C8.51017 10.7241 8.27585 10.4897 8.17632 10.1911L7.5 8.16218Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 0.399902C15.7583 0.399902 15.9875 0.56516 16.0692 0.810166L16.8493 3.15056L19.1897 3.93069C19.4347 4.01236 19.6 4.24164 19.6 4.4999C19.6 4.75816 19.4347 4.98744 19.1897 5.06911L16.8493 5.84924L16.0692 8.18964C15.9875 8.43464 15.7583 8.5999 15.5 8.5999C15.2417 8.5999 15.0125 8.43464 14.9308 8.18964L14.1507 5.84924L11.8103 5.06911C11.5653 4.98744 11.4 4.75816 11.4 4.4999C11.4 4.24164 11.5653 4.01236 11.8103 3.93069L14.1507 3.15056L14.9308 0.810166C15.0125 0.56516 15.2417 0.399902 15.5 0.399902Z"
      fill="white"
    />
  </svg>
);

export default function AgentButton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loaded, setLoaded] = useState(false);
  const [frameKey, setFrameKey] = useState<number | null>(null);

  const handleOpen = useCallback(() => {
    setLoaded(false);
    setFrameKey(Date.now());
    onOpen();
  }, [onOpen]);

  const iframeUrl = frameKey
    ? `https://ai.xone.org/?t=${frameKey}#/agentLink`
    : `https://ai.xone.org/?t=init#/agentLink`;

  return (
    <>
  <div className="inline-flex items-center gap-3">
      <div
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
        className="inline-flex items-center gap-2 rounded-md bg-primaryHue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-grd-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
      >
        <span>Ask AI</span>
        <AgentIcon />
      </div>
        <LanguageSwitcher />
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        className="bg-background"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Xone Assistant</ModalHeader>

              <ModalBody>
                <div className="relative w-full">
                  {!loaded && (
                    <div className="absolute inset-0 grid place-items-center text-sm text-default-500">
                      Loading…
                    </div>
                  )}
                  {isOpen && (
                    <iframe
                      key={frameKey ?? 'init'}
                      src={iframeUrl}
                      className="w-full min-h-[70vh] rounded-md border border-divider"
                      onLoad={() => setLoaded(true)}
                      loading="lazy"
                    />
                  )}
                </div>
              </ModalBody>

              <ModalFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-default-500">
                  Some data is trained by third parties, so please do not trust AI completely.
                </p>

                <div className="flex gap-2">
                  <div
                    onClick={onClose}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClose(); }}
                    className="cursor-pointer rounded-md bg-primaryHue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-grd-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Close
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
