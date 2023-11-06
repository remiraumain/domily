interface MenuItemProps {
  className?: string;
  label: string;
  onClick?: () => void;
}

export const MenuItem = ({ className, label, onClick }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};
