import React, { useEffect, useState, useContext } from "react";
import { getPreference, sendPreference } from "../api/preferenceApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

const ASSET_OPTIONS = ["BTC", "ETH", "SOL", "DOGE", "XRP", "ADA", "DOT", "MATIC"];
const INVESTOR_TYPES = ["HODLer", "Day Trader", "NFT Collector"];
const CONTENT_TYPES = ["Market News", "Charts", "Social", "Fun"];

const contentTypesMap = {
  "Market News": "news",
  Charts: "charts",
  Social: "social",
  Fun: "fun",
};

export default function OnboardingPage() {
  const [assets, setAssets] = useState([]);
  const [investorType, setInvestorType] = useState(INVESTOR_TYPES[0]);
  const [contentTypes, setContentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkExisting = async () => {
      try {
        const response = await getPreference();
        if (response.status >= 200 && response.status < 300 && response.status !== 204) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log("No existing preferences");
      } finally {
        setLoading(false);
      }
    };
    checkExisting();
  }, [navigate]);

  const toggleArray = (arr, setArr, value) => {
    if (arr.includes(value)) setArr(arr.filter((x) => x !== value));
    else setArr([...arr, value]);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (assets.length === 0) {
      alert("Please select at least one asset");
      return;
    }

    if (contentTypes.length === 0) {
      alert("Please select at least one content type");
      return;
    }

    setSaving(true);
    try {
      await sendPreference({
        assets,
        investorType,
        contentTypes: contentTypes.map(ct => contentTypesMap[ct]),
      });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Crypto Advisor</h1>
          <p className="text-gray-600 mb-8">Tell us about your preferences to get personalized insights</p>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                What crypto assets interest you? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ASSET_OPTIONS.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => toggleArray(assets, setAssets, a)}
                    className={`p-3 border-2 rounded-lg font-semibold transition-all duration-200 ${
                      assets.includes(a)
                        ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">What type of investor are you?</label>
              <select
                value={investorType}
                onChange={(e) => setInvestorType(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                {INVESTOR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                What content would you like to see? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {CONTENT_TYPES.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleArray(contentTypes, setContentTypes, c)}
                    className={`p-3 border-2 rounded-lg font-semibold transition-all duration-200 ${
                      contentTypes.includes(c)
                        ? "bg-purple-500 text-white border-purple-500 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Preferences & Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
