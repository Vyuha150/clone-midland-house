import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Luxury living redefined. Find your perfect home with us.
          </h1>
          
          <div className="mt-12">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link to="/buy">Explore Properties</Link>
            </Button>
          </div>
        </div>

        {/* Background overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }}
        />
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
