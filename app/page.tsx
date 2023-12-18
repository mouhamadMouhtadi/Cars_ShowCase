"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [allcars, setAllcars] = useState([]);
  const [loading, setLoading] = useState(false);
  // search states

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // Filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2015);

  // pagination
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      setAllcars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  const isDataEmpty = !Array.isArray(allcars) || allcars.length < 1 || !allcars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl"> Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        {/* creating filters */}
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="Fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="Year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>
        {allcars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allcars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={(limit || 10) > allcars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">oops, No Data</h2>
            <p>{allcars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
