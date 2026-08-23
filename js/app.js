// ARDICON REALTORS PVT. LTD. - Master Application Controller
// Enhanced UX with Backdrop Click Closing, Carousel Navigation, Modal Tabs, and Live EMI Sliders

const App = {
  activeView: "home",
  favorites: [],
  compareList: [],
  activeFilter: {
    purpose: "all",
    locality: "all",
    category: "all",
    minBudget: 0,
    maxBudget: 100000000,
    searchQuery: "",
    sortBy: "featured"
  },
  currentDetailProperty: null,
  currentGalleryIndex: 0,
  currentWizardStep: 1,

  init() {
    this.loadFavorites();
    this.loadCompareList();
    this.renderHeaderBadges();
    this.bindGlobalEvents();
    this.setupExitIntent();
    this.renderCurrentView();
    this.initHeroSearch();
  },

  // State Persistence for Favorites & Compare
  loadFavorites() {
    const saved = localStorage.getItem("ardicon_favorites");
    this.favorites = saved ? JSON.parse(saved) : [];
  },

  saveFavorites() {
    localStorage.setItem("ardicon_favorites", JSON.stringify(this.favorites));
    this.renderHeaderBadges();
  },

  toggleFavorite(propertyId, event) {
    if (event) event.stopPropagation();
    const index = this.favorites.indexOf(propertyId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.showToast("Removed from saved properties");
    } else {
      this.favorites.push(propertyId);
      this.showToast("Added to saved properties! ⭐");
    }
    this.saveFavorites();
    this.renderProperties();
    if (this.activeView === "dashboard") {
      this.renderUserDashboard();
    }
  },

  loadCompareList() {
    const saved = localStorage.getItem("ardicon_compare");
    this.compareList = saved ? JSON.parse(saved) : [];
  },

  saveCompareList() {
    localStorage.setItem("ardicon_compare", JSON.stringify(this.compareList));
    this.renderHeaderBadges();
    this.renderCompareDrawer();
  },

  toggleCompare(propertyId, event) {
    if (event) event.stopPropagation();
    const index = this.compareList.indexOf(propertyId);
    if (index > -1) {
      this.compareList.splice(index, 1);
      this.showToast("Removed from comparison");
    } else {
      if (this.compareList.length >= 3) {
        this.showToast("You can compare up to 3 properties at once.", "warning");
        return;
      }
      this.compareList.push(propertyId);
      this.showToast("Added to comparison drawer!");
    }
    this.saveCompareList();
    this.renderProperties();
  },

  renderHeaderBadges() {
    const favCountEl = document.getElementById("nav-favorites-count");
    if (favCountEl) favCountEl.textContent = this.favorites.length;

    const compCountEl = document.getElementById("nav-compare-count");
    if (compCountEl) compCountEl.textContent = this.compareList.length;

    const mobileFavEl = document.getElementById("mobile-favorites-count");
    if (mobileFavEl) mobileFavEl.textContent = this.favorites.length;
  },

  // Mobile Drawer Navigation
  toggleMobileMenu() {
    const drawer = document.getElementById("mobile-nav-drawer");
    if (drawer) drawer.classList.toggle("active");
  },

  openMobileMenu() {
    const drawer = document.getElementById("mobile-nav-drawer");
    if (drawer) drawer.classList.add("active");
  },

  closeMobileMenu() {
    const drawer = document.getElementById("mobile-nav-drawer");
    if (drawer) drawer.classList.remove("active");
  },

  // View Navigation System
  navigate(viewName, params = {}) {
    this.activeView = viewName;
    this.closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Handle view containers
    const views = ["home-view", "properties-view", "locality-view", "blog-view", "about-view", "contact-view", "crm-view", "dashboard-view", "list-property-view"];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = (v === `${viewName}-view`) ? "block" : "none";
    });

    if (viewName === "properties") {
      if (params.locality) this.activeFilter.locality = params.locality;
      if (params.category) this.activeFilter.category = params.category;
      this.renderPropertiesView();
    } else if (viewName === "home") {
      this.renderHomeFeatured();
    } else if (viewName === "locality") {
      this.renderLocalityGuides(params.locKey || "yeida");
    } else if (viewName === "blog") {
      this.renderBlogSection();
    } else if (viewName === "crm") {
      this.renderCRMView();
    } else if (viewName === "dashboard") {
      this.renderUserDashboard();
    } else if (viewName === "list-property") {
      this.resetWizard();
    }
  },

  renderCurrentView() {
    this.navigate(this.activeView);
  },

  // Hero Search Initialization
  initHeroSearch() {
    const heroLocSelect = document.getElementById("hero-filter-locality");
    const heroTypeSelect = document.getElementById("hero-filter-type");
    const heroBudgetSelect = document.getElementById("hero-filter-budget");
    const heroSearchBtn = document.getElementById("hero-search-btn");

    if (heroSearchBtn) {
      heroSearchBtn.addEventListener("click", () => {
        const locality = heroLocSelect ? heroLocSelect.value : "all";
        const category = heroTypeSelect ? heroTypeSelect.value : "all";
        const budget = heroBudgetSelect ? heroBudgetSelect.value : "all";

        this.activeFilter.locality = locality;
        this.activeFilter.category = category;
        
        if (budget === "under-1cr") {
          this.activeFilter.minBudget = 0;
          this.activeFilter.maxBudget = 10000000;
        } else if (budget === "1cr-3cr") {
          this.activeFilter.minBudget = 10000000;
          this.activeFilter.maxBudget = 30000000;
        } else if (budget === "above-3cr") {
          this.activeFilter.minBudget = 30000000;
          this.activeFilter.maxBudget = 100000000;
        } else {
          this.activeFilter.minBudget = 0;
          this.activeFilter.maxBudget = 100000000;
        }

        this.navigate("properties");
      });
    }
  },

  // Home Featured Grid Rendering
  renderHomeFeatured() {
    const container = document.getElementById("home-featured-grid");
    if (!container) return;

    const properties = CRM.getProperties().filter(p => p.status === "verified");
    let displayList = properties;

    if (this.activeFilter.category && this.activeFilter.category !== "all") {
      displayList = properties.filter(p => p.category === this.activeFilter.category);
    }

    container.innerHTML = displayList.map(prop => this.generatePropertyCardHTML(prop)).join("");
    this.renderLocalityCardsHome();
  },

  renderLocalityCardsHome() {
    const container = document.getElementById("home-locality-grid");
    if (!container) return;

    const keys = ["yeida", "gnida", "noida", "upsidc"];
    container.innerHTML = keys.map(key => {
      const loc = LOCALITY_DATA[key];
      return `
        <div class="locality-card" onclick="App.navigate('locality', { locKey: '${key}' })">
          <div class="locality-img">
            <img src="${loc.image}" alt="${loc.title}" loading="lazy" />
            <div class="locality-growth-badge">📈 ${loc.growthYOY}</div>
          </div>
          <div class="locality-content">
            <h3 class="locality-name">${loc.title}</h3>
            <div class="locality-price-benchmark">Plots Avg: <strong>${loc.avgPricePlot}</strong></div>
            <p style="font-size: 0.85rem; color: #576d63; margin-bottom: 1rem; line-height: 1.5;">${loc.subtitle}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #1c543f;">Explore ${loc.hotSectors.length} Hot Sectors →</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  // Properties Directory & Filter Engine
  renderPropertiesView() {
    this.renderProperties();
    setTimeout(() => {
      MapManager.initMap("properties-interactive-map");
    }, 100);
  },

  renderProperties() {
    const container = document.getElementById("properties-catalog-grid");
    const countEl = document.getElementById("properties-results-count");
    if (!container) return;

    const allProps = CRM.getProperties().filter(p => p.status === "verified");
    
    let filtered = allProps.filter(p => {
      if (this.activeFilter.locality !== "all" && p.locality !== this.activeFilter.locality) return false;
      if (this.activeFilter.category !== "all" && p.category !== this.activeFilter.category) return false;
      if (p.price < this.activeFilter.minBudget || p.price > this.activeFilter.maxBudget) return false;
      if (this.activeFilter.searchQuery) {
        const query = this.activeFilter.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchAddress = p.address.toLowerCase().includes(query);
        const matchLocality = p.localityName.toLowerCase().includes(query);
        if (!matchTitle && !matchAddress && !matchLocality) return false;
      }
      return true;
    });

    // Sorting
    if (this.activeFilter.sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.activeFilter.sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.activeFilter.sortBy === "area-desc") {
      filtered.sort((a, b) => b.area - a.area);
    }

    if (countEl) countEl.textContent = `${filtered.length} Properties Found`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px dashed #c4d8ce;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🏡</div>
          <h3 style="font-size: 1.4rem; color: #071c14; margin-bottom: 0.5rem;">No Properties Match Your Search</h3>
          <p style="color: #576d63; max-width: 450px; margin: 0 auto 1.5rem;">Try adjusting your filters, location, or budget range to explore other verified properties in YEIDA & Greater Noida.</p>
          <button onclick="App.resetFilters()" class="btn btn-gold">Reset All Filters</button>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(prop => this.generatePropertyCardHTML(prop)).join("");
    }

    MapManager.renderPropertyPins(filtered);
  },

  resetFilters() {
    this.activeFilter = {
      purpose: "all",
      locality: "all",
      category: "all",
      minBudget: 0,
      maxBudget: 100000000,
      searchQuery: "",
      sortBy: "featured"
    };

    const locSelect = document.getElementById("filter-locality-select");
    if (locSelect) locSelect.value = "all";
    const catSelect = document.getElementById("filter-category-select");
    if (catSelect) catSelect.value = "all";
    const sortSelect = document.getElementById("filter-sort-select");
    if (sortSelect) sortSelect.value = "featured";

    this.renderProperties();
  },

  // Get verified images array for property with fallbacks
  getPropertyImages(prop) {
    if (!prop) return ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"];
    if (Array.isArray(prop.images) && prop.images.length > 0) return prop.images;
    if (prop.image) return [prop.image];
    return [this.getDefaultPropertyImage(prop.category)];
  },

  getDefaultPropertyImage(category) {
    if (category === "industrial") {
      return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80";
    }
    if (category === "commercial") {
      return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
    }
    if (category === "residential") {
      return "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80";
    }
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
  },

  generatePropertyCardHTML(prop) {
    const isFav = this.favorites.includes(prop.id);
    const isCompared = this.compareList.includes(prop.id);
    const images = this.getPropertyImages(prop);
    const primaryImg = images[0];
    const fallbackImg = this.getDefaultPropertyImage(prop.category);

    const waText = encodeURIComponent(`Hello Rohit ji, I am interested in '${prop.title}' (ID: ${prop.id}, Price: ${prop.priceDisplay}) listed on Ardicon Realtors website. Please share more details & schedule a site visit.`);
    const waUrl = `https://wa.me/919810273855?text=${waText}`;

    return `
      <div class="property-card" data-id="${prop.id}">
        <div class="property-media" onclick="App.openPropertyDetail('${prop.id}')" style="cursor: pointer;">
          <img src="${primaryImg}" alt="${prop.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}'" />
          
          <div class="media-badges">
            ${prop.featured ? `<span class="badge badge-featured">★ Exclusive</span>` : ''}
            <span class="badge badge-verified">✓ ${prop.authority}</span>
            ${prop.priceDrop ? `<span class="badge badge-new" style="background:#ef4444;">↓ Price Drop</span>` : ''}
          </div>

          <div class="media-actions">
            <button class="btn-card-icon ${isFav ? 'active' : ''}" onclick="App.toggleFavorite('${prop.id}', event)" title="Save Property">
              ♥
            </button>
            <button class="btn-card-icon ${isCompared ? 'active' : ''}" onclick="App.toggleCompare('${prop.id}', event)" title="Compare Property">
              ⇄
            </button>
          </div>

          <div class="property-price-tag">
            ${prop.priceDisplay}
          </div>
        </div>

        <div class="property-body">
          <span class="property-authority-badge">${prop.authority} • ${prop.propertyType}</span>
          <h3 class="property-title" onclick="App.openPropertyDetail('${prop.id}')">${prop.title}</h3>
          
          <div class="property-location">
            📍 <span>${prop.address}</span>
          </div>

          <div class="property-specs">
            <div class="spec-item">
              <span class="spec-value">${prop.area} ${prop.areaUnit}</span>
              <span class="spec-label">Total Area</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${prop.pricePerUnit}</span>
              <span class="spec-label">Rate</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${prop.facing ? prop.facing.split(' ')[0] : 'Open'}</span>
              <span class="spec-label">Facing</span>
            </div>
          </div>

          <div class="property-card-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-wa" onclick="CRM.addLead({name:'WhatsApp Visitor', phone:'WhatsApp Inquiry', propertyId:'${prop.id}', propertyTitle:'${prop.title}', source:'Card WhatsApp Button'})">
              💬 WhatsApp
            </a>
            <button onclick="App.openPropertyDetail('${prop.id}')" class="btn-card-details">
              Details →
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Open Detailed Property Modal
  openPropertyDetail(propertyId) {
    const properties = CRM.getProperties();
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) return;

    prop.images = this.getPropertyImages(prop);
    this.currentDetailProperty = prop;
    this.currentGalleryIndex = 0;
    const modal = document.getElementById("property-detail-modal");
    if (!modal) return;

    // Guaranteed top scroll position so photos and details are fully visible
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) modalContent.scrollTop = 0;
    modal.scrollTop = 0;

    prop.viewCount = (prop.viewCount || 0) + 1;

    // Header updates
    const headerPriceBadge = document.getElementById("modal-header-price-badge");
    if (headerPriceBadge) headerPriceBadge.textContent = prop.priceDisplay;
    const headerTitleShort = document.getElementById("modal-header-title-short");
    if (headerTitleShort) headerTitleShort.textContent = prop.title;
    const detailTitle = document.getElementById("modal-detail-title");
    if (detailTitle) detailTitle.textContent = prop.title;
    const detailAddress = document.getElementById("modal-detail-address");
    if (detailAddress) detailAddress.textContent = `📍 ${prop.address}`;
    const detailPrice = document.getElementById("modal-detail-price");
    if (detailPrice) detailPrice.innerHTML = `${prop.priceDisplay} <span style="font-size:1rem; font-weight:normal; color:#576d63;">(${prop.pricePerUnit})</span>`;
    const detailDesc = document.getElementById("modal-detail-description");
    if (detailDesc) detailDesc.textContent = prop.description;
    const detailAuth = document.getElementById("modal-detail-authority");
    if (detailAuth) detailAuth.textContent = prop.authority;
    const detailRera = document.getElementById("modal-detail-rera");
    if (detailRera) detailRera.textContent = prop.reraId || "Authorized Allotment";
    const detailArea = document.getElementById("modal-detail-area");
    if (detailArea) detailArea.textContent = `${prop.area} ${prop.areaUnit}`;
    const detailPoss = document.getElementById("modal-detail-possession");
    if (detailPoss) detailPoss.textContent = prop.possession;
    const detailFacing = document.getElementById("modal-detail-facing");
    if (detailFacing) detailFacing.textContent = prop.facing || "Prime Frontage";

    // Social Proof
    const socialProof = document.getElementById("modal-social-proof");
    if (socialProof) socialProof.textContent = `🔥 ${prop.viewCount} investors viewed this property recently • ${prop.inquiryCount || 12} inquiries`;

    // Gallery setup
    this.updateGalleryView();

    // Amenities
    const amenitiesContainer = document.getElementById("modal-detail-amenities");
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = (prop.amenities || []).map(a => `
        <div style="display: flex; align-items: center; gap: 0.5rem; background: #eff8f4; padding: 0.5rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #143f2f;">
          ✓ ${a}
        </div>
      `).join("");
    }

    // Distance Landmarks
    const distancesContainer = document.getElementById("modal-detail-distances");
    if (distancesContainer) {
      distancesContainer.innerHTML = (prop.distances || []).map(d => `
        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px dashed #dbe8e1; font-size: 0.85rem;">
          <span style="color: #0b281d; font-weight: 600;">🚗 ${d.name}</span>
          <span style="color: #72b338; font-weight: 700;">${d.distance}</span>
        </div>
      `).join("");
    }

    // Direct WhatsApp Share & Hotline Links
    const waText = encodeURIComponent(`Hello Rohit ji, I am reviewing '${prop.title}' (ID: ${prop.id}, ${prop.priceDisplay}) on Ardicon Realtors and would like to schedule an on-ground site visit.`);
    const waHeaderBtn = document.getElementById("modal-header-wa-btn");
    if (waHeaderBtn) waHeaderBtn.href = `https://wa.me/919810273855?text=${waText}`;

    const waBtn = document.getElementById("modal-wa-direct-btn");
    if (waBtn) waBtn.href = `https://wa.me/919810273855?text=${waText}`;

    // Reset Tabs to Overview
    this.switchModalTab('overview');

    // Recalculate Live EMI
    this.recalculateLiveEMI();

    modal.classList.add("active");
  },

  closePropertyDetail() {
    const modal = document.getElementById("property-detail-modal");
    if (modal) modal.classList.remove("active");
  },

  // Modal Tab Switching
  switchModalTab(tabKey) {
    document.querySelectorAll(".modal-tab-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabKey);
    });

    const panes = ["overview", "amenities", "connectivity", "calculator", "schedule"];
    panes.forEach(p => {
      const paneEl = document.getElementById(`modal-tab-pane-${p}`);
      if (paneEl) paneEl.style.display = (p === tabKey) ? "block" : "none";
    });
  },

  // Gallery Navigation & Showcase
  updateGalleryView() {
    const prop = this.currentDetailProperty;
    if (!prop) return;
    const images = this.getPropertyImages(prop);

    if (this.currentGalleryIndex >= images.length) {
      this.currentGalleryIndex = 0;
    }

    const currentImgUrl = images[this.currentGalleryIndex];
    const fallbackUrl = this.getDefaultPropertyImage(prop.category);

    const mainImg = document.getElementById("modal-detail-main-img");
    if (mainImg) {
      mainImg.src = currentImgUrl;
      mainImg.alt = `${prop.title} - Photo ${this.currentGalleryIndex + 1}`;
      mainImg.onerror = () => {
        mainImg.onerror = null;
        mainImg.src = fallbackUrl;
      };
    }

    const counterEl = document.getElementById("modal-gallery-counter");
    if (counterEl) {
      counterEl.textContent = `Photo ${this.currentGalleryIndex + 1} of ${images.length}`;
    }

    const thumbsContainer = document.getElementById("modal-detail-thumbnails");
    if (thumbsContainer) {
      thumbsContainer.innerHTML = images.map((img, idx) => `
        <img 
          src="${img}" 
          alt="Thumbnail ${idx + 1}"
          class="thumb-img ${idx === this.currentGalleryIndex ? 'active' : ''}" 
          onclick="App.setGalleryImage(${idx})"
          onerror="this.onerror=null; this.src='${fallbackUrl}'" 
        />
      `).join("");
    }

    // Populate Overview Tab Photo Grid
    const overviewGrid = document.getElementById("modal-overview-gallery-grid");
    if (overviewGrid) {
      overviewGrid.innerHTML = images.map((img, idx) => `
        <div class="overview-photo-card" onclick="App.openLightbox('${img}', ${idx})">
          <img 
            src="${img}" 
            alt="${prop.title} - Angle ${idx + 1}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src='${fallbackUrl}'" 
          />
          <div class="overview-photo-overlay">
            <span>🔍 View Photo ${idx + 1}</span>
          </div>
        </div>
      `).join("");
    }
  },

  setGalleryImage(index) {
    this.currentGalleryIndex = index;
    this.updateGalleryView();
  },

  prevGalleryImage() {
    const prop = this.currentDetailProperty;
    if (!prop) return;
    const images = this.getPropertyImages(prop);
    this.currentGalleryIndex = (this.currentGalleryIndex - 1 + images.length) % images.length;
    this.updateGalleryView();
  },

  nextGalleryImage() {
    const prop = this.currentDetailProperty;
    if (!prop) return;
    const images = this.getPropertyImages(prop);
    this.currentGalleryIndex = (this.currentGalleryIndex + 1) % images.length;
    this.updateGalleryView();
  },

  // Fullscreen Lightbox Image Viewer
  openLightbox(imgSrc, index = 0) {
    const lightbox = document.getElementById("image-lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    if (!lightbox || !lightboxImg) return;

    this.lightboxIndex = index;
    const currentImg = imgSrc || (this.currentDetailProperty ? this.getPropertyImages(this.currentDetailProperty)[index] : "");
    lightboxImg.src = currentImg;
    
    if (lightboxCaption && this.currentDetailProperty) {
      const images = this.getPropertyImages(this.currentDetailProperty);
      lightboxCaption.textContent = `${this.currentDetailProperty.title} • Photo ${index + 1} of ${images.length}`;
    }
    lightbox.classList.add("active");
  },

  closeLightbox() {
    const lightbox = document.getElementById("image-lightbox-modal");
    if (lightbox) lightbox.classList.remove("active");
  },

  prevLightboxImage() {
    if (!this.currentDetailProperty) return;
    const images = this.getPropertyImages(this.currentDetailProperty);
    this.lightboxIndex = (this.lightboxIndex - 1 + images.length) % images.length;
    this.openLightbox(images[this.lightboxIndex], this.lightboxIndex);
  },

  nextLightboxImage() {
    if (!this.currentDetailProperty) return;
    const images = this.getPropertyImages(this.currentDetailProperty);
    this.lightboxIndex = (this.lightboxIndex + 1) % images.length;
    this.openLightbox(images[this.lightboxIndex], this.lightboxIndex);
  },

  // Interactive Live EMI Slider Recalculation
  recalculateLiveEMI() {
    const prop = this.currentDetailProperty;
    if (!prop) return;

    const dpSlider = document.getElementById("live-dp-slider");
    const tenureSlider = document.getElementById("live-tenure-slider");
    const rateSlider = document.getElementById("live-rate-slider");

    const dpPercent = dpSlider ? parseFloat(dpSlider.value) : 20;
    const tenureYears = tenureSlider ? parseInt(tenureSlider.value) : 20;
    const interestRate = rateSlider ? parseFloat(rateSlider.value) : 8.5;

    const downPaymentAmount = prop.price * (dpPercent / 100);
    const loanAmount = prop.price - downPaymentAmount;

    const emiResult = Calculator.calculateEMI(loanAmount, interestRate, tenureYears);

    // Update labels
    const dpPercentLabel = document.getElementById("live-dp-percent-label");
    if (dpPercentLabel) dpPercentLabel.textContent = `${dpPercent}%`;

    const dpAmountLabel = document.getElementById("live-dp-amount-label");
    if (dpAmountLabel) dpAmountLabel.textContent = Calculator.formatINR(downPaymentAmount);

    const tenureLabel = document.getElementById("live-tenure-label");
    if (tenureLabel) tenureLabel.textContent = `${tenureYears} Years (${tenureYears * 12} mo)`;

    const rateLabel = document.getElementById("live-rate-label");
    if (rateLabel) rateLabel.textContent = `${interestRate}% p.a.`;

    const emiBadge = document.getElementById("live-emi-display-badge");
    if (emiBadge) emiBadge.textContent = `₹${emiResult.monthlyEMI.toLocaleString("en-IN")} / mo`;

    const principalTxt = document.getElementById("live-loan-principal-txt");
    if (principalTxt) principalTxt.textContent = Calculator.formatINR(loanAmount);

    const interestTxt = document.getElementById("live-loan-interest-txt");
    if (interestTxt) interestTxt.textContent = Calculator.formatINR(emiResult.totalInterest);

    const barPrincipal = document.getElementById("live-bar-principal");
    const barInterest = document.getElementById("live-bar-interest");
    if (barPrincipal && barInterest) {
      barPrincipal.style.width = `${emiResult.principalPercent}%`;
      barInterest.style.width = `${emiResult.interestPercent}%`;
    }
  },

  // Copy Property Link Helper
  copyPropertyLink() {
    const prop = this.currentDetailProperty;
    if (!prop) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}#property-${prop.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      this.showToast("📋 Property link copied to clipboard!");
    }).catch(() => {
      this.showToast("Property link copied!");
    });
  },

  // Property Comparison Drawer & View
  renderCompareDrawer() {
    const drawer = document.getElementById("compare-drawer");
    const container = document.getElementById("compare-items-container");
    if (!drawer || !container) return;

    if (this.compareList.length === 0) {
      drawer.classList.remove("active");
      return;
    }

    const properties = CRM.getProperties();
    const comparedProps = properties.filter(p => this.compareList.includes(p.id));

    container.innerHTML = comparedProps.map(p => {
      const imgUrl = this.getPropertyImages(p)[0];
      const fallbackUrl = this.getDefaultPropertyImage(p.category);
      return `
        <div class="compare-item-chip">
          <img src="${imgUrl}" onerror="this.onerror=null; this.src='${fallbackUrl}'" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;" />
          <span style="font-weight: 700;">${p.priceDisplay}</span>
          <button onclick="App.toggleCompare('${p.id}')" style="background:none; border:none; color:#f87171; cursor:pointer; font-weight:bold;">✕</button>
        </div>
      `;
    }).join("");

    drawer.classList.add("active");
  },

  openCompareModal() {
    if (this.compareList.length < 2) {
      this.showToast("Please select at least 2 properties to compare.", "warning");
      return;
    }

    const modal = document.getElementById("compare-modal");
    const container = document.getElementById("compare-matrix-content");
    if (!modal || !container) return;

    const properties = CRM.getProperties();
    const items = properties.filter(p => this.compareList.includes(p.id));

    let html = `
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr>
            <th style="padding: 1rem; background: #0b281d; color: #d4af37; width: 25%;">Feature</th>
            ${items.map(p => {
              const imgUrl = this.getPropertyImages(p)[0];
              const fallbackUrl = this.getDefaultPropertyImage(p.category);
              return `
                <th style="padding: 1rem; background: #0b281d; color: #ffffff; text-align: center;">
                  <img src="${imgUrl}" onerror="this.onerror=null; this.src='${fallbackUrl}'" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;" />
                  <div style="font-size: 13px; font-weight: 700;">${p.title}</div>
                  <div style="font-size: 16px; color: #d4af37; font-weight: 800; margin-top: 4px;">${p.priceDisplay}</div>
                </th>
              `;
            }).join("")}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7; border-bottom: 1px solid #e2ebe6;">Authority / Approval</td>
            ${items.map(p => `<td style="padding: 0.85rem; text-align: center; border-bottom: 1px solid #e2ebe6; font-weight: 600; color: #1c543f;">${p.authority}</td>`).join("")}
          </tr>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7; border-bottom: 1px solid #e2ebe6;">Total Area</td>
            ${items.map(p => `<td style="padding: 0.85rem; text-align: center; border-bottom: 1px solid #e2ebe6;">${p.area} ${p.areaUnit}</td>`).join("")}
          </tr>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7; border-bottom: 1px solid #e2ebe6;">Rate per Unit</td>
            ${items.map(p => `<td style="padding: 0.85rem; text-align: center; border-bottom: 1px solid #e2ebe6; font-weight: 700;">${p.pricePerUnit}</td>`).join("")}
          </tr>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7; border-bottom: 1px solid #e2ebe6;">Locality</td>
            ${items.map(p => `<td style="padding: 0.85rem; text-align: center; border-bottom: 1px solid #e2ebe6;">${p.localityName}</td>`).join("")}
          </tr>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7; border-bottom: 1px solid #e2ebe6;">Possession Status</td>
            ${items.map(p => `<td style="padding: 0.85rem; text-align: center; border-bottom: 1px solid #e2ebe6;">${p.possession}</td>`).join("")}
          </tr>
          <tr>
            <td style="padding: 0.85rem; font-weight: 700; background: #f6f9f7;">Actions</td>
            ${items.map(p => `
              <td style="padding: 0.85rem; text-align: center;">
                <button onclick="App.openPropertyDetail('${p.id}')" class="btn btn-gold" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">View Full Details</button>
              </td>
            `).join("")}
          </tr>
        </tbody>
      </table>
    `;

    container.innerHTML = html;
    modal.classList.add("active");
  },

  // Locality Guides View
  renderLocalityGuides(selectedKey = "yeida") {
    const loc = LOCALITY_DATA[selectedKey] || LOCALITY_DATA.yeida;
    const contentEl = document.getElementById("locality-details-pane");
    if (!contentEl) return;

    document.querySelectorAll(".locality-nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.loc === selectedKey);
    });

    const relevantProps = CRM.getProperties().filter(p => p.locality === selectedKey && p.status === "verified");

    contentEl.innerHTML = `
      <div style="background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid var(--surface-border); box-shadow: var(--shadow-card); margin-bottom: 3rem;">
        <div style="height: 340px; position: relative;">
          <img src="${loc.image}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(0deg, rgba(7,28,20,0.95) 0%, transparent 100%); padding: 2.5rem; color: #ffffff;">
            <span style="background: var(--accent-lime); color: white; padding: 0.3rem 0.8rem; border-radius: 50px; font-weight: 700; font-size: 0.8rem;">${loc.growthYOY}</span>
            <h1 style="font-size: 2.4rem; font-weight: 800; color: #ffffff; margin-top: 0.5rem;">${loc.title}</h1>
            <p style="color: #c9ded4; font-size: 1.1rem;">${loc.subtitle}</p>
          </div>
        </div>

        <div style="padding: 2.5rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; background: var(--surface-light); padding: 1.5rem; border-radius: 12px;">
            <div>
              <div style="font-size: 0.8rem; color: #576d63; font-weight: 600;">PLOTS AVERAGE RATE</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #0b281d;">${loc.avgPricePlot}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: #576d63; font-weight: 600;">INDUSTRIAL / COMMERCIAL RATE</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #0b281d;">${loc.avgPriceIndustrial}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: #576d63; font-weight: 600;">GROWTH MOMENTUM</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: #16a34a;">${loc.growthYOY}</div>
            </div>
          </div>

          <h3 style="font-size: 1.4rem; color: #071c14; margin-bottom: 1rem;">Locality Overview & Investment Thesis</h3>
          <p style="color: #3f554c; font-size: 1.05rem; line-height: 1.7; margin-bottom: 2rem;">${loc.overview}</p>

          <h4 style="font-size: 1.15rem; color: #071c14; margin-bottom: 1rem;">Key Strategic Infrastructure Pillars</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
            ${loc.highlights.map(h => `
              <div style="background: #eff8f4; border-left: 4px solid #308f6c; padding: 1rem; border-radius: 8px; font-size: 0.95rem; color: #0b281d; font-weight: 600;">
                ★ ${h}
              </div>
            `).join("")}
          </div>

          <div style="background: linear-gradient(145deg, #092419, #05140e); color: #ffffff; padding: 2rem; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; border: 1px solid rgba(212,175,55,0.3);">
            <div>
              <h3 style="color: #d4af37; margin-bottom: 0.35rem;">Looking for verified properties in ${loc.title}?</h3>
              <p style="color: #c9ded4; font-size: 0.9rem;">Rohit Jain has 15+ years on-ground expertise navigating authority allotments in this zone.</p>
            </div>
            <a href="https://wa.me/919810273855?text=${encodeURIComponent(`Hello Rohit ji, I want an investment consultation for ${loc.title}`)}" target="_blank" class="btn btn-gold">
              Consult on WhatsApp 💬
            </a>
          </div>
        </div>
      </div>

      <div style="margin-top: 3rem;">
        <h3 style="font-size: 1.6rem; color: #071c14; margin-bottom: 1.5rem;">Active Verified Properties in ${loc.title} (${relevantProps.length})</h3>
        <div class="properties-grid">
          ${relevantProps.map(p => this.generatePropertyCardHTML(p)).join("")}
        </div>
      </div>
    `;
  },

  // Blog Section Rendering
  renderBlogSection() {
    const container = document.getElementById("blog-posts-grid");
    if (!container) return;

    container.innerHTML = BLOG_POSTS.map(post => `
      <article style="background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid var(--surface-border); box-shadow: var(--shadow-card); display: flex; flex-direction: column;">
        <div style="height: 200px; overflow: hidden;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.8rem; color: #576d63;">
            <span style="background: #eff8f4; color: #1c543f; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 700;">${post.category}</span>
            <span>${post.date} • ${post.readTime}</span>
          </div>
          <h3 style="font-size: 1.2rem; color: #071c14; line-height: 1.35; margin-bottom: 0.75rem;">${post.title}</h3>
          <p style="color: #576d63; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">${post.excerpt}</p>
          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2ebe6; padding-top: 1rem;">
            <span style="font-size: 0.85rem; font-weight: 600; color: #0b281d;">By ${post.author}</span>
            <a href="https://wa.me/919810273855?text=${encodeURIComponent(`Hello Rohit ji, I read your article '${post.title}' and want to discuss investment opportunities.`)}" target="_blank" style="color: #1f644b; font-weight: 700; font-size: 0.85rem; text-decoration: none;">
              Discuss with Author →
            </a>
          </div>
        </div>
      </article>
    `).join("");
  },

  // User Dashboard
  renderUserDashboard() {
    const favsContainer = document.getElementById("dashboard-saved-grid");
    if (!favsContainer) return;

    const allProps = CRM.getProperties();
    const favProps = allProps.filter(p => this.favorites.includes(p.id));

    if (favProps.length === 0) {
      favsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px dashed #cadcd2; width: 100%;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⭐</div>
          <p style="color: #576d63;">You haven't saved any favorite properties yet.</p>
          <button onclick="App.navigate('properties')" class="btn btn-gold" style="margin-top: 1rem;">Browse Properties</button>
        </div>
      `;
    } else {
      favsContainer.innerHTML = favProps.map(p => this.generatePropertyCardHTML(p)).join("");
    }
  },

  // Admin & CRM View Rendering
  renderCRMView() {
    const analytics = CRM.getAnalytics();
    
    const totalLeadsEl = document.getElementById("crm-kpi-leads");
    if (totalLeadsEl) totalLeadsEl.textContent = analytics.totalLeads;

    const newLeadsEl = document.getElementById("crm-kpi-new");
    if (newLeadsEl) newLeadsEl.textContent = analytics.newLeads;

    const visitsEl = document.getElementById("crm-kpi-visits");
    if (visitsEl) visitsEl.textContent = analytics.activeSiteVisits;

    const convRateEl = document.getElementById("crm-kpi-conversion");
    if (convRateEl) convRateEl.textContent = analytics.conversionRate;

    const tableBody = document.getElementById("crm-leads-tbody");
    if (!tableBody) return;

    const leads = CRM.getLeads();
    tableBody.innerHTML = leads.map(lead => `
      <tr>
        <td><strong>${lead.name}</strong><br><small style="color:#576d63;">${lead.phone}</small></td>
        <td><a href="mailto:${lead.email}" style="color:#1f644b;">${lead.email}</a></td>
        <td><span style="font-weight:600;">${lead.propertyTitle}</span><br><small style="color:#72b338;">${lead.inquiryType}</small></td>
        <td>${lead.source}</td>
        <td>
          <select onchange="CRM.updateLeadStatus('${lead.id}', this.value); App.renderCRMView();" style="padding: 0.3rem 0.5rem; border-radius: 6px; border: 1px solid #c9ded5; font-size: 0.8rem; font-weight: 700; background: #ffffff;">
            <option value="new" ${lead.status==='new'?'selected':''}>🔵 New Lead</option>
            <option value="contacted" ${lead.status==='contacted'?'selected':''}>🟡 Contacted</option>
            <option value="site_visit" ${lead.status==='site_visit'?'selected':''}>🟣 Site Visit</option>
            <option value="converted" ${lead.status==='converted'?'selected':''}>🟢 Converted</option>
            <option value="lost" ${lead.status==='lost'?'selected':''}>🔴 Closed/Lost</option>
          </select>
        </td>
        <td><small>${lead.date}</small></td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <a href="tel:${lead.phone}" class="btn btn-lime" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" title="Direct Call">📞</a>
            <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Ardicon Realtors Pvt. Ltd. regarding ${lead.propertyTitle}. Rohit Jain here.`)}" target="_blank" class="btn btn-card-wa" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" title="WhatsApp">💬</a>
          </div>
        </td>
      </tr>
    `).join("");

    const moderationBody = document.getElementById("crm-moderation-tbody");
    if (moderationBody) {
      const allProps = CRM.getProperties();
      moderationBody.innerHTML = allProps.map(p => {
        const imgUrl = this.getPropertyImages(p)[0];
        const fallbackUrl = this.getDefaultPropertyImage(p.category);
        return `
          <tr>
            <td><img src="${imgUrl}" onerror="this.onerror=null; this.src='${fallbackUrl}'" style="width: 45px; height: 35px; border-radius: 4px; object-fit: cover;" /></td>
            <td><strong>${p.title}</strong><br><small>${p.localityName}</small></td>
            <td>${p.priceDisplay}</td>
            <td>
              <span class="status-badge ${p.status==='verified'?'status-converted':'status-contacted'}">
                ${p.status}
              </span>
            </td>
            <td>
              <button onclick="CRM.togglePropertyStatus('${p.id}', '${p.status==='verified'?'pending_approval':'verified'}'); App.renderCRMView();" class="btn ${p.status==='verified'?'btn-outline-gold':'btn-gold'}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">
                ${p.status==='verified'?'Unpublish':'Approve & Publish'}
              </button>
            </td>
          </tr>
        `;
      }).join("");
    }
  },

  // Multi-Step "List Your Property" Wizard
  nextWizardStep() {
    if (this.currentWizardStep < 5) {
      this.currentWizardStep++;
      this.updateWizardUI();
    }
  },

  prevWizardStep() {
    if (this.currentWizardStep > 1) {
      this.currentWizardStep--;
      this.updateWizardUI();
    }
  },

  updateWizardUI() {
    for (let i = 1; i <= 5; i++) {
      const stepEl = document.getElementById(`wizard-step-${i}`);
      const nodeEl = document.getElementById(`step-node-${i}`);
      if (stepEl) {
        stepEl.classList.toggle("active", i === this.currentWizardStep);
      }
      if (nodeEl) {
        nodeEl.classList.toggle("active", i === this.currentWizardStep);
        nodeEl.classList.toggle("completed", i < this.currentWizardStep);
      }
    }
  },

  resetWizard() {
    this.currentWizardStep = 1;
    this.updateWizardUI();
    const form = document.getElementById("list-property-form");
    if (form) form.reset();
  },

  submitListingWizard(e) {
    e.preventDefault();
    const title = document.getElementById("wiz-prop-title")?.value || "Exclusive Property in Greater Noida";
    const locality = document.getElementById("wiz-prop-locality")?.value || "yeida";
    const category = document.getElementById("wiz-prop-category")?.value || "plots";
    const price = parseFloat(document.getElementById("wiz-prop-price")?.value) || 12500000;
    const area = parseFloat(document.getElementById("wiz-prop-area")?.value) || 250;
    const address = document.getElementById("wiz-prop-address")?.value || "Sector 18, Yamuna Expressway";
    const phone = document.getElementById("wiz-contact-phone")?.value || "9810273855";
    const name = document.getElementById("wiz-contact-name")?.value || "Property Owner";

    const newProp = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      category,
      propertyType: category === "plots" ? "Authority Plot" : "Commercial / Residential",
      purpose: "sale",
      locality,
      localityName: locality === "yeida" ? "YEIDA (Yamuna Expressway)" : "Greater Noida (GNIDA)",
      address,
      city: "Greater Noida",
      authority: "Verified Authority Allotment",
      price,
      priceDisplay: Calculator.formatINR(price),
      pricePerUnit: "Market Standard",
      area,
      areaUnit: "sq.yd",
      possession: "Immediate Registry",
      status: "verified",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      description: `Newly submitted verified listing by ${name} in ${address}. Clean authority title and immediate transfer availability.`,
      amenities: ["Wide Sector Road", "24/7 Security", "Electricity & Water Line"],
      agent: {
        name: "Rohit Jain",
        title: "Managing Director",
        phone: "+91 9810273855",
        whatsapp: "919810273855",
        email: "ardiconrealtors@gmail.com"
      }
    };

    CRM.addProperty(newProp);
    CRM.addLead({
      name,
      phone,
      propertyTitle: `Seller Submission: ${title}`,
      source: "List Property Wizard",
      inquiryType: "Property Listing"
    });

    this.showToast("🎉 Property listed successfully! Added to live catalog.");
    this.navigate("properties");
  },

  // Exit-Intent Popups
  setupExitIntent() {
    let triggered = false;
    document.addEventListener("mouseleave", (e) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        const modal = document.getElementById("exit-intent-modal");
        if (modal) modal.classList.add("active");
      }
    });
  },

  // Toast Notifications
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${type === 'warning' ? '⚠️' : '✓'}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // Bind Global Event Listeners (Backdrop Click, Keyboard ESC, Sliders, Forms)
  bindGlobalEvents() {
    // 1. BACKDROP CLICK TO CLOSE ALL MODALS
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        // If the user clicked directly on the blurred background overlay
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });

    // 2. KEYBOARD NAVIGATION (ESCAPE & ARROWS)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
        const compDrawer = document.getElementById("compare-drawer");
        if (compDrawer) compDrawer.classList.remove("active");
      } else if (e.key === "ArrowLeft") {
        const lightbox = document.getElementById("image-lightbox-modal");
        if (lightbox && lightbox.classList.contains("active")) {
          this.prevLightboxImage();
        } else {
          const detailModal = document.getElementById("property-detail-modal");
          if (detailModal && detailModal.classList.contains("active")) {
            this.prevGalleryImage();
          }
        }
      } else if (e.key === "ArrowRight") {
        const lightbox = document.getElementById("image-lightbox-modal");
        if (lightbox && lightbox.classList.contains("active")) {
          this.nextLightboxImage();
        } else {
          const detailModal = document.getElementById("property-detail-modal");
          if (detailModal && detailModal.classList.contains("active")) {
            this.nextGalleryImage();
          }
        }
      }
    });

    // 3. SCROLL-TO-TOP FLOATING BUTTON
    const scrollTopBtn = document.getElementById("scroll-top-btn");
    window.addEventListener("scroll", () => {
      if (scrollTopBtn) {
        if (window.scrollY > 350) {
          scrollTopBtn.classList.add("show");
        } else {
          scrollTopBtn.classList.remove("show");
        }
      }
    });

    // 4. Lead Magnet Form Submission
    const valuationForm = document.getElementById("lead-valuation-form");
    if (valuationForm) {
      valuationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("val-name").value;
        const phone = document.getElementById("val-phone").value;
        const locality = document.getElementById("val-locality").value;
        const ptype = document.getElementById("val-ptype").value;
        const area = parseFloat(document.getElementById("val-area").value) || 250;

        const valuation = Calculator.estimatePropertyValuation(locality, ptype, area, "sq.yd");

        CRM.addLead({
          name,
          phone,
          propertyTitle: `Valuation Request: ${area} sq.yd in ${locality}`,
          source: "Valuation Lead Magnet",
          inquiryType: "Property Valuation",
          notes: `Estimated Valuation: ${valuation.minDisplay} - ${valuation.maxDisplay}`
        });

        const resultEl = document.getElementById("valuation-result-box");
        if (resultEl) {
          resultEl.innerHTML = `
            <div style="background: #0b281d; color: #ffffff; padding: 1.5rem; border-radius: 12px; border: 1.5px solid #d4af37; margin-top: 1rem;">
              <h4 style="color: #d4af37; font-size: 1.1rem; margin-bottom: 0.5rem;">Estimated Market Valuation for ${name}</h4>
              <div style="font-size: 1.8rem; font-weight: 800; color: #a3e635;">${valuation.minDisplay} - ${valuation.maxDisplay}</div>
              <div style="font-size: 0.85rem; color: #c9ded4; margin-top: 0.5rem;">Annual Capital Growth: <strong>${valuation.growthYOY}</strong> • Rental Yield: <strong>${valuation.rentalYield}</strong></div>
              <p style="font-size: 0.8rem; color: #9cb5a8; margin-top: 0.75rem;">Rohit Jain has been notified and will call you on <strong>${phone}</strong> with the complete 2026 registry and allotment report.</p>
            </div>
          `;
        }

        this.showToast("Valuation calculated! Lead registered.");
      });
    }

    // 5. Schedule Site Visit Form inside Modal
    const scheduleForm = document.getElementById("modal-schedule-visit-form");
    if (scheduleForm) {
      scheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("sched-name").value;
        const phone = document.getElementById("sched-phone").value;
        const date = document.getElementById("sched-date").value;
        const prop = this.currentDetailProperty;

        CRM.addLead({
          name,
          phone,
          propertyId: prop ? prop.id : null,
          propertyTitle: prop ? prop.title : "Site Visit Request",
          source: "Property Detail Visit Form",
          inquiryType: "Schedule Site Visit",
          notes: `Preferred visit date: ${date}`
        });

        this.showToast("🎉 Site visit scheduled! Rohit Jain will confirm your slot.");
        scheduleForm.reset();
      });
    }

    // 6. Filter Change Listeners
    const locFilter = document.getElementById("filter-locality-select");
    if (locFilter) {
      locFilter.addEventListener("change", (e) => {
        this.activeFilter.locality = e.target.value;
        this.renderProperties();
      });
    }

    const catFilter = document.getElementById("filter-category-select");
    if (catFilter) {
      catFilter.addEventListener("change", (e) => {
        this.activeFilter.category = e.target.value;
        this.renderProperties();
      });
    }

    const sortFilter = document.getElementById("filter-sort-select");
    if (sortFilter) {
      sortFilter.addEventListener("change", (e) => {
        this.activeFilter.sortBy = e.target.value;
        this.renderProperties();
      });
    }

    const searchInput = document.getElementById("property-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeFilter.searchQuery = e.target.value;
        this.renderProperties();
      });
    }
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
