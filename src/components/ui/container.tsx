interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        ${className} 
        mx-auto
        max-w-[2520px]
        px-4 
        sm:px-2
        md:px-10
        xl:px-20`}
    >
      {children}
    </div>
  );
};
