// app/(inner)/layout.tsx
export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return <div className="innerBg">{children}</div>;
}
