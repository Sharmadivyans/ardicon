// ARDICON REALTORS PVT. LTD. - Mini-CRM & Lead Management Engine

const CRM = {
  LEADS_STORAGE_KEY: "ardicon_crm_leads",
  PROPERTIES_STORAGE_KEY: "ardicon_managed_properties",

  // Initialize CRM with realistic initial leads
  init() {
    if (!localStorage.getItem(this.LEADS_STORAGE_KEY)) {
      const defaultLeads = [
        {
          id: "lead-201",
          name: "Rajeshwar Mittal",
          phone: "9818234567",
          email: "rmittal@mittalsteel.com",
          propertyId: "ard-101",
          propertyTitle: "Prime Authority Residential Plot Sector 18 YEIDA",
          source: "Property Page Inquiry",
          inquiryType: "Schedule Site Visit",
          date: "2026-08-21 14:35",
          status: "site_visit",
          assignedAgent: "Rohit Jain",
          budget: "₹1.50 Cr",
          notes: "Interested in immediate registry. Visit planned for this Saturday 11:00 AM."
        },
        {
          id: "lead-202",
          name: "Deepak Khurana",
          phone: "9910456789",
          email: "deepak.k@nexussupply.in",
          propertyId: "ard-102",
          propertyTitle: "Heavy Industrial Land Parcel UPSIDC Ecotech / Site 5",
          source: "Website Direct Search",
          inquiryType: "WhatsApp Lead",
          date: "2026-08-20 11:20",
          status: "contacted",
          assignedAgent: "Rohit Jain",
          budget: "₹4.50 Cr",
          notes: "Looking for electronics manufacturing setup. Needs 3-phase power line NOC."
        },
        {
          id: "lead-203",
          name: "Ananya Deshmukh",
          phone: "9871122334",
          email: "ananya.d@gmail.com",
          propertyId: null,
          propertyTitle: "Valuation Lead - Sector 20 YEIDA",
          source: "Valuation Lead Magnet",
          inquiryType: "Property Valuation",
          date: "2026-08-19 16:45",
          status: "new",
          assignedAgent: "Rohit Jain",
          budget: "₹75 Lakh",
          notes: "Requested 2026 locality price report for Sector 20 Pocket U."
        },
        {
          id: "lead-204",
          name: "Harshvardhan Goel",
          phone: "9810998877",
          email: "hgoel@goelgroup.com",
          propertyId: "ard-104",
          propertyTitle: "Luxury 4 BHK Golf Course Villa in Jaypee Greens",
          source: "Hero Direct CTA",
          inquiryType: "VIP Consultation",
          date: "2026-08-18 09:15",
          status: "converted",
          assignedAgent: "Rohit Jain",
          budget: "₹4.00 Cr",
          notes: "Token amount received. Registry paperwork currently in progress with GNIDA."
        }
      ];
      localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(defaultLeads));
    }

    if (!localStorage.getItem(this.PROPERTIES_STORAGE_KEY)) {
      localStorage.setItem(this.PROPERTIES_STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    }
  },

  // Get all leads
  getLeads() {
    const raw = localStorage.getItem(this.LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  // Record a new Lead
  addLead(leadData) {
    const leads = this.getLeads();
    const newLead = {
      id: "lead-" + Date.now(),
      name: leadData.name || "Prospective Buyer",
      phone: leadData.phone || "N/A",
      email: leadData.email || "N/A",
      propertyId: leadData.propertyId || null,
      propertyTitle: leadData.propertyTitle || "General Inquiry / Locality Guide",
      source: leadData.source || "Website Form",
      inquiryType: leadData.inquiryType || "Direct Inquiry",
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "new",
      assignedAgent: "Rohit Jain",
      budget: leadData.budget || "Flexible",
      notes: leadData.notes || "Lead captured via website."
    };

    leads.unshift(newLead);
    localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(leads));
    return newLead;
  },

  // Update Lead Status
  updateLeadStatus(leadId, newStatus) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      lead.status = newStatus;
      localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(leads));
      return true;
    }
    return false;
  },

  // Update Lead Notes
  updateLeadNotes(leadId, notes) {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      lead.notes = notes;
      localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(leads));
      return true;
    }
    return false;
  },

  // Get All Managed Properties
  getProperties() {
    const raw = localStorage.getItem(this.PROPERTIES_STORAGE_KEY);
    let properties = raw ? JSON.parse(raw) : INITIAL_PROPERTIES;
    
    // Ensure all properties have a valid images array even if stored from older versions
    if (Array.isArray(properties)) {
      properties = properties.map(p => {
        if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
          const initMatch = (typeof INITIAL_PROPERTIES !== 'undefined') ? INITIAL_PROPERTIES.find(ip => ip.id === p.id) : null;
          if (initMatch && Array.isArray(initMatch.images) && initMatch.images.length > 0) {
            p.images = initMatch.images;
          } else if (p.image) {
            p.images = [p.image];
          } else {
            p.images = [
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ];
          }
        }
        return p;
      });
    }
    return properties;
  },

  // Add a newly submitted Property
  addProperty(propertyData) {
    const properties = this.getProperties();
    let propImages = propertyData.images;
    if (!propImages || !Array.isArray(propImages) || propImages.length === 0) {
      propImages = propertyData.image ? [propertyData.image] : [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ];
    }
    const newProp = {
      ...propertyData,
      id: "ard-" + Date.now(),
      images: propImages,
      status: "pending_approval",
      viewCount: 1,
      inquiryCount: 0
    };
    properties.unshift(newProp);
    localStorage.setItem(this.PROPERTIES_STORAGE_KEY, JSON.stringify(properties));
    return newProp;
  },

  // Toggle Property Approval
  togglePropertyStatus(propertyId, status) {
    const properties = this.getProperties();
    const prop = properties.find(p => p.id === propertyId);
    if (prop) {
      prop.status = status;
      localStorage.setItem(this.PROPERTIES_STORAGE_KEY, JSON.stringify(properties));
      return true;
    }
    return false;
  },

  // Calculate CRM & Performance Analytics
  getAnalytics() {
    const leads = this.getLeads();
    const properties = this.getProperties();

    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === "new").length;
    const activeSiteVisits = leads.filter(l => l.status === "site_visit").length;
    const convertedLeads = leads.filter(l => l.status === "converted").length;
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

    return {
      totalLeads,
      newLeads,
      activeSiteVisits,
      convertedLeads,
      conversionRate: `${conversionRate}%`,
      totalProperties: properties.length,
      featuredCount: properties.filter(p => p.featured).length
    };
  },

  // Export Leads as CSV
  exportLeadsCSV() {
    const leads = this.getLeads();
    if (leads.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Phone,Email,Property,Source,Type,Status,Assigned Agent,Date,Notes\n";

    leads.forEach(l => {
      const row = [
        l.id,
        `"${l.name}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.propertyTitle}"`,
        `"${l.source}"`,
        `"${l.inquiryType}"`,
        `"${l.status}"`,
        `"${l.assignedAgent}"`,
        `"${l.date}"`,
        `"${l.notes.replace(/"/g, '""')}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ardicon_leads_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

CRM.init();
