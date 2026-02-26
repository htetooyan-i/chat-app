
export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex-1">
      {children}
    </div>
  );  
}
