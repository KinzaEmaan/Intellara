const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
  children, // Include children prop for passing components like the button
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  children?: React.ReactNode; // Define children prop as React.ReactNode
}) => {
  return (
    <div
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-body-color md:text-lg">
        {paragraph}
      </p>
      {/* Render children components */}
      {children}
    </div>
  );
};

export default SectionTitle;
