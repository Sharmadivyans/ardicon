// ARDICON REALTORS PVT. LTD. - Interactive Leaflet Mapping Engine

const MapManager = {
  mapInstance: null,
  markersLayer: null,

  // Landmark Pins across YEIDA, Greater Noida, Noida, UPSIDC
  LANDMARKS: [
    {
      name: "Ardicon Realtors Pvt. Ltd. (HQ)",
      type: "office",
      coords: [28.4735, 77.5089],
      desc: "Office No. 309-310, 3rd Floor, MSX Tower II, Alpha 1 Commercial Belt, Greater Noida",
      iconColor: "#d4af37"
    },
    {
      name: "Noida International Airport (Jewar)",
      type: "airport",
      coords: [28.1833, 77.5833],
      desc: "Upcoming Global Aviation Hub & Economic Growth Engine",
      iconColor: "#3b82f6"
    },
    {
      name: "Pari Chowk & Alpha 1 Metro",
      type: "transit",
      coords: [28.4682, 77.5145],
      desc: "The Central Hub of Greater Noida & Aqua Line Metro Interchange",
      iconColor: "#10b981"
    },
    {
      name: "International Film City Sector 21",
      type: "infra",
      coords: [28.2950, 77.5450],
      desc: "1000-Acre World-Class Entertainment & Media Production Hub",
      iconColor: "#8b5cf6"
    },
    {
      name: "Buddh International F1 Circuit",
      type: "sports",
      coords: [28.3490, 77.5340],
      desc: "F1 Motor Racing & Sports City Corridor, Yamuna Expressway",
      iconColor: "#f59e0b"
    }
  ],

  initMap(elementId = "interactive-map-container") {
    const container = document.getElementById(elementId);
    if (!container) return;

    // Destroy existing instance if any
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    // Default center: Greater Noida & Yamuna Expressway corridor
    this.mapInstance = L.map(elementId, {
      scrollWheelZoom: false,
      zoomControl: true
    }).setView([28.3850, 77.5250], 11);

    // High quality light luxury carto tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Ardicon Realtors Pvt. Ltd.',
      maxZoom: 19
    }).addTo(this.mapInstance);

    this.markersLayer = L.layerGroup().addTo(this.mapInstance);

    // Add Landmarks
    this.addLandmarkPins();

    // Render Properties
    const properties = CRM.getProperties();
    this.renderPropertyPins(properties);
  },

  addLandmarkPins() {
    this.LANDMARKS.forEach(lm => {
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `<div style="background: ${lm.iconColor}; width: 26px; height: 26px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">★</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px;">
          <h4 style="margin: 0 0 4px 0; color: #0b281d; font-size: 13px; font-weight: 700;">${lm.name}</h4>
          <p style="margin: 0; color: #576d63; font-size: 11px;">${lm.desc}</p>
        </div>
      `;

      L.marker(lm.coords, { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(this.markersLayer);
    });
  },

  renderPropertyPins(properties) {
    if (!this.markersLayer) return;

    // Keep landmarks, re-add property pins
    this.markersLayer.clearLayers();
    this.addLandmarkPins();

    properties.forEach(prop => {
      if (!prop.coordinates) return;

      const propIcon = L.divIcon({
        className: "property-map-pin",
        html: `
          <div style="background: #0b281d; color: #d4af37; border: 2px solid #d4af37; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; box-shadow: 0 6px 15px rgba(0,0,0,0.35); white-space: nowrap; transform: translate(-50%, -50%); cursor: pointer;">
            ${prop.priceDisplay}
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12]
      });

      const imgUrl = (prop.images && prop.images.length > 0) ? prop.images[0] : (prop.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80");
      const popupHtml = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; width: 220px; padding: 4px;">
          <img src="${imgUrl}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
          <div style="font-size: 10px; color: #1f644b; font-weight: 700; text-transform: uppercase;">${prop.authority}</div>
          <h5 style="margin: 2px 0 4px; font-size: 12px; line-height: 1.3; color: #071c14;">${prop.title}</h5>
          <div style="font-size: 13px; font-weight: 800; color: #b89326; margin-bottom: 6px;">${prop.priceDisplay} <span style="font-size: 10px; color: #576d63;">(${prop.area} ${prop.areaUnit})</span></div>
          <button onclick="App.openPropertyDetail('${prop.id}')" style="width: 100%; background: #0b281d; color: #d4af37; border: none; padding: 5px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer;">View Property Details</button>
        </div>
      `;

      L.marker([prop.coordinates.lat, prop.coordinates.lng], { icon: propIcon })
        .bindPopup(popupHtml)
        .addTo(this.markersLayer);
    });
  }
};
