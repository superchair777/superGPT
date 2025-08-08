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
    'sidebar.companyCatalogue': 'Company Catalogue',
    'sidebar.clientsList': 'Clients List',
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
    'export.imagesTitle': 'Export Images',

    // Delete Modal
    'delete.title': 'Delete Chat',
    'delete.message': 'Are you sure you want to delete this chat? This action cannot be undone.',
    'delete.imagesTitle': 'Delete Images',
    'delete.imagesMessage': 'Are you sure you want to delete the selected images? This action cannot be undone.',
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

    // Library Page - Additional
    'library.title': 'Image Library',
    'library.items': 'items',
    'library.selected': 'selected',
    'library.searchPlaceholder': 'Search images, tags, or descriptions...',
    'library.categories.all': 'All Images',
    'library.categories.logos': 'Logos',
    'library.categories.illustrations': 'Illustrations',
    'library.categories.photos': 'Photos',
    'library.categories.icons': 'Icons',
    'library.categories.favorites': 'Favorites',
    'library.noImages': 'No images found',
    'library.noImagesDesc': 'Try adjusting your search or filters, or create new images using the chat below.',
    'library.createImages': 'Create Images',
    'library.createDesc': 'Describe what you want to create',
    'library.startCreating': 'Start creating amazing images with AI',
    'library.exampleLogo': 'Create a modern logo for SuperChair',
    'library.exampleFurniture': 'Generate office furniture illustrations',
    'library.exampleIcons': 'Create icons for a furniture app',

    // Floor Plan Page - Additional
    'floorPlan.viewer': 'Floor Plan Viewer',
    'floorPlan.generated': 'Generated',
    'floorPlan.designAssistant': 'Design Assistant',
    'floorPlan.designDesc': 'Describe your floor plan requirements',
    'floorPlan.startConversation': 'Start a conversation to customize your floor plan',
    'floorPlan.zoomOut': 'Zoom Out',
    'floorPlan.zoomIn': 'Zoom In',
    'floorPlan.resetZoom': 'Reset Zoom',
    'floorPlan.toggleGrid': 'Toggle Grid',
    'floorPlan.layers': 'Layers',
    'floorPlan.fullscreen': 'Fullscreen',
    'floorPlan.download': 'Download',
    'floorPlan.plan': 'Plan',

    // 3D Renders Page - Additional
    'threeDRenders.viewer': '3D Render Viewer',
    'threeDRenders.highQuality': 'High Quality',
    'threeDRenders.customize': 'Customize',
    'threeDRenders.customization': 'Customization',
    'threeDRenders.renderAssistant': 'Render Assistant',
    'threeDRenders.renderDesc': 'Describe your 3D visualization needs',
    'threeDRenders.startConversation': 'Start a conversation to customize your 3D render',
    'threeDRenders.stopRotation': 'Stop Rotation',
    'threeDRenders.autoRotate': 'Auto Rotate',
    'threeDRenders.resetView': 'Reset View',
    'threeDRenders.render': 'Render',
    'threeDRenders.quality4k': '4K Quality',
    'threeDRenders.exampleLivingRoom': 'Create a modern living room with wooden furniture',
    'threeDRenders.exampleLighting': 'Change the lighting to warm and cozy',
    'threeDRenders.examplePlants': 'Add more plants and natural elements',

    // Common UI Elements
    'common.export': 'Export',
    'common.delete': 'Delete',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.generate': 'Generate',
    'common.customize': 'Customize',
    'common.download': 'Download',
    'common.fullscreen': 'Fullscreen',
    'common.zoomIn': 'Zoom In',
    'common.zoomOut': 'Zoom Out',
    'common.resetZoom': 'Reset Zoom',
    'common.toggleGrid': 'Toggle Grid',
    'common.layers': 'Layers',
    'common.stopRotation': 'Stop Rotation',
    'common.autoRotate': 'Auto Rotate',
    'common.resetView': 'Reset View',

    // Library specific
    'library.imageLibrary': 'Image Library',
    'library.createImages': 'Create Images',
    'library.describeCreate': 'Describe what you want to create',
    'library.searchPlaceholder': 'Search images, tags, or descriptions...',
    'library.allImages': 'All Images',
    'library.logos': 'Logos',
    'library.illustrations': 'Illustrations',
    'library.photos': 'Photos',
    'library.icons': 'Icons',
    'library.favorites': 'Favorites',
    'library.noImagesFound': 'No images found',
    'library.noImagesDesc': 'Try adjusting your search or filters, or create new images using the chat below.',
    'library.startCreating': 'Start creating amazing images with AI',

    // Floor Plan specific
    'floorPlan.floorPlanViewer': 'Floor Plan Viewer',
    'floorPlan.generated': 'Generated',
    'floorPlan.designAssistant': 'Design Assistant',
    'floorPlan.designDesc': 'Describe your floor plan requirements',
    'floorPlan.startConversation': 'Start a conversation to customize your floor plan',
    'floorPlan.generateNewFloorPlan': 'Generate New Floor Plan',
    'floorPlan.plan': 'Plan',

    // Floor Plan Modal
    'floorPlan.modal.title': 'Generate Floor Plan',
    'floorPlan.modal.subtitle': 'Configure your space requirements and generate a custom floor plan',
    'floorPlan.modal.dimensions': 'Dimensions',
    'floorPlan.modal.rooms': 'Rooms',
    'floorPlan.modal.furniture': 'Furniture',
    'floorPlan.modal.features': 'Features',
    'floorPlan.modal.spaceDimensions': 'Space Dimensions',
    'floorPlan.modal.widthMeters': 'Width (meters)',
    'floorPlan.modal.lengthMeters': 'Length (meters)',
    'floorPlan.modal.ceilingHeight': 'Ceiling Height (meters)',
    'floorPlan.modal.totalArea': 'Total Area',
    'floorPlan.modal.roomConfiguration': 'Room Configuration',
    'floorPlan.modal.bedrooms': 'Bedrooms',
    'floorPlan.modal.bathrooms': 'Bathrooms',
    'floorPlan.modal.livingAreas': 'Living Areas',
    'floorPlan.modal.kitchen': 'Kitchen',
    'floorPlan.modal.diningRoom': 'Dining Room',
    'floorPlan.modal.officeStudy': 'Office/Study',
    'floorPlan.modal.furnitureFixtures': 'Furniture & Fixtures',
    'floorPlan.modal.chairs': 'Chairs',
    'floorPlan.modal.tables': 'Tables',
    'floorPlan.modal.cabinets': 'Cabinets',
    'floorPlan.modal.meetingTable': 'Meeting Table',
    'floorPlan.modal.sofas': 'Sofas',
    'floorPlan.modal.wardrobes': 'Wardrobes',
    'floorPlan.modal.specialFeatures': 'Special Features',
    'floorPlan.modal.doors': 'Doors',
    'floorPlan.modal.windows': 'Windows',
    'floorPlan.modal.additionalFeatures': 'Additional Features',
    'floorPlan.modal.staircase': 'Staircase',
    'floorPlan.modal.balcony': 'Balcony',
    'floorPlan.modal.fireplace': 'Fireplace',
    'floorPlan.modal.walkInCloset': 'Walk-in Closet',
    'floorPlan.modal.laundryRoom': 'Laundry Room',
    'floorPlan.modal.garage': 'Garage',
    'floorPlan.modal.generationTime': 'Generation time: ~30 seconds',
    'floorPlan.modal.cancel': 'Cancel',
    'floorPlan.modal.generateFloorPlan': 'Generate Floor Plan',
    'floorPlan.modal.generating': 'Generating...',

    // 3D Renders specific
    'threeDRenders.threeDRenderViewer': '3D Render Viewer',
    'threeDRenders.highQuality': 'High Quality',
    'threeDRenders.renderAssistant': 'Render Assistant',
    'threeDRenders.renderDesc': 'Describe your 3D visualization needs',
    'threeDRenders.startConversation': 'Start a conversation to customize your 3D render',
    'threeDRenders.render': 'Render',
    'threeDRenders.quality4k': '4K Quality',

    // Company Catalogue
    'catalogue.companyProducts': 'Company Products',
    'catalogue.premiumFurniture': 'Premium office furniture and solutions',
    'catalogue.products': 'products',
    'catalogue.searchProducts': 'Search products, materials, or features...',
    'catalogue.allProducts': 'All Products',
    'catalogue.chairs': 'Chairs',
    'catalogue.tables': 'Tables',
    'catalogue.cabinets': 'Cabinets',
    'catalogue.desks': 'Desks',
    'catalogue.storage': 'Storage',
    'catalogue.sortByName': 'Sort by Name',
    'catalogue.sortByPriceLow': 'Price: Low to High',
    'catalogue.sortByPriceHigh': 'Price: High to Low',
    'catalogue.sortByRating': 'Sort by Rating',
    'catalogue.outOfStock': 'Out of Stock',
    'catalogue.sale': 'Sale',
    'catalogue.addToQuotation': 'Add to Quotation',
    'catalogue.reviews': 'reviews',
    'catalogue.dimensions': 'Dimensions',
    'catalogue.materials': 'Materials',
    'catalogue.availableColors': 'Available Colors',
    'catalogue.features': 'Features',
    'catalogue.noProductsFound': 'No products found',
    'catalogue.tryDifferentSearch': 'Try adjusting your search or filters',
    
    // Floor Plan Upload & Analysis
    'catalogue.uploadFloorPlan': 'Upload Floor Plan',
    'catalogue.uploadFloorPlanDesc': 'Upload your floor plan image to automatically identify products and generate a quotation',
    'catalogue.uploadImage': 'Upload Image',
    'catalogue.dragDropFloorPlan': 'Drag & drop your floor plan here',
    'catalogue.supportedFormats': 'Supports JPG, PNG, PDF files up to 10MB',
    'catalogue.browseFiles': 'Browse Files',
    'catalogue.analyzeFloorPlan': 'Analyze Floor Plan',
    'catalogue.analyzing': 'Analyzing...',
    'catalogue.analysisResults': 'Analysis Results',
    'catalogue.uploadToAnalyze': 'Upload a floor plan image to see product analysis and pricing',
    'catalogue.analyzingFloorPlan': 'Analyzing your floor plan...',
    'catalogue.identifyingProducts': 'Identifying furniture and calculating costs',
    'catalogue.analysisComplete': 'Analysis Complete!',
    'catalogue.detectedProducts': 'Detected {count} product types',
    'catalogue.detectedItems': 'Detected Items',
    'catalogue.quantity': 'Qty',
    'catalogue.confidence': 'Confidence',
    'catalogue.totalEstimate': 'Total Estimate',
    'catalogue.generateQuotation': 'Generate Quotation',

    // Clients List Page
    'clients.clientsManagement': 'Clients Management',
    'clients.manageClientRelationships': 'Manage client relationships and track purchase history',
    'clients.clients': 'clients',
    'clients.searchClients': 'Search clients, companies, or contact details...',
    'clients.allClients': 'All Clients',
    'clients.activeClients': 'Active Clients',
    'clients.inactiveClients': 'Inactive Clients',
    'clients.vipClients': 'VIP Clients',
    'clients.newClients': 'New Clients',
    'clients.sortByName': 'Sort by Name',
    'clients.sortBySpendingHigh': 'Total Spending: High to Low',
    'clients.sortBySpendingLow': 'Total Spending: Low to High',
    'clients.sortByLastPurchase': 'Sort by Last Purchase',
    'clients.sortByJoinDate': 'Sort by Join Date',
    'clients.totalSpent': 'Total Spent',
    'clients.lastPurchase': 'Last Purchase',
    'clients.joinDate': 'Join Date',
    'clients.contactInfo': 'Contact Info',
    'clients.purchaseHistory': 'Purchase History',
    'clients.clientDetails': 'Client Details',
    'clients.companyInfo': 'Company Information',
    'clients.personalInfo': 'Personal Information',
    'clients.purchaseStats': 'Purchase Statistics',
    'clients.recentOrders': 'Recent Orders',
    'clients.allOrders': 'All Orders',
    'clients.orderDate': 'Order Date',
    'clients.orderValue': 'Order Value',
    'clients.status': 'Status',
    'clients.viewOrder': 'View Order',
    'clients.noClientsFound': 'No clients found',
    'clients.tryDifferentSearch': 'Try adjusting your search or filters',
    'clients.active': 'Active',
    'clients.inactive': 'Inactive',
    'clients.vip': 'VIP',
    'clients.new': 'New',
    'clients.completed': 'Completed',
    'clients.pending': 'Pending',
    'clients.cancelled': 'Cancelled',
    'clients.phone': 'Phone',
    'clients.email': 'Email',
    'clients.company': 'Company',
    'clients.position': 'Position',
    'clients.totalOrders': 'Total Orders',
    'clients.averageOrderValue': 'Average Order Value',
    'clients.lastOrderDate': 'Last Order Date',
    'clients.clientSince': 'Client Since',
    'clients.filterBySpending': 'Filter by Total Spending',
    'clients.filterByStatus': 'Filter by Status',
    'clients.filterByJoinDate': 'Filter by Join Date',
    'clients.applyFilters': 'Apply Filters',
    'clients.clearFilters': 'Clear Filters',
    'clients.minSpending': 'Min Spending',
    'clients.maxSpending': 'Max Spending',
    'clients.from': 'From',
    'clients.to': 'To',
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
    'sidebar.companyCatalogue': 'แคตตาล็อกบริษัท',
    'sidebar.clientsList': 'รายชื่อลูกค้า',
    'sidebar.clientsList': 'รายชื่อลูกค้า',
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
    'export.imagesTitle': 'ส่งออกรูปภาพ',

    // Delete Modal
    'delete.title': 'ลบแชท',
    'delete.message': 'คุณแน่ใจหรือไม่ว่าต้องการลบแชทนี้ การกระทำนี้ไม่สามารถยกเลิกได้',
    'delete.imagesTitle': 'ลบรูปภาพ',
    'delete.imagesMessage': 'คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพที่เลือก การกระทำนี้ไม่สามารถยกเลิกได้',
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

    // Library Page - Additional
    'library.title': 'ไลบรารีรูปภาพ',
    'library.items': 'รายการ',
    'library.selected': 'เลือกแล้ว',
    'library.searchPlaceholder': 'ค้นหารูปภาพ แท็ก หรือคำอธิบาย...',
    'library.categories.all': 'รูปภาพทั้งหมด',
    'library.categories.logos': 'โลโก้',
    'library.categories.illustrations': 'ภาพประกอบ',
    'library.categories.photos': 'รูปถ่าย',
    'library.categories.icons': 'ไอคอน',
    'library.categories.favorites': 'รายการโปรด',
    'library.noImages': 'ไม่พบรูปภาพ',
    'library.noImagesDesc': 'ลองปรับการค้นหาหรือตัวกรอง หรือสร้างรูปภาพใหม่โดยใช้แชทด้านล่าง',
    'library.createImages': 'สร้างรูปภาพ',
    'library.createDesc': 'อธิบายสิ่งที่คุณต้องการสร้าง',
    'library.startCreating': 'เริ่มสร้างรูปภาพที่น่าทึ่งด้วย AI',
    'library.exampleLogo': 'สร้างโลโก้สมัยใหม่สำหรับ SuperChair',
    'library.exampleFurniture': 'สร้างภาพประกอบเฟอร์นิเจอร์สำนักงาน',
    'library.exampleIcons': 'สร้างไอคอนสำหรับแอปเฟอร์นิเจอร์',

    // Floor Plan Page - Additional
    'floorPlan.viewer': 'โปรแกรมดูแบบแปลนพื้น',
    'floorPlan.generated': 'สร้างแล้ว',
    'floorPlan.designAssistant': 'ผู้ช่วยออกแบบ',
    'floorPlan.designDesc': 'อธิบายความต้องการแบบแปลนพื้นของคุณ',
    'floorPlan.startConversation': 'เริ่มการสนทนาเพื่อปรับแต่งแบบแปลนพื้นของคุณ',
    'floorPlan.zoomOut': 'ซูมออก',
    'floorPlan.zoomIn': 'ซูมเข้า',
    'floorPlan.resetZoom': 'รีเซ็ตการซูม',
    'floorPlan.toggleGrid': 'เปิด/ปิดตาราง',
    'floorPlan.layers': 'เลเยอร์',
    'floorPlan.fullscreen': 'เต็มจอ',
    'floorPlan.download': 'ดาวน์โหลด',
    'floorPlan.plan': 'แผน',

    // 3D Renders Page - Additional
    'threeDRenders.viewer': 'โปรแกรมดูเรนเดอร์ 3 มิติ',
    'threeDRenders.highQuality': 'คุณภาพสูง',
    'threeDRenders.customize': 'ปรับแต่ง',
    'threeDRenders.customization': 'การปรับแต่ง',
    'threeDRenders.renderAssistant': 'ผู้ช่วยเรนเดอร์',
    'threeDRenders.renderDesc': 'อธิบายความต้องการการแสดงภาพ 3 มิติของคุณ',
    'threeDRenders.startConversation': 'เริ่มการสนทนาเพื่อปรับแต่งเรนเดอร์ 3 มิติของคุณ',
    'threeDRenders.stopRotation': 'หยุดการหมุน',
    'threeDRenders.autoRotate': 'หมุนอัตโนมัติ',
    'threeDRenders.resetView': 'รีเซ็ตมุมมอง',
    'threeDRenders.render': 'เรนเดอร์',
    'threeDRenders.quality4k': 'คุณภาพ 4K',
    'threeDRenders.exampleLivingRoom': 'สร้างห้องนั่งเล่นสมัยใหม่ด้วยเฟอร์นิเจอร์ไม้',
    'threeDRenders.exampleLighting': 'เปลี่ยนแสงให้อบอุ่นและสบาย',
    'threeDRenders.examplePlants': 'เพิ่มต้นไม้และองค์ประกอบธรรมชาติมากขึ้น',

    // Common UI Elements
    'common.export': 'ส่งออก',
    'common.delete': 'ลบ',
    'common.cancel': 'ยกเลิก',
    'common.save': 'บันทึก',
    'common.generate': 'สร้าง',
    'common.customize': 'ปรับแต่ง',
    'common.download': 'ดาวน์โหลด',
    'common.fullscreen': 'เต็มจอ',
    'common.zoomIn': 'ซูมเข้า',
    'common.zoomOut': 'ซูมออก',
    'common.resetZoom': 'รีเซ็ตการซูม',
    'common.toggleGrid': 'เปิด/ปิดตาราง',
    'common.layers': 'เลเยอร์',
    'common.stopRotation': 'หยุดการหมุน',
    'common.autoRotate': 'หมุนอัตโนมัติ',
    'common.resetView': 'รีเซ็ตมุมมอง',

    // Library specific
    'library.imageLibrary': 'ไลบรารีรูปภาพ',
    'library.createImages': 'สร้างรูปภาพ',
    'library.describeCreate': 'อธิบายสิ่งที่คุณต้องการสร้าง',
    'library.searchPlaceholder': 'ค้นหารูปภาพ แท็ก หรือคำอธิบาย...',
    'library.allImages': 'รูปภาพทั้งหมด',
    'library.logos': 'โลโก้',
    'library.illustrations': 'ภาพประกอบ',
    'library.photos': 'รูปถ่าย',
    'library.icons': 'ไอคอน',
    'library.favorites': 'รายการโปรด',
    'library.noImagesFound': 'ไม่พบรูปภาพ',
    'library.noImagesDesc': 'ลองปรับการค้นหาหรือตัวกรอง หรือสร้างรูปภาพใหม่โดยใช้แชทด้านล่าง',
    'library.startCreating': 'เริ่มสร้างรูปภาพที่น่าทึ่งด้วย AI',

    // Floor Plan specific
    'floorPlan.floorPlanViewer': 'โปรแกรมดูแบบแปลนพื้น',
    'floorPlan.generated': 'สร้างแล้ว',
    'floorPlan.designAssistant': 'ผู้ช่วยออกแบบ',
    'floorPlan.designDesc': 'อธิบายความต้องการแบบแปลนพื้นของคุณ',
    'floorPlan.startConversation': 'เริ่มการสนทนาเพื่อปรับแต่งแบบแปลนพื้นของคุณ',
    'floorPlan.generateNewFloorPlan': 'สร้างแบบแปลนใหม่',
    'floorPlan.plan': 'แผน',

    // Floor Plan Modal
    'floorPlan.modal.title': 'สร้างแบบแปลนพื้น',
    'floorPlan.modal.subtitle': 'กำหนดค่าความต้องการพื้นที่ของคุณและสร้างแบบแปลนพื้นแบบกำหนดเอง',
    'floorPlan.modal.dimensions': 'ขนาด',
    'floorPlan.modal.rooms': 'ห้อง',
    'floorPlan.modal.furniture': 'เฟอร์นิเจอร์',
    'floorPlan.modal.features': 'คุณสมบัติ',
    'floorPlan.modal.spaceDimensions': 'ขนาดพื้นที่',
    'floorPlan.modal.widthMeters': 'ความกว้าง (เมตร)',
    'floorPlan.modal.lengthMeters': 'ความยาว (เมตร)',
    'floorPlan.modal.ceilingHeight': 'ความสูงเพดาน (เมตร)',
    'floorPlan.modal.totalArea': 'พื้นที่รวม',
    'floorPlan.modal.roomConfiguration': 'การจัดวางห้อง',
    'floorPlan.modal.bedrooms': 'ห้องนอน',
    'floorPlan.modal.bathrooms': 'ห้องน้ำ',
    'floorPlan.modal.livingAreas': 'พื้นที่นั่งเล่น',
    'floorPlan.modal.kitchen': 'ห้องครัว',
    'floorPlan.modal.diningRoom': 'ห้องอาหาร',
    'floorPlan.modal.officeStudy': 'ห้องทำงาน/ห้องอ่านหนังสือ',
    'floorPlan.modal.furnitureFixtures': 'เฟอร์นิเจอร์และอุปกรณ์ตกแต่ง',
    'floorPlan.modal.chairs': 'เก้าอี้',
    'floorPlan.modal.tables': 'โต๊ะ',
    'floorPlan.modal.cabinets': 'ตู้',
    'floorPlan.modal.meetingTable': 'โต๊ะประชุม',
    'floorPlan.modal.sofas': 'โซฟา',
    'floorPlan.modal.wardrobes': 'ตู้เสื้อผ้า',
    'floorPlan.modal.specialFeatures': 'คุณสมบัติพิเศษ',
    'floorPlan.modal.doors': 'ประตู',
    'floorPlan.modal.windows': 'หน้าต่าง',
    'floorPlan.modal.additionalFeatures': 'คุณสมบัติเพิ่มเติม',
    'floorPlan.modal.staircase': 'บันได',
    'floorPlan.modal.balcony': 'ระเบียง',
    'floorPlan.modal.fireplace': 'เตาผิง',
    'floorPlan.modal.walkInCloset': 'ห้องแต่งตัว',
    'floorPlan.modal.laundryRoom': 'ห้องซักผ้า',
    'floorPlan.modal.garage': 'โรงรถ',
    'floorPlan.modal.generationTime': 'เวลาในการสร้าง: ~30 วินาที',
    'floorPlan.modal.cancel': 'ยกเลิก',
    'floorPlan.modal.generateFloorPlan': 'สร้างแบบแปลนพื้น',
    'floorPlan.modal.generating': 'กำลังสร้าง...',

    // 3D Renders specific
    'threeDRenders.threeDRenderViewer': 'เรนเดอร์ 3D',
    'threeDRenders.highQuality': 'คุณภาพสูง',
    'threeDRenders.renderAssistant': 'ผู้ช่วยเรนเดอร์',
    'threeDRenders.renderDesc': 'อธิบายความต้องการการแสดงภาพ 3 มิติของคุณ',
    'threeDRenders.startConversation': 'เริ่มการสนทนาเพื่อปรับแต่งเรนเดอร์ 3 มิติของคุณ',
    'threeDRenders.render': 'เรนเดอร์',
    'threeDRenders.quality4k': 'คุณภาพ 4K',

    // Company Catalogue
    'catalogue.companyProducts': 'ผลิตภัณฑ์บริษัท',
    'catalogue.premiumFurniture': 'เฟอร์นิเจอร์สำนักงานและโซลูชันระดับพรีเมียม',
    'catalogue.products': 'ผลิตภัณฑ์',
    'catalogue.searchProducts': 'ค้นหาผลิตภัณฑ์ วัสดุ หรือคุณสมบัติ...',
    'catalogue.allProducts': 'ผลิตภัณฑ์ทั้งหมด',
    'catalogue.chairs': 'เก้าอี้',
    'catalogue.tables': 'โต๊ะ',
    'catalogue.cabinets': 'ตู้',
    'catalogue.desks': 'โต๊ะทำงาน',
    'catalogue.storage': 'ที่เก็บของ',
    'catalogue.sortByName': 'เรียงตามชื่อ',
    'catalogue.sortByPriceLow': 'ราคา: ต่ำไปสูง',
    'catalogue.sortByPriceHigh': 'ราคา: สูงไปต่ำ',
    'catalogue.sortByRating': 'เรียงตามคะแนน',
    'catalogue.outOfStock': 'สินค้าหมด',
    'catalogue.sale': 'ลดราคา',
    'catalogue.addToQuotation': 'เพิ่มลงใบเสนอราคา',
    'catalogue.reviews': 'รีวิว',
    'catalogue.dimensions': 'ขนาด',
    'catalogue.materials': 'วัสดุ',
    'catalogue.availableColors': 'สีที่มีจำหน่าย',
    'catalogue.features': 'คุณสมบัติ',
    'catalogue.noProductsFound': 'ไม่พบผลิตภัณฑ์',
    'catalogue.tryDifferentSearch': 'ลองปรับการค้นหาหรือตัวกรองของคุณ',
    
    // Floor Plan Upload & Analysis
    'catalogue.uploadFloorPlan': 'อัปโหลดแบบแปลนพื้น',
    'catalogue.uploadFloorPlanDesc': 'อัปโหลดรูปแบบแปลนพื้นเพื่อระบุผลิตภัณฑ์อัตโนมัติและสร้างใบเสนอราคา',
    'catalogue.uploadImage': 'อัปโหลดรูปภาพ',
    'catalogue.dragDropFloorPlan': 'ลากและวางแบบแปลนพื้นของคุณที่นี่',
    'catalogue.supportedFormats': 'รองรับไฟล์ JPG, PNG, PDF ขนาดไม่เกิน 10MB',
    'catalogue.browseFiles': 'เลือกไฟล์',
    'catalogue.analyzeFloorPlan': 'วิเคราะห์แบบแปลนพื้น',
    'catalogue.analyzing': 'กำลังวิเคราะห์...',
    'catalogue.analysisResults': 'ผลการวิเคราะห์',
    'catalogue.uploadToAnalyze': 'อัปโหลดรูปแบบแปลนพื้นเพื่อดูการวิเคราะห์ผลิตภัณฑ์และราคา',
    'catalogue.analyzingFloorPlan': 'กำลังวิเคราะห์แบบแปลนพื้นของคุณ...',
    'catalogue.identifyingProducts': 'กำลังระบุเฟอร์นิเจอร์และคำนวณต้นทุน',
    'catalogue.analysisComplete': 'การวิเคราะห์เสร็จสิ้น!',
    'catalogue.detectedProducts': 'ตรวจพบผลิตภัณฑ์ {count} ประเภท',
    'catalogue.detectedItems': 'รายการที่ตรวจพบ',
    'catalogue.quantity': 'จำนวน',
    'catalogue.confidence': 'ความมั่นใจ',
    'catalogue.totalEstimate': 'ประมาณการรวม',
    'catalogue.generateQuotation': 'สร้างใบเสนอราคา',

    // Clients List Page
    'clients.clientsManagement': 'การจัดการลูกค้า',
    'clients.manageClientRelationships': 'จัดการความสัมพันธ์กับลูกค้าและติดตามประวัติการซื้อ',
    'clients.clients': 'ลูกค้า',
    'clients.searchClients': 'ค้นหาลูกค้า บริษัท หรือข้อมูลติดต่อ...',
    'clients.allClients': 'ลูกค้าทั้งหมด',
    'clients.activeClients': 'ลูกค้าที่ใช้งาน',
    'clients.inactiveClients': 'ลูกค้าที่ไม่ใช้งาน',
    'clients.vipClients': 'ลูกค้า VIP',
    'clients.newClients': 'ลูกค้าใหม่',
    'clients.sortByName': 'เรียงตามชื่อ',
    'clients.sortBySpendingHigh': 'ยอดใช้จ่ายรวม: สูงไปต่ำ',
    'clients.sortBySpendingLow': 'ยอดใช้จ่ายรวม: ต่ำไปสูง',
    'clients.sortByLastPurchase': 'เรียงตามการซื้อล่าสุด',
    'clients.sortByJoinDate': 'เรียงตามวันที่เข้าร่วม',
    'clients.totalSpent': 'ยอดใช้จ่ายรวม',
    'clients.lastPurchase': 'การซื้อล่าสุด',
    'clients.joinDate': 'วันที่เข้าร่วม',
    'clients.contactInfo': 'ข้อมูลติดต่อ',
    'clients.purchaseHistory': 'ประวัติการซื้อ',
    'clients.clientDetails': 'รายละเอียดลูกค้า',
    'clients.companyInfo': 'ข้อมูลบริษัท',
    'clients.personalInfo': 'ข้อมูลส่วนตัว',
    'clients.purchaseStats': 'สถิติการซื้อ',
    'clients.recentOrders': 'คำสั่งซื้อล่าสุด',
    'clients.allOrders': 'คำสั่งซื้อทั้งหมด',
    'clients.orderDate': 'วันที่สั่งซื้อ',
    'clients.orderValue': 'มูลค่าคำสั่งซื้อ',
    'clients.status': 'สถานะ',
    'clients.viewOrder': 'ดูคำสั่งซื้อ',
    'clients.noClientsFound': 'ไม่พบลูกค้า',
    'clients.tryDifferentSearch': 'ลองปรับการค้นหาหรือตัวกรองของคุณ',
    'clients.active': 'ใช้งาน',
    'clients.inactive': 'ไม่ใช้งาน',
    'clients.vip': 'VIP',
    'clients.new': 'ใหม่',
    'clients.completed': 'เสร็จสิ้น',
    'clients.pending': 'รอดำเนินการ',
    'clients.cancelled': 'ยกเลิก',
    'clients.phone': 'โทรศัพท์',
    'clients.email': 'อีเมล',
    'clients.company': 'บริษัท',
    'clients.position': 'ตำแหน่ง',
    'clients.totalOrders': 'คำสั่งซื้อทั้งหมด',
    'clients.averageOrderValue': 'มูลค่าเฉลี่ยต่อคำสั่งซื้อ',
    'clients.lastOrderDate': 'วันที่สั่งซื้อล่าสุด',
    'clients.clientSince': 'เป็นลูกค้าตั้งแต่',
    'clients.filterBySpending': 'กรองตามยอดใช้จ่ายรวม',
    'clients.filterByStatus': 'กรองตามสถานะ',
    'clients.filterByJoinDate': 'กรองตามวันที่เข้าร่วม',
    'clients.applyFilters': 'ใช้ตัวกรอง',
    'clients.clearFilters': 'ล้างตัวกรอง',
    'clients.minSpending': 'ยอดใช้จ่ายขั้นต่ำ',
    'clients.maxSpending': 'ยอดใช้จ่ายสูงสุด',
    'clients.from': 'จาก',
    'clients.to': 'ถึง',
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