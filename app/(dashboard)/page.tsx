import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Search, Heart } from 'lucide-react';
import { Terminal } from './terminal';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Ontdek de Lekkerste
                <span className="block text-orange-500">Restaurants</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Vind, beoordeel en deel jouw favoriete restaurants in Nederland. 
                Ontvang persoonlijke aanbevelingen en deel jouw culinaire ervaringen 
                met anderen.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                  Start met ontdekken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              {/* <Terminal /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Search className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Ontdek Restaurants
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Zoek en filter restaurants op locatie, keuken of type maaltijd. 
                  Vind precies wat je zoekt voor elke gelegenheid.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Star className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Deel Ervaringen
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Schrijf reviews, deel foto's en help anderen door jouw eerlijke 
                  mening te geven over restaurants.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Heart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Persoonlijke Aanbevelingen
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Krijg op maat gemaakte suggesties gebaseerd op jouw voorkeuren 
                  en eerdere beoordelingen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Klaar om te beginnen?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Word lid van onze community en ontdek de beste restaurants in Nederland. 
                Deel je ervaringen en help anderen bij het maken van de perfecte keuze.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center"
                asChild
              >
                <a href="/sign-up">
                  Maak een account aan
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
