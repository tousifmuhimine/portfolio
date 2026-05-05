export default function FloatingElements() {
  return (
    <div className="motion-backdrop" aria-hidden="true">
      <div className="grid-plane" />
      <div className="signal-line signal-line-a" />
      <div className="signal-line signal-line-b" />
      <div className="noise-layer" />
    </div>
  );
}
