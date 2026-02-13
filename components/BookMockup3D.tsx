"use client"

import { motion } from "framer-motion"

export function BookMockup3D() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <div
        className="relative w-[280px] lg:w-[340px] h-[380px] lg:h-[460px]"
        style={{ perspective: "1200px" }}
      >
        <div
          className="book-float relative w-full h-full"
          style={{ transformStyle: "preserve-3d", transform: "rotateY(-15deg) rotateX(5deg)" }}
        >
          {/* Cover */}
          <div
            className="absolute inset-0 bg-accent rounded-sm shadow-2xl flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-white/20 text-xs uppercase tracking-[0.3em] mb-auto pt-4">
              Гаврилов Илья
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                Je parle!
              </h3>
              <p className="text-white/60 text-sm max-w-[200px]">
                Руководство, чтобы говорить, как настоящий француз
              </p>
            </div>
            <div className="text-white/30 text-xs mt-auto pb-4">
              300+ фраз &bull; Произношение &bull; Озвучка
            </div>
          </div>

          {/* Spine */}
          <div
            className="absolute top-0 left-0 w-[30px] h-full bg-accent/90 origin-left"
            style={{
              transform: "rotateY(90deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="h-full flex items-center justify-center">
              <span
                className="text-white/60 text-[10px] font-medium uppercase tracking-widest"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                Je parle!
              </span>
            </div>
          </div>

          {/* Page edges (bottom) */}
          <div
            className="absolute top-[3px] right-0 w-[30px] h-[calc(100%-6px)] origin-right"
            style={{
              transform: "rotateY(-90deg) translateZ(-1px)",
              background: "linear-gradient(to right, #f5f0e0, #ede7d4, #e8e2cc)",
              backfaceVisibility: "hidden",
            }}
          />

          {/* Page edges (bottom horizontal) */}
          <div
            className="absolute bottom-0 left-[3px] w-[calc(100%-6px)] h-[20px] origin-bottom"
            style={{
              transform: "rotateX(90deg)",
              background: "linear-gradient(to bottom, #f5f0e0, #ede7d4)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
