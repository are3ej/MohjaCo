import React, { createContext, useContext, useState } from 'react';

const TranslationContext = createContext();

export const translations = {
  en: {
    // Home Page
    transformingConstruction: "Mohja Company ",
    mohjaDescription: "Mohja Company delivers cutting-edge construction equipment and expert solutions tailored to your unique business needs. We combine innovation, quality, and reliability to drive your operational success.",
    ourEquipment: "Our Equipment",
    contactUs: "Contact Us",
    ourServices: "Our Services",
    whyChooseUs: "Why To Choose Us",
    
    // Services
    strategicSourcing: "Strategic Sourcing",
    strategicSourcingDesc: "Precision-driven procurement of high-performance construction equipment from leading US manufacturers.",
    technicalExpertise: "Technical Expertise",
    technicalExpertiseDesc: "Comprehensive advisory services providing data-driven insights for optimal equipment selection.",
    qualityAssurance: "Quality Assurance",
    qualityAssuranceDesc: "Rigorous verification ensuring equipment meets the highest performance standards.",
    
    // Features
    freeZoneSolutions: "Free Zone Solutions",
    freeZoneSolutionsDesc: "Strategic utilization of Jordan Free Zone regulations for cost-effective construction equipment procurement.",
    strategicPartnerships: "Strategic Partnerships",
    strategicPartnershipsDesc: "Cultivating relationships with premier American construction equipment manufacturers.",
    globalLogistics: "Global Logistics",
    globalLogisticsDesc: "Seamless, meticulously planned international import-export services for precise equipment delivery.",

    // About Page
    constructionExcellence: "Construction Excellence",
    aboutDescription: "A strategic partner in construction solutions, delivering innovative equipment and expertise that drive operational efficiency and technological advancement.",
    coreValues: "Our Core Values",
    professionalCommitment: "Our Professional Commitment",
    transformOperations: "Transform Your Construction Operations",

    // About Page Values
    expertCollaboration: "Expert Collaboration",
    expertCollaborationDesc: "A dedicated team works closely to understand and exceed client expectations.",
    globalStandards: "Global Standards",
    globalStandardsDesc: "Implementing international best practices in construction equipment provision.",
    continuousExcellence: "Continuous Excellence",
    continuousExcellenceDesc: "Committed to ongoing improvement and construction-leading performance.",
    safetyFirst: "Safety First",
    safetyFirstDesc: "Prioritizing safety and reliability in all our construction solutions.",
    innovativeSolutions: "Innovative Solutions",
    innovativeSolutionsDesc: "Developing cutting-edge technologies to solve complex construction challenges.",
    professionalCommitmentDesc: "We go beyond equipment supply. Mohja Company is a comprehensive construction solutions partner, combining technical expertise, innovative technologies, and a deep understanding of construction challenges to help businesses optimize their operational capabilities.",
    transformOperationsDesc: "Discover how Mohja Company's advanced construction solutions can elevate your operational efficiency, technological capabilities, and competitive edge.",
    
    //contactPage
    contactPage: {
      getInTouch: 'Get In Touch',
      contactDescription: "We're here to support your construction and equipment needs. Reach out through your preferred communication method.",
      callUsOsama: 'Call Us (Osama)',
      callUsIbraheem: 'Call Us (Ibraheem)',
      callUSA: 'Call USA',
      email: 'Email',
    },
    //services
    integratedServices: 'Our Integrated Services',
    solutionsSubtitle: 'Advanced Solutions for Your Construction Equipment Needs',
    learnMore: 'Learn More',
    readyToElevate: 'Ready to Elevate Your Construction Operations?',
    transformDescription: 'Transform your construction capabilities with Mohja Company\'s comprehensive equipment solutions. Our strategic approach combines cutting-edge technology, expert consultation, and tailored services to optimize your project efficiency and operational excellence.',
    ourEquipment: 'Our Equipment',
    contactUs: 'Contact Us',
    services: {
      supply: {
        title: 'Construction and Mining Equipment Supply',
        description: 'Providing specialized heavy equipment for contracting and mining from global brands like Caterpillar and Komatsu.'
      },
      maintenance: {
        title: 'Heavy Equipment Maintenance and Repair',
        description: 'Periodic maintenance and comprehensive construction equipment repair with a qualified and certified technical team.'
      },
      engineering: {
        title: 'Integrated Engineering Solutions',
        description: 'Technical and engineering consultations for selecting and operating the most suitable equipment for construction and construction projects.'
      },
      consulting: {
        title: 'Technical Consulting for Major Projects',
        description: 'Feasibility studies and operational plans for construction and infrastructure projects.'
      },
      support: {
        title: 'Comprehensive Technical Support Services',
        description: 'Monitoring and managing equipment during projects, and providing continuous technical support.'
      },
      innovation: {
        title: 'Technical Update and Innovation Solutions',
        description: 'Updating and improving the performance of old equipment and providing innovative technical solutions.'
      }
    },

    //equipment
    equipmentPage: {
      heroTitle: 'Equipment Solutions',
      heroSubtitle: 'Discover cutting-edge technology and precision engineering that drives innovation across industries. Our comprehensive equipment collection is designed to meet the most demanding professional requirements.',
      browseEquipment: 'Browse Equipment',
      selectCategoryPlaceholder: 'Select Equipment Category',
      viewDetails: 'View Details',
      viewFullGallery: 'View Full Gallery',
      close: 'Close',
      noDescriptionAvailable: 'No description available',
      unnamedEquipment: 'Unnamed Equipment',
      equipmentImage: 'Equipment Image',
      failedToLoadEquipment: 'Failed to load equipment',
      manufacturer: 'MANUFACTURER',
      serialNumber: 'SERIAL NUMBER',
      equipmentGallery: 'Equipment Gallery',
      viewSoldEquipment: 'View Sold Equipment',
    },
    //sold page
    soldEquipmentPage: {
      heroTitle: 'Sold Equipment Archive',
      heroSubtitle: 'Browse through our history of successfully sold equipment and machinery.',
      browseEquipment: 'Browse Equipment',
      viewGallery: 'View Gallery',
    },
    // Contact Page
    getInTouch: "Get In Touch",
    contactDescription: "We're here to support your construction and equipment needs. Reach out through your preferred communication method.",
    callUs: "Call Us",
    email: "Email",
    callUSA: "Call USA"
  },
  
  ar: {
    // Home Page
    transformingConstruction:"شركة مهجه ",
    mohjaDescription: "تقدم شركة مهجة معدات بناء متطورة وحلولاً خبيرة مصممة خصيصاً لاحتياجات عملك الفريدة. نجمع بين الابتكار والجودة والموثوقية لدفع نجاح عملياتك.",
    ourEquipment: "معداتنا",
    contactUs: "اتصل بنا",
    ourServices: "خدماتنا",
    whyChooseUs: "لماذا تختارنا",
    
    // Services
    strategicSourcing: "التوريد الاستراتيجي",
    strategicSourcingDesc: "شراء معدات بناء عالية الأداء من كبار المصنعين الأمريكيين بدقة عالية.",
    technicalExpertise: "الخبرة التقنية",
    technicalExpertiseDesc: "خدمات استشارية شاملة تقدم رؤى مدفوعة بالبيانات لاختيار المعدات الأمثل.",
    qualityAssurance: "ضمان الجودة",
    qualityAssuranceDesc: "تحقق صارم يضمن تلبية المعدات لأعلى معايير الأداء.",
    
    // Features
    freeZoneSolutions: "حلول المنطقة الحرة",
    freeZoneSolutionsDesc: "استخدام استراتيجي للوائح المنطقة الحرة الأردنية لشراء معدات البناء بأقل تكلفة",
    strategicPartnerships: "شراكات استراتيجية",
    strategicPartnershipsDesc: "تنمية العلاقات مع كبار مصنعي معدات البناء الأمريكية.",
    globalLogistics: "الخدمات اللوجستية العالمية",
    globalLogisticsDesc: "خدمات استيراد وتصدير دولية سلسة ومخططة بدقة لتسليم المعدات بدقة.",

    // About Page
    constructionExcellence: "التميز في البناء",
    aboutDescription: "شريك استراتيجي في حلول البناء، نقدم معدات مبتكرة وخبرة تدفع الكفاءة التشغيلية والتقدم التكنولوجي.",
    coreValues: "قيمنا الأساسية",
    professionalCommitment: "التزامنا المهني",
    transformOperations: "حول عمليات البناء الخاصة بك",
    
    // About Page Values
    expertCollaboration: "تعاون خبير",
    expertCollaborationDesc: "يعمل فريق متخصص عن كثب لفهم وتجاوز توقعات العملاء.",
    globalStandards: "المعايير العالمية",
    globalStandardsDesc: "تطبيق أفضل الممارسات الدولية في توفير معدات البناء.",
    continuousExcellence: "التميز المستمر",
    continuousExcellenceDesc: "ملتزمون بالتحسين المستمر والأداء الرائد في البناء.",
    safetyFirst: "السلامة أولاً",
    safetyFirstDesc: "إعطاء الأولوية للسلامة والموثوقية في جميع حلول البناء لدينا.",
    innovativeSolutions: "حلول مبتكرة",
    innovativeSolutionsDesc: "تطوير تقنيات متطورة لحل تحديات البناء المعقدة.",
    professionalCommitmentDesc: "نحن نتجاوز توريد المعدات. شركة مهجة هي شريك شامل في حلول البناء، تجمع بين الخبرة التقنية والتقنيات المبتكرة وفهم عميق لتحديات البناء لمساعدة الشركات على تحسين قدراتها التشغيلية.",
    transformOperationsDesc: "اكتشف كيف يمكن لحلول البناء المتقدمة من شركة مهجة أن ترفع من كفاءتك التشغيلية وقدراتك التكنولوجية وميزتك التنافسية.",

    // Contact Page
    getInTouch: "تواصل معنا",
    contactDescription: "نحن هنا لدعم احتياجات البناء والمعدات الخاصة بك. تواصل معنا من خلال وسيلة الاتصال المفضلة لديك.",
    callUs: "اتصل بنا",
    email: "البريد الإلكتروني",
    callUSA: "اتصل بنا على رقم الولايات المتحدة",

    //equipment
    equipmentPage: {
      heroTitle: 'حلول المعدات',
      heroSubtitle: 'اكتشف التكنولوجيا المتطورة والهندسة الدقيقة التي تقود الابتكار عبر الصناعات. تم تصميم مجموعة المعدات الشاملة لدينا لتلبية المتطلبات المهنية الأكثر صرامة.',
      browseEquipment: 'تصفح المعدات',
      selectCategoryPlaceholder: 'اختر فئة المعدات',
      viewDetails: 'عرض التفاصيل',
      viewFullGallery: 'عرض المعرض الكامل',
      close: 'إغلاق',
      noDescriptionAvailable: 'لا يوجد وصف متاح',
      unnamedEquipment: 'معدات غير مسماة',
      equipmentImage: 'صورة المعدات',
      failedToLoadEquipment: 'فشل تحميل المعدات',
      manufacturer: 'الشركة المصنعة',
      serialNumber: 'الرقم التسلسلي',
      equipmentGallery: 'معرض المعدات',
      viewSoldEquipment: 'عرض المعدات المباعة',
    },
    //sold page
    soldEquipmentPage: {
      heroTitle: 'أرشيف المعدات المباعة',
      heroSubtitle: 'تصفح تاريخنا من المعدات والآلات التي تم بيعها بنجاح.',
      browseEquipment: 'تصفح المعدات',
      viewGallery: 'عرض المعرض الكامل',
    },
    //contactPage
    contactPage: {
      getInTouch: 'تواصل معنا',
      contactDescription: 'نحن هنا لدعم احتياجات البناء والمعدات الخاصة بك. تواصل معنا من خلال وسيلة الاتصال المفضلة لديك.',
      callUsOsama: 'اتصل بنا (أسامة)',
      callUsIbraheem: 'اتصل بنا (إبراهيم)',
      callUSA: 'اتصل بنا على رقم الولايات المتحدة',
      email: 'البريد الإلكتروني',
    },
    //services
    integratedServices: 'خدماتنا المتكاملة',
    solutionsSubtitle: 'حلول متقدمة لاحتياجات معدات البناء الخاصة بك',
    learnMore: 'اعرف المزيد',
    readyToElevate: 'هل أنت مستعد للارتقاء بعمليات البناء الخاصة بك؟',
    transformDescription: 'قم بتحويل قدرات البناء الخاصة بك مع حلول المعدات الشاملة من شركة مهجة. يجمع نهجنا الاستراتيجي بين التكنولوجيا المتطورة والاستشارات الخبيرة والخدمات المخصصة لتحسين كفاءة مشروعك والتميز التشغيلي.',
    ourEquipment: 'معداتنا',
    contactUs: 'اتصل بنا',
    services: {
      supply: {
        title: 'توريد معدات البناء والتعدين',
        description: 'توفير معدات ثقيلة متخصصة للمقاولات والتعدين من العلامات التجارية العالمية مثل كاتربيلر وكوماتسو.'
      },
      maintenance: {
        title: 'صيانة وإصلاح المعدات الثقيلة',
        description: 'الصيانة الدورية وإصلاح معدات البناء الشامل مع فريق تقني مؤهل ومعتمد.'
      },
      engineering: {
        title: 'حلول هندسية متكاملة',
        description: 'استشارات تقنية وهندسية لاختيار وتشغيل المعدات الأنسب لمشاريع البناء والتشييد.'
      },
      consulting: {
        title: 'الاستشارات التقنية للمشاريع الكبرى',
        description: 'دراسات الجدوى والخطط التشغيلية لمشاريع البناء والبنية التحتية.'
      },
      support: {
        title: 'خدمات الدعم التقني الشامل',
        description: 'مراقبة وإدارة المعدات أثناء المشاريع، وتقديم الدعم التقني المستمر.'
      },
      innovation: {
        title: 'حلول التحديث والابتكار التقني',
        description: 'تحديث وتحسين أداء المعدات القديمة وتقديم حلول تقنية مبتكرة.'
      }
    }
  }
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result[k];
      if (result === undefined) return key; // Fallback to the key if translation is missing
    }
    return result || key;
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};