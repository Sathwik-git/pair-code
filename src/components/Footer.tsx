function Footer() {
  return (
    <>
      <footer className="bg-black border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PairCode. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
