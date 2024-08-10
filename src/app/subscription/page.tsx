"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import Pricingg from "@/components/Pricingg";

const Subscription = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get('/api/users/payment');
      setPrices(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  return (
    <section className="w-full pt-16 pb-24 bg-blue-100 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl text-center mt-10 items-center">
        <h2 className="text-3xl pt-20 font-semibold leading-7 text-blue-600 dark:text-white">Pricing</h2>
        <p className="mt-2 text-4xl pt-5 font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">Choose the right plan for you!</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-center">Check out all the information below</p>
      </div>
      <div className="grid grid-cols-1 max-w-[1040px] mx-auto mt-12">
        {prices && prices.map((price) => (
          <Pricingg price={price} key={price.id} />
        ))}
      </div>
    </section>
  );
};

export default Subscription;
