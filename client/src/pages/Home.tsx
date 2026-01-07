import { useState } from "react";
import { Phone, Mail, Globe, Plane, Wine, Compass, Bus, CheckCircle, Users, Car, MapPin, Clock, Menu, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import vineyardImage from "@assets/generated_images/Cape_Winelands_vineyard_landscape_d5b1b806.png";
import safariImage from "@assets/generated_images/Big_5_safari_animals_composite_a6639e42.png";
import heroImage from "@assets/WhatsApp Image 2025-11-15 at 21.49.40_af2bcc8d_1763236406333.jpg";
import luxurySedanImage from "@assets/WhatsApp Image 2025-11-15 at 21.49.40_af2bcc8d_1763236406333.jpg";
import type { InsertInquiry } from "@shared/schema";
import ImageGallery from "@/components/ImageGallery";
import shuttleInterior from "@assets/generated_images/Luxury_shuttle_van_interior_e55ec6f9.png";
import airportService from "@assets/generated_images/Airport_transfer_welcome_service_49e1c883.png";
import wineCellar from "@assets/generated_images/Wine_cellar_with_barrels_1863251f.png";
import wineTasting from "@assets/generated_images/Outdoor_wine_tasting_experience_c0c4194a.png";
import safariVehicle from "@assets/generated_images/Safari_game_drive_vehicle_bb253def.png";
import elephantHerd from "@assets/generated_images/African_elephant_herd_closeup_17ec3201.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const wineGalleryImages = [
    { src: vineyardImage, alt: "Cape Winelands vineyard landscape with rolling hills" },
    { src: wineCellar, alt: "Traditional wine cellar with oak barrels" },
    { src: wineTasting, alt: "Outdoor wine tasting experience at wine estate" },
  ];

  const safariGalleryImages = [
    { src: safariImage, alt: "Africa's Big 5 wildlife in natural habitat" },
    { src: safariVehicle, alt: "Safari game drive vehicle in African savanna" },
    { src: elephantHerd, alt: "African elephant herd close-up" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const inquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const inquiry: InsertInquiry = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      preferredDate: formData.get("preferredDate") as string || undefined,
    };

    inquiryMutation.mutate(inquiry);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">M&P TRAVEL & TOURS</h1>
                <p className="text-xs text-muted-foreground italic hidden sm:block">#We take you there</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('airport-shuttle')} 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-shuttle-services"
              >
                Shuttle Services
              </button>
              <button 
                onClick={() => scrollToSection('wine-tours')} 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-wine-tours"
              >
                Wine Tours
              </button>
              <button 
                onClick={() => scrollToSection('safari-tours')} 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-safari-tours"
              >
                Safari Tours
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-contact"
              >
                Contact
              </button>
            </nav>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="hidden sm:flex"
                data-testid="button-get-quote"
              >
                Get a Quote
              </Button>
              <Button 
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="fixed top-16 left-0 right-0 bg-card border-b shadow-lg">
            <div className="px-4 py-6 space-y-2">
              <button 
                onClick={() => scrollToSection('services')} 
                className="w-full text-left px-4 py-3 rounded-md hover-elevate active-elevate-2 font-medium"
                data-testid="mobile-link-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('airport-shuttle')} 
                className="w-full text-left px-4 py-3 rounded-md hover-elevate active-elevate-2 font-medium"
                data-testid="mobile-link-shuttle-services"
              >
                Shuttle Services
              </button>
              <button 
                onClick={() => scrollToSection('wine-tours')} 
                className="w-full text-left px-4 py-3 rounded-md hover-elevate active-elevate-2 font-medium"
                data-testid="mobile-link-wine-tours"
              >
                Wine Tours
              </button>
              <button 
                onClick={() => scrollToSection('safari-tours')} 
                className="w-full text-left px-4 py-3 rounded-md hover-elevate active-elevate-2 font-medium"
                data-testid="mobile-link-safari-tours"
              >
                Safari Tours
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="w-full text-left px-4 py-3 rounded-md hover-elevate active-elevate-2 font-medium"
                data-testid="mobile-link-contact"
              >
                Contact
              </button>
              <div className="pt-2">
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  className="w-full"
                  data-testid="mobile-button-get-quote"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}

      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
              M&P TRAVEL & TOURS
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium italic text-accent mb-8" data-testid="text-catchphrase">
              #We take you there
            </p>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Experience South Africa's finest destinations with our professional tour and shuttle services. 
              From wine country to wildlife safaris, we deliver unforgettable journeys.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('services')}
                className="w-full sm:w-auto text-base bg-primary/90 backdrop-blur hover:bg-primary border border-primary-border"
                data-testid="button-explore-services"
              >
                Explore Our Services
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto text-base bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Professional Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Local Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-services-title">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive transportation and tour solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate" data-testid="card-service-airport">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Plane className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Airport Transfers</h3>
                  <p className="text-sm text-muted-foreground">
                    Reliable, punctual airport pickup and drop-off services. Start and end your journey stress-free.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-wine">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-accent/10">
                    <Wine className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Wine Tours</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the renowned Cape Winelands. Taste world-class wines in breathtaking settings.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-safari">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Compass className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Safari Tours</h3>
                  <p className="text-sm text-muted-foreground">
                    Witness Africa's Big 5 in their natural habitat. Unforgettable wildlife experiences await.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-service-shuttle">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-accent/10">
                    <Bus className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Shuttle Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Comfortable group and private shuttle services for any occasion or destination.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="airport-shuttle" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
              <img 
                src={luxurySedanImage} 
                alt="Luxury sedan for professional airport transfers and shuttle services" 
                className="w-full h-full object-cover"
                data-testid="img-airport-shuttle"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-airport-shuttle-title">Airport Transfers & Shuttle Services</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Experience premium comfort and reliability with our professional airport transfer and shuttle services. 
                  We ensure you arrive at your destination on time, every time, in style and comfort.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">24/7 airport pickup and drop-off services</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Luxury sedans and comfortable shuttle vehicles</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Flight tracking to ensure punctual pickups</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Professional chauffeurs with local knowledge</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Private and shared shuttle options available</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Meet and greet service at arrivals</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={() => scrollToSection('contact')}
                data-testid="button-airport-shuttle-inquiry"
              >
                Book Airport Transfer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="wine-tours" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
              <img 
                src={vineyardImage} 
                alt="Stunning Cape Winelands vineyards with rolling hills and wine estates" 
                className="w-full h-full object-cover"
                data-testid="img-wine-tours"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-wine-tours-title">Wine Tours</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Immerse yourself in the world-renowned Cape Winelands, where rolling vineyards meet 
                  spectacular mountain vistas. Our expert guides will take you on a journey through 
                  South Africa's finest wine estates.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Visit premium wine estates in Stellenbosch, Franschhoek, and Paarl</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Expert-guided tastings of award-winning wines</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Scenic drives through picturesque wine valleys</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Customizable tours to match your preferences</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Gourmet food and wine pairing experiences</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={() => scrollToSection('contact')}
                data-testid="button-wine-tours-inquiry"
              >
                Book Your Wine Tour
              </Button>

              <ImageGallery images={wineGalleryImages} title="Wine Tour Gallery" />
            </div>
          </div>
        </div>
      </section>

      <section id="safari-tours" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:order-1">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-safari-tours-title">Safari Tours</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Experience the thrill of encountering Africa's legendary Big 5 - lion, elephant, 
                  buffalo, leopard, and rhinoceros - in their natural habitat. Our safari tours 
                  offer unforgettable wildlife encounters.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Guided game drives with expert rangers</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Opportunities to see the Big 5 and other wildlife</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Visits to renowned game reserves and national parks</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Photography-friendly safari experiences</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Full-day and multi-day safari packages available</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={() => scrollToSection('contact')}
                data-testid="button-safari-tours-inquiry"
              >
                Explore Safari Adventures
              </Button>

              <ImageGallery images={safariGalleryImages} title="Safari Tour Gallery" />
            </div>

            <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px] lg:order-2">
              <img 
                src={safariImage} 
                alt="Africa's Big 5 - lion, elephant, buffalo, leopard, and rhinoceros in natural habitat" 
                className="w-full h-full object-cover"
                data-testid="img-safari-tours"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for exceptional travel experiences in South Africa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4" data-testid="card-why-drivers">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Users className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Professional Drivers</h3>
              <p className="text-muted-foreground">
                Our experienced, licensed drivers prioritize your safety and comfort, ensuring smooth journeys every time.
              </p>
            </div>

            <div className="text-center space-y-4" data-testid="card-why-vehicles">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-accent/10">
                  <Car className="h-10 w-10 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Comfortable Vehicles</h3>
              <p className="text-muted-foreground">
                Our fleet of well-maintained, modern vehicles offers comfort and reliability for all your travel needs.
              </p>
            </div>

            <div className="text-center space-y-4" data-testid="card-why-knowledge">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Local Knowledge</h3>
              <p className="text-muted-foreground">
                Benefit from our deep local expertise and insider knowledge of South Africa's best destinations and routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-contact-title">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to start your journey? Contact us today to book your tour or shuttle service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:+27795519945" 
                  className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                  data-testid="link-phone"
                >
                  <div className="p-3 rounded-full bg-accent/10 flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-lg font-semibold">+27 (0)79 551 9945</p>
                  </div>
                </a>

                <a 
                  href="mailto:m.mukombero@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                  data-testid="link-email"
                >
                  <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-semibold break-all">m.mukombero@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="http://www.m&ptravelandtours.co.za" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-all"
                  data-testid="link-website"
                >
                  <div className="p-3 rounded-full bg-accent/10 flex-shrink-0">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="text-lg font-semibold break-all">www.m&ptravelandtours.co.za</p>
                  </div>
                </a>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-sm">Available 7 days a week</p>
                    <p className="text-sm">24/7 for airport transfers</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                      placeholder="Your name"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                      placeholder="your@email.com"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                      placeholder="+27 XX XXX XXXX"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest *</label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                      data-testid="select-service"
                    >
                      <option value="">Select a service</option>
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="Wine Tour">Wine Tour</option>
                      <option value="Safari Tour">Safari Tour</option>
                      <option value="Shuttle Service">Shuttle Service</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium mb-2">Preferred Date</label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                      data-testid="input-preferred-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background resize-none"
                      placeholder="Tell us about your travel plans..."
                      data-testid="input-message"
                    ></textarea>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={inquiryMutation.isPending}
                    data-testid="button-submit-inquiry"
                  >
                    {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">M&P TRAVEL & TOURS</span>
              </div>
              <p className="text-sm text-muted-foreground italic mb-2">#We take you there</p>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for exceptional travel experiences in South Africa.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('airport-shuttle')} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Shuttle Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('wine-tours')} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wine Tours
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('safari-tours')} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Safari Tours
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+27 (0)79 551 9945</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">m.mukombero@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="break-all">www.m&ptravelandtours.co.za</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 M&P TRAVEL & TOURS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
