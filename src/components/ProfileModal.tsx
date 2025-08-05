import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useUser();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [name, setName] = useState(user.name);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [profilePicture, setProfilePicture] = useState<string | null>(user.profilePicture);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(name, jobTitle, profilePicture || undefined);
    onClose();
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className={`p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4 ${isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('profile.editTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-medium mr-4 overflow-hidden">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user.initials
              )}
            </div>
            <input type="file" id="profilePicture" className="hidden" onChange={handlePictureUpload} accept="image/*" />
            <label htmlFor="profilePicture" className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
              {t('profile.changePhoto')}
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('profile.nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#212121] border-gray-600 focus:border-blue-500 text-white'
                  : 'bg-gray-50 border-gray-300 focus:border-blue-500 text-gray-900'
              }`}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="jobTitle" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('profile.jobTitleLabel')}
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-[#212121] border-gray-600 focus:border-blue-500 text-white'
                  : 'bg-gray-50 border-gray-300 focus:border-blue-500 text-gray-900'
              }`}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {t('profile.cancelButton')}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {t('profile.saveButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;