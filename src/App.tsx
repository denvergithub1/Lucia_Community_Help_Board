import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Send,
  AlertCircle,
  CheckCircle,
  Search,
  Plus,
  X,
  Settings,
  Home,
  Grid,
  List,
} from 'lucide-react';

const NeighborhoodBoard = () => {
  const [posts, setPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Jobs');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [imageURL, setImageURL] = useState('');

  // Settings
  const [sheetId, setSheetId] = useState('');
  const [tempSheetId, setTempSheetId] = useState('');

  // Sample data for demo
  const samplePosts = [
    {
      Title: 'Looking for Part-Time Work',
      Category: 'Jobs',
      Description:
        'Flexible hours needed. Experience in retail and customer service.',
      Contact: 'maria@email.com',
      ImageURL: '',
      Rating: '⭐⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      Title: 'Free Community Meal - Saturday',
      Category: 'Food',
      Description:
        'Community Center hosting free lunch this Saturday 12-2pm. All families welcome!',
      Contact: 'Community Center - 123 Main St',
      ImageURL:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      Rating: '⭐⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      Title: 'Free Tutoring Available',
      Category: 'Education',
      Description:
        'Math and English tutoring for grades 6-12. Every Tuesday and Thursday 4-6pm.',
      Contact: 'Library - Ask for Ms. Johnson',
      ImageURL: '',
      Rating: '⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      Title: 'Carpool to Downtown',
      Category: 'Transport',
      Description:
        'Daily carpool group forming. Leave at 7:30am, return at 5pm. Share gas costs.',
      Contact: 'John - 555-0123',
      ImageURL: '',
      Rating: '⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      Title: 'URGENT: Lost Dog',
      Category: 'Emergency',
      Description:
        'Golden retriever named Buddy. Last seen near Oak Park. Reward offered!',
      Contact: 'Call 555-0199 ASAP',
      ImageURL:
        'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop',
      Rating: '',
      Timestamp: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      Title: 'Holiday Food Drive',
      Category: 'Holiday',
      Description:
        'Collecting non-perishable items for families in need. Drop-off until Dec 20th.',
      Contact: 'Community Center',
      ImageURL:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
      Rating: '⭐⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 518400000).toISOString(),
    },
    {
      Title: 'Youth Soccer Sign-ups',
      Category: 'Sports',
      Description:
        'Ages 8-14. Season starts January. $50 includes uniform and equipment.',
      Contact: 'Recreation Center - 555-SPORT',
      ImageURL:
        'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop',
      Rating: '⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 604800000).toISOString(),
    },
    {
      Title: 'Piano Lessons',
      Category: 'Advertisement',
      Description: 'Experienced teacher. All ages welcome! First lesson free.',
      Contact: 'musicteacher@email.com',
      ImageURL: '',
      Rating: '⭐⭐⭐⭐⭐',
      Timestamp: new Date(Date.now() - 691200000).toISOString(),
    },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const stored = localStorage.getItem('neighborhoodPosts');
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(samplePosts);
        localStorage.setItem('neighborhoodPosts', JSON.stringify(samplePosts));
      }
      showNotification('Posts loaded successfully!', 'success');
    } catch (error) {
      showNotification('Failed to load posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async () => {
    if (!title.trim() || !description.trim()) {
      showNotification('Please fill in title and description', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newPost = {
        Title: title,
        Category: category,
        Description: description,
        Contact: contact,
        ImageURL: imageURL,
        Rating: '',
        Timestamp: new Date().toISOString(),
      };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('neighborhoodPosts', JSON.stringify(updatedPosts));

      // Reset form
      setTitle('');
      setDescription('');
      setContact('');
      setImageURL('');
      setCategory('Jobs');
      setShowSubmitForm(false);

      showNotification('Post submitted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to submit post', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('neighborhoodPosts', JSON.stringify(updatedPosts));
    showNotification('Post deleted', 'success');
  };

  const resetData = () => {
    setPosts(samplePosts);
    localStorage.setItem('neighborhoodPosts', JSON.stringify(samplePosts));
    showNotification('Reset to default posts', 'success');
  };

  const saveSettings = () => {
    if (tempSheetId.trim()) {
      setSheetId(tempSheetId);
      localStorage.setItem('sheetId', tempSheetId);
      showNotification('Sheet ID saved! Ready to deploy.', 'success');
    }
    setShowSettings(false);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      filterCategory === 'All' || post.Category === filterCategory;
    const matchesSearch =
      !searchTerm ||
      post.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.Description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'All',
    'Jobs',
    'Food',
    'Education',
    'Transport',
    'Emergency',
    'Holiday',
    'Advertisement',
    'Sports',
    'Other',
  ];

  const getCategoryColor = (cat) => {
    const colors = {
      Jobs: 'bg-blue-500',
      Food: 'bg-green-500',
      Education: 'bg-purple-500',
      Transport: 'bg-yellow-500',
      Emergency: 'bg-red-500',
      Holiday: 'bg-pink-500',
      Advertisement: 'bg-orange-500',
      Sports: 'bg-indigo-500',
      Other: 'bg-gray-500',
    };
    return colors[cat] || 'bg-gray-500';
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      Jobs: '💼',
      Food: '🍽️',
      Education: '📚',
      Transport: '🚗',
      Emergency: '🚨',
      Holiday: '🎄',
      Advertisement: '📢',
      Sports: '⚽',
      Other: '📌',
    };
    return icons[cat] || '📌';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Home className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Lucia Community Board
                </h1>
                <p className="text-xs text-gray-500">
                  Connecting neighbors, building community
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setViewMode(viewMode === 'grid' ? 'list' : 'grid')
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Toggle view"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Settings"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in`}
        >
          {notification.type === 'success' ? (
            <CheckCircle size={24} />
          ) : (
            <AlertCircle size={24} />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">⚙️ Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Google Sheet ID (for deployment)
                </label>
                <input
                  type="text"
                  value={tempSheetId}
                  onChange={(e) => setTempSheetId(e.target.value)}
                  placeholder="Paste your Google Sheet ID here"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Find in your sheet URL: /d/<strong>SHEET_ID</strong>/edit
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveSettings}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Save Settings
                </button>
                <button
                  onClick={resetData}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Reset Demo Data
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>📊 Required Sheet Headers:</strong>
                  <code className="block mt-2 bg-white p-2 rounded text-xs">
                    Title | Category | Description | Contact | ImageURL | Rating
                    | Timestamp
                  </code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Form */}
        {showSubmitForm && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                ✍️ Create New Post
              </h2>
              <button
                onClick={() => setShowSubmitForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Looking for Job, Free Food Event"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {getCategoryIcon(cat)} {cat}
                      </option>
                    ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email, phone, or location"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={submitPost}
              disabled={submitting}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition font-semibold"
            >
              <Send size={20} />
              {submitting ? 'Submitting...' : 'Submit Post'}
            </button>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={loadPosts}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-md"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  filterCategory === cat
                    ? `${getCategoryColor(cat)} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)} {cat}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>

        {/* Posts Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-600 text-lg">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or create the first post!
            </p>
            <button
              onClick={() => setShowSubmitForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            {filteredPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {post.ImageURL && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.ImageURL}
                      alt={post.Title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) =>
                        (e.target.parentElement.style.display = 'none')
                      }
                    />
                    <div
                      className={`absolute top-3 left-3 ${getCategoryColor(
                        post.Category
                      )} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}
                    >
                      {getCategoryIcon(post.Category)} {post.Category}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  {!post.ImageURL && (
                    <div
                      className={`inline-block ${getCategoryColor(
                        post.Category
                      )} text-white px-3 py-1 rounded-full text-sm font-bold mb-3`}
                    >
                      {getCategoryIcon(post.Category)} {post.Category}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {post.Title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {post.Description}
                  </p>
                  {post.Contact && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Contact:</strong> {post.Contact}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="flex items-center gap-2">
                      {post.Rating && (
                        <span className="text-sm">{post.Rating}</span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(post.Timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => deletePost(idx)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-green-600 font-bold text-lg mb-2">
            JSur copyright ©2023
          </p>
          <div className="text-gray-600 space-y-1 text-sm">
            <p className="font-semibold">🎖️ Sponsors</p>
            <p>Silver Sponsor: JnBaptiste Foundation</p>
            <p>
              Gold Sponsor: AGM Network Solution Advance Caribbean Businesses
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NeighborhoodBoard;
