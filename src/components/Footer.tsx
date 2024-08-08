const Footer = () => {
  return (
    <footer className="fixed left-0 bottom-0 w-full bg-primary text-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center">© Copyright {new  Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
