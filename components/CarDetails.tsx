"use client";
import { CarProps } from "@/Types";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isopen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isopen, closeModal, car }: CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95 "
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] p-6 overflow-y-auto transform rounded-2xl  bg-white shadow-xl transition-all flex flex-col text-left gap-5 ">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 p-2 w-fit z-10 rounded-full bg-primary-blue-100 "
                  >
                    <Image
                      src="/close.svg"
                      width={20}
                      height={20}
                      alt="Close btn"
                      className="object-contain"
                    />
                  </button>
                  {/* actual content of card */}
                  <div className="flex-1 flex flex-col gap-3 ">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        fill
                        priority
                        alt="car"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg ">
                        <Image
                          src={generateCarImageUrl(car, "29")}
                          fill
                          priority
                          alt="car"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg ">
                        <Image
                          src={generateCarImageUrl(car, "33")}
                          fill
                          priority
                          alt="car"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg ">
                        <Image
                          src={generateCarImageUrl(car, "13")}
                          fill
                          priority
                          alt="car"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <h2 className=" font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex flex-between w-full text-right gap-5"
                          key={key}
                        >
                          <h2 className="text-grey capitalize">
                            {key.split("_").join(" ")}
                          </h2>
                          <p className="text-semibol text-black-100">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
