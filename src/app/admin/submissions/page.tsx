// Admin Contact Submissions - Last updated: 2025-11-09
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ContactSubmission } from '@/types/contact';

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800',
  read: 'bg-gray-100 text-gray-800',
  responded: 'bg-green-100 text-green-800',
  archived: 'bg-slate-100 text-slate-600',
};

const INQUIRY_TYPE_LABELS = {
  commission: 'Commission',
  purchase: 'Purchase',
  collaboration: 'Collaboration',
  exhibition: 'Exhibition/Gallery',
  general: 'General',
};

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });

      if (res.ok) {
        const updated = await res.json();
        setSubmissions(submissions.map(s => s.id === id ? updated : s));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(updated);
        }
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Network error');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setSubmissions(submissions.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      } else {
        alert('Failed to delete submission');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error');
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = {
    new: submissions.filter(s => s.status === 'new').length,
    read: submissions.filter(s => s.status === 'read').length,
    responded: submissions.filter(s => s.status === 'responded').length,
    archived: submissions.filter(s => s.status === 'archived').length,
  };

  return (
    <div className="min-h-screen bg-clay-50">
      {/* Header */}
      <div className="bg-white border-b border-clay-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif text-clay-900">Contact Submissions</h1>
              <p className="text-sm text-clay-600 mt-1">{submissions.length} total submissions</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="bg-clay-500 hover:bg-clay-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-clay-200">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-5 gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === 'all' ? 'border-glaze-sage bg-glaze-sage/10' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-clay-900">{submissions.length}</div>
              <div className="text-sm text-clay-600">All</div>
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <div className="text-sm text-clay-600">New</div>
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === 'read' ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-gray-600">{stats.read}</div>
              <div className="text-sm text-clay-600">Read</div>
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === 'responded' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
              <div className="text-sm text-clay-600">Responded</div>
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filter === 'archived' ? 'border-slate-500 bg-slate-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-slate-600">{stats.archived}</div>
              <div className="text-sm text-clay-600">Archived</div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-clay-200 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-clay-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-clay-600">No submissions found</p>
              </div>
            ) : (
              filteredSubmissions.map(submission => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`bg-white rounded-lg p-6 cursor-pointer transition-all border-2 ${
                    selectedSubmission?.id === submission.id
                      ? 'border-glaze-sage shadow-lg'
                      : 'border-transparent hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-clay-900">{submission.name}</h3>
                      <p className="text-sm text-clay-600">{submission.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[submission.status]}`}>
                      {submission.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-clay-600">
                    <span className="font-medium text-glaze-sage">
                      {INQUIRY_TYPE_LABELS[submission.inquiryType]}
                    </span>
                    <span>•</span>
                    <span>{formatDate(submission.createdAt)}</span>
                  </div>
                  <p className="mt-3 text-sm text-clay-700 line-clamp-2">
                    {submission.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Submission Detail */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {selectedSubmission ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-glaze-sage text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-serif mb-1">{selectedSubmission.name}</h2>
                      <p className="opacity-90">{selectedSubmission.email}</p>
                      {selectedSubmission.phone && (
                        <p className="opacity-90 mt-1">{selectedSubmission.phone}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white ${STATUS_COLORS[selectedSubmission.status].replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-clay-600 block mb-1">Inquiry Type</label>
                    <p className="text-clay-900">{INQUIRY_TYPE_LABELS[selectedSubmission.inquiryType]}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-clay-600 block mb-1">Message</label>
                    <p className="text-clay-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-xs font-medium text-clay-600 block mb-1">Submitted</label>
                      <p className="text-clay-900">{formatDate(selectedSubmission.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-clay-600 block mb-1">Last Updated</label>
                      <p className="text-clay-900">{formatDate(selectedSubmission.updatedAt)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-clay-200 pt-6 space-y-3">
                    <label className="text-sm font-medium text-clay-600 block mb-2">Update Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['new', 'read', 'responded', 'archived'] as const).map(status => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedSubmission.id, status)}
                          disabled={selectedSubmission.status === status}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedSubmission.status === status
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-clay-100 text-clay-900 hover:bg-clay-200'
                          }`}
                        >
                          Mark as {status}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Delete Submission
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-clay-300">
                <p className="text-clay-600">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
