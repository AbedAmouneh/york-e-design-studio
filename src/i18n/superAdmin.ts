import type { Phrase } from './types'

/**
 * Copy for the superAdmin screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}`, `{s}`, `{c}`, `{g}`, `{l}` and `{r}`, filled by
 * the component with `.replace()`. A whole sentence per key rather than glued
 * fragments, because Arabic puts the number, the noun and the verb in a
 * different order and fragments cannot be reordered.
 *
 * This role is York Press operating the platform, not a school using it, so the
 * register is commercial and operational rather than classroom. A tenant is a
 * مستأجر, seats are مقاعد, impersonation is انتحال هوية المستخدم. The support
 * and compliance wording in particular is read by a data protection officer in
 * the Gulf or the EU before it is read by anyone else, so it says what it means
 * rather than what is comfortable.
 *
 * Eastern Arabic numerals appear in prose dates only. Percentages, seat counts
 * and durations keep Latin digits so an operator can compare a figure on screen
 * with the same figure in a contract.
 */
export const superAdmin = {
  // Tenants
  saTenantsSubtitle: { en: 'Every school on the platform', ar: 'كل مدرسة على المنصة' },
  saProvisionSchool: { en: 'Provision a school', ar: 'تهيئة مدرسة' },
  saStatSchools: { en: 'Schools', ar: 'المدارس' },
  saStatActive: { en: 'Active', ar: 'نشطة' },
  saStatCountries: { en: 'Countries', ar: 'الدول' },
  saSeatsUsed: { en: 'Seats used', ar: 'المقاعد المستخدمة' },
  saColSchool: { en: 'School', ar: 'المدرسة' },
  saColCountry: { en: 'Country', ar: 'البلد' },
  saColLanguage: { en: 'Language', ar: 'اللغة' },
  saColScale: { en: 'Scale', ar: 'السلّم' },
  saColSeats: { en: 'Seats', ar: 'المقاعد' },
  saTenantsNote: {
    en: "Each school is a separate tenant. No query on this screen can reach another school's learner data, which is the multi-tenancy requirement rather than a display choice.",
    ar: 'كل مدرسة مستأجر منفصل. ولا يمكن لأي استعلام في هذه الشاشة أن يصل إلى بيانات طلاب مدرسة أخرى، وهذا مقتضى تعدد المستأجرين لا مجرد خيار عرض.',
  },

  // Tenant status, rendered from data rather than typed into the screen
  saStatusActive: { en: 'Active', ar: 'نشطة' },
  saStatusProvisioning: { en: 'Provisioning', ar: 'قيد التهيئة' },
  saStatusSuspended: { en: 'Suspended', ar: 'موقوفة' },

  // Grading scales, also rendered from data
  saScalePercentage: { en: 'Percentage', ar: 'نسبة مئوية' },
  saScaleLetter: { en: 'Letter', ar: 'حرفي' },
  saScaleBand: { en: 'Band', ar: 'فئات' },
  saScalePercentageHint: { en: '0 to 100', ar: '0 إلى 100' },
  saScaleLetterHint: { en: 'A to F', ar: 'A إلى F' },
  saScaleBandHint: {
    en: 'Below, on track, above',
    ar: 'دون المستوى، على المسار، فوق المستوى',
  },

  // Languages
  saLangEnglish: { en: 'English', ar: 'الإنجليزية' },
  saLangArabic: { en: 'Arabic', ar: 'العربية' },
  saLangLtr: { en: 'Left to right', ar: 'من اليسار إلى اليمين' },
  saLangRtl: { en: 'Right to left', ar: 'من اليمين إلى اليسار' },

  // Tenant detail
  saProvisioningBanner: {
    en: 'Users imported, courses assigned, teachers not yet trained. Nothing here is live to learners until the school opens it.',
    ar: 'استُورد المستخدمون وأُسندت المقررات ولم يُدرَّب المعلمون بعد. ولا شيء هنا متاح للطلاب حتى تفتحه المدرسة.',
  },
  saWeeklyAdoption: { en: 'Weekly adoption', ar: 'التبنّي الأسبوعي' },
  saActiveLast7: {
    en: 'Learners active in the last 7 days',
    ar: 'الطلاب النشطون خلال آخر 7 أيام',
  },
  saContract: { en: 'Contract', ar: 'العقد' },
  saPlan: { en: 'Plan', ar: 'الخطة' },
  saPlanValue: { en: 'School licence, annual', ar: 'ترخيص مدرسي سنوي' },
  saRenews: { en: 'Renews', ar: 'تاريخ التجديد' },
  saRenewsDate: { en: '1 September 2027', ar: '١ أيلول ٢٠٢٧' },
  saGradingScale: { en: 'Grading scale', ar: 'سلّم التقدير' },
  saDefaultLanguage: { en: 'Default language', ar: 'اللغة الافتراضية' },
  saDataRegion: { en: 'Data region', ar: 'منطقة البيانات' },
  saDataRegionValue: { en: 'Data region: {r}', ar: 'منطقة البيانات: {r}' },
  saRegionEu: { en: 'EU', ar: 'الاتحاد الأوروبي' },
  saRegionGulf: { en: 'Gulf', ar: 'الخليج' },
  saLicensedCourses: { en: 'Licensed courses', ar: 'المقررات المرخّصة' },
  saColGrade: { en: 'Grade', ar: 'الصف' },
  saColInUse: { en: 'In use', ar: 'قيد الاستخدام' },
  saNoClasses: { en: 'No classes', ar: 'لا صفوف' },
  saNClasses: { en: '{n} classes', ar: '{n} صفوف' },
  saPeople: { en: 'People', ar: 'الأشخاص' },
  saParentsLinked: { en: 'Parents linked', ar: 'أولياء أمور مرتبطون' },

  // Provision a school
  saProvisionSubtitle: { en: 'Creates a new tenant', ar: 'ينشئ مستأجراً جديداً' },
  saStepSchool: { en: 'The school', ar: 'المدرسة' },
  saStepLicence: { en: 'Licence', ar: 'الترخيص' },
  saStepLocal: { en: 'Local setup', ar: 'الإعداد المحلي' },
  saSchoolName: { en: 'School name', ar: 'اسم المدرسة' },
  saSchoolNamePlaceholder: {
    en: 'Al Manara International School',
    ar: 'مدرسة المنارة الدولية',
  },
  saCountryLebanon: { en: 'Lebanon', ar: 'لبنان' },
  saCountryUae: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
  saCountryJordan: { en: 'Jordan', ar: 'الأردن' },
  saCountryEgypt: { en: 'Egypt', ar: 'مصر' },
  saCountrySaudi: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
  saNCourses: { en: '{n} courses', ar: '{n} مقررات' },
  saSeatHint: {
    en: 'One seat per learner. Teachers and parents do not consume seats.',
    ar: 'مقعد واحد لكل طالب. ولا يستهلك المعلمون ولا أولياء الأمور مقاعد.',
  },
  saGradeN: { en: 'Grade {n}', ar: 'الصف {n}' },
  saCannotChangeLater: { en: 'Cannot be changed later', ar: 'لا يمكن تغييره لاحقاً' },
  saRegionFixedNote: {
    en: 'Set from the country and fixed at creation. Moving a tenant between regions later is a migration, not a setting.',
    ar: 'تُحدَّد من البلد وتُثبَّت عند الإنشاء. ونقل مستأجر بين المناطق لاحقاً ترحيل بيانات لا مجرد إعداد.',
  },
  saCreateTenant: { en: 'Create the tenant', ar: 'أنشئ المستأجر' },
  saTenantCreated: { en: '{n} created', ar: 'أُنشئت {n}' },
  saProvisionSummary: {
    en: '{s} seats, {c} courses, {g} scale, {l}, {r} region. The school is in provisioning until their admin imports users and opens it.',
    ar: '{s} مقعداً، و{c} مقررات، وسلّم {g}، و{l}، ومنطقة {r}. وتبقى المدرسة قيد التهيئة حتى يستورد مديرها المستخدمين ويفتحها.',
  },
  saBackToSchools: { en: 'Back to schools', ar: 'العودة إلى المدارس' },
  saProvisionAnother: { en: 'Provision another', ar: 'هيّئ مدرسة أخرى' },

  // Seats and licences
  saAcrossEverySchool: { en: 'Across every school', ar: 'عبر كل المدارس' },
  saSeatsSold: { en: 'Seats sold', ar: 'المقاعد المباعة' },
  saSeatsAssigned: { en: 'Seats assigned', ar: 'المقاعد المخصصة' },
  saNLearners: { en: '{n} learners', ar: '{n} طالباً' },
  saNearCapacity: { en: 'Near capacity', ar: 'قرب الطاقة الاستيعابية' },
  saBarelyUsed: { en: 'Barely used', ar: 'استخدام ضئيل' },
  saHealthy: { en: 'Healthy', ar: 'سليم' },
  saBadgeSales: { en: 'Sales', ar: 'فرصة بيع' },
  saTightNote: {
    en: '{n} is above 90% of its seats with two terms left on the contract.',
    ar: '{n} تجاوزت 90% من مقاعدها ويتبقى فصلان دراسيان على العقد.',
  },
  saFlagAccountTeam: { en: 'Flag to the account team', ar: 'أبلغ فريق الحسابات' },
  saRenewalRisk: { en: 'Renewal risk', ar: 'خطر عدم التجديد' },
  saIdleNote: {
    en: '{n} is paying for seats that almost nobody is signing in to use. That is a renewal conversation, not a support ticket.',
    ar: '{n} تدفع ثمن مقاعد لا يكاد أحد يسجّل الدخول لاستخدامها. وهذا حديث تجديد لا بلاغ دعم.',
  },
  saOpenCheckIn: { en: 'Open a check in', ar: 'افتح جلسة متابعة' },
  saBySchool: { en: 'By school', ar: 'حسب المدرسة' },
  saColAssigned: { en: 'Assigned', ar: 'المخصصة' },
  saColActiveWeekly: { en: 'Active weekly', ar: 'النشطة أسبوعياً' },
  saColFlag: { en: 'Flag', ar: 'الإشارة' },
  saSeatsNote: {
    en: 'Assigned means a learner holds the seat. Active weekly means they signed in and did something. A school can be at 100% assigned and 10% active, and that is the number that predicts a renewal.',
    ar: 'المخصصة تعني أن طالباً يشغل المقعد. والنشطة أسبوعياً تعني أنه سجّل الدخول وأنجز شيئاً. وقد تبلغ مدرسة 100% تخصيصاً و10% نشاطاً، وهذا هو الرقم الذي يتنبأ بالتجديد.',
  },

  // Course catalogue
  saNPublishedCourses: { en: '{n} published courses', ar: '{n} مقررات منشورة' },
  saOpenAuthoring: { en: 'Open the authoring platform', ar: 'افتح منصة التأليف' },
  saBadgeMetadata: { en: 'Metadata', ar: 'البيانات الوصفية' },
  saUntaggedNote: {
    en: '{n} published courses have activities with no skill tags. Those activities cannot feed the skill drill down or adaptive practice in any school that licenses them.',
    ar: '{n} مقررات منشورة تحتوي أنشطة بلا وسوم مهارات. ولا تستطيع هذه الأنشطة تغذية تفصيل المهارات ولا التدريب التكيفي في أي مدرسة ترخّصها.',
  },
  saPublished: { en: 'Published', ar: 'المنشورة' },
  saColSubject: { en: 'Subject', ar: 'المادة' },
  saColActivities: { en: 'Activities', ar: 'الأنشطة' },
  saColTagged: { en: 'Tagged', ar: 'الموسومة' },
  saColSchools: { en: 'Schools', ar: 'المدارس' },
  saCatalogueNote: {
    en: 'Schools counts licences. Classes counts actual use. A course licensed by three schools and opened by nobody is a content problem, not a sales one.',
    ar: 'عمود المدارس يعدّ التراخيص، وعمود الصفوف يعدّ الاستخدام الفعلي. والمقرر الذي ترخّصه ثلاث مدارس ولا يفتحه أحد مشكلة محتوى لا مشكلة مبيعات.',
  },

  // Usage
  saUsageSubtitle: {
    en: 'All schools · last six weeks',
    ar: 'كل المدارس · آخر ستة أسابيع',
  },
  saWeekLabel: { en: 'W{n}', ar: 'أ{n}' },
  saWeeklyActiveLearners: { en: 'Weekly active learners', ar: 'الطلاب النشطون أسبوعياً' },
  saAcrossThreeSchools: { en: 'Across three schools', ar: 'في ثلاث مدارس' },
  saWeeklyActiveTeachers: { en: 'Weekly active teachers', ar: 'المعلمون النشطون أسبوعياً' },
  saParentSignIns: { en: 'Parent sign ins', ar: 'دخول أولياء الأمور' },
  saOfLinkedParents: { en: 'Of linked parents', ar: 'من أولياء الأمور المرتبطين' },
  saSchoolsLive: { en: 'Schools live', ar: 'المدارس العاملة' },
  saWeeklyBySchool: {
    en: 'Weekly active learners by school',
    ar: 'الطلاب النشطون أسبوعياً حسب المدرسة',
  },
  saWhatTheyUseItOn: { en: 'What they use it on', ar: 'الأجهزة التي يستخدمونها' },
  saDevices: { en: 'Devices', ar: 'الأجهزة' },
  saDeviceSchoolDesktop: { en: 'School desktop', ar: 'حاسوب المدرسة المكتبي' },
  saDeviceSchoolTablet: { en: 'School tablet', ar: 'لوح المدرسة' },
  saDeviceHomeLaptop: { en: 'Home laptop', ar: 'حاسوب المنزل المحمول' },
  saDevicePhone: { en: 'Phone', ar: 'الهاتف' },
  saDevicesNote: {
    en: 'Three quarters of use is on school hardware, which is the number that decides how much the offline work matters.',
    ar: 'ثلاثة أرباع الاستخدام على أجهزة المدرسة، وهذا هو الرقم الذي يحدد مدى أهمية العمل دون اتصال.',
  },
  saFeatureAdoption: { en: 'Feature adoption', ar: 'تبنّي الميزات' },
  saOfActiveSchools: { en: 'Of active schools', ar: 'من المدارس النشطة' },
  saFeatQuizzes: { en: 'Quizzes', ar: 'الاختبارات القصيرة' },
  saFeatInteractiveBooks: { en: 'Interactive books', ar: 'الكتب التفاعلية' },
  saFeatGradebook: { en: 'Gradebook', ar: 'سجل الدرجات' },
  saFeatManipulatives: { en: 'Manipulatives', ar: 'الأدوات التفاعلية' },
  saFeatAnnouncements: { en: 'Announcements', ar: 'الإعلانات' },
  saFeatParentSignIn: { en: 'Parent sign in', ar: 'دخول ولي الأمر' },

  // Support and impersonation
  saSupportSubtitle: {
    en: 'View a school as one of its users',
    ar: 'عاين مدرسة بصفة أحد مستخدميها',
  },
  saImpersonationBanner: {
    en: "Impersonation is read only and time boxed to 30 minutes. The school's own admin sees an entry in their activity log while the session is running, not afterwards. Every session below is permanent and cannot be deleted by anyone, including York Press.",
    ar: 'انتحال هوية المستخدم للقراءة فقط ومحدود بـ 30 دقيقة. وترى إدارة المدرسة نفسها قيداً في سجل نشاطها أثناء سريان الجلسة لا بعدها. وكل جلسة في القائمة أدناه دائمة لا يستطيع أحد حذفها، بما في ذلك York Press.',
  },
  saStartSession: { en: 'Start a session', ar: 'ابدأ جلسة' },
  saWhyNeeded: { en: 'Why do you need to do this', ar: 'لماذا تحتاج إلى ذلك' },
  saReasonPlaceholder: {
    en: 'Reproducing a bug the school reported, with a ticket number',
    ar: 'إعادة إنتاج خلل أبلغت عنه المدرسة، مع رقم البلاغ',
  },
  saFreeTextNote: {
    en: 'Free text on purpose. A list of reasons becomes one reason everybody picks.',
    ar: 'نص حر عن قصد. فقائمة الأسباب الجاهزة تتحول إلى سبب واحد يختاره الجميع.',
  },
  saStartReadOnly: { en: 'Start a read only session', ar: 'ابدأ جلسة للقراءة فقط' },
  saSessionRunning: {
    en: 'Session running. 30 minutes remaining. The school has been notified.',
    ar: 'الجلسة جارية. يتبقى 30 دقيقة. وقد أُبلغت المدرسة.',
  },
  saReasonRequired: {
    en: 'A reason of at least a few words is required before this can start.',
    ar: 'يلزم سبب من بضع كلمات على الأقل قبل أن تبدأ الجلسة.',
  },
  saSessionHistory: { en: 'Session history', ar: 'سجل الجلسات' },
  saPermanent: { en: 'Permanent', ar: 'دائم' },
  saColWho: { en: 'Who', ar: 'المنفّذ' },
  saColViewedAs: { en: 'Viewed as', ar: 'عُوين بصفة' },
  saColReason: { en: 'Reason', ar: 'السبب' },
  saColLength: { en: 'Length', ar: 'المدة' },
  saNMinutes: { en: '{n} min', ar: '{n} دقيقة' },
  saPlatformOperations: { en: 'Platform operations', ar: 'عمليات المنصة' },
  saImpAs1: { en: 'Teacher, Grade 6 Falcon', ar: 'معلم، الصف السادس، شعبة الصقر' },
  saImpAs2: { en: 'School admin', ar: 'إدارة المدرسة' },
  saImpReason1: {
    en: 'Gradebook totals reported wrong after a scale change',
    ar: 'مجاميع سجل الدرجات ظهرت خاطئة بعد تغيير سلّم التقدير',
  },
  saImpReason2: {
    en: 'Bulk import failed on 38 rows, reproducing',
    ar: 'فشل الاستيراد الجماعي في 38 صفاً، قيد إعادة الإنتاج',
  },
  saImpAt1: { en: '9 Feb, 11:20', ar: '٩ شباط، ١١:٢٠' },
  saImpAt2: { en: '6 Feb, 16:05', ar: '٦ شباط، ١٦:٠٥' },

  // Platform settings
  saSettingsSubtitle: {
    en: 'Applies to every school on the platform',
    ar: 'ينطبق على كل مدرسة على المنصة',
  },
  saFeatureFlags: { en: 'Feature flags', ar: 'مفاتيح الميزات' },
  saReversible: { en: 'Reversible', ar: 'قابلة للتراجع' },
  saFlagAiTeacher: { en: 'AI teacher tools', ar: 'أدوات الذكاء الاصطناعي للمعلمين' },
  saFlagAiTeacherHint: {
    en: 'Teacher facing only. No student facing AI in this release.',
    ar: 'موجهة إلى المعلمين فقط. لا يوجد في هذا الإصدار ذكاء اصطناعي موجه إلى الطلاب.',
  },
  saFlagAdaptive: { en: 'Rule based adaptive practice', ar: 'تدريب تكيفي قائم على القواعد' },
  saFlagAdaptiveHint: {
    en: 'Tier 1. Needs skill tagging on the course to do anything.',
    ar: 'المستوى الأول. يحتاج إلى وسم المهارات في المقرر كي يعمل.',
  },
  saFlagParentPortal: { en: 'Parent sign in', ar: 'دخول ولي الأمر' },
  saFlagParentPortalHint: {
    en: 'Families see released marks and attendance.',
    ar: 'ترى الأسر الدرجات المُظهرة وسجل الحضور.',
  },
  saFlagOffline: { en: 'Offline desktop app', ar: 'تطبيق سطح المكتب دون اتصال' },
  saFlagOfflineHint: {
    en: 'Not built. Phase 3 or later.',
    ar: 'لم يُبنَ بعد. المرحلة الثالثة أو ما بعدها.',
  },
  saRolloutCedarOnly: { en: 'Cedar Valley only', ar: 'وادي الأرز فقط' },
  saRolloutAll: { en: 'All schools', ar: 'كل المدارس' },
  saRolloutNotAvailable: { en: 'Not available', ar: 'غير متاح' },
  saCompliance: { en: 'Compliance', ar: 'الامتثال' },
  saNotOrdinarySettings: { en: 'Not ordinary settings', ar: 'ليست إعدادات عادية' },
  saLockedOn: { en: 'Locked on', ar: 'مفعّلة ومقفلة' },
  saCompWcag: { en: 'WCAG 2.2 AA enforcement', ar: 'إلزام معيار WCAG 2.2 AA' },
  saCompWcagHint: {
    en: 'Blocks publishing content that fails the automated checks.',
    ar: 'يمنع نشر محتوى يرسب في الفحوص الآلية.',
  },
  saCompResidency: { en: 'Data residency by region', ar: 'موطن البيانات حسب المنطقة' },
  saCompResidencyHint: {
    en: 'Tenant data stays in the region set at provisioning.',
    ar: 'تبقى بيانات المستأجر في المنطقة المحددة عند التهيئة.',
  },
  saCompAudit: { en: 'Permanent audit trail', ar: 'سجل تدقيق دائم' },
  saCompAuditHint: {
    en: 'Grade changes and impersonation cannot be deleted by anyone.',
    ar: 'لا يستطيع أحد حذف تعديلات الدرجات ولا جلسات انتحال الهوية.',
  },
  saComplianceNote: {
    en: 'These are shown rather than hidden so an operator can see what is guaranteed. Changing any of them is a contractual decision and happens outside the product.',
    ar: 'تُعرض هذه البنود بدل إخفائها كي يرى المشغّل ما هو مضمون. وتغيير أي منها قرار تعاقدي يجري خارج المنتج.',
  },
  saSavedFlags: {
    en: 'Saved. Flags apply within a minute.',
    ar: 'تم الحفظ. وتسري المفاتيح خلال دقيقة.',
  },
  saFlagChangesLogged: {
    en: 'Flag changes are logged against your account.',
    ar: 'تُسجَّل تغييرات المفاتيح على حسابك.',
  },

  // Per school branding
  saBranding: { en: 'Branding', ar: 'الهوية المرئية' },
  saBrandingSubtitle: {
    en: 'How this school appears to its own users',
    ar: 'كيف تظهر هذه المدرسة لمستخدميها',
  },
  saBrandOptional: { en: 'Optional', ar: 'اختياري' },

  // Logo
  saBrandLogo: { en: 'School logo', ar: 'شعار المدرسة' },
  saBrandCurrentLogo: { en: 'Current logo', ar: 'الشعار الحالي' },
  saBrandLogoFile: { en: 'Uploaded file: {n}', ar: 'الملف المرفوع: {n}' },
  saBrandNoLogo: { en: 'No logo uploaded', ar: 'لم يُرفع شعار' },
  saBrandReplaceLogo: { en: 'Replace the logo', ar: 'استبدل الشعار' },
  saBrandUploadLogo: { en: 'Upload a logo', ar: 'ارفع شعاراً' },
  saBrandRemoveLogo: { en: 'Remove', ar: 'إزالة' },
  saBrandLogoSpec: {
    en: 'PNG or SVG, transparent background, at least 240 pixels on the long edge.',
    ar: 'صيغة PNG أو SVG، بخلفية شفافة، و240 بكسلاً على الأقل في الضلع الأطول.',
  },
  saBrandLogoWhere: {
    en: 'Appears on the sign in screen, in the sidebar, and on every printed report.',
    ar: 'يظهر في شاشة تسجيل الدخول وفي الشريط الجانبي وعلى كل تقرير مطبوع.',
  },
  saBrandFallback: { en: 'When there is no logo', ar: 'عند غياب الشعار' },
  saBrandFallbackPreview: { en: 'Fallback wordmark', ar: 'الشعار النصي البديل' },
  saBrandOnReport: { en: 'On a report card', ar: 'على بطاقة الدرجات' },
  saBrandFallbackNote: {
    en: "The school name is set in type instead. It never falls back to the York Press mark, because a parent opening their child's report should see their child's school and not their school's publisher.",
    ar: 'يُضبط اسم المدرسة بالخط بدلاً من ذلك. ولا يُستعاض عنه بعلامة York Press أبداً، لأن ولي الأمر الذي يفتح تقرير ابنه ينبغي أن يرى مدرسة ابنه لا ناشر كتبها.',
  },

  // Brand colour
  saBrandAccent: { en: 'Brand colour', ar: 'لون العلامة' },
  saBrandAccentHint: {
    en: 'One accent per school. It carries white text wherever it is used, so it has to be dark enough to be read on.',
    ar: 'لون مميز واحد لكل مدرسة. وهو يحمل نصاً أبيض أينما استُخدم، فيجب أن يكون داكناً بما يكفي ليُقرأ عليه.',
  },
  saBrandConsequence: { en: 'What the choice does', ar: 'ما يفعله هذا الاختيار' },
  saBrandConsequenceNote: {
    en: 'A swatch tells an operator nothing. These are the three places the accent actually lands, at the size a learner meets it.',
    ar: 'العيّنة اللونية وحدها لا تقول للمشغّل شيئاً. وهذه هي المواضع الثلاثة التي يظهر فيها اللون فعلاً، بالحجم الذي يراه الطالب.',
  },
  saBrandPreviewButton: { en: 'Submit the assignment', ar: 'سلّم الواجب' },
  saBrandPreviewProgress: { en: 'Unit 3 progress', ar: 'تقدم الوحدة الثالثة' },
  saBrandContrastRatio: {
    en: 'Contrast with white text: {n} to 1',
    ar: 'التباين مع النص الأبيض: {n} إلى 1',
  },
  saBrandContrastPass: { en: 'Passes WCAG 2.2 AA', ar: 'يجتاز معيار WCAG 2.2 AA' },
  saBrandContrastFail: { en: 'Fails WCAG 2.2 AA', ar: 'يرسب في معيار WCAG 2.2 AA' },
  saBrandContrastFailNote: {
    en: 'White text on this colour is below 4.5 to 1. The platform refuses the colour rather than shipping a button that a learner with low vision cannot read. A darker tone of the same hue passes.',
    ar: 'النص الأبيض على هذا اللون دون 4.5 إلى 1. وترفض المنصة اللون بدل أن تُصدِر زراً لا يستطيع طالب ضعيف البصر قراءته. ودرجة أدكن من اللون نفسه تجتاز الفحص.',
  },
  saBrandRefused: { en: 'Refused', ar: 'مرفوض' },
  saBrandCustomHex: { en: 'Or a specific value', ar: 'أو قيمة محددة' },
  saBrandCustomHexHint: {
    en: 'Six digit hex. Schools usually send the value from their own brand guide.',
    ar: 'قيمة ست عشرية من ستة محارف. وعادة ترسل المدرسة القيمة من دليل هويتها.',
  },
  saBrandHueForest: { en: 'Forest', ar: 'أخضر داكن' },
  saBrandHueTeal: { en: 'Teal', ar: 'أزرق مخضر' },
  saBrandHueNavy: { en: 'Navy', ar: 'كحلي' },
  saBrandHueMaroon: { en: 'Maroon', ar: 'عنابي' },
  saBrandHueOlive: { en: 'Olive', ar: 'زيتوني' },
  saBrandHuePaleYellow: { en: 'Pale yellow', ar: 'أصفر فاتح' },
  saBrandHueSky: { en: 'Sky', ar: 'أزرق سماوي' },

  // Subdomain
  saBrandSubdomain: { en: 'Subdomain', ar: 'النطاق الفرعي' },
  saBrandSubdomainHint: {
    en: 'The address the school signs in at.',
    ar: 'العنوان الذي تسجّل المدرسة الدخول منه.',
  },
  saBrandCurrentAddress: { en: 'Current address', ar: 'العنوان الحالي' },
  saBrandNewAddress: { en: 'New address', ar: 'العنوان الجديد' },
  saBrandAvailable: { en: 'Available', ar: 'متاح' },
  saBrandTaken: { en: 'Taken by another school', ar: 'محجوز لمدرسة أخرى' },
  saBrandReserved: { en: 'Reserved by York Press', ar: 'محجوز لـ York Press' },
  saBrandSubdomainRules: {
    en: 'Lowercase letters, numbers and hyphens. Between 3 and 30 characters.',
    ar: 'حروف لاتينية صغيرة وأرقام وشرطات. وبين 3 و30 محرفاً.',
  },
  saBrandSubdomainBreaks: {
    en: 'Changing this breaks every link already sent and every bookmark a teacher saved. The old address is not redirected. Move it during a holiday or not at all.',
    ar: 'تغيير هذا يُعطّل كل رابط أُرسل من قبل وكل إشارة مرجعية حفظها معلم. ولا يُحوَّل العنوان القديم إلى الجديد. فانقله في عطلة أو لا تنقله.',
  },

  // The limits of branding
  saBrandLimits: { en: 'What a school cannot change', ar: 'ما لا تستطيع المدرسة تغييره' },
  saBrandSkinNotBehaviour: {
    en: 'Branding is skin, not behaviour',
    ar: 'الهوية المرئية مظهر لا سلوك',
  },
  saBrandLimitLayout: { en: 'Layout and navigation', ar: 'التخطيط والتنقل' },
  saBrandLimitLayoutHint: {
    en: 'Every school gets the same structure, so support can walk a teacher through a problem without first asking what their version looks like.',
    ar: 'تحصل كل مدرسة على البنية نفسها، ليتمكن الدعم من إرشاد المعلم في أي مشكلة دون أن يسأله أولاً كيف تبدو نسخته.',
  },
  saBrandLimitTiers: { en: 'The age tier rules', ar: 'قواعد الفئات العمرية' },
  saBrandLimitTiersHint: {
    en: 'K1 to Grade 3 sees no percentages and no red. That is a pedagogical rule carried in the product, not a theme a school opts out of.',
    ar: 'لا ترى المرحلة من الروضة الأولى إلى الصف الثالث نسباً مئوية ولا لوناً أحمر. وهذه قاعدة تربوية يحملها المنتج لا سمة تصميمية تتخلى عنها المدرسة.',
  },
  saBrandLimitGrades: { en: 'Anything that touches a grade', ar: 'كل ما يمس الدرجة' },
  saBrandLimitGradesHint: {
    en: 'How a mark is calculated, rounded and displayed follows the grading scale on the contract. A colour cannot reach it.',
    ar: 'تتبع طريقة احتساب الدرجة وتقريبها وعرضها سلّم التقدير المنصوص عليه في العقد. ولا يستطيع لون أن يمسّها.',
  },
  saBrandLimitsNote: {
    en: 'These are listed rather than quietly absent, so an operator can answer a school that asks. The answer is no, and the reason is that a support call, a report card and an accessibility audit have to mean the same thing in every tenant.',
    ar: 'تُذكر هذه البنود بدل أن تغيب بصمت، كي يستطيع المشغّل الرد على مدرسة تسأل. والجواب لا، وسببه أن بلاغ الدعم وبطاقة الدرجات وتدقيق الوصولية يجب أن تعني الشيء نفسه لدى كل مستأجر.',
  },

  // Saving
  saBrandSaved: {
    en: 'Saved. The school sees the change at their next sign in.',
    ar: 'تم الحفظ. وترى المدرسة التغيير عند تسجيل الدخول التالي.',
  },
  saBrandSaveBlocked: {
    en: 'The brand colour fails the contrast check, so nothing on this screen can be saved.',
    ar: 'لون العلامة يرسب في فحص التباين، فلا يمكن حفظ أي شيء في هذه الشاشة.',
  },
  saBrandChangesLogged: {
    en: 'Branding changes are logged against your account and are visible to the school.',
    ar: 'تُسجَّل تغييرات الهوية المرئية على حسابك وتراها المدرسة.',
  },
} satisfies Record<string, Phrase>
