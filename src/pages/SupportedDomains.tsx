import React from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Shield, Zap, Star } from 'lucide-react';

const SupportedDomains = () => {
  const domains = [
    // Gaming & Entertainment
    { category: 'Gaming & Entertainment', icon: '🎮', domains: [
      'twitch.tv', 'roblox.com', 'steamcommunity.com', 'minecraft.net', 
      'epicgames.com', 'discord.com', 'tiktok.com', 'youtube.com',
      'netflix.com', 'spotify.com', 'instagram.com', 'twitter.com'
    ]},
    
    // Tech & Development
    { category: 'Tech & Development', icon: '💻', domains: [
      'github.com', 'microsoft.com', 'apple.com', 'adobe.com', 
      'dropbox.com', 'linkedin.com', 'google.com', 'accounts.google.com'
    ]},
    
    // E-commerce & Finance
    { category: 'E-commerce & Finance', icon: '💰', domains: [
      'amazon.com', 'paypal.com', 'facebook.com', 'login', 'signup'
    ]},
    
    // Education & Government
    { category: 'Education & Government', icon: '🎓', domains: [
      '.edu', '.gov', '.org', '.net', '.com', '.io'
    ]}
  ];

  return (
    <Layout>
      <Header activeCategory="combo-filter" onCategoryChange={() => {}} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 shadow-lg">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Supported Domains
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Link Analyzer automatically detects and processes credentials from these popular domains and platforms.
                Add your own custom domains for complete coverage.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">30+</h3>
                  <p className="text-gray-600">Supported Domains</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
                  <p className="text-gray-600">Auto-Detection</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 mb-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">∞</h3>
                  <p className="text-gray-600">Custom Domains</p>
                </CardContent>
              </Card>
            </div>

            {/* Domain Categories */}
            <div className="space-y-8">
              {domains.map((category, index) => (
                <Card key={category.category} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <span className="text-3xl">{category.icon}</span>
                      <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {category.category}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Automatically detected and processed domains in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {category.domains.map((domain) => (
                        <Badge 
                          key={domain} 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 transform hover:scale-105"
                        >
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Domains Info */}
            <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Need More Domains?
                </CardTitle>
                <CardDescription className="text-lg">
                  Add your own custom domains in the Link Analyzer for complete coverage
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-gray-700">Unlimited Custom Domains</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default SupportedDomains;
