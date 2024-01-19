import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col w-screen font-bold text-white bg-black">
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/100y.jpg"
            alt="100 years"
            width={700}
            height={700}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Seid mehr als 100 Jahren ist die CB Bank stets für ihre Kunden da.
          </h1>
          <ul className="space-y-9 py-9">
            <li>Jetzt Jubiläumsrabatt sichern</li>
            <li>100 Jahre Erfolgsgeschichte</li>
            <li>
              Unsere Kunden konnten in dem vergangenen Jahrhundert
              durchschnittlich 15 % Rendite p.a. erzielen.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2 ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Weil die Zukunft groß wird
          </h1>
          <ul className="space-y-9 py-9">
            <li>Mit dem Junior-Depot vorsorgen</li>
            <li>Exklusive Angebote und Rabatte</li>
            <li>Einfache Übertragung des Depots bei Volljährigkeit</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/parchild.jpg"
            alt="Happy Family"
            width={700}
            height={700}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/grow.jpg"
            alt="Grow your money"
            width={700}
            height={700}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Jeder fängt mal klein an
          </h1>
          <ul className="space-y-9 py-9">
            <li>Wir unterstützen dich beim Vermögensaufbau.</li>
            <li>
              Bespare Aktien und ETFs kostenlos ab einem Sparplan von nur 5 €
              monatlich.
            </li>
            <li>Kostenlose Depotführung für alle unter 30 Jahren.</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
