const Section = ({ id, children, className = "" }) => {
      return (
            <section
                  id={id}
                  className={`w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
            >
                  <div className="max-w-7xl mx-auto">
                        {children}
                  </div>
            </section>
      );
};

export default Section;
