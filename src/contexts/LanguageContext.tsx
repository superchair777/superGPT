import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'SuperGPT',
    
    // Sidebar
    'sidebar.newChat': 'New chat',
    'sidebar.searchChats': 'Search chats',
    'sidebar.library': 'Library',
    'sidebar.sora': 'Floor plans',
    'sidebar.gpts': '3D Renders',
    'sidebar.chats': 'Chats',
    'sidebar.userStatus': 'Free',
    
    // Chat History
    'chat.logoCreation': 'Logo creation request',
    'chat.exampleChat': 'Example chat: Ask anything',
    'chat.projectPlanning': 'Project planning discussion',
    'chat.codeReview': 'Code review session',
    
    // Main Chat Area
    'chat.welcomeMessage': "What's on the agenda today?",
    'chat.placeholder': 'Ask anything',
    'chat.tools': 'Tools',
    'chat.disclaimer': 'SuperGPT can make mistakes. Check important info.',
    
    // Quick Actions
    'actions.createImage': 'Create image',
    'actions.summarizeText': 'Summarize text',
    'actions.helpWrite': 'Help me write',
    'actions.getAdvice': 'Get advice',
    'actions.more': 'More',
    'actions.analyzeImages': 'Analyze images',
    'actions.code': 'Code',
    'actions.makePlan': 'Make a plan',

    // Tools Dropdown
    'tools.studyAndLearn': 'Study and learn',
    'tools.createImage': 'Create image',
    'tools.thinkLonger': 'Think longer',
    'tools.deepResearch': 'Deep research',
    'tools.webSearch': 'Web search',
    'tools.canvas': 'Canvas',

    // File Upload Modal
    'fileUpload.title': 'Upload files',
    'fileUpload.subtitle': 'Drag and drop files here or click to browse',
    'fileUpload.button': 'Browse files',
    'fileUpload.photo': 'Photo',
    'fileUpload.file': 'File',
    
    // More Options
    'more.codeReview': 'Code review',
    'more.mathSolver': 'Math solver',
    'more.webSearch': 'Web search',
    'more.research': 'Research',
    'more.brainstorm': 'Brainstorm',
    'more.translate': 'Translate',

    // Notifications
    'notifications.title': 'Notifications',
    'notifications.announcement': 'Company Announcement',
    'notifications.q3Report': 'Our Q3 earnings report is now available.',
    'notifications.superSearch': 'New Feature: SuperSearch',
    'notifications.searchFaster': 'Find information faster with our new AI-powered search.',
    'notifications.maintenance': 'Scheduled Maintenance',
    'notifications.maintenanceMessage': 'We will be undergoing scheduled maintenance on Sunday.',

    // Profile Modal
    'profile.editTitle': 'Edit Profile',
    'profile.changePhoto': 'Change Photo',
    'profile.nameLabel': 'Name',
    'profile.jobTitleLabel': 'Job Title',
    'profile.cancelButton': 'Cancel',
    'profile.saveButton': 'Save',

    // Chat Actions
    'chat.share': 'Share',
    'chat.delete': 'Delete',

    // Export Modal
    'export.title': 'Export Chat',

    // Delete Modal
    'delete.title': 'Delete Chat',
    'delete.message': 'Are you sure you want to delete this chat? This action cannot be undone.',
    'delete.cancelButton': 'Cancel',
    'delete.deleteButton': 'Delete',

    // Search Modal
    'search.today': 'Today',
    'search.previous': 'Previous 7 Days',

    // Library Page
    'library.describe': 'Describe an image',

    // Floor Plan Page
    'floorPlan.title': 'Floor plans',
    'floorPlan.dimensions': 'Dimensions',
    'floorPlan.width': 'Width',
    'floorPlan.height': 'Height',
    'floorPlan.elements': 'Elements',
    'floorPlan.chairs': 'Chairs',
    'floorPlan.tables': 'Tables',
    'floorPlan.cabinets': 'Cabinets',
    'floorPlan.meetingTable': 'Meeting table',
    'floorPlan.meetingChair': 'Meeting chair',
    'floorPlan.doors': 'Doors',
    'floorPlan.staircase': 'Staircase',
    'floorPlan.generate': 'Generate',
    'floorPlan.placeholder': 'Generated floor plan will appear here',
    'floorPlan.generateButton': 'Generate New Floor Plan',

    // 3D Renders Page
    'threeDRenders.title': '3D Renders',
    'threeDRenders.describe': 'Describe an image',
  },
  th: {
    // Header
    'header.title': 'SuperGPT',
    
    // Sidebar
    'sidebar.newChat': 'แชทใหม่',
    'sidebar.searchChats': 'ค้นหาแชท',
    'sidebar.library': 'ไลบรารี',
    'sidebar.sora': 'แบบแปลนพื้น',
    'sidebar.gpts': 'เรนเดอร์ 3 มิติ',
    'sidebar.chats': 'แชท',
    'sidebar.userStatus': 'ฟรี',
    
    // Chat History
    'chat.logoCreation': 'คำขอสร้างโลโก้',
    'chat.exampleChat': 'แชทตัวอย่าง: ถามอะไรก็ได้',
    'chat.projectPlanning': 'การวางแผนโครงการ',
    'chat.codeReview': 'การตรวจสอบโค้ด',
    
    // Main Chat Area
    'chat.welcomeMessage': 'วันนี้มีอะไรให้ช่วยไหม?',
    'chat.placeholder': 'ถามอะไรก็ได้',
    'chat.tools': 'เครื่องมือ',
    'chat.disclaimer': 'SuperGPT อาจทำผิดพลาดได้ กรุณาตรวจสอบข้อมูลสำคัญ',
    
    // Quick Actions
    'actions.createImage': 'สร้างรูปภาพ',
    'actions.summarizeText': 'สรุปข้อความ',
    'actions.helpWrite': 'ช่วยเขียน',
    'actions.getAdvice': 'ขอคำแนะนำ',
    'actions.more': 'เพิ่มเติม',
    'actions.analyzeImages': 'วิเคราะห์รูปภาพ',
    'actions.code': 'โค้ด',
    'actions.makePlan': 'สร้างแผน',

    // Tools Dropdown
    'tools.studyAndLearn': 'เรียนและศึกษา',
    'tools.createImage': 'สร้างรูปภาพ',
    'tools.thinkLonger': 'คิดให้นานขึ้น',
    'tools.deepResearch': 'การวิจัยเชิงลึก',
    'tools.webSearch': 'ค้นหาเว็บ',
    'tools.canvas': 'แคนวาส',

    // File Upload Modal
    'fileUpload.title': 'อัปโหลดไฟล์',
    'fileUpload.subtitle': 'ลากและวางไฟล์ที่นี่หรือคลิกเพื่อเรียกดู',
    'fileUpload.button': 'เลือกไฟล์',
    'fileUpload.photo': 'รูปภาพ',
    'fileUpload.file': 'ไฟล์',
    
    // More Options
    'more.codeReview': 'ตรวจสอบโค้ด',
    'more.mathSolver': 'แก้โจทย์คณิตศาสตร์',
    'more.webSearch': 'ค้นหาเว็บ',
    'more.research': 'วิจัย',
    'more.brainstorm': 'ระดมความคิด',
    'more.translate': 'แปลภาษา',

    // Notifications
    'notifications.title': 'การแจ้งเตือน',
    'notifications.announcement': 'ประกาศจากบริษัท',
    'notifications.q3Report': 'รายงานผลประกอบการไตรมาสที่ 3 ของเราพร้อมให้ใช้งานแล้ว',
    'notifications.superSearch': 'ฟีเจอร์ใหม่: SuperSearch',
    'notifications.searchFaster': 'ค้นหาข้อมูลได้เร็วขึ้นด้วยการค้นหาที่ขับเคลื่อนด้วย AI ใหม่ของเรา',
    'notifications.maintenance': 'การบำรุงรักษาตามกำหนด',
    'notifications.maintenanceMessage': 'เราจะมีการบำรุงรักษาตามกำหนดในวันอาทิตย์',

    // Profile Modal
    'profile.editTitle': 'แก้ไขโปรไฟล์',
    'profile.changePhoto': 'เปลี่ยนรูปภาพ',
    'profile.nameLabel': 'ชื่อ',
    'profile.jobTitleLabel': 'ตำแหน่งงาน',
    'profile.cancelButton': 'ยกเลิก',
    'profile.saveButton': 'บันทึก',

    // Chat Actions
    'chat.share': 'แชร์',
    'chat.delete': 'ลบ',

    // Export Modal
    'export.title': 'ส่งออกแชท',

    // Delete Modal
    'delete.title': 'ลบแชท',
    'delete.message': 'คุณแน่ใจหรือไม่ว่าต้องการลบแชทนี้ การกระทำนี้ไม่สามารถยกเลิกได้',
    'delete.cancelButton': 'ยกเลิก',
    'delete.deleteButton': 'ลบ',

    // Search Modal
    'search.today': 'วันนี้',
    'search.previous': '7 วันที่ผ่านมา',

    // Library Page
    'library.describe': 'อธิบายรูปภาพ',

    // Floor Plan Page
    'floorPlan.title': 'แบบแปลนพื้น',
    'floorPlan.dimensions': 'ขนาด',
    'floorPlan.width': 'ความกว้าง',
    'floorPlan.height': 'ความสูง',
    'floorPlan.elements': 'องค์ประกอบ',
    'floorPlan.chairs': 'เก้าอี้',
    'floorPlan.tables': 'โต๊ะ',
    'floorPlan.cabinets': 'ตู้',
    'floorPlan.meetingTable': 'โต๊ะประชุม',
    'floorPlan.meetingChair': 'เก้าอี้ประชุม',
    'floorPlan.doors': 'ประตู',
    'floorPlan.staircase': 'บันได',
    'floorPlan.generate': 'สร้าง',
    'floorPlan.placeholder': 'แบบแปลนพื้นที่สร้างขึ้นจะปรากฏที่นี่',
    'floorPlan.generateButton': 'สร้างแบบแปลนใหม่',

    // 3D Renders Page
    'threeDRenders.title': 'เรนเดอร์ 3 มิติ',
    'threeDRenders.describe': 'อธิบายรูปภาพ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};