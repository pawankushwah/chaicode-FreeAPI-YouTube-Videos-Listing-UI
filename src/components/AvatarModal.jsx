import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AvatarModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, updateUser } = useAuth();

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('https://api.freeapi.app/api/v1/users/avatar', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const json = await response.json();

      if (json.success) {
        updateUser(json.data);
        onClose();
      } else {
        setError(json.message || 'Failed to update avatar');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-bg border border-border w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Change Avatar</h2>
          <p className="text-text-secondary text-sm">Upload a new profile picture</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 text-red-500 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-2 border-border border-dashed flex items-center justify-center mb-6 overflow-hidden bg-surface relative group">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 24 24" width="48" height="48" className="text-text-secondary">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
            />
          </div>

          <div className="text-center mb-8">
            <p className="text-xs text-text-secondary">
              Click the circle above to select a file.<br />
              Supports JPG, PNG or GIF.
            </p>
          </div>

          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-border text-text-primary rounded-full font-medium hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !file}
              className="flex-1 py-2.5 bg-brand text-white rounded-full font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarModal;
