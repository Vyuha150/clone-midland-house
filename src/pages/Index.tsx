import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Background Video */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/8816063/8816063-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Logo and Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/674c43b8-f787-4efc-831c-9e061904f904.png"
              alt="Mid-Land Real Estate Services"
              className="h-24 w-auto mx-auto mb-6 animate-fade-in"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Luxury living redefined. Find your perfect home with us.
          </h1>
          
          <div className="mt-12 animate-fade-in">
            <Button size="lg" className="px-8 py-6 text-lg hover-scale" asChild>
              <Link to="/buy">Explore Properties</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">
              Experience our most distinguished properties, handpicked for the discerning buyer
            </p>
          </div>

          {/* Property Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Property {i}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/buy">View All Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
