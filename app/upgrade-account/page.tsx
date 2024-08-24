import { Navbar } from "@/components/navbar/Navbar";
import Image from "next/image";

export default function UpgradeAccount() {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      <div className="mt-24 text-center md:w-7/12 lg:w-6/12 xl:w-4/12 p-4 md:border-2 transition duration-500 ease-in-out hover:bg-gray-900 m-2 bg-gray-800 rounded-lg shadow-lg mx-auto">
        <h1 className="text-4xl font-semibold">Upgrade your account</h1>
        <aside className="my-2">Pay $2.99 one time and become a Vendor</aside>
        <Image
          src={"/logo.jpeg"}
          alt="Cart Dart Logo"
          height={250}
          width={250}
          className="mx-auto rounded-lg mt-8"
        />
        <div className="bg-btn-background transition duration-300 linear hover:bg-btn-background-hover w-10/12 mx-auto rounded-lg my-8 p-4 text-xl">
          <a href="https://buy.stripe.com/14k14RaN6d3M93O144" target="_blank" rel="noopener noreffer" className="p-4 w-full">Upgrade Now</a>
        </div>
        <aside>Supported payment methods:</aside>
        <div className="flex justify-evenly w-6/12 mx-auto my-4">
          <div className="relative h-[35px] w-[35px] mx-2">
            <Image
              src="/amex.svg"
              alt="Icon for American Express credit cards"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[35px] w-[35px] mx-2">
            <Image
              src="/mastercard.svg"
              alt="Icon for Mastercard credit cards"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[35px] w-[35px] mx-2">
            <Image
              src="/visa.svg"
              alt="Icon for Visa credit cards"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[35px] w-[35px] mx-2">
            <Image
              src="/klarna.svg"
              alt="Icon for Klarna payment method"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[35px] w-[35px] mx-2">
            <Image
              src="/cashapp.svg"
              alt="Icon for Cash App payment method"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
