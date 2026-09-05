interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
  type: "submit" | "reset" | "button";
  title?: string;
}
export function Button({
  children,
  className,
  onClick,
  type,
  title,
}: IButtonProps) {
  return (
    <button className={className} onClick={onClick} type={type} title={title}>
      {children}
    </button>
  );
}
