const Section = ({ id, children, className = "", ariaLabelledby }) => {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default Section;
