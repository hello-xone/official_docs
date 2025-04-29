"use client";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { PAGInit } from "libpag";

export interface PagAnimationMethods {
  play(): void;
  reset(): void;
}

export const PagAnimation = forwardRef<PagAnimationMethods, {
  src: string;
  infinite?: boolean;
  aspectRatio?: number;
  className?: string;
}>(({ src, infinite = false, aspectRatio = 1, className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pagView = useRef<any>();

  const setSize = useCallback(() => {
    const c = containerRef.current;
    const cv = canvasRef.current;
    if (!c || !cv || !pagView.current) return;
    const w = c.clientWidth;
    cv.width = w;
    cv.height = w * aspectRatio;
    pagView.current.updateSize();
    pagView.current.flush();
  }, [aspectRatio]);

  // resize 监听
  useEffect(() => {
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [setSize]);

  // 初始化 PAG
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted || !canvasRef.current) return;
      try {
        const pag = await PAGInit({
          locateFile: file => `/libpag.wasm`
        });
        const resp = await fetch(src);
        const buf = await resp.arrayBuffer();
        const fileObj = await pag.PAGFile.load(buf);
        const view = await pag.PAGView.init(fileObj, canvasRef.current, {
          useScale: false,
        });
        pagView.current = view;
        view.setRepeatCount(infinite ? 0 : 1);
        setSize();
        if (infinite) view.play();
      } catch (e) {
        console.error("PagAnimation init error:", e);
      }
    })();
    return () => {
      mounted = false;
      pagView.current?.destroy();
    };
  }, [src, infinite, setSize]);

  // 暴露方法
  const play = () => pagView.current?.play();
  const reset = () => {
    pagView.current?.stop();
    pagView.current?.setProgress(0);
  };
  useImperativeHandle(ref, () => ({ play, reset }), [play, reset]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
});
