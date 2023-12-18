const Home = () => {
    return (
        <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center">
          <nav className="w-full text-center bg-blue-700 p-4">
            {/* Links della Navbar */}
            <a href="#" className="text-white px-4">Home</a>
            <a href="#" className="text-white px-4">Contatti</a>
            <a href="#" className="text-white px-4">Skills</a>
            {/* Altri link */}
          </nav>

          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white font-bold mb-2">
              Benvenuto nel Mio Mondo Sottomarino
            </h1>
            <p className="text-xl text-white mb-4">
              Immergiti nella mia esperienza professionale e creatività.
            </p>
            {/* Altri elementi, come bottoni o link */}
          </div>

          {/* Footer o altri elementi */}
        </div>
    );
};

export default Home;