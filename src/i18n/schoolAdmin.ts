import type { Phrase } from './types'

/**
 * Copy for the schoolAdmin screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}`, `{g}` and `{c}`, filled by the component with
 * `.replace()`. A whole sentence per key rather than glued fragments, because
 * Arabic puts the number, the noun and the verb in a different order and
 * fragments cannot be reordered.
 *
 * Nothing here repeats `common.ts`. Navigation labels, the status words, the
 * shared table headers and the overview card titles are all read from there, so
 * a school admin and a teacher never see the same concept worded two ways.
 *
 * The early tier wording is deliberate. On a K1 to Grade 3 roster the admin
 * reads "Keep going" rather than "Watch", and the Arabic has to stay as gentle:
 * واصل التقدم, never anything that reads as failure, because these are the
 * words an admin repeats to a seven year old's parent.
 */
export const schoolAdmin = {
  // Overview
  admSelectToMessage: {
    en: 'Select students to message them together',
    ar: 'حدد الطلاب لمراسلتهم دفعة واحدة',
  },
  admActiveDays: { en: 'Active days', ar: 'أيام النشاط' },
  admFeb10: { en: '10 Feb', ar: '١٠ شباط' },

  // Classes
  admCreateClass: { en: 'Create a class', ar: 'أنشئ صفاً' },
  admColStudents: { en: 'Students', ar: 'الطلاب' },
  admEarlyTierBadge: { en: 'K1 to G3', ar: 'الروضة إلى الثالث' },
  admAtRiskCount: { en: '{n} at risk', ar: '{n} متعثرون' },

  // Class detail
  admClassNotFound: { en: 'Class not found', ar: 'الصف غير موجود' },
  admClassSubtitle: {
    en: 'Grade {g} · {n} students',
    ar: 'الصف {g} · {n} طالباً',
  },
  admTabRoster: { en: 'Roster', ar: 'قائمة الطلاب' },
  admTabTeachers: { en: 'Teachers', ar: 'المعلمون' },
  admKeepGoing: { en: 'Keep going', ar: 'واصل التقدم' },
  admEarlyRosterNote: {
    en: 'This is a K1 to Grade 3 class, so students see stars and completion. Percentages and at risk are shown to staff only.',
    ar: 'هذا صف من الروضة إلى الصف الثالث، فيرى الطلاب النجوم ونسبة الإنجاز. أما النسب المئوية وكلمة متعثر فلا تظهر إلا لطاقم المدرسة.',
  },
  admAssignedCourses: { en: 'Assigned courses', ar: 'المقررات المسندة' },
  admAssignCourse: { en: 'Assign a course', ar: 'أسند مقرراً' },
  admColUnits: { en: 'Units', ar: 'الوحدات' },
  admColActivities: { en: 'Activities', ar: 'الأنشطة' },
  admAddTeacher: { en: 'Add a teacher', ar: 'أضف معلماً' },
  admActiveDaysOf30: { en: '{n} / 30 active days', ar: '{n} / 30 يوم نشاط' },
  admAttendanceRate: { en: 'Attendance rate', ar: 'نسبة الحضور' },
  admAbsences: { en: 'Absences', ar: 'الغيابات' },
  admLate: { en: 'Late', ar: 'تأخير' },
  admExcused: { en: 'Excused', ar: 'بعذر' },
  admLastSevenDays: {
    en: 'Last seven school days. Absence patterns feed the at-risk flag.',
    ar: 'آخر سبعة أيام دراسية. وتغذي أنماط الغياب مؤشر التعثر.',
  },

  // Users
  admBulkImport: { en: 'Bulk import', ar: 'استيراد جماعي' },
  admFilterStudents: { en: 'Students', ar: 'الطلاب' },
  admFilterParents: { en: 'Parents', ar: 'أولياء الأمور' },
  admFilterEveryone: { en: 'Everyone', ar: 'الجميع' },
  admMessage: { en: 'Message', ar: 'راسل' },
  admSelectAll: { en: 'Select all', ar: 'حدد الكل' },
  admSelectPerson: { en: 'Select {n}', ar: 'حدد {n}' },
  admColName: { en: 'Name', ar: 'الاسم' },
  admColRole: { en: 'Role', ar: 'الدور' },
  admColEmail: { en: 'Email', ar: 'البريد الإلكتروني' },
  admNever: { en: 'Never', ar: 'لم يدخل قط' },

  // Bulk import
  admBulkImportTitle: { en: 'Bulk import users', ar: 'استيراد المستخدمين جماعياً' },
  admBackToUsers: { en: 'Back to users', ar: 'العودة إلى المستخدمين' },
  admStepUpload: { en: 'Upload', ar: 'الرفع' },
  admStepReviewFix: { en: 'Review and fix', ar: 'المراجعة والتصحيح' },
  admStepImport: { en: 'Import', ar: 'الاستيراد' },
  admDropFile: {
    en: 'Drop a CSV or XLSX file here',
    ar: 'أفلت ملف CSV أو XLSX هنا',
  },
  admFileColumns: {
    en: 'Columns: name, email, role, class. The first row is treated as headers.',
    ar: 'الأعمدة: الاسم، البريد الإلكتروني، الدور، الصف. ويُعامل الصف الأول على أنه رؤوس الأعمدة.',
  },
  admChooseFile: { en: 'Choose a file', ar: 'اختر ملفاً' },
  admDownloadTemplate: { en: 'Download the template', ar: 'نزّل القالب' },
  admRowsInFile: { en: 'Rows in the file', ar: 'الصفوف في الملف' },
  admReadyToImport: { en: 'Ready to import', ar: 'جاهز للاستيراد' },
  admNeedFixing: { en: 'Need fixing', ar: 'بحاجة إلى تصحيح' },
  admRowsCannotImport: {
    en: '{n} rows cannot be imported',
    ar: 'تعذر استيراد {n} صفوف',
  },
  admFixHereOrInFile: {
    en: 'Fix them here or in the file and upload again. Rows without errors import either way.',
    ar: 'صحّحها هنا أو في الملف وأعد الرفع. أما الصفوف الخالية من الأخطاء فتُستورد في الحالتين.',
  },
  admEveryRowReady: {
    en: 'Every row is ready to import',
    ar: 'كل الصفوف جاهزة للاستيراد',
  },
  admRows: { en: 'Rows', ar: 'الصفوف' },
  admNWarnings: { en: '{n} warnings', ar: '{n} تنبيهات' },
  admColLine: { en: 'Line', ar: 'السطر' },
  admColProblem: { en: 'Problem', ar: 'المشكلة' },
  admProblemEmailInvalid: {
    en: 'Not a valid email address',
    ar: 'ليس عنوان بريد إلكتروني صالحاً',
  },
  admProblemNoSuchClass: {
    en: 'No class called Grade 6 Oak',
    ar: 'لا يوجد صف باسم Grade 6 Oak',
  },
  admProblemEmailDuplicate: {
    en: 'Already used on line 2',
    ar: 'مستخدم أصلاً في السطر 2',
  },
  admProblemUnknownRole: {
    en: 'Unknown role, did you mean Student',
    ar: 'دور غير معروف، هل تقصد Student',
  },
  admFix: { en: 'Fix', ar: 'صحّح' },
  admFixed: { en: 'Fixed', ar: 'صُحّح' },
  admUploadDifferentFile: {
    en: 'Upload a different file',
    ar: 'ارفع ملفاً آخر',
  },
  admImportNUsers: { en: 'Import {n} users', ar: 'استورد {n} مستخدماً' },
  admNUsersImported: { en: '{n} users imported', ar: 'استُورد {n} مستخدماً' },
  admCanSignInNow: {
    en: 'They can sign in now. Welcome emails have not been sent, you choose when to send those.',
    ar: 'يمكنهم تسجيل الدخول الآن. ولم تُرسل رسائل الترحيب بعد، فأنت تختار موعد إرسالها.',
  },
  admViewRoster: { en: 'View the roster', ar: 'اعرض قائمة المستخدمين' },
  admSendWelcomeEmails: { en: 'Send welcome emails', ar: 'أرسل رسائل الترحيب' },

  // Create a class
  admStepDetails: { en: 'Details', ar: 'التفاصيل' },
  admStepTeacherStudents: {
    en: 'Teacher and students',
    ar: 'المعلم والطلاب',
  },
  admClassDetails: { en: 'Class details', ar: 'تفاصيل الصف' },
  admClassName: { en: 'Class name', ar: 'اسم الصف' },
  admGrade: { en: 'Grade', ar: 'المرحلة' },
  admEarlyTierBanner: {
    en: 'Grade 3 and below. Students in this class see stars and completion, never percentages or at risk.',
    ar: 'الصف الثالث وما دونه. يرى طلاب هذا الصف النجوم ونسبة الإنجاز، ولا يرون نسباً مئوية ولا كلمة متعثر.',
  },
  admUpperTierBanner: {
    en: 'Above Grade 3. Students in this class see scores, feedback and progress.',
    ar: 'فوق الصف الثالث. يرى طلاب هذا الصف الدرجات والملاحظات والتقدم.',
  },
  admAssignCourses: { en: 'Assign courses', ar: 'إسناد المقررات' },
  admGradeN: { en: 'Grade {n}', ar: 'الصف {n}' },
  admUnitsActivities: {
    en: '{n} units · {m} activities',
    ar: '{n} وحدات · {m} نشاطاً',
  },
  admNoCoursesForGrade: {
    en: 'No courses imported for Grade {n} yet.',
    ar: 'لم يُستورد أي مقرر للصف {n} بعد.',
  },
  admTeacherCard: { en: 'Teacher', ar: 'المعلم' },
  admStudentsCard: { en: 'Students', ar: 'الطلاب' },
  admNSelected: { en: '{n} selected', ar: 'حُدد {n}' },
  admCreateTheClass: { en: 'Create the class', ar: 'أنشئ الصف' },
  admClassCreated: { en: '{c} created', ar: 'تم إنشاء {c}' },
  admClassCreatedSummary: {
    en: "{n} students enrolled, {m} courses assigned. It is on the teacher's My classes now.",
    ar: 'سُجّل {n} طالباً، وأُسند {m} مقرراً. والصف ظاهر الآن في صفحة صفوف المعلم.',
  },
  admViewClasses: { en: 'View classes', ar: 'اعرض الصفوف' },
  admCreateAnother: { en: 'Create another', ar: 'أنشئ صفاً آخر' },

  // Courses and licences
  admCoursesSubtitle: {
    en: 'Imported from the authoring platform. Licences are counted per learner.',
    ar: 'مستوردة من منصة التأليف. وتُحتسب التراخيص لكل طالب.',
  },
  admImportCourse: { en: 'Import a course', ar: 'استورد مقرراً' },
  admCourseCatalogue: { en: 'Course catalogue', ar: 'دليل المقررات' },
  admNCourses: { en: '{n} courses', ar: '{n} مقررات' },
  admColSubject: { en: 'Subject', ar: 'المادة' },
  admColGrade: { en: 'Grade', ar: 'الصف' },
  admColAssignedTo: { en: 'Assigned to', ar: 'مُسند إلى' },
  admColLicences: { en: 'Licences', ar: 'التراخيص' },
  admNotAssigned: { en: 'Not assigned', ar: 'غير مُسند' },
  admLicencesNote: {
    en: 'A course cannot be assigned to another class once its licences are used. Buying more goes through York Press, which is why the super admin owns the seat count.',
    ar: 'لا يمكن إسناد مقرر إلى صف آخر بعد استنفاد تراخيصه. وشراء المزيد يمر عبر York Press، ولهذا يملك مدير المنصة عدد المقاعد.',
  },

  // Attendance
  admDayTue2: { en: 'Tue 2', ar: 'ثلا ٢' },
  admDayWed3: { en: 'Wed 3', ar: 'أرب ٣' },
  admDayThu4: { en: 'Thu 4', ar: 'خمي ٤' },
  admDayFri5: { en: 'Fri 5', ar: 'جمع ٥' },
  admDayMon8: { en: 'Mon 8', ar: 'إثن ٨' },
  admDayTue9: { en: 'Tue 9', ar: 'ثلا ٩' },
  admDayWed10: { en: 'Wed 10', ar: 'أرب ١٠' },
  admStatePresent: { en: 'Present', ar: 'حاضر' },
  admStateAbsent: { en: 'Absent', ar: 'غائب' },
  admStateLate: { en: 'Late', ar: 'متأخر' },
  admStateExcused: { en: 'Excused', ar: 'بعذر' },

  // Announcements
  admAnnouncementsSubtitle: {
    en: 'Posted to the home page and sent as a notification',
    ar: 'يُنشر على الصفحة الرئيسية ويُرسل كتنبيه',
  },
  admNewAnnouncement: { en: 'New announcement', ar: 'إعلان جديد' },
  admAudienceSchool: { en: 'Whole school', ar: 'المدرسة كاملة' },
  admAudienceClass: { en: 'One class', ar: 'صف واحد' },
  admAudienceParents: { en: 'Parents', ar: 'أولياء الأمور' },
  admAnnouncementTitle: { en: 'Title', ar: 'العنوان' },
  admAnnouncementBody: { en: 'Message', ar: 'نص الرسالة' },
  admPost: { en: 'Post', ar: 'انشر' },
  admEdit: { en: 'Edit', ar: 'تعديل' },

  // Activity log
  admActivityLogSubtitle: {
    en: 'Logins, submissions, grade changes and content views',
    ar: 'تسجيلات الدخول والتسليمات وتعديلات الدرجات ومشاهدات المحتوى',
  },
  admColWho: { en: 'Who', ar: 'المستخدم' },
  admColAction: { en: 'Action', ar: 'الإجراء' },
  admColTarget: { en: 'Target', ar: 'الهدف' },
  admMonthFeb: { en: 'Feb', ar: 'شباط' },

  // Settings
  admTabProfile: { en: 'School profile', ar: 'ملف المدرسة' },
  admTabYear: { en: 'Year and terms', ar: 'السنة والفصول' },
  admTabGrading: { en: 'Grading scale', ar: 'سلّم التقدير' },
  admTabRoles: { en: 'Roles and permissions', ar: 'الأدوار والصلاحيات' },
  admFieldSchoolName: { en: 'School name', ar: 'اسم المدرسة' },
  admFieldCity: { en: 'City', ar: 'المدينة' },
  admFieldCountry: { en: 'Country', ar: 'الدولة' },
  admFieldDefaultLanguage: { en: 'Default language', ar: 'اللغة الافتراضية' },
  admFieldSeats: { en: 'Seats', ar: 'المقاعد' },
  admFieldStatus: { en: 'Status', ar: 'الحالة' },
  admLangArabic: { en: 'Arabic', ar: 'العربية' },
  admLangEnglish: { en: 'English', ar: 'الإنجليزية' },
  admSchoolStatusActive: { en: 'Active', ar: 'مفعّلة' },
  admSchoolStatusProvisioning: { en: 'Provisioning', ar: 'قيد التجهيز' },
  admSchoolStatusSuspended: { en: 'Suspended', ar: 'موقوفة' },
  admAcademicYear: { en: 'Academic year {n}', ar: 'السنة الدراسية {n}' },
  admAddTerm: { en: 'Add a term', ar: 'أضف فصلاً' },
  admColTerm: { en: 'Term', ar: 'الفصل' },
  admColStarts: { en: 'Starts', ar: 'يبدأ' },
  admColEnds: { en: 'Ends', ar: 'ينتهي' },
  admTermCurrent: { en: 'Current', ar: 'الحالي' },
  admSetOncePerSchool: { en: 'Set once per school', ar: 'يُضبط مرة واحدة لكل مدرسة' },
  admGradingStoredAsPercent: {
    en: 'Grades are stored as a percentage. The scale only changes how they are displayed, so switching it never rewrites a mark.',
    ar: 'تُحفظ الدرجات كنسبة مئوية. والسلّم لا يغيّر سوى طريقة عرضها، فتبديله لا يعيد كتابة أي درجة.',
  },
  admScalePercentage: { en: 'Percentage', ar: 'نسبة مئوية' },
  admScalePercentageExample: { en: '0 to 100', ar: 'من 0 إلى 100' },
  admScaleLetter: { en: 'Letters', ar: 'حروف' },
  admScaleLetterExample: { en: 'A to F', ar: 'من A إلى F' },
  admScaleBand: { en: 'Bands', ar: 'مستويات' },
  admScaleBandExample: {
    en: 'Exceeding, Meeting, Approaching, Below',
    ar: 'متجاوز، محقق، مقترب، دون المستوى',
  },
  admScalePerSchoolNote: {
    en: 'Al Noor in Dubai uses letters and Rawabi in Amman uses bands, which is why this is per school rather than per platform.',
    ar: 'مدرسة النور في دبي تستخدم الحروف، وأكاديمية الروابي في عمّان تستخدم المستويات، ولهذا يكون الضبط لكل مدرسة لا لكل منصة.',
  },
  admReadOnlyInMvp: { en: 'Read only in the MVP', ar: 'للقراءة فقط في النسخة الأولى' },
  admRoleAdminShort: { en: 'Admin', ar: 'الإدارة' },
  admPermViewContent: { en: 'View course content', ar: 'الاطلاع على محتوى المقرر' },
  admPermAssignActivity: { en: 'Assign an activity', ar: 'إسناد نشاط' },
  admPermChangeGrades: { en: 'Enter and change grades', ar: 'إدخال الدرجات وتعديلها' },
  admPermReleaseGrades: { en: 'Release grades', ar: 'إظهار الدرجات' },
  admPermSchoolGradebook: {
    en: 'See the whole school gradebook',
    ar: 'الاطلاع على سجل درجات المدرسة كاملة',
  },
  admPermRecordAttendance: { en: 'Record attendance', ar: 'تسجيل الحضور' },
  admPermManageClasses: { en: 'Create and edit classes', ar: 'إنشاء الصفوف وتعديلها' },
  admPermManageUsers: { en: 'Import and remove users', ar: 'استيراد المستخدمين وحذفهم' },
  admPermPostAnnouncement: {
    en: 'Post a school announcement',
    ar: 'نشر إعلان على مستوى المدرسة',
  },
  admPermLinkedChildOnly: {
    en: 'See a linked child only',
    ar: 'الاطلاع على الطفل المرتبط فقط',
  },
  admPermChangeScale: { en: 'Change the grading scale', ar: 'تغيير سلّم التقدير' },

  // Reports
  admReportsSubtitle: {
    en: 'Cedar Valley School · Term 2, 11 January to 2 April 2027',
    ar: 'مدرسة وادي الأرز · الفصل الثاني، ١١ كانون الثاني إلى ٢ نيسان ٢٠٢٧',
  },
  admReportProgress: { en: 'Progress by class', ar: 'التقدم حسب الشعبة' },
  admReportProgressDesc: {
    en: 'Average, completion and status for every class in the term.',
    ar: 'المعدل ونسبة الإنجاز والحالة لكل شعبة في الفصل.',
  },
  admReportGradebook: { en: 'Full gradebook', ar: 'سجل الدرجات الكامل' },
  admReportGradebookDesc: {
    en: 'Every grade for every student, with late flags and overrides.',
    ar: 'كل درجة لكل طالب، مع إشارات التأخير والتعديلات اليدوية.',
  },
  admReportAttendance: { en: 'Attendance register', ar: 'سجل الحضور' },
  admReportAttendanceDesc: {
    en: 'Daily marks across the term, with absence totals per student.',
    ar: 'التسجيل اليومي على امتداد الفصل، مع مجموع الغيابات لكل طالب.',
  },
  admReportAtRisk: { en: 'At risk students', ar: 'الطلاب المتعثرون' },
  admReportAtRiskDesc: {
    en: 'Students below the threshold, with the signals that flagged them.',
    ar: 'الطلاب دون الحد الأدنى، مع المؤشرات التي رصدتهم.',
  },
  admReportStandards: { en: 'Standards coverage', ar: 'تغطية المعايير' },
  admReportStandardsDesc: {
    en: 'Which standards have been covered, partially covered or missed.',
    ar: 'أي المعايير غُطّي، وأيها غُطّي جزئياً، وأيها لم يُغطَّ.',
  },
  admReportEngagement: { en: 'Usage and engagement', ar: 'الاستخدام والتفاعل' },
  admReportEngagementDesc: {
    en: 'Logins, time on task and feature adoption by role.',
    ar: 'تسجيلات الدخول، ووقت العمل، ومدى تبني كل دور للميزات.',
  },
  admReportMinistry: {
    en: 'Ministry and head of school report',
    ar: 'تقرير الوزارة ومدير المدرسة',
  },
  admReportMinistryDesc: {
    en: 'The school report in the format the local authority expects. Needs a template per market.',
    ar: 'تقرير المدرسة بالصيغة التي تطلبها الجهة المحلية. ويحتاج إلى قالب لكل سوق.',
  },
  admReportReady: { en: 'Ready', ar: 'جاهز' },
  admReportsNote: {
    en: 'The ministry report is not in the features sheet. It was raised as a day one need for government curriculum schools and needs a template agreed per market before it can be built.',
    ar: 'تقرير الوزارة غير وارد في قائمة الميزات. وقد طُرح بوصفه حاجة من اليوم الأول لمدارس المناهج الحكومية، ويحتاج إلى قالب متفق عليه لكل سوق قبل أن يُبنى.',
  },

  // Analytics
  admAnalyticsSubtitle: {
    en: 'Cedar Valley School · Term 2',
    ar: 'مدرسة وادي الأرز · الفصل الثاني',
  },
  admTabProgress: { en: 'Progress', ar: 'التقدم' },
  admTabSkills: { en: 'Skills', ar: 'المهارات' },
  admTabEngagement: { en: 'Engagement', ar: 'التفاعل' },
  admTabStandards: { en: 'Standards', ar: 'المعايير' },
  admBandsByGrade: {
    en: 'Below, on track, above, by grade',
    ar: 'دون المستوى، على المسار، فوق المستوى، حسب الصف',
  },
  admBandBelow: { en: 'Below', ar: 'دون المستوى' },
  admBandAbove: { en: 'Above', ar: 'فوق المستوى' },
  admProgressByUnit: {
    en: 'Progress by unit, Mathematics Grade 6',
    ar: 'التقدم حسب الوحدة، الرياضيات للصف السادس',
  },
  admDrillDownHint: {
    en: 'Drill down to chapter and skill',
    ar: 'تفصيل حتى مستوى الفصل والمهارة',
  },
  admColUnit: { en: 'Unit', ar: 'الوحدة' },
  admUnitN: { en: 'Unit {n}', ar: 'الوحدة {n}' },
  admMasteryBySkill: {
    en: 'Mastery by skill, weakest first',
    ar: 'الإتقان حسب المهارة، الأضعف أولاً',
  },
  admClickSkillHint: {
    en: 'Click a skill to see the questions',
    ar: 'انقر مهارة لعرض أسئلتها',
  },
  admColAttemptsEach: { en: 'Attempts each', ar: 'المحاولات لكل طالب' },
  admLoginsAndTime: { en: 'Logins and time on task', ar: 'تسجيلات الدخول ووقت العمل' },
  admLogins: { en: 'Logins', ar: 'تسجيلات الدخول' },
  admMinutesPerLearner: { en: 'Minutes per learner', ar: 'الدقائق لكل طالب' },
  admScopeNotAgreed: { en: 'Scope not agreed', ar: 'النطاق غير متفق عليه' },
  admStandardN: { en: 'Standard {n}', ar: 'المعيار {n}' },
  admStandardsCoverageNote: {
    en: '27 of 40 standards covered, 6 partially, 7 not started. The features sheet marks this screen as needing scope definition, so this is a proposal.',
    ar: 'غُطّي 27 معياراً من 40، و6 معايير جزئياً، و7 لم تبدأ. وتصف قائمة الميزات هذه الشاشة بأنها تحتاج إلى تحديد نطاق، فهي هنا مقترح.',
  },

  /*
    One person, 9 November.

    The Users table listed 141 students and opened none of them, and neither
    did the class roster, so the directory was a list with no second page. One
    route serves all three roles and changes shape for each, because a teacher
    and a parent are not students with different fields.
  */
  admAccount: { en: 'Account', ar: 'الحساب' },
  admEnrolment: { en: 'Enrolment', ar: 'التسجيل' },
  admAccess: { en: 'Access', ar: 'الدخول' },
  admPerformance: { en: 'Performance', ar: 'الأداء' },
  admLinkedParents: { en: 'Parents', ar: 'أولياء الأمر' },
  admLinkedChildren: { en: 'Children', ar: 'الأبناء' },
  admClassesTaught: { en: 'Classes taught', ar: 'الصفوف التي يدرّسها' },
  admWorkload: { en: 'Workload', ar: 'عبء العمل' },

  admFieldEmail: { en: 'Email', ar: 'البريد الإلكتروني' },
  admFieldRole: { en: 'Role', ar: 'الدور' },
  admFieldSeat: { en: 'Seat', ar: 'المقعد' },
  admFieldSchool: { en: 'School', ar: 'المدرسة' },
  admFieldYear: { en: 'Academic year', ar: 'العام الدراسي' },
  admFieldClass: { en: 'Class', ar: 'الشعبة' },
  admFieldAgeTier: { en: 'Age tier', ar: 'الفئة العمرية' },
  admFieldLastActive: { en: 'Last active', ar: 'آخر نشاط' },
  admFieldId: { en: 'Identifier', ar: 'المعرّف' },

  admStatusActive: { en: 'Active', ar: 'نشط' },
  admSeatUsed: { en: 'Uses a seat', ar: 'يشغل مقعداً' },
  admTierEarly: { en: 'K1 to Grade 3', ar: 'من الروضة إلى الصف الثالث' },
  admTierLater: { en: 'Grade 3 and above', ar: 'الصف الثالث فما فوق' },

  admSubmissionsThisTerm: { en: 'Submissions this term', ar: 'التسليمات هذا الفصل' },
  admDaysPresent: { en: '{n} of {m} days', ar: '{n} من {m} أيام' },
  admLast30Days: { en: 'in the last 30 days', ar: 'في آخر ٣٠ يوماً' },
  admStudentsTaught: { en: 'Students', ar: 'الطلاب' },
  admAwaitingMarking: { en: 'Awaiting marking', ar: 'بانتظار التصحيح' },
  admAssignmentsSet: { en: 'Assignments set', ar: 'الواجبات المسندة' },

  admOpenTeacherView: { en: "Open the teacher's view", ar: 'افتح عرض المعلم' },
  admOpenClass: { en: 'Open the class', ar: 'افتح الشعبة' },
  admNoParentsLinked: { en: 'No parent account is linked.', ar: 'لا يوجد حساب ولي أمر مرتبط.' },
  admNoChildrenLinked: { en: 'No child is linked.', ar: 'لا يوجد ابن مرتبط.' },
  admPersonNotFound: { en: 'No such person', ar: 'لا يوجد شخص بهذا المعرّف' },
  admPersonNotFoundBody: {
    en: 'The identifier in the address does not match anybody at this school. Go back to Users and pick someone from the list.',
    ar: 'المعرّف في العنوان لا يطابق أي شخص في هذه المدرسة. ارجع إلى المستخدمين واختر أحداً من القائمة.',
  },

  /*
    The age rule, stated on the page rather than only in the code.

    LMS-22: K1 to Grade 3 never sees a percentage and never sees "at risk".
    That holds here too, because an admin screen that prints a six year old's
    average as a number is the same screen for that child's parent to be shown
    at a meeting. The early tier gets stars and completion only.
  */
  admEarlyTierNote: {
    en: 'K1 to Grade 3 shows stars and completion, never a percentage and never a risk label. Same rule as the class roster and the child’s own screens.',
    ar: 'الفئة من الروضة إلى الصف الثالث تُعرض بالنجوم ونسبة الإنجاز فقط، لا بنسبة مئوية ولا بوصف تعثّر. وهي القاعدة نفسها في كشف الشعبة وفي شاشات الطفل.',
  },
  admAdminPerformanceNote: {
    en: 'A summary for administration, not a marking record. The teacher’s view has the work, the skills and the scores over time.',
    ar: 'ملخص للإدارة لا سجل تصحيح. فعرض المعلم يحوي الأعمال والمهارات والدرجات عبر الزمن.',
  },
} satisfies Record<string, Phrase>
