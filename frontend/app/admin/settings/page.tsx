'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Save, 
  Mail, 
  Globe, 
  Database, 
  Upload,
  Server,
  AlertTriangle,
  CheckCircle,
  Key
} from 'lucide-react';

// Mock settings data
const mockSettings = {
  general: {
    siteName: 'Server Store',
    siteDescription: 'Enterprise server equipment and components',
    adminEmail: 'admin@serverstore.com',
    supportEmail: 'support@serverstore.com',
    itemsPerPage: '10',
    enableMaintenanceMode: false
  },
  email: {
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'noreply@serverstore.com',
    smtpPassword: '••••••••',
    fromEmail: 'noreply@serverstore.com',
    fromName: 'Server Store',
    enableEmailNotifications: true
  },
  backup: {
    automaticBackups: true,
    backupFrequency: 'daily',
    backupTime: '01:00',
    retentionPeriod: '30',
    includeImages: true,
    lastBackup: '2023-06-15 01:00'
  }
};

// Available options for select inputs
const itemsPerPageOptions = ['10', '20', '50', '100'];
const backupFrequencyOptions = ['hourly', 'daily', 'weekly', 'monthly'];
const retentionPeriodOptions = ['7', '14', '30', '60', '90'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'backup'>('general');
  const [settings, setSettings] = useState(mockSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const handleInputChange = (
    section: 'general' | 'email' | 'backup', 
    field: string, 
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    // Simulate saving to server
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({
        type: 'success',
        text: 'Settings saved successfully'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }, 800);
  };
  
  const handleBackupNow = () => {
    setSaveMessage({
      type: 'success',
      text: 'Backup started successfully. This may take a few minutes.'
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setSaveMessage(null);
    }, 3000);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button 
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
        
        {/* Save Message */}
        {saveMessage && (
          <div className={`p-4 rounded-md flex items-start gap-3 ${
            saveMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {saveMessage.type === 'success' ? (
              <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            )}
            <p>{saveMessage.text}</p>
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'general' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('general')}
            >
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>General</span>
              </div>
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'email' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('email')}
            >
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Email</span>
              </div>
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'backup' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('backup')}
            >
              <div className="flex items-center gap-2">
                <Database size={16} />
                <span>Backup</span>
              </div>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Site Description
                    </label>
                    <input
                      type="text"
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      id="adminEmail"
                      value={settings.general.adminEmail}
                      onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      id="supportEmail"
                      value={settings.general.supportEmail}
                      onChange={(e) => handleInputChange('general', 'supportEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="itemsPerPage" className="block text-sm font-medium text-gray-700 mb-1">
                      Items Per Page
                    </label>
                    <select
                      id="itemsPerPage"
                      value={settings.general.itemsPerPage}
                      onChange={(e) => handleInputChange('general', 'itemsPerPage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center h-full pt-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableMaintenanceMode"
                        checked={settings.general.enableMaintenanceMode}
                        onChange={(e) => handleInputChange('general', 'enableMaintenanceMode', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableMaintenanceMode" className="ml-2 block text-sm text-gray-900">
                        Enable Maintenance Mode
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Email Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="smtpServer" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Server
                    </label>
                    <input
                      type="text"
                      id="smtpServer"
                      value={settings.email.smtpServer}
                      onChange={(e) => handleInputChange('email', 'smtpServer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      id="smtpPort"
                      value={settings.email.smtpPort}
                      onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      id="smtpUsername"
                      value={settings.email.smtpUsername}
                      onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="smtpPassword"
                        value={settings.email.smtpPassword}
                        onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Key size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      From Email
                    </label>
                    <input
                      type="email"
                      id="fromEmail"
                      value={settings.email.fromEmail}
                      onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fromName" className="block text-sm font-medium text-gray-700 mb-1">
                      From Name
                    </label>
                    <input
                      type="text"
                      id="fromName"
                      value={settings.email.fromName}
                      onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableEmailNotifications"
                        checked={settings.email.enableEmailNotifications}
                        onChange={(e) => handleInputChange('email', 'enableEmailNotifications', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm text-gray-900">
                        Enable Email Notifications
                      </label>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 pt-4">
                    <button 
                      className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Mail size={16} />
                      <span>Send Test Email</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Backup Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automaticBackups"
                        checked={settings.backup.automaticBackups}
                        onChange={(e) => handleInputChange('backup', 'automaticBackups', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="automaticBackups" className="ml-2 block text-sm text-gray-900">
                        Enable Automatic Backups
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      Backup Frequency
                    </label>
                    <select
                      id="backupFrequency"
                      value={settings.backup.backupFrequency}
                      onChange={(e) => handleInputChange('backup', 'backupFrequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled={!settings.backup.automaticBackups}
                    >
                      {backupFrequencyOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="backupTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Backup Time
                    </label>
                    <input
                      type="time"
                      id="backupTime"
                      value={settings.backup.backupTime}
                      onChange={(e) => handleInputChange('backup', 'backupTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      disabled={!settings.backup.automaticBackups}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      Retention Period (days)
                    </label>
                    <select
                      id="retentionPeriod"
                      value={settings.backup.retentionPeriod}
                      onChange={(e) => handleInputChange('backup', 'retentionPeriod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {retentionPeriodOptions.map(option => (
                        <option key={option} value={option}>{option} days</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeImages"
                        checked={settings.backup.includeImages}
                        onChange={(e) => handleInputChange('backup', 'includeImages', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="includeImages" className="ml-2 block text-sm text-gray-900">
                        Include Images and Media
                      </label>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 pt-2">
                    <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm text-gray-500">Last backup</p>
                        <p className="text-sm font-medium">{settings.backup.lastBackup}</p>
                      </div>
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                        onClick={handleBackupNow}
                      >
                        <Upload size={16} />
                        <span>Backup Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 