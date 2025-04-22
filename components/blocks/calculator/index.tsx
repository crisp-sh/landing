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
      <h2 className="text-3xl font-semibold mb-6 text-center text-foreground">
        AI Model Cost Estimator
      </h2>
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
      <div className="flex justify-center mt-6">
        <Button variant="outline" size="sm" onClick={() => setShowTable(prev => !prev)} className="shadow-sm hover:shadow-md transition-shadow bg-background/80">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          {showTable ? "Show Calculator View" : "Show Full Pricing Table"}
        </Button>
      </div>
    </>
  );
}
