export default function CustomCursor({ dotRef, ringRef }) {
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] h-2 w-2 rounded-full bg-accent will-change-transform"
        style={{ transform: "translate(-50%,-50%)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9996] h-9 w-9 rounded-full border border-accent/50 transition-[width,height,border-color] duration-250 ease-out will-change-transform"
        style={{ transform: "translate(-50%,-50%)" }}
      />
    </>
  );
}
