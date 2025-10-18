import React, { useEffect, useState } from "react";
import { fetchData } from "../api/dashboardApi";
import { getPreference, sendPreference } from "../api/preferenceApi";
import Navbar from "../components/Navbar";
import ContentCard from "../components/ContentCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EnableSectionButton from "../components/EnableSectionButton";

export default function DashboardPage() {
  const [news, setNews] = useState(null);
  const [charts, setCharts] = useState(null);
  const [social, setSocial] = useState(null);
  const [fun, setFun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newsLoading, setNewsLoading] = useState(false);
  const [chartsLoading, setChartsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [funLoading, setFunLoading] = useState(false);

  const [preferences, setPreferences] = useState(null);
  const [enablingSection, setEnablingSection] = useState(null);

  const [seenCharts, setSeenCharts] = useState(new Set());
  const [seenMemes, setSeenMemes] = useState(new Set());

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      let userPrefs = null;
      let enabledTypes = {
        news: true,
        charts: true,
        social: true,
        fun: true
      };

      try {
        const prefRes = await getPreference();
        userPrefs = prefRes.data.preference;
        setPreferences(userPrefs);

        const contentTypes = userPrefs.contentTypes || [];
        enabledTypes = {
          news: contentTypes.includes('News'),
          charts: contentTypes.includes('Coin Prices'),
          social: contentTypes.includes('AI Insights'),
          fun: contentTypes.includes('Memes')
        };
      } catch (prefError) {
        console.error("Error loading preferences:", prefError);
      }

      const [newsRes, chartsRes, socialRes, funRes] = await Promise.all([
        enabledTypes.news ? fetchData("news").catch((e) => { console.error("News error:", e); return null; }) : Promise.resolve(null),
        enabledTypes.charts ? fetchData("charts").catch((e) => { console.error("Charts error:", e); return null; }) : Promise.resolve(null),
        enabledTypes.social ? fetchData("social").catch((e) => { console.error("Social error:", e); return null; }) : Promise.resolve(null),
        enabledTypes.fun ? fetchData("fun").catch((e) => { console.error("Fun error:", e); return null; }) : Promise.resolve(null),
      ]);

      setNews(newsRes);
      setCharts(chartsRes);
      setSocial(socialRes);
      setFun(funRes);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnableSection = async (sectionType) => {
    setEnablingSection(sectionType);
    try {
      const updatedContentTypes = [...(preferences.contentTypes || []), sectionType];
      const updatedPreferences = {
        ...preferences,
        contentTypes: updatedContentTypes
      };

      await sendPreference(updatedPreferences);
      setPreferences(updatedPreferences);

      const typeMap = {
        'News': 'news',
        'Coin Prices': 'charts',
        'AI Insights': 'social',
        'Memes': 'fun'
      };

      const freshData = await fetchData(typeMap[sectionType]);

      if (sectionType === 'News') {
        setNews(freshData);
      } else if (sectionType === 'Coin Prices') {
        setCharts(freshData);
      } else if (sectionType === 'AI Insights') {
        setSocial(freshData);
      } else if (sectionType === 'Memes') {
        setFun(freshData);
      }
    } catch (err) {
      console.error(`Error enabling ${sectionType}:`, err);
      setError(`Failed to enable ${sectionType}. Please try again.`);
    } finally {
      setEnablingSection(null);
    }
  };

  const handleVote = async (itemId, type) => {
    if (type === 'news') {
      setNewsLoading(true);
    } else if (type === 'charts') {
      setChartsLoading(true);
    } else if (type === 'social') {
      setSocialLoading(true);
    } else if (type === 'fun') {
      setFunLoading(true);
    }

    try {
      let freshData = await fetchData(type);

      if (type === 'charts' && freshData) {
        setSeenCharts(prev => new Set([...prev, freshData.id]));

        let attempts = 0;
        while (freshData && seenCharts.has(freshData.id) && attempts < 10) {
          console.log(`[Charts] Already seen ${freshData.id}, fetching another...`);
          freshData = await fetchData(type);
          attempts++;
        }

        if (attempts >= 10) {
          console.log('[Charts] Seen all coins, resetting seen list');
          setSeenCharts(new Set());
        }
      }

      if (type === 'fun' && freshData) {
        setSeenMemes(prev => new Set([...prev, freshData.id]));

        let attempts = 0;
        while (freshData && seenMemes.has(freshData.id) && attempts < 10) {
          console.log(`[Fun] Already seen ${freshData.id}, fetching another...`);
          freshData = await fetchData(type);
          attempts++;
        }

        if (attempts >= 10) {
          console.log('[Fun] Seen all memes, resetting seen list');
          setSeenMemes(new Set());
        }
      }

      if (type === 'news') {
        setNews(freshData);
        setNewsLoading(false);
      } else if (type === 'charts') {
        setCharts(freshData);
        setChartsLoading(false);
      } else if (type === 'social') {
        setSocial(freshData);
        setSocialLoading(false);
      } else if (type === 'fun') {
        setFun(freshData);
        setFunLoading(false);
      }
    } catch (err) {
      console.error(`Error refreshing ${type}:`, err);

      if (type === 'news') setNewsLoading(false);
      else if (type === 'charts') setChartsLoading(false);
      else if (type === 'social') setSocialLoading(false);
      else if (type === 'fun') setFunLoading(false);
    }
  };

  const Section = ({ title, children, isEmpty, isLoading, isDisabled, sectionType }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-500 pb-2">
        {title}
      </h2>
      {isDisabled ? (
        <EnableSectionButton
          sectionName={sectionType}
          onEnable={() => handleEnableSection(sectionType)}
          loading={enablingSection === sectionType}
        />
      ) : isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : isEmpty ? (
        <div className="text-gray-500 text-center py-8">No content available</div>
      ) : (
        <div className="space-y-4">{children}</div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Personalized Dashboard</h1>
          <p className="text-gray-600 mt-2">Vote on content to see fresh recommendations</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section
            title="📰 Market News"
            isEmpty={!news}
            isLoading={newsLoading}
            isDisabled={preferences && !preferences.contentTypes?.includes('News')}
            sectionType="News"
          >
            {news && (
              <ContentCard
                key={news.id}
                item={news}
                type="news"
                onVote={(id) => handleVote(id, 'news')}
              />
            )}
          </Section>

          <Section
            title="📊 Coin Prices"
            isEmpty={!charts}
            isLoading={chartsLoading}
            isDisabled={preferences && !preferences.contentTypes?.includes('Coin Prices')}
            sectionType="Coin Prices"
          >
            {charts && (
              <ContentCard
                key={charts.id}
                item={charts}
                type="charts"
                onVote={(id) => handleVote(id, 'charts')}
              />
            )}
          </Section>

          <Section
            title="🤖 AI Insight of the Day"
            isEmpty={!social}
            isLoading={socialLoading}
            isDisabled={preferences && !preferences.contentTypes?.includes('AI Insights')}
            sectionType="AI Insights"
          >
            {social && (
              <ContentCard
                key={social.id}
                item={social}
                type="social"
                onVote={(id) => handleVote(id, 'social')}
              />
            )}
          </Section>

          <Section
            title="😂 Fun Crypto Meme"
            isEmpty={!fun}
            isLoading={funLoading}
            isDisabled={preferences && !preferences.contentTypes?.includes('Memes')}
            sectionType="Memes"
          >
            {fun && (
              <ContentCard
                key={fun.id}
                item={fun}
                type="fun"
                onVote={(id) => handleVote(id, 'fun')}
              />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
