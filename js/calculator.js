// ARDICON REALTORS PVT. LTD. - Financial & Valuation Calculator Engine

const Calculator = {
  // Format INR Currency nicely
  formatINR(val) {
    if (isNaN(val)) return "₹0";
    if (val >= 10000000) {
      return "₹" + (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      return "₹" + (val / 100000).toFixed(2) + " Lakh";
    } else {
      return "₹" + Math.round(val).toLocaleString("en-IN");
    }
  },

  // Calculate Home / Land Loan EMI
  calculateEMI(principal, annualRate, tenureYears) {
    const monthlyRate = (annualRate / 12) / 100;
    const totalMonths = tenureYears * 12;
    
    if (monthlyRate === 0) {
      const emi = principal / totalMonths;
      return {
        monthlyEMI: emi,
        totalInterest: 0,
        totalPayment: principal,
        principalPercent: 100,
        interestPercent: 0
      };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;
    const principalPercent = (principal / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent: principalPercent.toFixed(1),
      interestPercent: interestPercent.toFixed(1)
    };
  },

  // Instant Property Valuation Engine based on NCR / Greater Noida / YEIDA / UPSIDC Benchmarks
  estimatePropertyValuation(localityKey, propertyType, areaSize, areaUnit) {
    let sizeInSqYd = areaSize;
    if (areaUnit === "sq.m") {
      sizeInSqYd = areaSize * 1.19599; // Convert sq.m to sq.yd
    } else if (areaUnit === "sq.ft") {
      sizeInSqYd = areaSize / 9; // Convert sq.ft to sq.yd
    }

    // Benchmark rates in ₹ per sq.yard
    const baseRates = {
      yeida: {
        plots: { min: 42000, max: 62000, yoy: "28.4%", rentalYield: "3.2%" },
        residential: { min: 40000, max: 58000, yoy: "24.0%", rentalYield: "3.8%" },
        commercial: { min: 75000, max: 125000, yoy: "31.5%", rentalYield: "7.8%" },
        industrial: { min: 30000, max: 48000, yoy: "26.0%", rentalYield: "6.5%" }
      },
      gnida: {
        plots: { min: 70000, max: 110000, yoy: "19.2%", rentalYield: "3.5%" },
        residential: { min: 65000, max: 95000, yoy: "17.5%", rentalYield: "4.2%" },
        commercial: { min: 110000, max: 190000, yoy: "21.0%", rentalYield: "8.2%" },
        industrial: { min: 38000, max: 60000, yoy: "18.0%", rentalYield: "7.0%" }
      },
      noida: {
        plots: { min: 130000, max: 240000, yoy: "15.8%", rentalYield: "3.2%" },
        residential: { min: 90000, max: 160000, yoy: "14.5%", rentalYield: "3.9%" },
        commercial: { min: 180000, max: 320000, yoy: "18.5%", rentalYield: "7.5%" },
        industrial: { min: 55000, max: 95000, yoy: "16.0%", rentalYield: "6.8%" }
      },
      upsidc: {
        plots: { min: 25000, max: 42000, yoy: "22.5%", rentalYield: "4.5%" },
        residential: { min: 28000, max: 45000, yoy: "18.0%", rentalYield: "4.0%" },
        commercial: { min: 50000, max: 85000, yoy: "24.0%", rentalYield: "7.5%" },
        industrial: { min: 28000, max: 50000, yoy: "23.5%", rentalYield: "7.2%" }
      }
    };

    const locData = baseRates[localityKey] || baseRates.yeida;
    const rateCategory = locData[propertyType] || locData.plots;

    const estimatedMin = Math.round(sizeInSqYd * rateCategory.min);
    const estimatedMax = Math.round(sizeInSqYd * rateCategory.max);
    const averageEst = Math.round((estimatedMin + estimatedMax) / 2);

    return {
      estimatedMin,
      estimatedMax,
      averageEst,
      minDisplay: this.formatINR(estimatedMin),
      maxDisplay: this.formatINR(estimatedMax),
      averageDisplay: this.formatINR(averageEst),
      growthYOY: rateCategory.yoy,
      rentalYield: rateCategory.rentalYield
    };
  }
};
