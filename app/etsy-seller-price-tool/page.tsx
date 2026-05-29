"use client";

import React, { useState, useEffect } from "react";
import {
  Percent,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Code,
  Coins,
  Database,
  TrendingUp,
  Info,
  Calculator,
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  Tag,
  Gem,
  CircleUser,
  LogOut,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, X } from "lucide-react";

// Firebase App persistence imports safely integrated
// import { initializeApp, getApps, getApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithCustomToken,
//   signInAnonymously,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { RiMenu3Fill } from "react-icons/ri";
import Menu from "@/components/helper/Menu";
import Footer from "@/components/helper/Footer";
import Link from "next/link";

// Initialize Firebase dynamically to ensure no crashes on local setups without configuration
// let app: any;
// let auth: any;
// let db: any;
// // const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// const appId = "default-app-id";

// try {
//   if (typeof __firebase_config !== "undefined" && __firebase_config) {
//     const firebaseConfig = JSON.parse(__firebase_config);
//     app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
//     auth = getAuth(app);
//     db = getFirestore(app);
//   }
// } catch (e) {
//   console.warn("Firebase initialization skipped or failed:", e);
// }

// Inline SVG components to replace external react-icons
const RiMenu3FillSvg = () => (
  <svg
    className="text-[#dad9d6]"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z" />
  </svg>
);

const GoLinkSvg = () => (
  <svg
    className="h-5 w-5 text-[#F1641E]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState("calculator"); // 'calculator' or 'code'
  const [activeCodeTab, setActiveCodeTab] = useState("nextjs"); // 'nextjs', 'express', 'mongodb'
  const [openMenu, setOpenMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState(false);

  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openForgotModal, setOpenForgotModal] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const [signupLoading, setSignupLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const [forgotStep, setForgotStep] = useState(1);

  const [forgotOtp, setForgotOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Multi-Select Stone Category State (Default has Moissanite selected)
  const [selectedCategories, setSelectedCategories] = useState(["Moissanite"]);

  // Product Metadata
  const [itemName, setItemName] = useState("Classic Solitaire Ring");
  const [sku, setSku] = useState("JW-RING-001");
  const [shape, setShape] = useState("Round");
  const [solMm, setSolMm] = useState("6.5 mm");

  // Real-Time Google Sheets Configuration
  const [sheetId, setSheetId] = useState(
    "1BxiMVs0XRA5nFMdKv1a6pbtS9ypmH1viZg-5XJb1a-k",
  ); // Sheet ID for display/CSV
  // const [webAppUrl, setWebAppUrl] = useState(""); // USER'S COPIED GOOGLE APPS SCRIPT WEB APP URL
  const [webAppUrl, setWebAppUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("googleWebAppUrl") || "";
    }
    return "";
  });

  // Form State - Gold & Silver Master Rates
  const [gold24k10g, setGold24k10g] = useState(72000); // 10g of 24k Gold
  const [silver10g, setSilver10g] = useState(850); // 10g of Silver

  // Custom multipliers/ratios relative to 24K Gold
  const gold18kRatio = 18 / 24; // 0.75
  const gold14kRatio = 14 / 24; // 0.5833
  const gold10kRatio = 10 / 24; // 0.4167
  const platinumRatio = 1.2; // Configured 1.2x of 24k gold price per gram

  // Multi-Category Stone Master Rates (per carat)
  const [mosoMainRate, setMosoMainRate] = useState(120000);
  const [mosoSideRate, setMosoSideRate] = useState(85000);

  const [labMainRate, setLabMainRate] = useState(150000);
  const [labSideRate, setLabSideRate] = useState(95000);

  const [natMainRate, setNatMainRate] = useState(350000);
  const [natSideRate, setNatSideRate] = useState(180000);

  // Labour charges (Default 750 per gram)
  const [laborPerGram, setLaborPerGram] = useState(750);

  // Other flat charges in Rs / Currency (Flat absolute addition)
  const [otherCharges, setOtherCharges] = useState(1500);

  // User Item Requirements
  const [metalWeight, setMetalWeight] = useState(5.5); // grams
  const [mainStoneWeight, setMainStoneWeight] = useState(1.0); // carat weight
  const [sideStoneWeight, setSideStoneWeight] = useState(0.25); // side carat weight

  // Etsy Fee, Profit Margin, Sale Config (Sliders & Manual Inputs)
  const [etsyFeePercent, setEtsyFeePercent] = useState(9.5); // Etsy transaction + processing fees %
  const [profitPercent, setProfitPercent] = useState(40); // Profit markup %
  const [salePercent, setSalePercent] = useState(30); // Active Etsy Shop sale percentage (e.g. 30%)

  // Choice of Export Price is hardcoded to 'listing' to prevent any loss of margin
  const exportPriceType = "listing";

  // Live Simulated "Existing Excel Sheet" State matching your column structure
  // const [excelRows, setExcelRows] = useState([]);
  // const [excelRows, setExcelRows] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const savedRows = localStorage.getItem("etsyExcelRows");
  //     return savedRows ? JSON.parse(savedRows) : [];
  //   }
  //   return [];
  // });
  // const [excelRows, setExcelRows] = useState([]);
  const [excelRows, setExcelRows] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);

  // Confirmation Modal State
  const [confirmModalData, setConfirmModalData] = useState<{
    type: "single" | "all";
    index: number | null;
    sku: string;
    srNo: number | null;
  }>({
    type: "single",
    index: null,
    sku: "",
    srNo: null,
  });

  // UI feedback states
  const [copiedText, setCopiedText] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  // Firebase user state
  // const [fbUser, setFbUser] = useState(null);

  // Preview tab within the Live Pricing matrix (Moissanite, Lab Grown, or Natural view)
  const [previewTab, setPreviewTab] = useState("Moissanite");

  // Convert inputs to per-gram costs
  const gold24kPerGram = gold24k10g / 10;
  const silverPerGram = silver10g / 10;

  // Deriving rates for other purities based on gold 24k per gram
  const gold18kPerGram = gold24kPerGram * gold18kRatio;
  const gold14kPerGram = gold24kPerGram * gold14kRatio;
  const gold10kPerGram = gold24kPerGram * gold10kRatio;
  const platinumPerGram = gold24kPerGram * platinumRatio;

  // Authentication & Settings Data Stream listener
  // useEffect(() => {
  //   if (!auth) return;
  //   const initAuth = async () => {
  //     try {
  //       if (
  //         typeof __initial_auth_token !== "undefined" &&
  //         __initial_auth_token
  //       ) {
  //         await signInWithCustomToken(auth, __initial_auth_token);
  //       } else {
  //         await signInAnonymously(auth);
  //       }
  //     } catch (err) {
  //       console.warn("Auth initialization skipped:", err);
  //     }
  //   };
  //   initAuth();
  //   const unsubscribe = onAuthStateChanged(auth, setFbUser);
  //   return () => unsubscribe();
  // }, []);

  // Fetch the saved Web App URL from the database once authenticated
  // useEffect(() => {
  //   if (!db || !fbUser) return;
  //   const loadSavedSettings = async () => {
  //     try {
  //       const docRef = doc(
  //         db,
  //         "artifacts",
  //         appId,
  //         "users",
  //         fbUser.uid,
  //         "settings",
  //         "config",
  //       );
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists() && docSnap.data().webAppUrl) {
  //         setWebAppUrl(docSnap.data().webAppUrl);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch saved URL config:", err);
  //     }
  //   };
  //   loadSavedSettings();
  // }, [fbUser]);

  useEffect(() => {
    localStorage.setItem("etsyExcelRows", JSON.stringify(excelRows));
  }, [excelRows]);

  useEffect(() => {
    getMyProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry) {
      setIsLoggedIn(false);
      return;
    }

    if (Date.now() > Number(expiry)) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("tokenExpiry");

      setExcelRows([]);
      setIsLoggedIn(false);

      toast.error("Session expired. Please login again.");
      return;
    }

    setIsLoggedIn(true);
  }, []);

  // Saves the Web App URL config securely inside the user-specific settings path
  // const saveUrlConfig = async (url) => {
  //   if (!db || !fbUser) return;
  //   try {
  //     const docRef = doc(
  //       db,
  //       "artifacts",
  //       appId,
  //       "users",
  //       fbUser.uid,
  //       "settings",
  //       "config",
  //     );
  //     await setDoc(docRef, { webAppUrl: url }, { merge: true });
  //   } catch (err) {
  //     console.error("Failed to persist URL config:", err);
  //   }
  // };

  const handleLogin = async () => {
    try {
      if (!loginData.email || !loginData.password) {
        toast.error("All fields are required");
        return;
      }

      setLoginLoading(true);

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      // localStorage.setItem("userToken", data.token);

      localStorage.setItem("userToken", data.token);

      const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpiry", expiryTime.toString());

      setIsLoggedIn(true);

      await getMyProducts();

      setOpenLoginModal(false);

      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("etsyExcelRows");

    setExcelRows([]);
    setIsLoggedIn(false);

    toast.success("Logout successful");
  };

  const handleSignup = async () => {
    try {
      if (
        !signupData.name ||
        !signupData.email ||
        !signupData.mobile ||
        !signupData.password ||
        !signupData.confirmPassword
      ) {
        toast.error("All fields are required");
        return;
      }

      if (!/^\d{10}$/.test(signupData.mobile)) {
        toast.error("Mobile number must be exactly 10 digits");
        return;
      }

      if (signupData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      if (signupData.password !== signupData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setSignupLoading(true);

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully");

      setOpenSignupModal(false);
      setOpenLoginModal(true);

      setSignupData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!forgotEmail) {
        toast.error("Email is required");
        return;
      }

      setForgotLoading(true);

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/user/send-forgot-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotEmail,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success("OTP sent successfully");

      setForgotStep(2);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!forgotOtp || !newPassword || !confirmNewPassword) {
        toast.error("All fields are required");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setForgotLoading(true);

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/user/verify-forgot-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotEmail,
            otp: forgotOtp,
            password: newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "OTP verification failed");
        return;
      }

      toast.success("Password changed successfully");

      setOpenForgotModal(false);

      setForgotStep(1);

      setForgotEmail("");
      setForgotOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setForgotLoading(false);
    }
  };

  // Ensure our live matrix preview tab switches to a valid selected category if possible
  useEffect(() => {
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(previewTab)
    ) {
      setPreviewTab(selectedCategories[0]);
    }
  }, [selectedCategories]);

  // Helper routine to execute the sequential pricing pipeline for any category/rates
  const calculateCategoryPrices = (mainRate: number, sideRate: number) => {
    const metals = [
      { name: "Silver", ratePerGram: silverPerGram, key: "silver" },
      { name: "Gold 10K", ratePerGram: gold10kPerGram, key: "g10k" },
      { name: "Gold 14K", ratePerGram: gold14kPerGram, key: "g14k" },
      { name: "Gold 18K", ratePerGram: gold18kPerGram, key: "g18k" },
      { name: "Platinum", ratePerGram: platinumPerGram, key: "platinum" },
    ];

    // const flatOtherCharges = parseFloat(otherCharges) || 0;
    const flatOtherCharges = Number(otherCharges) || 0;

    return metals.map((metal) => {
      const metalCost = metalWeight * metal.ratePerGram;
      const laborCost = metalWeight * laborPerGram;
      const mainStoneCost = mainStoneWeight * mainRate;
      const sideStoneCost = sideStoneWeight * sideRate;

      // Raw cost adds metal + labor + main + side + absolute flat other charges in Rs
      const totalBaseCost =
        metalCost +
        laborCost +
        mainStoneCost +
        sideStoneCost +
        flatOtherCharges;

      // Pipeline Steps (Restored Reverse Discount Method to guard profit percentages):
      // Step A: Base making price + Etsy fee %
      const costWithEtsyFee = totalBaseCost * (1 + etsyFeePercent / 100);

      // Step B: Add Profit Margin % (This establishes the Sale Price)
      const salePrice = costWithEtsyFee * (1 + profitPercent / 100);

      // Step C: REVERSED DISCOUNT FORMULA
      // Listing Price = Sale Price / (1 - Sale %)
      const divisorSale = 1 - salePercent / 100;
      const listingPrice =
        divisorSale > 0 ? salePrice / divisorSale : salePrice;

      // Calculated Net profits & Fee Breakdown
      const actualEtsyFeeAmount = salePrice * (etsyFeePercent / 100);
      const actualNetProfit = salePrice - actualEtsyFeeAmount - totalBaseCost;

      return {
        metalName: metal.name,
        metalKey: metal.key,
        totalBaseCost: totalBaseCost.toFixed(2),
        listingPrice: listingPrice.toFixed(2),
        salePrice: salePrice.toFixed(2),
        actualNetProfit: actualNetProfit.toFixed(2),
      };
    });
  };

  // Get pricing dynamically for the currently active tab preview
  const getActivePreviewData = () => {
    if (previewTab === "Moissanite") {
      return calculateCategoryPrices(mosoMainRate, mosoSideRate);
    } else if (previewTab === "Lab Grown") {
      return calculateCategoryPrices(labMainRate, labSideRate);
    } else if (previewTab === "Natural") {
      return calculateCategoryPrices(natMainRate, natSideRate);
    }
    return [];
  };

  // Toggle multi-select categories safely
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories((prev) => prev.filter((c) => c !== category));
      }
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // Calculates, appends to local log, and streams to Google Sheets Web App
  const addCurrentSKUToExcel = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setShowLoginRequiredModal(true);
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one active stone category in Step 1.");
      return;
    }

    const mosoCalculations = calculateCategoryPrices(
      mosoMainRate,
      mosoSideRate,
    );
    const labCalculations = calculateCategoryPrices(labMainRate, labSideRate);
    const natCalculations = calculateCategoryPrices(natMainRate, natSideRate);

    const getPriceValue = (dataset: any, metalKey: string) => {
      const found = dataset.find((item: any) => item.metalKey === metalKey);
      if (!found) return "";
      return exportPriceType === "listing"
        ? found.listingPrice
        : found.salePrice;
    };

    const newRow = {
      srNo: excelRows.length + 1,
      item: itemName || "Jewelry Piece",
      sku: sku || "N/A",
      shape: shape || "Round",
      sideDiaWt: sideStoneWeight.toFixed(2),
      solMm: solMm || "N/A",
      solWt: mainStoneWeight.toFixed(2),

      // Default blank values
      silMoso: "",
      g10kMoso: "",
      g14kMoso: "",
      g18kMoso: "",
      platMoso: "",
      silLab: "",
      g10kLab: "",
      g14kLab: "",
      g18kLab: "",
      platLab: "",
      silNat: "",
      g10kNat: "",
      g14kNat: "",
      g18kNat: "",
      platNat: "",
    };

    // Fill categories that are selected
    if (selectedCategories.includes("Moissanite")) {
      newRow.silMoso = getPriceValue(mosoCalculations, "silver");
      newRow.g10kMoso = getPriceValue(mosoCalculations, "g10k");
      newRow.g14kMoso = getPriceValue(mosoCalculations, "g14k");
      newRow.g18kMoso = getPriceValue(mosoCalculations, "g18k");
      newRow.platMoso = getPriceValue(mosoCalculations, "platinum");
    }

    if (selectedCategories.includes("Lab Grown")) {
      newRow.silLab = getPriceValue(labCalculations, "silver");
      newRow.g10kLab = getPriceValue(labCalculations, "g10k");
      newRow.g14kLab = getPriceValue(labCalculations, "g14k");
      newRow.g18kLab = getPriceValue(labCalculations, "g18k");
      newRow.platLab = getPriceValue(labCalculations, "platinum");
    }

    if (selectedCategories.includes("Natural")) {
      newRow.silNat = getPriceValue(natCalculations, "silver");
      newRow.g10kNat = getPriceValue(natCalculations, "g10k");
      newRow.g14kNat = getPriceValue(natCalculations, "g14k");
      newRow.g18kNat = getPriceValue(natCalculations, "g18k");
      newRow.platNat = getPriceValue(natCalculations, "platinum");
    }

    // 1. Update local UI log
    setExcelRows((prev) => [...prev, newRow]);

    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token || "",
          },
          body: JSON.stringify(newRow),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save product");
        return;
      }

      toast.success("Product added successfully");
      getMyProducts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    // 2. Compile flat row data array matching Excel column structures
    const flatRowArray = [
      newRow.srNo,
      newRow.item,
      newRow.sku,
      newRow.shape,
      newRow.sideDiaWt,
      newRow.solMm,
      newRow.solWt,
      newRow.silMoso,
      newRow.g10kMoso,
      newRow.g14kMoso,
      newRow.g18kMoso,
      newRow.platMoso,
      newRow.silLab,
      newRow.g10kLab,
      newRow.g14kLab,
      newRow.g18kLab,
      newRow.platLab,
      newRow.silNat,
      newRow.g10kNat,
      newRow.g14kNat,
      newRow.g18kNat,
      newRow.platNat,
    ];

    // 3. Securely stream directly to user's Google Sheet Web App if URL is provided
    if (webAppUrl && webAppUrl.trim() !== "") {
      setSuccessAlert(
        `Calculations completed! Streaming SKU "${sku}" to your live Google Sheet...`,
      );

      fetch(webAppUrl.trim(), {
        method: "POST",
        mode: "no-cors", // Solves Google's redirect CORS limitation flawlessly
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rowData: flatRowArray }),
      })
        .then(() => {
          const successMessage = `SKU "${sku}" Successfully Saved in Live Excel Log Sheet!`;

          setSuccessAlert(successMessage);
          toast.success(successMessage);
          setTimeout(() => setSuccessAlert(""), 6000);
        })
        .catch((err) => {
          console.error("Sheets stream error: ", err);
          setSuccessAlert(
            `Error: Could not sync to Google Sheet. Data saved inside the browser excel log.`,
          );
          setTimeout(() => setSuccessAlert(""), 6000);
        });
    } else {
      setSuccessAlert(
        `Added locally! (Configure your Google Web App URL on the left to sync directly to Google Sheets).`,
      );
      setTimeout(() => setSuccessAlert(""), 5000);
    }
  };

  const getMyProducts = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) return;

      const response = await fetch(
        "https://techsoulstudio-back.onrender.com/api/product/my-products",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch products");
        return;
      }

      setExcelRows(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Initiates single row delete confirmation modal
  const confirmRemoveExcelRow = (index: number) => {
    const row = excelRows[index];
    setConfirmModalData({
      type: "single",
      index: index,
      sku: row.sku,
      srNo: row.srNo,
    });
    setShowConfirmModal(true);
  };

  // Initiates clear all log sheet confirmation modal
  const confirmClearExcelLog = () => {
    setConfirmModalData({
      type: "all",
      index: null,
      sku: "",
      srNo: null,
    });
    setShowConfirmModal(true);
  };

  // Handles actual confirmation delete execution
  const executeDeleteAction = () => {
    if (confirmModalData.type === "single" && confirmModalData.index !== null) {
      const indexToDelete = confirmModalData.index;
      const rowToDelete = excelRows[indexToDelete];

      // 1. Update local UI log
      // setExcelRows((prev) => prev.filter((_, i) => i !== indexToDelete));
      const deleteSingleProduct = async () => {
        try {
          const token = localStorage.getItem("userToken");

          const response = await fetch(
            `https://techsoulstudio-back.onrender.com/api/product/delete-product/${rowToDelete._id}`,
            {
              method: "DELETE",
              headers: {
                authorization: token || "",
              },
            },
          );

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || "Delete failed");
            return;
          }

          toast.success("Product deleted successfully");

          // Refresh products
          getMyProducts();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

      deleteSingleProduct();

      // 2. Stream delete request to Google Sheet Web App if configured
      if (webAppUrl && webAppUrl.trim() !== "") {
        setSuccessAlert(
          `Deleting SKU "${rowToDelete.sku}" from your live Google Sheet...`,
        );

        fetch(webAppUrl.trim(), {
          method: "POST",
          mode: "no-cors", // Solves Google's redirect CORS limitation flawlessly
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "delete",
            sku: rowToDelete.sku,
            srNo: rowToDelete.srNo,
          }),
        })
          .then(() => {
            setSuccessAlert(
              `SKU "${rowToDelete.sku}" successfully removed from local grid & synced delete request with your Google Sheet!`,
            );
            setTimeout(() => setSuccessAlert(""), 6000);
          })
          .catch((err) => {
            console.error("Sheets delete error: ", err);
            setSuccessAlert(
              `Error: Could not sync delete. Data removed locally inside browser Excel log.`,
            );
            setTimeout(() => setSuccessAlert(""), 6000);
          });
      } else {
        setSuccessAlert(`Removed locally!`);
        setTimeout(() => setSuccessAlert(""), 4000);
      }
    } else if (confirmModalData.type === "all") {
      const deleteAllProducts = async () => {
        try {
          const token = localStorage.getItem("userToken");

          const response = await fetch(
            "https://techsoulstudio-back.onrender.com/api/product/delete-all-products",
            {
              method: "DELETE",
              headers: {
                authorization: token || "",
              },
            },
          );

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || "Delete failed");
            return;
          }

          toast.success("All products deleted successfully");

          setExcelRows([]);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

      deleteAllProducts();
      setSuccessAlert("Local Excel Log Sheet successfully cleared.");
      setTimeout(() => setSuccessAlert(""), 4000);
    }

    // Reset confirmation states
    setShowConfirmModal(false);
    setConfirmModalData({ type: "single", index: null, sku: "", srNo: null });
  };

  // Modern Native XLSX Sheet Exporter utilizing SheetJS with dynamic import safeguards
  const downloadExcelSheet = () => {
    const runExport = () => {
      const XLSX = (window as any).XLSX;
      if (!XLSX) return;

      const aoaData = [
        [
          "General Metadata",
          "",
          "",
          "",
          "SIDE",
          "Size",
          "MAIN",
          "Moissanite Columns (MOSO)",
          "",
          "",
          "",
          "",
          "Lab Grown Columns (LAB)",
          "",
          "",
          "",
          "",
          "Natural Diamond Columns (NAT)",
          "",
          "",
          "",
          "",
        ],
        [
          "SR.NO",
          "ITEM",
          "SKU",
          "SHAPE",
          "DIA WT.",
          "SOL MM",
          "SOL WT.",
          "SIL MOSO",
          "10K MOSO",
          "14K MOSO",
          "18K MOSO",
          "Plat Moso",
          "SIL LAB",
          "10K LAB",
          "14K LAB",
          "18K LAB",
          "Plat Lab",
          "SIL NAT",
          "10K NAT",
          "14K NAT",
          "18K NAT",
          "Plat Nat",
        ],
      ];

      excelRows.forEach((row) => {
        aoaData.push([
          row.srNo,
          row.item,
          row.sku,
          row.shape,
          row.sideDiaWt,
          row.solMm,
          row.solWt,
          row.silMoso,
          row.g10kMoso,
          row.g14kMoso,
          row.g18kMoso,
          row.platMoso,
          row.silLab,
          row.g10kLab,
          row.g14kLab,
          row.g18kLab,
          row.platLab,
          row.silNat,
          row.g10kNat,
          row.g14kNat,
          row.g18kNat,
          row.platNat,
        ]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

      worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
        { s: { r: 0, c: 7 }, e: { r: 0, c: 11 } },
        { s: { r: 0, c: 12 }, e: { r: 0, c: 16 } },
        { s: { r: 0, c: 17 }, e: { r: 0, c: 21 } },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Catalog Records");
      XLSX.writeFile(
        workbook,
        `Etsy_Master_Jewelry_Catalog_${sku || "All"}.xlsx`,
      );
    };

    if (!(window as any).XLSX) {
      setSuccessAlert("Preparing Excel download module...");
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
      script.onload = () => {
        setSuccessAlert("");
        runExport();
      };
      script.onerror = () => {
        alert("Failed to load Excel module.");
      };
      document.head.appendChild(script);
    } else {
      runExport();
    }
  };

  const handleCopyToClipboard = (text = "", type = "sku") => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopiedText(type);
    setTimeout(() => setCopiedText(""), 3000);
  };

  // Backend Integration Docs mapping the direct front-end fetch POST strategy
  const nextJSCode = `// pages/api/add-to-sheets.js (Next.js serverless route / Backend Sheets Stream)
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { spreadsheetId, rowData } = req.body;
    
    // Securely forwards payload to Express API or processes natively
    const response = await axios.post('https://techsoulstudio-back.onrender.com/api/sheets/append', {
      spreadsheetId,
      rowData
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}`;

  const expressCode = `// server.js (Express.js backend with Google Sheets JWT Service Account Integration)
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Google JWT Authentication securely on the backend
const googleAuth = new google.auth.GoogleAuth({
  keyFile: './google-credentials.json', // Path to your downloaded service-account JSON key
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth: googleAuth });

app.post('/api/sheets/append', async (req, res) => {
  const { spreadsheetId, rowData } = req.body;

  try {
    // Appends the calculated jewelry row as the last row in Sheet1
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:V', // Matching columns A to V from your excel structure
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log('Jewelry secure sync service on port 5000'));`;

  const mongoCode = `// Google App Script Web App Alternative (Supports Live Row Insertion & Live Deletion)
// 1. Open your Google Sheet -> Click Extensions -> Apps Script
// 2. Clear old code and paste this:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = JSON.parse(e.postData.contents);
    
    if (payload.action === 'delete') {
      // Find the row by matching both SKU and SR.NO, then delete it
      var data = sheet.getDataRange().getValues();
      var skuToDelete = payload.sku;
      var srNoToDelete = payload.srNo;
      var deleted = false;
      
      // Loop backwards to preserve correct index positions during deletion
      for (var i = data.length - 1; i >= 1; i--) {
        if (data[i][2] == skuToDelete && data[i][0] == srNoToDelete) {
          sheet.deleteRow(i + 1); // 1-based index in Sheet
          deleted = true;
          break; // Delete the matching row and exit loop
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ "result": "success", "action": "delete", "deleted": deleted }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Appends the formatted row directly
      sheet.appendRow(payload.rowData);
      
      return ContentService.createTextOutput(JSON.stringify({ "result": "success", "action": "append" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 3. Click Deploy -> New Deployment -> Select "Web App"
// 4. Set Execute as: "Me" & Who has access: "Anyone"
// 5. Deploy, copy the "Web App URL" and paste it into the "Google Sheets Direct Stream" card!`;

  return (
    <div className="min-h-screen bg-[#5a5d59] text-[#DAD9D6] font-sans selection:bg-[#F1641E]/20 selection:text-[#BCBCB4] relative">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1800,
          style: {
            background: "#424441",
            color: "#DAD9D6",
            border: "1px solid #6e716d",
          },
        }}
      />
      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#424441] border border-[#6e716d] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#F1641E]">
              <AlertCircle className="h-6 w-6 stroke-[2]" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-md text-[#DAD9D6]">
              {confirmModalData.type === "all"
                ? "Are you sure you want to clear all log entries? This action will empty your local log sheet."
                : `Are you sure you want to delete SKU "${confirmModalData.sku}" (SR.NO: ${confirmModalData.srNo})? This will remove the row locally and send a delete request to your connected Google Sheet.`}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmModalData({
                    type: "single",
                    index: null,
                    sku: "",
                    srNo: null,
                  });
                }}
                className="px-4 py-2 rounded-lg bg-[#363835] hover:bg-[#4d4f4c] text-[#BCBCB4] font-semibold text-sm transition-colors cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                onClick={executeDeleteAction}
                className="px-4 py-2 rounded-lg bg-[#F1641E] hover:bg-[#d85312] text-[#DAD9D0] font-bold text-sm transition-colors shadow shadow-[#F1641E]/10 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginRequiredModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowLoginRequiredModal(false)}
          />

          <div className="relative bg-[#424441] border border-[#6e716d] rounded-3xl max-w-md w-full p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            <div className="flex justify-center mb-5">
              <div className="h-20 w-20 rounded-full bg-[#F1641E]/15 border border-[#F1641E]/30 flex items-center justify-center">
                <CircleUser className="h-10 w-10 text-[#F1641E]" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Login Required
              </h2>

              <p className="text-[#BCBCB4] leading-relaxed">
                Please login first to save products in your Etsy catalog, manage
                pricing records, and access your personal inventory.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setShowLoginRequiredModal(false);
                  setOpenLoginModal(true);
                }}
                className="w-full py-3 rounded-xl bg-[#F1641E] hover:bg-[#d85312] text-white font-bold transition-all cursor-pointer"
              >
                Login Now
              </button>

              <button
                onClick={() => setShowLoginRequiredModal(false)}
                className="w-full py-3 rounded-xl border border-[#6e716d] text-[#BCBCB4] hover:bg-[#363835] transition-all cursor-pointer"
              >
                Maybe Later
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#8e908d]">
              <Check className="h-4 w-4 text-green-500" />
              Secure account-based product storage
            </div>
          </div>
        </div>
      )}

      {/* Top Banner / Navigation Header */}
      <header className="border-b border-[#6e716d] bg-[#424441]/60 backdrop-blur-md sticky top-0 z-50 py-3">
        <div className="max-w-8xl mx-auto px-10 flex items-center justify-between">
          <div>
            <span className="text-4xl font-bold block cursor-pointer">
              TechsoulStudio
            </span>
            <p className="text-lg text-[#DAD9D6] font-medium">
              Best Etsy Management Agency in Surat
            </p>
          </div>
          <div className="fixed top-4 right-10 z-50 flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-[#DAD9D6] cursor-pointer"
              >
                <LogOut className="h-8 w-8 stroke-[2]" />
              </button>
            ) : (
              <button
                onClick={() => setOpenLoginModal(true)}
                className="text-[#DAD9D6] cursor-pointer"
              >
                <CircleUser className="h-8 w-8 stroke-[2]" />
              </button>
            )}
            <button
              onClick={() => setOpenMenu(true)}
              className=" text-white cursor-pointer"
            >
              <RiMenu3FillSvg />
              <span className="sr-only">Open Menu</span>
            </button>
          </div>

          {openMenu && <Menu onClose={() => setOpenMenu(false)} />}
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-10 flex items-center justify-between pt-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#DAD9D6] flex items-center gap-1.5 font-sans">
              Etsy Jewelry Profit Calculator for Sellers
            </h1>
            <p className="text-lg text-[#DAD9D6] font-medium">
              Calculate Etsy jewelry pricing, fees, profits, and revenue
              instantly.
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-2 bg-[#363835] p-1 rounded-xl border border-[#4d4f4c]"> */}
        {/* <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-md font-semibold tracking-wide transition-all ${
              activeTab === "calculator"
                ? "bg-[#F1641E] text-[#DAD9D0] shadow-md shadow-[#F1641E]/10"
                : "text-[#DAD9D6] hover:text-[#BCBCB4]"
            }`}
          >
            <Calculator className="h-4 w-4" />
            Pricing Engine
          </button> */}
        {/* <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-md font-semibold tracking-wide transition-all ${
              activeTab === "code"
                ? "bg-[#F1641E] text-[#DAD9D0] shadow-md shadow-[#F1641E]/10"
                : "text-[#DAD9D6] hover:text-[#BCBCB4]"
            }`}
          >
            <Code className="h-4 w-4" />
            Sheets Integration API
          </button> */}
        {/* </div> */}
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 lg:px-8 max-w-8xl w-full mx-auto">
        {/* Success Alert Banner */}
        {successAlert && (
          <div className="mb-6 p-4 bg-amber-550/10 border border-amber-550/30 text-amber-400 rounded-xl text-xs flex items-center gap-2 shadow-lg animate-pulse">
            <Check className="h-4 w-4 stroke-[3]" />
            {successAlert}
          </div>
        )}

        {activeTab === "calculator" ? (
          <div className="space-y-6">
            {/* Stepper Step 1: MULTI-SELECT CATEGORY SELECTOR CARD */}
            <div className="bg-[#424441] border border-[#6e716d] p-6 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-wider text-[#F1641E] uppercase flex items-center gap-2">
                    <Gem className="h-5 w-5 text-[#F1641E]" />
                    Select Active Stone Categories (Select Multiple)
                  </h2>
                  <p className="text-md text-[#DAD9D6] mt-0.5">
                    Select multiple to fill and merge Moissanite, Lab, and
                    Natural fields in one row
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Moissanite option */}
                <button
                  onClick={() => toggleCategory("Moissanite")}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    selectedCategories.includes("Moissanite")
                      ? "bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10 text-[#BCBCB4]"
                      : "bg-[#363835] border-[#4d4f4c] hover:bg-[#4d4f4c] text-[#DAD9D6]"
                  }`}
                >
                  <div>
                    {/* <span className="text-xs text-[#DAD9D6]/60 block">
                      Category 01
                    </span> */}
                    <span className="text-sm font-bold">Moissanite (MOSO)</span>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedCategories.includes("Moissanite") ? "bg-blue-500 text-slate-950" : "border border-[#6e716d]"}`}
                  >
                    {selectedCategories.includes("Moissanite") ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-transparent" />
                    )}
                  </div>
                </button>

                {/* Lab Grown option */}
                <button
                  onClick={() => toggleCategory("Lab Grown")}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    selectedCategories.includes("Lab Grown")
                      ? "bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 text-[#BCBCB4]"
                      : "bg-[#363835] border-[#4d4f4c] hover:bg-[#4d4f4c] text-[#DAD9D6]"
                  }`}
                >
                  <div>
                    {/* <span className="text-xs text-[#DAD9D6]/60 block">
                      Category 02
                    </span> */}
                    <span className="text-sm font-bold">Lab Grown (LAB)</span>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedCategories.includes("Lab Grown") ? "bg-cyan-500 text-slate-950" : "border border-[#6e716d]"}`}
                  >
                    {selectedCategories.includes("Lab Grown") ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-transparent" />
                    )}
                  </div>
                </button>

                {/* Natural option */}
                <button
                  onClick={() => toggleCategory("Natural")}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    selectedCategories.includes("Natural")
                      ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 text-[#BCBCB4]"
                      : "bg-[#363835] border-[#4d4f4c] hover:bg-[#4d4f4c] text-[#DAD9D6]"
                  }`}
                >
                  <div>
                    {/* <span className="text-xs text-[#DAD9D6]/60 block">
                      Category 03
                    </span> */}
                    <span className="text-sm font-bold">
                      Natural Diamond (NAT)
                    </span>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedCategories.includes("Natural") ? "bg-emerald-500 text-slate-950" : "border border-[#6e716d]"}`}
                  >
                    {selectedCategories.includes("Natural") ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-transparent" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Form Settings (5 Cols) */}
              {/* <div className="md:col-span-5 flex flex-col gap-6"> */}
              {/* Card 0: Sheet ID & General Connection config */}
              {/* <div className="bg-[#424441] border border-[#6e716d] p-5 rounded-2xl shadow-xl space-y-4">
                  <div className="flex flex-col gap-2 pb-2 border-b border-[#6e716d]">
                    <div className="flex items-center gap-2">
                      <GoLinkSvg />
                      <h3 className="text-xl font-bold text-[#F1641E]">
                        1. Google Sheets Direct Stream
                      </h3>
                    </div>
                    <p className="text-md text-[#DAD9D6]">
                      Auto-append rows directly on calculation submit
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[15px] font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Google Web App URL
                    </label>
                    <input
                      type="text"
                      value={webAppUrl}
                      onChange={(e) => {
                        setWebAppUrl(e.target.value);
                        localStorage.setItem("googleWebAppUrl", e.target.value);
                      }}
                      onBlur={(e) => saveUrlConfig(e.target.value)}
                      placeholder="Paste deployment Web App URL here"
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                    <p className="text-[12px] text-[#DAD9D6]">
                      Enter your Google Apps Script Web App URL. Click outside
                      the input box to automatically save your URL!
                    </p>
                  </div>
                </div> */}

              {/* Card 1: Main Product Specs */}
              <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-5 shadow-xl">
                <h2 className="text-xl font-bold tracking-wide text-[#F1641E] uppercase flex items-center gap-2 mb-4 pb-3 border-b border-[#6e716d]">
                  <Tag className="h-5 w-5 text-[#F1641E]" />
                  1. Product Details & SKU
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Item Name / Description
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Vintage Halo Band"
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-sm text-[#BCBCB4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="e.g. JW-R01-MOS"
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Stone Shape
                    </label>
                    <select
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    >
                      <option value="Round">Round</option>
                      <option value="Cushion">Cushion</option>
                      <option value="Oval">Oval</option>
                      <option value="Princess">Princess</option>
                      <option value="Pear">Pear</option>
                      <option value="Marquise">Marquise</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Radiant">Radiant</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Sol MM (Size)
                    </label>
                    <input
                      type="text"
                      value={solMm}
                      onChange={(e) => setSolMm(e.target.value)}
                      placeholder="e.g. 6.5 mm"
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Sol Wt (Main Carats)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={mainStoneWeight}
                      onChange={(e) =>
                        setMainStoneWeight(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Side Dia Wt (Carat)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={sideStoneWeight}
                      onChange={(e) =>
                        setSideStoneWeight(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="block text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                      Metal Weight (g)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={metalWeight}
                      onChange={(e) =>
                        setMetalWeight(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full bg-[#363835] border border-[#4d4f4c] focus:border-[#F1641E] focus:ring-1 focus:ring-[#F1641E] rounded-lg py-2 px-3 text-xs text-[#BCBCB4]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Market Valuation Rates */}
              <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-5 shadow-xl">
                <h2 className="text-xl font-bold tracking-wide text-[#F1641E] uppercase flex items-center gap-2 mb-4 pb-3 border-b border-[#6e716d]">
                  <Coins className="h-5 w-5 text-[#F1641E]" />
                  2. Market Valuation Rates
                </h2>

                <div className="space-y-4">
                  {/* Metal master fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-md text-[#DAD9D6] uppercase font-bold">
                        24K Gold (10g)
                      </label>
                      <input
                        type="number"
                        value={gold24k10g}
                        onChange={(e) =>
                          setGold24k10g(Math.max(0, Number(e.target.value)))
                        }
                        className="w-full bg-[#363835] border border-[#4d4f4c] rounded-lg py-1.5 px-3 text-xs font-mono text-[#BCBCB4]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-md text-[#DAD9D6] uppercase font-bold">
                        Silver (10g)
                      </label>
                      <input
                        type="number"
                        value={silver10g}
                        onChange={(e) =>
                          setSilver10g(Math.max(0, Number(e.target.value)))
                        }
                        className="w-full bg-[#363835] border border-[#4d4f4c] rounded-lg py-1.5 px-3 text-xs font-mono text-[#BCBCB4]"
                      />
                    </div>
                  </div>

                  {/* Labor charges per gram & Other Flat Charges */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-md text-[#DAD9D6] uppercase font-bold">
                        Labor Per Gram
                      </label>
                      <input
                        type="number"
                        value={laborPerGram}
                        onChange={(e) =>
                          setLaborPerGram(Math.max(0, Number(e.target.value)))
                        }
                        className="w-full bg-[#363835] border border-[#4d4f4c] rounded-lg py-1.5 px-3 text-xs font-mono text-[#BCBCB4]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-md text-[#DAD9D6] uppercase font-bold">
                        Other Charges ({currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={otherCharges}
                        onChange={(e) =>
                          setOtherCharges(Math.max(0, Number(e.target.value)))
                        }
                        className="w-full bg-[#363835] border border-[#4d4f4c] rounded-lg py-1.5 px-3 text-xs font-mono text-[#BCBCB4]"
                      />
                    </div>
                  </div>

                  {/* Dynamic Category rates based on checkboxes */}
                  <div className="border-t border-[#6e716d] pt-3 space-y-3">
                    <span className="text-md text-[#DAD9D6] uppercase tracking-wider font-bold">
                      Active Stone Configurations
                    </span>

                    {/* Moissanite Rates */}
                    {selectedCategories.includes("Moissanite") && (
                      <div className="p-3 bg-[#BCBCB4] border border-blue-900/30 rounded-xl space-y-2 mt-5">
                        <span className="text-lg font-bold text-[#424441] block uppercase">
                          Moissanite (MOSO) Rates
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Main Per Carat
                            </label>
                            <input
                              type="number"
                              value={mosoMainRate}
                              onChange={(e) =>
                                setMosoMainRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Side Per Carat
                            </label>
                            <input
                              type="number"
                              value={mosoSideRate}
                              onChange={(e) =>
                                setMosoSideRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lab Grown Rates */}
                    {selectedCategories.includes("Lab Grown") && (
                      <div className="p-3 bg-[#BCBCB4] border border-cyan-900/30 rounded-xl space-y-2 mt-5">
                        <span className="text-lg font-bold text-[#424441] block uppercase">
                          Lab Grown (LAB) Rates
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Main Per Carat
                            </label>
                            <input
                              type="number"
                              value={labMainRate}
                              onChange={(e) =>
                                setLabMainRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Side Per Carat
                            </label>
                            <input
                              type="number"
                              value={labSideRate}
                              onChange={(e) =>
                                setLabSideRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Natural Diamond Rates */}
                    {selectedCategories.includes("Natural") && (
                      <div className="p-3 bg-[#BCBCB4] border border-emerald-900/30 rounded-xl space-y-2 mt-5">
                        <span className="text-lg font-bold text-[#424441] block uppercase">
                          Natural (NAT) Rates
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Main Per Carat
                            </label>
                            <input
                              type="number"
                              value={natMainRate}
                              onChange={(e) =>
                                setNatMainRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-md uppercase font-bold text-[#5A5D59]">
                              Side Per Carat
                            </label>
                            <input
                              type="number"
                              value={natSideRate}
                              onChange={(e) =>
                                setNatSideRate(
                                  Math.max(0, Number(e.target.value)),
                                )
                              }
                              className="w-full bg-[#363835] border border-[#4d4f4c] rounded py-1 px-2 text-xs font-mono text-[#BCBCB4]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 3: Etsy Store Multipliers */}
              <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-wide text-[#F1641E] uppercase flex items-center gap-2 mb-4 pb-3 border-b border-[#6e716d]">
                    <Percent className="h-4 w-4 text-[#F1641E]" />
                    3. Etsy Margins & Promotions
                  </h2>

                  <div className="space-y-4">
                    {/* Etsy Fee Range with Sliding and Manual Options */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-md font-semibold">
                        <span className="text-[#DAD9D6]">
                          Etsy Fee margin (%)
                        </span>
                        <div className="flex items-center gap-1.5 bg-[#363835] border border-[#4d4f4c] rounded px-1.5 py-0.5">
                          <input
                            type="number"
                            step="0.1"
                            value={etsyFeePercent}
                            onChange={(e) =>
                              setEtsyFeePercent(
                                Math.max(0, Number(e.target.value)),
                              )
                            }
                            className="w-15 bg-transparent text-right font-mono font-bold text-[#F1641E] focus:outline-none"
                          />
                          <span className="text-[15px] text-[#DAD9D6]/70">
                            %
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.1"
                        value={etsyFeePercent}
                        onChange={(e) =>
                          setEtsyFeePercent(Number(e.target.value))
                        }
                        className="w-full accent-[#F1641E] bg-[#363835] h-1 rounded-lg"
                      />
                    </div>

                    {/* Profit markup with Sliding and Manual Options */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-md font-semibold">
                        <span className="text-[#DAD9D6]">
                          Desired profit markup (%)
                        </span>
                        <div className="flex items-center gap-1.5 bg-[#363835] border border-[#4d4f4c] rounded px-1.5 py-0.5">
                          <input
                            type="number"
                            step="1"
                            value={profitPercent}
                            onChange={(e) =>
                              setProfitPercent(
                                Math.max(0, Number(e.target.value)),
                              )
                            }
                            className="w-15 bg-transparent text-right font-mono font-bold text-[#F1641E] focus:outline-none"
                          />
                          <span className="text-[15px] text-[#DAD9D6]/70">
                            %
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="250"
                        value={profitPercent}
                        onChange={(e) =>
                          setProfitPercent(Number(e.target.value))
                        }
                        className="w-full accent-[#F1641E] bg-[#363835] h-1 rounded-lg"
                      />
                    </div>

                    {/* Active Sale discount with Sliding and Manual Options */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-md font-semibold">
                        <span className="text-[#DAD9D6]">
                          Active Sale Promotion (%)
                        </span>
                        <div className="flex items-center gap-1.5 bg-[#363835] border border-[#4d4f4c] rounded px-1.5 py-0.5">
                          <input
                            type="number"
                            step="1"
                            value={salePercent}
                            onChange={(e) =>
                              setSalePercent(
                                Math.max(0, Number(e.target.value)),
                              )
                            }
                            className="w-15 bg-transparent text-right font-mono font-bold text-[#F1641E] focus:outline-none"
                          />
                          <span className="text-[15px] text-[#DAD9D6]/70">
                            %
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        value={salePercent}
                        onChange={(e) => setSalePercent(Number(e.target.value))}
                        className="w-full accent-[#F1641E] bg-[#363835] h-1 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={addCurrentSKUToExcel}
                    className="bg-[#F1641E] text-[#DAD9D6] font-bold px-4 py-2 rounded-lg text-md flex items-center gap-1.5 transition-all shadow"
                  >
                    <Plus className="h-4 w-4 stroke-[3.5]" />
                    Add to Excel
                  </button>
                </div>
              </div>
              {/* </div> */}

              {/* Right Column: Calculations & Spreadsheet (7 Cols) */}
            </div>
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Card 4: Immediate Listing Projections */}
              <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#6e716d]">
                  <div>
                    <h2 className="text-xl font-bold text-[#F1641E] flex items-center gap-2 uppercase">
                      <TrendingUp className="h-5 w-5 text-[#F1641E]" />
                      Live Pure Cost & Valuation Matrix
                    </h2>
                    <p className="text-md text-[#DAD9D6]">
                      Previewing calculations before saving SKU row
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={addCurrentSKUToExcel}
                      className="bg-[#F1641E] text-[#DAD9D6] font-bold px-4 py-2 rounded-lg text-md flex items-center gap-1.5 transition-all shadow"
                    >
                      <Plus className="h-4 w-4 stroke-[3.5]" />
                      Add to Excel
                    </button>
                    <button
                      onClick={downloadExcelSheet}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-md flex items-center gap-1.5 transition-all shadow"
                    >
                      <Download className="h-4 w-4 stroke-[3]" />
                      Download Sheet
                    </button>
                  </div>
                </div>

                {/* Multi-Selection Live Preview Tab Selector */}
                <div className="flex items-center gap-1 bg-[#363835] p-1 rounded-xl border border-[#4d4f4c] mb-3">
                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPreviewTab(cat)}
                      className={`flex-1 py-1.5 rounded-lg text-lg font-bold transition-all ${
                        previewTab === cat
                          ? "bg-[#BCBCB4] text-[#424441] font-extrabold"
                          : "text-[#DAD9D6] hover:text-[#BCBCB4]"
                      }`}
                    >
                      {cat} Preview
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#4d4f4c] bg-[#363835]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#424441] border-b border-[#4d4f4c] text-md font-bold text-[#DAD9D6] uppercase tracking-wider">
                        <th className="py-3 px-4 text-[#DAD9D6]">
                          Metal Purity ({previewTab})
                        </th>
                        <th className="py-3 px-3 text-right text-[#D8D6D4]">
                          Raw Base Cost
                        </th>
                        <th className="py-3 px-3 text-right text-amber-400">
                          Etsy Listing Price
                        </th>
                        <th className="py-3 px-3 text-right text-emerald-400">
                          Active Sale Price
                        </th>
                        <th className="py-3 px-4 text-right text-indigo-400">
                          Net Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4d4f4c] text-md">
                      {getActivePreviewData().map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-[#424441]/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-bold font-sans text-[#DAD9D6]">
                            {item.metalName}
                          </td>
                          <td className="py-3.5 px-3 text-right text-[#D8D6D4]">
                            {currencySymbol}
                            {item.totalBaseCost}
                          </td>
                          <td className="py-3.5 px-3 text-right font-bold text-amber-400">
                            {currencySymbol}
                            {item.listingPrice}
                          </td>
                          <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                            {currencySymbol}
                            {item.salePrice}
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-indigo-400">
                            {currencySymbol}
                            {item.actualNetProfit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 5: EXCEL SPREADSHEET SIMULATOR (Single Row Aligned) */}
              {isLoggedIn && (
                <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-5 shadow-xl flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#6e716d]">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-[#F1641E]" />
                        <h3 className="text-xl uppercase font-bold text-[#F1641E]">
                          Live Excel Log Sheet
                        </h3>
                      </div>
                      <p className="text-md text-[#DAD9D6]">
                        Populating multiple columns on the same row sku-wise
                      </p>
                    </div>
                    <div className="flex gap-5">
                      {excelRows.length > 0 && (
                        <button
                          onClick={confirmClearExcelLog}
                          className="text-md text-red-300 hover:text-red-200 font-semibold flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/20 self-start"
                        >
                          <Trash2 className="h-4 w-4" />
                          Clear Sheet
                        </button>
                      )}
                      <button
                        onClick={downloadExcelSheet}
                        className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-md flex items-center gap-1.5 transition-all shadow"
                      >
                        <Download className="h-4 w-4 stroke-[3]" />
                        Download Sheet
                      </button>
                    </div>
                  </div>

                  {excelRows.length === 0 ? (
                    <div className="p-12 text-center text-xs text-[#DAD9D6]/60 border border-dashed border-[#6e716d] rounded-xl bg-[#363835]/40">
                      No active entries saved in Excel. Setup your specs,
                      specify categories, and click "Add to Excel" to append SKU
                      details.
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-[#6e716d] bg-[#363835] max-h-[550px]">
                      <table
                        className="w-full text-left text-md border-collapse"
                        style={{ minWidth: "2000px" }}
                      >
                        <thead>
                          {/* Top Row Category Grouping */}
                          <tr className="bg-[#424441] border-b border-[#4d4f4c] text-md font-bold text-[#DAD9D6] uppercase tracking-wider text-center">
                            <th
                              colSpan={4}
                              className="py-2 border-r border-[#4d4f4c]"
                            >
                              General Metadata
                            </th>
                            <th
                              colSpan={1}
                              className="py-2 border-r border-[#4d4f4c] bg-[#363835] text-indigo-400"
                            >
                              SIDE
                            </th>
                            <th
                              colSpan={1}
                              className="py-2 border-r border-[#4d4f4c]"
                            >
                              Size
                            </th>
                            <th
                              colSpan={1}
                              className="py-2 border-r border-[#4d4f4c] bg-[#363835] text-[#F1641E]"
                            >
                              MAIN
                            </th>
                            <th
                              colSpan={5}
                              className="py-2 border-r border-[#4d4f4c] bg-blue-900/20 text-blue-300"
                            >
                              Moissanite Columns (MOSO)
                            </th>
                            <th
                              colSpan={5}
                              className="py-2 border-r border-[#4d4f4c] bg-cyan-900/20 text-cyan-300"
                            >
                              Lab Grown Columns (LAB)
                            </th>
                            <th
                              colSpan={5}
                              className="py-2 bg-emerald-900/20 text-emerald-300"
                            >
                              Natural Diamond Columns (NAT)
                            </th>
                          </tr>

                          {/* Main Row Header */}
                          <tr className="bg-[#424441]/90 border-b border-[#4d4f4c] text-sm font-bold uppercase text-[#DAD9D6]">
                            <th className="py-3 px-3 border-r border-[#4d4f4c]">
                              SR.NO
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c]">
                              ITEM
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c]">
                              SKU
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c]">
                              SHAPE
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c] bg-[#424441]/40">
                              DIA WT.
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c]">
                              SOL MM
                            </th>
                            <th className="py-3 px-3 border-r border-[#4d4f4c] bg-[#424441]/40">
                              SOL WT.
                            </th>

                            {/* Moissanite Purities */}
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-slate-400 bg-blue-900/10">
                              SIL MOSO
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-blue-400 bg-blue-900/10">
                              10K MOSO
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-blue-300 bg-blue-900/10">
                              14K MOSO
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-emerald-400 bg-blue-900/10">
                              18K MOSO
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-amber-400 bg-blue-900/15">
                              Plat Moso
                            </th>

                            {/* Lab Grown Purities */}
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-slate-400 bg-cyan-900/10">
                              SIL LAB
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-cyan-400 bg-cyan-900/10">
                              10K LAB
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-cyan-300 bg-cyan-900/10">
                              14K LAB
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-emerald-400 bg-cyan-900/10">
                              18K LAB
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-amber-400 bg-cyan-900/15">
                              Plat Lab
                            </th>

                            {/* Natural Purities */}
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-slate-400 bg-emerald-900/10">
                              SIL NAT
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-emerald-455 bg-emerald-900/10">
                              10K NAT
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-emerald-300 bg-emerald-900/10">
                              14K NAT
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-green-400 bg-emerald-900/10">
                              18K NAT
                            </th>
                            <th className="py-3 px-2 border-r border-[#4d4f4c] text-center text-amber-400 bg-emerald-900/15">
                              Plat Nat
                            </th>

                            <th className="py-3 px-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#4d4f4c]">
                          {excelRows.map((row, index) => (
                            <tr
                              key={index}
                              className="hover:bg-[#424441]/30 text-sm transition-all"
                            >
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6]/70">
                                {row.srNo}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] font-sans font-medium text-[#BCBCB4]">
                                {row.item}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6]/80">
                                {row.sku}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6]">
                                {row.shape}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6] text-center bg-[#424441]/20">
                                {row.sideDiaWt}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6] text-center">
                                {row.solMm}
                              </td>
                              <td className="py-2.5 px-3 border-r border-[#4d4f4c] text-[#DAD9D6] text-center bg-[#424441]/20">
                                {row.solWt}
                              </td>

                              {/* Moissanite columns */}
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-blue-950/20 text-[#DAD9D6]/80">
                                {row.silMoso}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-blue-950/20 text-blue-400 font-bold">
                                {row.g10kMoso}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-blue-950/20 text-blue-300 font-bold">
                                {row.g14kMoso}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-blue-950/20 text-emerald-400 font-bold">
                                {row.g18kMoso}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-blue-950/30 text-amber-400 font-bold">
                                {row.platMoso}
                              </td>

                              {/* Lab Grown columns */}
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-cyan-950/20 text-[#DAD9D6]/80">
                                {row.silLab}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-cyan-950/20 text-cyan-400 font-bold">
                                {row.g10kLab}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-cyan-950/20 text-cyan-300 font-bold">
                                {row.g14kLab}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-cyan-950/20 text-emerald-400 font-bold">
                                {row.g18kLab}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-cyan-950/30 text-amber-400 font-bold">
                                {row.platLab}
                              </td>

                              {/* Natural columns */}
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-emerald-950/20 text-[#DAD9D6]/80">
                                {row.silNat}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-emerald-950/20 text-[#F1641E] font-bold">
                                {row.g10kNat}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-emerald-950/20 text-emerald-300 font-bold">
                                {row.g14kNat}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-emerald-950/20 text-green-400 font-bold">
                                {row.g18kNat}
                              </td>
                              <td className="py-2.5 px-2 border-r border-[#4d4f4c] text-right bg-emerald-950/30 text-amber-400 font-bold">
                                {row.platNat}
                              </td>

                              <td className="py-2.5 px-2 text-center">
                                <button
                                  onClick={() => confirmRemoveExcelRow(index)}
                                  className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Integration Code Tab */
          <div className="bg-[#424441] rounded-2xl border border-[#6e716d] p-6 shadow-xl flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#DAD9D6] flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#F1641E]" />
                  Full Stack Deployment Codes
                </h2>
                <p className="text-lg text-[#AFB5AD]">
                  Copy optimized modules to insert this category-driven <br />
                  calculator directly into your existing dashboard.
                </p>
              </div>
            </div>

            {/* Inner code tabs */}
            <div className="flex border-b border-[#6e716d] gap-2 mb-4">
              <button
                onClick={() => setActiveCodeTab("nextjs")}
                className={`px-4 py-2 text-xl font-bold border-b-2 transition-all ${
                  activeCodeTab === "nextjs"
                    ? "border-[#F1641E] text-[#DAD9D6] font-bold"
                    : "border-transparent text-[#DAD9D6] hover:text-[#BCBCB4]"
                }`}
              >
                Frontend (Next.js / React)
              </button>
              <button
                onClick={() => setActiveCodeTab("express")}
                className={`px-4 py-2 text-xl font-bold border-b-2 transition-all ${
                  activeCodeTab === "express"
                    ? "border-[#F1641E] text-[#DAD9D6] font-bold"
                    : "border-transparent text-[#DAD9D6] hover:text-[#BCBCB4]"
                }`}
              >
                Backend (Node / Express)
              </button>
              <button
                onClick={() => setActiveCodeTab("mongodb")}
                className={`px-4 py-2 text-xl font-bold border-b-2 transition-all ${
                  activeCodeTab === "mongodb"
                    ? "border-[#F1641E] text-[#DAD9D6] font-bold"
                    : "border-transparent text-[#DAD9D6] hover:text-[#BCBCB4]"
                }`}
              >
                Google Apps Script
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  handleCopyToClipboard(
                    activeCodeTab === "nextjs"
                      ? nextJSCode
                      : activeCodeTab === "express"
                        ? expressCode
                        : mongoCode,
                    activeCodeTab,
                  )
                }
                className="absolute top-3 right-3 bg-[#363835] hover:bg-[#4d4f4c] text-[#DAD9D6] hover:text-[#BCBCB4] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow cursor-pointer"
              >
                {copiedText === activeCodeTab ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    Copy Code
                  </>
                )}
              </button>

              <pre className="bg-[#2a2b29] p-5 rounded-xl border border-[#4d4f4c] overflow-x-auto text-xs font-mono text-slate-300 max-h-[500px] leading-relaxed">
                <code>
                  {activeCodeTab === "nextjs" && nextJSCode}
                  {activeCodeTab === "express" && expressCode}
                  {activeCodeTab === "mongodb" && mongoCode}
                </code>
              </pre>
            </div>
          </div>
        )}
      </main>

      {openLoginModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#BCBCB4] rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setOpenLoginModal(false)}
              className="absolute top-4 right-4 text-[#424441] hover:text-black cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-semibold text-[#5A5D59]">Log in</h2>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-[#5A5D59] text-md mb-2">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
                className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-[#5A5D59] text-md mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 pr-12 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setOpenLoginModal(false);
                setOpenForgotModal(true);
              }}
              className="text-[#1f1f1f] text-sm hover:underline"
            >
              Forgot password?
            </button>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full h-12 rounded-xl bg-[#5A5D59] text-[#BCBCB4] text-2xl font-medium cursor-pointer my-4"
            >
              {loginLoading ? "Loading..." : "Log in"}
            </button>

            {/* Bottom Text */}
            <div className="mt-6 text-center">
              <p className="mt-2 text-lg text-[#5A5D59]">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    setOpenLoginModal(false);
                    setOpenSignupModal(true);
                  }}
                  className="text-black font-medium cursor-pointer"
                >
                  Sign Up
                </span>
              </p>

              <p className="mt-6 text-md text-[#5A5D59]">
                By logging in or signing up, you agree to our Terms & Conditions
                and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}

      {openSignupModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#BCBCB4] rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setOpenSignupModal(false)}
              className="absolute top-4 right-4 text-[#424441] hover:text-black cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-semibold text-[#5A5D59]">Sign Up</h2>
            </div>

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-[#5A5D59] text-md mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    name: e.target.value,
                  })
                }
                className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-[#5A5D59] text-md mb-2">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    email: e.target.value,
                  })
                }
                className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[#5A5D59] text-md mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                maxLength={10}
                value={signupData.mobile}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    mobile: e.target.value.replace(/\D/g, ""),
                  })
                }
                placeholder="Enter mobile number"
                className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-[#5A5D59] text-md mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 pr-12 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="block text-[#5A5D59] text-md mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full h-14 px-4 pr-12 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              onClick={handleSignup}
              disabled={signupLoading}
              className="w-full h-12 rounded-xl bg-[#5A5D59] text-[#BCBCB4] text-2xl font-medium cursor-pointer my-4"
            >
              {signupLoading ? "Loading..." : "Create Account"}
            </button>

            {/* Bottom Text */}
            <div className="mt-6 text-center">
              <p className="mt-2 text-lg text-[#5A5D59]">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setOpenSignupModal(false);
                    setOpenLoginModal(true);
                  }}
                  className="text-black font-medium cursor-pointer"
                >
                  Log in
                </span>
              </p>

              <p className="mt-6 text-md text-[#5A5D59]">
                By signing up, you agree to our Terms & Conditions and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      )}

      {openForgotModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#BCBCB4] rounded-2xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => {
                setOpenForgotModal(false);
                setForgotStep(1);
              }}
              className="absolute top-4 right-4 text-[#424441] hover:text-black cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-semibold text-[#5A5D59]">
                Forgot Password
              </h2>

              <p className="text-sm text-[#5A5D59] mt-2">
                {forgotStep === 1
                  ? "Enter your email to receive OTP"
                  : "Enter OTP and new password"}
              </p>
            </div>

            {/* STEP 1 */}
            {forgotStep === 1 && (
              <>
                <div className="mb-5">
                  <label className="block text-[#5A5D59] text-md mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                  />
                </div>

                <button
                  onClick={handleForgotPassword}
                  disabled={forgotLoading}
                  className="w-full h-12 rounded-xl bg-[#5A5D59] text-[#BCBCB4] text-xl font-medium cursor-pointer"
                >
                  {forgotLoading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {/* STEP 2 */}
            {forgotStep === 2 && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#5A5D59] text-md mb-2">
                      OTP
                    </label>

                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="w-full h-14 px-4 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A5D59] text-md mb-2">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-14 px-4 pr-12 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5A5D59] text-md mb-2">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full h-14 px-4 pr-12 rounded-xl border border-[#5A5D59] outline-none text-[#1f1f1f]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                      >
                        {showConfirmNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={forgotLoading}
                  className="w-full h-12 rounded-xl bg-[#5A5D59] text-[#BCBCB4] text-xl font-medium cursor-pointer mt-6"
                >
                  {forgotLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            <p className="mt-5 text-center text-sm text-[#5A5D59]">
              Back to{" "}
              <span
                onClick={() => {
                  setOpenForgotModal(false);
                  setOpenLoginModal(true);
                }}
                className="text-black font-medium cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
