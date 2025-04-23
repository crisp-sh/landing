"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CostCalculator from "./cost-calculator";
import PricingTable from "./pricing-table";
import { ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
  const [showTable, setShowTable] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 15, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  return (
    <>
      <h3 className="mb-10 sm:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
        how much does it <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">cost</span>?
      </h3>
      <div className="flex justify-center my-6">
        <Button variant="link" size="lg" onClick={() => setShowTable(prev => !prev)} className="shadow-sm hover:shadow-md transition-shadow bg-background/80">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          {showTable ? "Switch to calculator" : "Switch to pricing table"}
        </Button>
      </div>
      <div className="bg-background/70 rounded-md p-6 min-h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          {showTable ? (
            <motion.div
              key="pricing-table"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PricingTable />
            </motion.div>
          ) : (
            <motion.div
              key="cost-calculator"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CostCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
