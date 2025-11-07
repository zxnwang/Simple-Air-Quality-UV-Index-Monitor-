const translations = {
  header: {
    title: "Air & UV Monitor",
    subtitle: "Real-time environmental data at your fingertips.",
  },
  citySelector: {
    label: "Select City",
    searchPlaceholder: "Search for a city...",
    notFound: "City not found.",
  },
  app: {
    showingDataFor: "Showing data for",
    lastUpdated: "Last updated at",
    poweredBy: "Powered by Open-Meteo and Current UV Index API",
    healthImpact: "Health Impact",
    recommendations: "Recommendations",
  },
  levels: {
    uv: {
      low: "Low",
      moderate: "Moderate",
      high: "High",
      veryHigh: "Very High",
      extreme: "Extreme",
    },
    aqi: {
      good: "Good",
      moderate: "Moderate",
      unhealthySensitive: "Unhealthy (Sensitive)",
      unhealthy: "Unhealthy",
      veryUnhealthy: "Very Unhealthy",
    },
  },
  metrics: {
    uv: {
      title: "UV Index",
      description: "Measures the strength of sunburn-producing UV radiation.",
      details: {
        description: "The UV Index is an international standard measurement of the level of ultraviolet radiation from the sun. The scale is designed to help people protect themselves from excessive UV exposure.",
        healthImpact: "Excessive UV exposure can cause sunburn, premature aging of the skin, eye damage (like cataracts), and increase the risk of skin cancer. High UV levels are dangerous even on cloudy days.",
        recommendations: [
          "Use sunscreen with SPF 30+.",
          "Wear protective clothing, a wide-brimmed hat, and sunglasses.",
          "Seek shade, especially between 10 AM and 4 PM.",
          "Avoid direct sun exposure for prolonged periods."
        ]
      }
    },
    pm2_5: {
      title: "PM2.5",
      description: "Fine inhalable particles, with diameters < 2.5 micrometers.",
      details: {
        description: "PM2.5 are tiny air pollution particles with a diameter of 2.5 micrometers or less. Their small size allows them to travel deep into the respiratory tract and even enter the bloodstream.",
        healthImpact: "Short-term exposure can cause eye, nose, throat, and lung irritation. Long-term exposure is associated with serious health problems like heart disease, stroke, chronic lung disease, and lung cancer.",
        recommendations: [
          "When PM2.5 levels are high, limit outdoor activities.",
          "Use an air purifier indoors.",
          "Wear an N95 mask if you must be outside.",
          "Keep windows and doors closed to reduce indoor pollution."
        ]
      }
    },
    pm10: {
      title: "PM10",
      description: "Coarse inhalable particles, with diameters < 10 micrometers.",
      details: {
        description: "PM10 are particles in the air with a diameter of 10 micrometers or less. These particles are larger than PM2.5 and typically include dust, pollen, and mold spores.",
        healthImpact: "PM10 can irritate the eyes, nose, and throat. For people with respiratory conditions like asthma, exposure can trigger attacks and worsen symptoms.",
        recommendations: [
          "Avoid areas with high dust levels like construction sites or unpaved roads.",
          "Keep the house clean to reduce dust.",
          "Limit strenuous outdoor activities when air quality is poor."
        ]
      }
    },
    ozone: {
      title: "Ozone (O₃)",
      description: "A main component of smog, harmful at ground level.",
      details: {
        description: "Ground-level ozone is a secondary pollutant formed when other pollutants (like nitrogen oxides and volatile organic compounds) react in sunlight. It is a major component of smog.",
        healthImpact: "Inhaling ozone can cause chest pain, coughing, throat irritation, and shortness of breath. It can worsen conditions like bronchitis, emphysema, and asthma, and damage lung tissue.",
        recommendations: [
          "Reduce strenuous outdoor activity on hot, sunny afternoons when ozone levels are typically highest.",
          "Pay attention to air quality alerts from local authorities.",
          "Support the use of clean energy to reduce ozone precursor emissions."
        ]
      }
    },
    carbon_monoxide: {
      title: "Carbon Monoxide (CO)",
      description: "A toxic gas from incomplete combustion.",
      details: {
        description: "Carbon monoxide is a colorless, odorless gas produced from the incomplete burning of fuels, such as in motor vehicles, heaters, and industrial processes.",
        healthImpact: "CO reduces the amount of oxygen that can be transported in the bloodstream to critical organs like the heart and brain. High-level exposure can be fatal, while lower levels can cause chest pain, confusion, and flu-like symptoms.",
        recommendations: [
          "Ensure good ventilation when using combustion appliances.",
          "Never run a car in an enclosed garage.",
          "Install a CO detector in your home if you use fuel-burning appliances."
        ]
      }
    },
    nitrogen_dioxide: {
      title: "Nitrogen Dioxide (NO₂)",
      description: "A reactive gas from vehicle and industrial emissions.",
      details: {
        description: "NO₂ is a reddish-brown reactive gas that comes primarily from vehicle emissions, power plants, and industry. It contributes to the formation of ground-level ozone and acid rain.",
        healthImpact: "Breathing in NO₂ can irritate airways, aggravate respiratory diseases like asthma, and may contribute to the development of asthma in children. Long-term exposure can decrease lung function.",
        recommendations: [
          "Support transportation policies that reduce vehicle emissions.",
          "Avoid exercising near busy roadways.",
          "Use public transport, cycle, or walk when possible."
        ]
      }
    },
    sulphur_dioxide: {
      title: "Sulphur Dioxide (SO₂)",
      description: "A gas from fossil fuel combustion, causes acid rain.",
      details: {
        description: "SO₂ is a colorless gas with a sharp odor produced from the burning of fossil fuels (mainly coal and oil) by power plants and industries. It is a major cause of acid rain.",
        healthImpact: "SO₂ exposure can irritate the respiratory system and worsen asthma. People with asthma are particularly sensitive to SO₂ and may experience shortness of breath from even brief exposure.",
        recommendations: [
          "Support the transition to cleaner energy sources.",
          "Industrial authorities should use emission control technologies to reduce SO₂ release.",
          "People with asthma should check air quality data before outdoor activities."
        ]
      }
    }
  }
};

export default translations;
