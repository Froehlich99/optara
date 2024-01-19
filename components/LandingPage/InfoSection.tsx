import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col w-screen font-bold text-white bg-black">
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/image1.jpg"
            alt="Bild1"
            width={700}
            height={700}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Seid mehr als 100 Jahren ist die CB Bank stets für ihre Kunden da.
          </h1>
          <p>Hier steht mehr Text</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Seid mehr als 100 Jahren ist die CB Bank stets für ihre Kunden da.
          </h1>
          <p>Hier steht mehr Text</p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/image1.jpg"
            alt="Bild1"
            width={700}
            height={700}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap p-4">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <Image
            src="/images/image1.jpg"
            alt="Bild1"
            width={700}
            height={700}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Seid mehr als 100 Jahren ist die CB Bank stets für ihre Kunden da.
          </h1>
          <p>Hier steht mehr Text</p>
        </div>
      </div>
    </div>
  );
}
