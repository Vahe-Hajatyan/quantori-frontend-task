const Footer = () => {
  return (
    <footer className="fixed left-0 bottom-0 w-full h-10 bg-primary text-white">
        <div className="flex items-center justify-center h-full">
        <p className="text-center">© Copyright {new  Date().getFullYear()}</p>
        </div>
    </footer>
  );
};

export default Footer;
