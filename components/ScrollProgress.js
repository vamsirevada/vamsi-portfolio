export default function ScrollProgress({ progressRef }) {
  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 z-[9995] h-[3px] bg-accent"
      style={{ width: "0%", boxShadow: "0 0 12px rgba(110,231,183,0.6)" }}
    />
  );
}
