import type { Phrase } from './types'

/**
 * Copy for the shared screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}` and `{t}`, filled by the component with
 * `.replace()`. A whole sentence per key rather than glued fragments, because
 * Arabic puts the number, the noun and the verb in a different order.
 *
 * Two parts of this module are deliberate and should survive a tidy up.
 *
 * The child sign in wording is written for a five to eight year old reading it
 * alone. أهلاً and هيا بنا rather than مرحباً بك and متابعة, short verbs in the
 * imperative, and no word a child meets for the first time on a login screen.
 *
 * The error wording never says خطأ about a screen the reader is looking at, in
 * either language, and never offers a stack trace. حدث خلل عندنا puts the fault
 * on the platform. The one place خطأ appears is the rule note that states the
 * rule. The reference code itself is an identifier read down a phone line and
 * is not translated.
 */
export const shared = {
  // Shell
  shSharedScreens: { en: 'Shared screens', ar: 'شاشات مشتركة' },
  shSignedInAsTeacher: {
    en: 'Signed in as a teacher',
    ar: 'مسجّل الدخول بصفة معلم',
  },

  // Sign in, shared between both modes
  shModeEmail: { en: 'I have an email', ar: 'لديّ بريد إلكتروني' },
  shModeInClass: { en: 'I am in class', ar: 'أنا في الصف' },
  shSignIn: { en: 'Sign in', ar: 'تسجيل الدخول' },
  shEmail: { en: 'Email', ar: 'البريد الإلكتروني' },
  shPassword: { en: 'Password', ar: 'كلمة السر' },
  shForgotPasswordLink: { en: 'I forgot my password', ar: 'نسيت كلمة السر' },
  shUseSchoolAccount: {
    en: 'Or use your school account',
    ar: 'أو استخدم حساب مدرستك',
  },
  shSplashHeadline: {
    en: 'Everything your class is working on, in one place.',
    ar: 'كل ما يعمل عليه صفك في مكان واحد.',
  },
  shSplashFooter: {
    en: 'York-E 3.0 · Cedar Valley School · Term 2',
    ar: 'يورك-إي ٣٫٠ · مدرسة وادي الأرز · الفصل الثاني',
  },

  // Sign in, the K1 to Grade 3 route. Read by the child, not to the child.
  shChildHello: { en: 'Hello', ar: 'أهلاً' },
  shChildIntro: {
    en: 'Type the code your teacher put on the board, then tap your picture.',
    ar: 'اكتب الرمز الذي كتبه معلمك على اللوح، ثم المس صورتك.',
  },
  shClassCode: { en: 'Class code', ar: 'رمز الصف' },
  shTapYourPicture: { en: 'Tap your picture', ar: 'المس صورتك' },
  shPictureN: { en: 'Picture {n}', ar: 'الصورة {n}' },
  shLetUsGo: { en: 'Let us go', ar: 'هيا بنا' },
  shChildNoPasswordNote: {
    en: 'No password and no email. A teacher can reset the class code from their class screen in one tap.',
    ar: 'لا كلمة سر ولا بريد إلكتروني. ويستطيع المعلم تغيير رمز الصف من شاشة صفه بنقرة واحدة.',
  },

  // Forgotten password
  shSetNewPassword: { en: 'Set a new password', ar: 'تعيين كلمة سر جديدة' },
  shForgotIntro: {
    en: 'Tell us the email you sign in with and we will send you a link.',
    ar: 'أخبرنا بالبريد الإلكتروني الذي تسجّل الدخول به وسنرسل إليك رابطاً.',
  },
  shSendTheLink: { en: 'Send the link', ar: 'أرسل الرابط' },
  shCheckYourEmail: { en: 'Check your email', ar: 'تفقّد بريدك الإلكتروني' },
  shResetSentBody: {
    en: 'If that address belongs to an account, a link to set a new password is on its way. The link works once and expires in an hour.',
    ar: 'إن كان هذا العنوان يعود إلى حساب، فرابط تعيين كلمة سر جديدة في طريقه إليك. ويعمل الرابط مرة واحدة وينتهي بعد ساعة.',
  },
  shBackToSignIn: { en: 'Back to sign in', ar: 'العودة إلى تسجيل الدخول' },
  shAreYouStudent: { en: 'Are you a student?', ar: 'هل أنت طالب؟' },
  shStudentAskTeacher: {
    en: 'Ask your teacher. They can reset your sign in from their class screen straight away, and you will not need an email.',
    ar: 'اسأل معلمك. يستطيع إعادة ضبط دخولك من شاشة صفه فوراً، ولن تحتاج إلى بريد إلكتروني.',
  },

  // Profile
  shProfileSubtitle: {
    en: 'Your details and how the platform behaves',
    ar: 'بياناتك وطريقة عمل المنصة معك',
  },
  shAboutYou: { en: 'You', ar: 'عنك' },
  shChangePhoto: { en: 'Change photo', ar: 'تغيير الصورة' },
  shName: { en: 'Name', ar: 'الاسم' },
  shRole: { en: 'Role', ar: 'الدور' },
  shSchool: { en: 'School', ar: 'المدرسة' },
  shSetByYourSchool: { en: 'Set by your school', ar: 'تحدده مدرستك' },
  shLanguage: { en: 'Language', ar: 'اللغة' },
  shLeftToRight: { en: 'Left to right', ar: 'من اليسار إلى اليمين' },
  shRightToLeft: { en: 'Right to left', ar: 'من اليمين إلى اليسار' },
  shReadingAccessibility: {
    en: 'Reading and accessibility',
    ar: 'القراءة وإمكانية الوصول',
  },
  shDyslexicText: {
    en: 'Dyslexia friendly text',
    ar: 'نص ملائم لعسر القراءة',
  },
  shDyslexicHint: {
    en: 'Changes the typeface and opens up the spacing across the whole platform.',
    ar: 'يغيّر نوع الخط ويوسّع التباعد في المنصة كلها.',
  },
  shReadAloud: { en: 'Read text out loud', ar: 'قراءة النص بصوت عالٍ' },
  shReadAloudHint: {
    en: 'Select any text and have it read to you. Works on questions as well as pages.',
    ar: 'حدد أي نص ليُقرأ عليك. يعمل على الأسئلة كما يعمل على الصفحات.',
  },
  shReduceMotion: { en: 'Reduce movement', ar: 'تقليل الحركة' },
  shReduceMotionHint: {
    en: 'Turns off the animations, including the reward moments in the younger years.',
    ar: 'يوقف الحركات، بما فيها لحظات المكافأة في الصفوف الأولى.',
  },

  // Notifications
  shNUnread: { en: '{n} unread', ar: '{n} غير مقروء' },
  shNothingUnread: { en: 'Nothing unread', ar: 'لا شيء غير مقروء' },
  shMarkAllRead: { en: 'Mark all as read', ar: 'تعليم الكل كمقروء' },
  shFilterAll: { en: 'All', ar: 'الكل' },
  shFilterUnread: { en: 'Unread', ar: 'غير المقروءة' },
  shAllCaughtUp: {
    en: 'Nothing unread. You are up to date.',
    ar: 'لا شيء غير مقروء. أنت مطّلع على كل جديد.',
  },
  shNotificationsNote: {
    en: 'Every notification links to the screen that resolves it. One that only announces something makes more work rather than less.',
    ar: 'كل تنبيه يقود إلى الشاشة التي تعالجه. أما التنبيه الذي يكتفي بالإعلان فيصنع عملاً إضافياً بدل أن يوفّره.',
  },
  shYesterday: { en: 'Yesterday', ar: 'أمس' },
  shNotif1Title: {
    en: '22 pieces of work are waiting to be marked',
    ar: '22 قطعة عمل بانتظار التصحيح',
  },
  shNotif1Detail: {
    en: 'Across four classes, the oldest has been eight days',
    ar: 'في أربعة صفوف، وأقدمها منذ ثمانية أيام',
  },
  shNotif1At: { en: '08:10', ar: '08:10' },
  shNotif2Title: {
    en: 'Rana Sleiman replied about Ibrahim',
    ar: 'ردّت Rana Sleiman بشأن Ibrahim',
  },
  shNotif2Detail: {
    en: 'Thank you for letting us know. We will go over it this weekend.',
    ar: 'شكراً لإعلامنا. سنراجعها في عطلة نهاية الأسبوع.',
  },
  shNotif3Title: {
    en: 'End of unit check is set for Friday',
    ar: 'اختبار نهاية الوحدة يوم الجمعة',
  },
  shNotif3Detail: {
    en: 'Grade 6 Cedar and Grade 6 Maple, 12 February',
    ar: 'الصف السادس شعبة الأرز والصف السادس شعبة القيقب، ١٢ شباط',
  },
  shNotif4Title: {
    en: 'Term 2 reports close on 2 April',
    ar: 'تقارير الفصل الثاني تُقفل في ٢ نيسان',
  },
  shNotif4Detail: {
    en: 'From the school admin. All grades must be released before the end of term.',
    ar: 'من إدارة المدرسة. يجب إظهار كل الدرجات قبل نهاية الفصل.',
  },
  shNotif4At: { en: '9 Feb', ar: '٩ شباط' },
  shNotif5Title: {
    en: 'The coordinator published a change to the unit plan',
    ar: 'نشر المنسق تعديلاً على خطة الوحدة',
  },
  shNotif5Detail: {
    en: 'Fractions now runs to 19 February',
    ar: 'تمتد وحدة الكسور الآن حتى ١٩ شباط',
  },
  shNotif5At: { en: '6 Feb', ar: '٦ شباط' },

  // Empty states
  shEmptySubtitle: {
    en: 'Four kinds of nothing, which mean four different things',
    ar: 'أربعة أنواع من الفراغ، تعني أربعة أشياء مختلفة',
  },
  shNothingYet: { en: 'Nothing yet', ar: 'لا شيء بعد' },
  shNoClassesYet: { en: 'No classes yet', ar: 'لا توجد صفوف بعد' },
  shNoClassesBody: {
    en: 'Import your students first, then put them into classes. Most schools do this once at the start of the year.',
    ar: 'استورد طلابك أولاً، ثم وزّعهم على الصفوف. ومعظم المدارس تفعل ذلك مرة واحدة في بداية العام.',
  },
  shImportStudents: { en: 'Import students', ar: 'استيراد الطلاب' },
  shNothingLeft: { en: 'Nothing left', ar: 'لم يبقَ شيء' },
  shNothingToMark: {
    en: 'Nothing waiting to be marked',
    ar: 'لا شيء بانتظار التصحيح',
  },
  shQueueClearBody: {
    en: 'The queue is clear. It will fill again as work comes in.',
    ar: 'القائمة فارغة. وستمتلئ من جديد مع وصول الأعمال.',
  },
  shNothingFound: { en: 'Nothing found', ar: 'لا نتائج' },
  shNoResultsTitle: {
    en: 'No results for common denominators',
    ar: 'لا نتائج عن المقامات المشتركة',
  },
  shNoResultsBody: {
    en: 'You are filtering by Grade 7 and quizzes only. Try searching by skill rather than by title.',
    ar: 'أنت تصفّي حسب الصف السابع والاختبارات القصيرة فقط. جرّب البحث حسب المهارة بدل العنوان.',
  },
  shClearTheFilters: { en: 'Clear the filters', ar: 'امسح عوامل التصفية' },
  shNothingForYou: { en: 'Nothing for you', ar: 'لا شيء لك' },
  shCourseNotOpen: {
    en: 'This course is not open to your class',
    ar: 'هذا المقرر غير متاح لصفك',
  },
  shCourseNotOpenBody: {
    en: 'Your teacher decides which courses your class can see. Ask them if you think something is missing.',
    ar: 'معلمك هو من يحدد المقررات التي يراها صفك. اسأله إن شعرت أن شيئاً ناقصاً.',
  },
  shAllDoneToday: { en: 'All done for today', ar: 'أنهيت كل شيء اليوم' },
  shComeBackTomorrow: {
    en: 'Come back tomorrow for something new.',
    ar: 'عُد غداً لشيء جديد.',
  },
  shEmptyNote: {
    en: 'The last one is the K1 to Grade 3 version. A blank page with a grey icon reads as broken to a six year old, so the empty state in that tier is warm and says the work is finished.',
    ar: 'الأخيرة هي نسخة الروضة إلى الصف الثالث. فالصفحة الفارغة برمز رمادي تبدو معطّلة في عين طفل في السادسة، لذلك تأتي الشاشة الفارغة في هذه المرحلة دافئة وتقول إن العمل قد انتهى.',
  },

  // Error states
  shErrorSubtitle: {
    en: 'Three kinds of wrong, two of which the reader can fix',
    ar: 'ثلاثة أنواع من الخلل، يستطيع القارئ معالجة اثنين منها',
  },
  shOffline: { en: 'You are offline', ar: 'أنت غير متصل بالإنترنت' },
  shOfflineBody: {
    en: 'The marks you entered in the last few minutes are saved on this device and will go up as soon as you are back online. Nothing has been lost.',
    ar: 'الدرجات التي أدخلتها في الدقائق الأخيرة محفوظة على هذا الجهاز وسترتفع إلى المنصة فور عودة الاتصال. لم يضع شيء.',
  },
  shTryAgain: { en: 'Try again', ar: 'أعد المحاولة' },
  shNoAccess: {
    en: 'You do not have access to this',
    ar: 'ليس لديك صلاحية الوصول إلى هذا',
  },
  shNoAccessBody: {
    en: 'This belongs to another class. Your school admin can give you access if you should have it.',
    ar: 'هذا يعود إلى صف آخر. وتستطيع إدارة مدرستك منحك الصلاحية إن كان من حقك ذلك.',
  },
  shBackToToday: { en: 'Back to Today', ar: 'العودة إلى اليوم' },
  shOurFault: {
    en: 'Something went wrong at our end',
    ar: 'حدث خلل عندنا',
  },
  shOurFaultBody: {
    en: 'This is not something you did. Give this reference to your school admin and they can pass it to us.',
    ar: 'ليس هذا بسبب شيء فعلته. أعطِ هذا الرمز لإدارة مدرستك لتوصله إلينا.',
  },
  shCopy: { en: 'Copy', ar: 'نسخ' },
  shCopied: { en: 'Copied', ar: 'تم النسخ' },
  shRule: { en: 'Rule', ar: 'قاعدة' },
  shErrorNote: {
    en: 'No screen says Error, and none shows a stack trace. The reference is short enough to read down a phone line, because that is how a school office actually reports a fault.',
    ar: 'لا تقول أي شاشة كلمة خطأ، ولا تعرض أي منها أثر تتبّع برمجي. والرمز قصير بما يكفي لقراءته عبر الهاتف، فتلك هي الطريقة التي يبلّغ بها مكتب المدرسة عن عطل فعلاً.',
  },

  // Nav labels for the two support screens
  shNavHelp: { en: 'Help centre', ar: 'مركز المساعدة' },
  shNavSupport: { en: 'Support ticket', ar: 'طلب دعم' },

  // School selection, the screen that makes multi-tenancy real to one person
  shSelTitle: { en: 'Which school?', ar: 'أي مدرسة؟' },
  shSelIntro: {
    en: 'You are in more than one school in this group. Pick the one you want to open now.',
    ar: 'أنت مسجّل في أكثر من مدرسة في هذه المجموعة. اختر المدرسة التي تريد فتحها الآن.',
  },
  shSelSignedInAs: { en: 'Signed in as {t}', ar: 'مسجّل الدخول باسم {t}' },
  shSelCaseTeacher: { en: 'A teacher in two schools', ar: 'معلم يعمل في مدرستين' },
  shSelCaseParent: {
    en: 'A parent with a child in each',
    ar: 'ولي أمر له طفل في كل مدرسة',
  },
  shSelWaitingFor: { en: 'Waiting for you', ar: 'بانتظارك' },
  shSelTeacherCedar: {
    en: '22 pieces of work waiting to be marked, the oldest for eight days.',
    ar: '22 عملاً بانتظار التصحيح، وأقدمها منذ ثمانية أيام.',
  },
  shSelTeacherNoor: {
    en: '4 pieces of work waiting to be marked, and a quiz that closes today.',
    ar: '4 أعمال بانتظار التصحيح، واختبار قصير يُقفل اليوم.',
  },
  shSelParentCedar: {
    en: 'Two unread messages about Ibrahim, Grade 6.',
    ar: 'رسالتان لم تُقرآ بشأن Ibrahim في الصف السادس.',
  },
  shSelParentRawabi: {
    en: 'Nothing unread about Lina, Grade 2.',
    ar: 'لا رسائل غير مقروءة بشأن Lina في الصف الثاني.',
  },
  shSelRemember: {
    en: 'Open this school next time without asking me',
    ar: 'افتح هذه المدرسة في المرة القادمة دون سؤالي',
  },
  shSelSwitchNote: {
    en: 'Switching school is always possible later, from the menu under your name. This choice is never final.',
    ar: 'يمكنك تبديل المدرسة لاحقاً في أي وقت من القائمة تحت اسمك. وهذا الاختيار ليس نهائياً أبداً.',
  },
  shSelContinue: { en: 'Continue', ar: 'متابعة' },
  shSelPickOne: { en: 'Pick a school to carry on.', ar: 'اختر مدرسة للمتابعة.' },
  shSelNote: {
    en: 'This screen appears only for the people who are in more than one school. Someone with one school never sees it, because a chooser with a single option is a click that teaches nothing.',
    ar: 'لا تظهر هذه الشاشة إلا لمن كان في أكثر من مدرسة. أما صاحب المدرسة الواحدة فلا يراها أبداً، لأن قائمة اختيار بخيار واحد نقرة لا تضيف شيئاً.',
  },

  // Help centre
  shHelpSubtitle: {
    en: 'Answers written for the person reading them',
    ar: 'إجابات مكتوبة لمن يقرؤها',
  },
  shHelpSearchPlaceholder: {
    en: 'Search help, for example releasing grades',
    ar: 'ابحث في المساعدة، مثل إظهار الدرجات',
  },
  shHelpFilterAll: { en: 'All articles', ar: 'كل المقالات' },
  shHelpNArticles: { en: '{n} articles', ar: '{n} مقالة' },
  shHelpForTeachers: { en: 'For teachers', ar: 'للمعلمين' },
  shHelpForParents: { en: 'For parents', ar: 'لأولياء الأمور' },
  shHelpForAdmins: { en: 'For school admins', ar: 'لإدارة المدرسة' },
  shHelpForEveryone: { en: 'For everyone', ar: 'للجميع' },
  shHelpShortRead: { en: 'Short read', ar: 'قراءة قصيرة' },
  shHelpLongerRead: { en: 'Longer read', ar: 'قراءة أطول' },
  shHelpA1Title: {
    en: 'Releasing grades to students and parents',
    ar: 'إظهار الدرجات للطلاب وأولياء الأمور',
  },
  shHelpA1Body: {
    en: 'A mark you enter stays hidden until you release it. What the release switch does, and what a parent sees the moment you use it.',
    ar: 'تبقى الدرجة التي تدخلها مخفية حتى تُظهرها. ما الذي يفعله مفتاح الإظهار، وما الذي يراه ولي الأمر لحظة استخدامك له.',
  },
  shHelpA2Title: {
    en: 'What your child sees, and why it changes at Grade 3',
    ar: 'ما يراه طفلك، ولماذا يتغير عند الصف الثالث',
  },
  shHelpA2Body: {
    en: 'A child in Grade 2 sees stars and finished work. A child in Grade 6 sees marks, feedback and progress. Both are your child, and neither screen is missing anything.',
    ar: 'الطفل في الصف الثاني يرى نجوماً وأعمالاً منجزة. والطفل في الصف السادس يرى درجات وملاحظات وتقدماً. كلاهما طفلك، ولا ينقص أياً من الشاشتين شيء.',
  },
  shHelpA3Title: {
    en: 'The two age tiers, and what changes at Grade 3',
    ar: 'المرحلتان العمريتان، وما يتغير عند الصف الثالث',
  },
  shHelpA3Body: {
    en: 'K1 to Grade 3 never meets a percentage and never meets the words at risk. From Grade 3 up, marks and progress are shown in full.',
    ar: 'من الروضة إلى الصف الثالث لا تظهر أي نسبة مئوية ولا تظهر كلمة متعثر. ومن الصف الثالث فما فوق تُعرض الدرجات والتقدم كاملة.',
  },
  shHelpA4Title: {
    en: 'Importing your users from a spreadsheet',
    ar: 'استيراد المستخدمين من ملف جدول',
  },
  shHelpA4Body: {
    en: 'The columns the file needs, the errors the first attempt always throws up, and how to fix one row without starting the whole file again.',
    ar: 'الأعمدة التي يحتاجها الملف، والأخطاء التي تظهر في المحاولة الأولى دائماً، وكيف تصحح سطراً واحداً دون إعادة الملف كله.',
  },
  shHelpA5Title: {
    en: 'What at risk means, and who can see it',
    ar: 'ماذا تعني كلمة متعثر، ومن يستطيع رؤيتها',
  },
  shHelpA5Body: {
    en: 'How the flag is worked out, how long it takes to clear, and why no student and no parent ever sees the words.',
    ar: 'كيف تُحتسب هذه الإشارة، وكم يلزم لزوالها، ولماذا لا يراها أي طالب ولا أي ولي أمر إطلاقاً.',
  },
  shHelpA6Title: {
    en: 'Taking attendance, and correcting it later',
    ar: 'تسجيل الحضور، وتصحيحه لاحقاً',
  },
  shHelpA6Body: {
    en: 'Marking a register, what happens when the same lesson is marked twice, and who is told when you change yesterday.',
    ar: 'تسجيل الحضور، وماذا يحدث إذا سُجّلت الحصة نفسها مرتين، ومن يُبلَّغ حين تعدّل حضور الأمس.',
  },
  shHelpA7Title: { en: 'My child cannot sign in', ar: 'طفلي لا يستطيع تسجيل الدخول' },
  shHelpA7Body: {
    en: 'Children in the younger years sign in with a class code and a picture, not an email and a password. Their teacher resets both from the class screen in one tap.',
    ar: 'يسجّل أطفال الصفوف الأولى الدخول برمز صف وصورة، لا ببريد إلكتروني وكلمة سر. ويستطيع معلمهم إعادة ضبطهما من شاشة الصف بنقرة واحدة.',
  },
  shHelpA8Title: { en: 'Working in more than one school', ar: 'العمل في أكثر من مدرسة' },
  shHelpA8Body: {
    en: 'If you are in two schools you choose one when you sign in, and you can switch at any time from the menu under your name.',
    ar: 'إن كنت في مدرستين فإنك تختار واحدة عند تسجيل الدخول، وتستطيع التبديل في أي وقت من القائمة تحت اسمك.',
  },
  shHelpNoResults: {
    en: 'Nothing matches that. Try fewer words, or raise a ticket and a person will read it.',
    ar: 'لا شيء يطابق ذلك. جرّب كلمات أقل، أو افتح طلب دعم ليقرأه شخص.',
  },
  shHelpStillStuck: {
    en: 'The article did not answer it',
    ar: 'المقالة لم تجب عن سؤالي',
  },
  shHelpStillStuckBody: {
    en: 'Raise a ticket and a person reads it. Say what you were doing, and whether it affects one person or a whole class.',
    ar: 'افتح طلب دعم ليقرأه شخص. واذكر ماذا كنت تفعل، وهل يتأثر شخص واحد أم صف كامل.',
  },
  shHelpRaiseTicket: { en: 'Raise a ticket', ar: 'افتح طلب دعم' },
  shHelpAudienceNote: {
    en: 'Every article says who it is for. A teacher and a parent who both ask how grades work need two different answers, and handing the parent the teacher one is how a help centre loses them.',
    ar: 'تذكر كل مقالة لمن كُتبت. فالمعلم وولي الأمر إذا سألا كيف تعمل الدرجات احتاجا جوابين مختلفين، وإعطاء ولي الأمر جواب المعلم هو ما يفقده الثقة بمركز المساعدة.',
  },

  // Support ticket
  shTktSubtitle: {
    en: 'Raise one, and follow the ones you have open',
    ar: 'افتح طلباً، وتابع طلباتك المفتوحة',
  },
  shTktNew: { en: 'Raise a ticket', ar: 'فتح طلب دعم' },
  shTktWhichSchool: { en: 'Which school', ar: 'أي مدرسة' },
  shTktYourRoleThere: { en: 'Your role there', ar: 'دورك فيها' },
  shTktWhatDoing: { en: 'What were you doing', ar: 'ماذا كنت تفعل' },
  shTktAreaMarking: { en: 'Marking work', ar: 'تصحيح الأعمال' },
  shTktAreaGradebook: { en: 'Looking at the gradebook', ar: 'تصفّح سجل الدرجات' },
  shTktAreaAttendance: { en: 'Taking attendance', ar: 'تسجيل الحضور' },
  shTktAreaAssigning: { en: 'Assigning an activity', ar: 'إسناد نشاط' },
  shTktAreaSigningIn: { en: 'Signing in', ar: 'تسجيل الدخول' },
  shTktAreaSomethingElse: { en: 'Something else', ar: 'شيء آخر' },
  shTktWhoAffected: { en: 'Who does this affect', ar: 'من يتأثر بهذا' },
  shTktAffectsMe: { en: 'Only me', ar: 'أنا فقط' },
  shTktAffectsOne: { en: 'One student', ar: 'طالب واحد' },
  shTktAffectsClass: { en: 'A whole class or more', ar: 'صف كامل أو أكثر' },
  shTktAffectsNote: {
    en: 'This one answer is the difference between a ticket and an incident. A class that cannot work is paged to an engineer. One person is not.',
    ar: 'هذا الجواب وحده هو الفرق بين طلب دعم وحادثة. فالصف الذي تعطّل عمله يُبلَّغ به مهندس فوراً، أما الشخص الواحد فلا.',
  },
  shTktDescribe: { en: 'What happened', ar: 'ما الذي حدث' },
  shTktDescribePlaceholder: {
    en: 'I entered a mark for Ibrahim and the page said saved, but the mark was gone when I came back.',
    ar: 'أدخلت درجة لإبراهيم وقالت الصفحة إنها حُفظت، لكنها اختفت عند عودتي.',
  },
  shTktAttach: { en: 'Attach a screenshot', ar: 'أرفق لقطة شاشة' },
  shTktAttachHint: {
    en: 'Drag an image in, or choose one. One picture of the screen saves three emails.',
    ar: 'اسحب صورة إلى هنا أو اخترها. فصورة واحدة للشاشة توفّر ثلاث رسائل متبادلة.',
  },
  shTktChooseImage: { en: 'Choose an image', ar: 'اختر صورة' },
  shTktKnowsAlready: {
    en: 'We already know your browser, your device, your school and the page you came from, so none of that needs typing.',
    ar: 'نعرف أصلاً متصفحك وجهازك ومدرستك والصفحة التي جئت منها، فلا حاجة لكتابة أي من ذلك.',
  },
  shTktSend: { en: 'Send it', ar: 'أرسل الطلب' },
  shTktSent: {
    en: 'Sent. Your reference is YE-4417 and it is at the top of the list below.',
    ar: 'أُرسل. رقمك المرجعي YE-4417 وهو في أعلى القائمة أدناه.',
  },
  shTktWhatNext: { en: 'What happens next', ar: 'ما الذي يحدث بعد ذلك' },
  shTktNextOne: {
    en: 'Only me, or one student: an answer within one working day.',
    ar: 'أنا فقط أو طالب واحد: جواب خلال يوم عمل واحد.',
  },
  shTktNextClass: {
    en: 'A whole class or more: this is an incident. An engineer is paged within two hours of school hours, and your school admin is told at the same time.',
    ar: 'صف كامل أو أكثر: هذه حادثة. يُبلَّغ بها مهندس خلال ساعتين من ساعات الدوام، وتُبلَّغ إدارة مدرستك في الوقت نفسه.',
  },
  shTktNextOutOfHours: {
    en: 'Raised after 17:00, or on a Sunday: an answer the next working morning. A teacher whose gradebook breaks on a Friday needs to know whether to wait or work around it, so it is written here rather than left to be guessed.',
    ar: 'إن فُتح الطلب بعد الساعة ١٧:٠٠ أو يوم الأحد: يصلك الجواب صباح يوم العمل التالي. فالمعلم الذي يتعطل سجل درجاته يوم الجمعة يحتاج أن يعرف هل ينتظر أم يدبّر أمره بطريقة أخرى، لذلك كُتب هذا هنا بدل أن يُترك للتخمين.',
  },
  shTktYourTickets: { en: 'Your tickets', ar: 'طلباتك' },
  shTktRef: { en: 'Reference', ar: 'الرقم المرجعي' },
  shTktIssue: { en: 'Issue', ar: 'المشكلة' },
  shTktImpact: { en: 'Impact', ar: 'الأثر' },
  shTktRaised: { en: 'Raised', ar: 'تاريخ الفتح' },
  shTktStatus: { en: 'Status', ar: 'الحالة' },
  shTktStatusOpen: { en: 'Open', ar: 'مفتوح' },
  shTktStatusEngineering: { en: 'With engineering', ar: 'لدى فريق التطوير' },
  shTktStatusWaitingYou: { en: 'Waiting on you', ar: 'بانتظار ردك' },
  shTktStatusResolved: { en: 'Resolved', ar: 'تم الحل' },
  shTkt1Issue: {
    en: 'A mark for one student will not save in the gradebook',
    ar: 'درجة طالب واحد لا تُحفظ في سجل الدرجات',
  },
  shTkt1At: { en: '6 Feb', ar: '٦ شباط' },
  shTkt2Issue: {
    en: 'Nobody in Grade 6 Cedar can open the end of unit quiz',
    ar: 'لا أحد في الصف السادس، شعبة الأرز يستطيع فتح اختبار نهاية الوحدة',
  },
  shTkt2At: { en: '5 Feb', ar: '٥ شباط' },
  shTkt3Issue: {
    en: 'A parent cannot see the report for her son',
    ar: 'ولية أمر لا ترى تقرير ابنها',
  },
  shTkt3At: { en: '2 Feb', ar: '٢ شباط' },
  shTkt4Issue: {
    en: 'Arabic ran left to right on the printed report',
    ar: 'العربية ظهرت من اليسار إلى اليمين في التقرير المطبوع',
  },
  shTkt4At: { en: '28 Jan', ar: '٢٨ كانون الثاني' },
  shTktWaitingNote: {
    en: 'One of these is waiting on you. We asked a question, and the clock stops until you answer it.',
    ar: 'أحد هذه الطلبات بانتظار ردك. سألناك سؤالاً والوقت متوقف حتى تجيب.',
  },

  // Canvas chrome
  shFrames: { en: 'Frames', ar: 'الإطارات' },
  shNOfMBuilt: { en: '{n} of {m} built', ar: 'أُنجز {n} من {m}' },
  shNOfM: { en: '{n} of {m}', ar: '{n} من {m}' },
  shZoomOut: { en: 'Zoom out', ar: 'تصغير' },
  shZoomIn: { en: 'Zoom in', ar: 'تكبير' },
  shCanvasTitle: {
    en: 'York-E 3.0, every screen',
    ar: 'يورك-إي ٣٫٠، كل الشاشات',
  },
  shCanvasBlurb: {
    en: 'Live frames, not screenshots. Click into any one and use it. Grey frames are screens that are planned and not built yet, which is deliberate: the gaps should be as easy to see as the finished work.',
    ar: 'إطارات حية لا صور ثابتة. انقر في أي منها واستخدمه. أما الإطارات الرمادية فهي شاشات مخططة لم تُبنَ بعد، وذلك مقصود: ينبغي أن تكون الثغرات ظاهرة كظهور العمل المنجز.',
  },
  shLoading: { en: 'Loading', ar: 'جارٍ التحميل' },
  shNotBuiltYet: { en: 'Not built yet', ar: 'لم تُبنَ بعد' },
  shFramesTotal: {
    en: '{n} frames in total.',
    ar: '{n} إطاراً في المجموع.',
  },
  shOpenFrame: { en: 'Open {t}', ar: 'افتح {t}' },

  // Placeholder for a named but undesigned screen
  shPlaceholderNote: {
    en: 'Planned in the screen inventory. Not designed yet.',
    ar: 'مُدرجة في قائمة الشاشات، ولم تُصمَّم بعد.',
  },

  /* ------------------------------------------------------------------ *
   * The frame register.
   *
   * Section titles, section blurbs and the title of every frame on the
   * canvas, which is the first screen a reviewer opens and so the one
   * place an English word is most expensive. The strings live here rather
   * than in `src/data/frames.ts`, which holds the keys only.
   *
   * Titles are screen names in a design review, so they stay short enough
   * to scan down a column rather than reading as sentences. A title that
   * appears in more than one section, Calendar and Attendance among them,
   * is one key reused rather than two keys that can drift apart.
   *
   * The two student sections carry a product rule rather than a label.
   * The K1 to Grade 3 blurb has to make it as plain in Arabic as in
   * English that the younger tier never meets a percentage and never
   * meets the word متعثر, because checking that rule holds is the thing
   * the reviewer is being asked to do.
   * ------------------------------------------------------------------ */

  // Section titles. School admin, teacher, parent, coordinator, super
  // admin and shared reuse the tab labels in common.ts.
  shSectionStudentUpper: {
    en: 'Student, Grade 3 and above',
    ar: 'الطالب، الصف الثالث فما فوق',
  },
  shSectionStudentEarly: {
    en: 'Student, K1 to Grade 3',
    ar: 'الطالب، الروضة إلى الصف الثالث',
  },

  // Section blurbs
  shSectionSchoolAdminBlurb: {
    en: 'Runs one school. Sets up people, classes and courses, then watches the term.',
    ar: 'تدير مدرسة واحدة. تنشئ المستخدمين والصفوف والمقررات، ثم تتابع الفصل.',
  },
  shSectionTeacherBlurb: {
    en: 'The role the product is judged on. Marking, planning and spotting who is slipping.',
    ar: 'الدور الذي يُحكم على المنتج به. التصحيح والتخطيط وتمييز من يتراجع.',
  },
  shSectionStudentUpperBlurb: {
    en: 'Sees scores, feedback and progress. Never the words at risk.',
    ar: 'يرى الدرجات والملاحظات والتقدم. ولا يرى أبداً كلمة متعثر.',
  },
  shSectionStudentEarlyBlurb: {
    en: 'Stars and completion. No percentage anywhere, and no at risk at all.',
    ar: 'نجوم وإنجاز. لا نسبة مئوية في أي مكان، ولا كلمة متعثر إطلاقاً.',
  },
  shSectionParentBlurb: {
    en: 'Two children, one in each age tier. Sees exactly what the child sees.',
    ar: 'طفلان، واحد في كل مرحلة عمرية. ويرى ما يراه الطفل تماماً.',
  },
  shSectionCoordinatorBlurb: {
    en: 'Owns the unit plan and standards coverage across several classes.',
    ar: 'يملك خطة الوحدة وتغطية المعايير عبر عدة صفوف.',
  },
  shSectionSuperAdminBlurb: {
    en: 'York Press level. Tenants, seats and what every school is doing.',
    ar: 'على مستوى York Press. المستأجرون والمقاعد وما تفعله كل مدرسة.',
  },
  shSectionSharedBlurb: {
    en: 'Screens every role meets, built once rather than six times.',
    ar: 'شاشات يلتقيها كل دور، بُنيت مرة واحدة لا ست مرات.',
  },
  shSectionDesignSystemBlurb: {
    en: 'Not screens. The parts the screens are made of, and the values behind them.',
    ar: 'ليست شاشات، بل الأجزاء التي تتكون منها الشاشات والقيم التي تقوم عليها.',
  },

  // Frame titles, school admin
  shFrameOverview: { en: 'Overview', ar: 'نظرة عامة' },
  shFrameAnalytics: { en: 'Analytics', ar: 'التحليلات' },
  shFrameClasses: { en: 'Classes', ar: 'الصفوف' },
  shFrameCreateClass: { en: 'Create a class', ar: 'إنشاء صف' },
  shFrameClassDetail: { en: 'Class detail', ar: 'تفاصيل الصف' },
  shFrameClassDetailEarly: {
    en: 'Class detail, early tier',
    ar: 'تفاصيل الصف، المرحلة الأولى',
  },
  shFrameUsers: { en: 'Users', ar: 'المستخدمون' },
  shFrameBulkImport: { en: 'Bulk import', ar: 'استيراد جماعي' },
  shFrameCoursesLicences: {
    en: 'Courses and licences',
    ar: 'المقررات والتراخيص',
  },
  shFrameAttendance: { en: 'Attendance', ar: 'الحضور' },
  shFrameAnnouncements: { en: 'Announcements', ar: 'الإعلانات' },
  shFrameReports: { en: 'Reports', ar: 'التقارير' },
  shFrameActivityLog: { en: 'Activity log', ar: 'سجل النشاط' },
  shFrameSettings: { en: 'Settings', ar: 'الإعدادات' },

  // Frame titles, teacher
  shFrameToday: { en: 'Today', ar: 'اليوم' },
  shFrameMyClasses: { en: 'My classes', ar: 'صفوفي' },
  shFrameClassHome: { en: 'Class home', ar: 'رئيسية الصف' },
  shFrameClassHomeEarly: {
    en: 'Class home, early tier',
    ar: 'رئيسية الصف، المرحلة الأولى',
  },
  shFrameCourseContent: { en: 'Course content', ar: 'محتوى المقرر' },
  shFrameContentLibrary: { en: 'Content library', ar: 'مكتبة المحتوى' },
  shFrameAssignActivity: { en: 'Assign an activity', ar: 'إسناد نشاط' },
  shFrameWeeklyPlanner: { en: 'Weekly planner', ar: 'المخطط الأسبوعي' },
  shFrameCalendar: { en: 'Calendar', ar: 'التقويم' },
  shFrameGradebook: { en: 'Gradebook', ar: 'سجل الدرجات' },
  shFrameGradebookSettings: {
    en: 'Gradebook settings',
    ar: 'إعدادات سجل الدرجات',
  },
  shFrameGradeChanges: { en: 'Grade changes', ar: 'تعديلات الدرجات' },
  shFrameNeedsGrading: { en: 'Needs grading', ar: 'بانتظار التصحيح' },
  shFrameGradeSubmission: { en: 'Grade a submission', ar: 'تصحيح تسليم' },
  shFrameStudents: { en: 'Students', ar: 'الطلاب' },
  shFrameStudentDetail: { en: 'Student detail', ar: 'تفاصيل الطالب' },
  shFrameSkillDrillDown: { en: 'Skill drill down', ar: 'تفصيل المهارات' },
  shFrameQuestionBank: { en: 'Question bank', ar: 'بنك الأسئلة' },
  shFrameCreateQuiz: { en: 'Create a quiz', ar: 'إنشاء اختبار قصير' },
  shFrameAttendanceRegister: {
    en: 'Attendance register',
    ar: 'سجل الحضور',
  },
  shFrameAnnouncementsMessages: {
    en: 'Announcements and messages',
    ar: 'الإعلانات والرسائل',
  },
  shFrameAiTeacherTools: {
    en: 'AI teacher tools',
    ar: 'أدوات الذكاء الاصطناعي للمعلم',
  },
  shFrameClassroomPresentation: {
    en: 'Classroom presentation',
    ar: 'العرض الصفي',
  },

  // Frame titles, student Grade 3 and above
  shFrameDashboard: { en: 'Dashboard', ar: 'لوحة المتابعة' },
  shFrameMyCourses: { en: 'My courses', ar: 'موادي' },
  shFrameCoursePlayer: { en: 'Course player', ar: 'مشغّل المقرر' },
  shFrameAssignmentsDueDates: {
    en: 'Assignments and due dates',
    ar: 'الواجبات ومواعيد التسليم',
  },
  shFrameTakeQuiz: { en: 'Take a quiz', ar: 'أداء اختبار قصير' },
  shFrameQuizResults: {
    en: 'Quiz results and feedback',
    ar: 'نتائج الاختبار والملاحظات',
  },
  shFrameMyGrades: { en: 'My grades', ar: 'درجاتي' },
  shFrameMyProgress: { en: 'My progress', ar: 'تقدمي' },

  // Frame titles, student K1 to Grade 3
  shFrameHome: { en: 'Home', ar: 'الرئيسية' },
  shFrameMyWork: { en: 'My work', ar: 'أعمالي' },
  shFrameDoingActivity: { en: 'Doing an activity', ar: 'أثناء النشاط' },
  shFrameWellDone: { en: 'Well done moment', ar: 'لحظة أحسنت' },
  shFrameMyStickers: { en: 'My stickers', ar: 'ملصقاتي' },

  // Frame titles, parent
  shFrameMyChildren: { en: 'My children', ar: 'أطفالي' },
  shFrameChildOverviewUpper: {
    en: 'Child overview, Grade 6',
    ar: 'نظرة على الطفل، الصف السادس',
  },
  shFrameChildOverviewEarly: {
    en: 'Child overview, Grade 2',
    ar: 'نظرة على الطفل، الصف الثاني',
  },
  shFrameProgressOverTime: {
    en: 'Progress over time',
    ar: 'التقدم عبر الزمن',
  },
  shFrameAssignmentsMarks: {
    en: 'Assignments and marks',
    ar: 'الواجبات والدرجات',
  },
  shFrameMessagesFromSchool: {
    en: 'Messages from school',
    ar: 'رسائل المدرسة',
  },
  shFrameNotificationSettings: {
    en: 'Notification settings',
    ar: 'إعدادات التنبيهات',
  },

  // Frame titles, coordinator
  shFrameUnitPlans: { en: 'Unit plans', ar: 'خطط الوحدات' },
  shFrameStandardsCoverage: {
    en: 'Standards coverage',
    ar: 'تغطية المعايير',
  },
  shFrameAcrossMyClasses: { en: 'Across my classes', ar: 'عبر صفوفي' },
  shFrameFlaggedStudents: {
    en: 'Flagged students',
    ar: 'طلاب بحاجة إلى متابعة',
  },

  // Frame titles, super admin
  shFrameSchools: { en: 'Schools', ar: 'المدارس' },
  shFrameSchoolDetail: { en: 'School detail', ar: 'تفاصيل المدرسة' },
  shFrameProvisionSchool: { en: 'Provision a school', ar: 'تهيئة مدرسة' },
  shFrameSeatsLicences: {
    en: 'Seats and licences',
    ar: 'المقاعد والتراخيص',
  },
  shFrameCourseCatalogue: { en: 'Course catalogue', ar: 'دليل المقررات' },
  shFrameUsageAcrossSchools: {
    en: 'Usage across schools',
    ar: 'الاستخدام عبر المدارس',
  },
  shFrameSupportImpersonation: {
    en: 'Support and impersonation',
    ar: 'الدعم وانتحال الهوية',
  },
  shFramePlatformSettings: {
    en: 'Platform settings',
    ar: 'إعدادات المنصة',
  },

  // Frame titles, shared
  shFrameSignIn: { en: 'Sign in', ar: 'تسجيل الدخول' },
  shFrameForgottenPassword: {
    en: 'Forgotten password',
    ar: 'نسيان كلمة السر',
  },
  shFrameProfileAccessibility: {
    en: 'Profile and accessibility',
    ar: 'الملف الشخصي وإمكانية الوصول',
  },
  shFrameNotifications: { en: 'Notifications', ar: 'التنبيهات' },
  shFrameEmptyStates: { en: 'Empty states', ar: 'الشاشات الفارغة' },
  shFrameErrorStates: { en: 'Error states', ar: 'شاشات الخلل' },

  // Frame notes. What the frame is, when it is not an ordinary page.
  shFrameNoteFlow: { en: 'Flow', ar: 'مسار' },
  shFrameNoteNoChrome: { en: 'No chrome', ar: 'بلا إطار' },
  shFrameNoteSpec: { en: 'Spec', ar: 'مرجع' },
  shFrameNoteFlowNoChrome: { en: 'Flow, no chrome', ar: 'مسار، بلا إطار' },
  shFrameNoteNoChromeProjected: {
    en: 'No chrome, projected',
    ar: 'بلا إطار، للعرض',
  },
  shFrameNoteTwoRoutesNoChrome: {
    en: 'Two routes in, no chrome',
    ar: 'مدخلان، بلا إطار',
  },
  shFrameNoteMinistryReport: {
    en: 'Ministry report proposed',
    ar: 'تقرير الوزارة مقترح',
  },

  /*
   * Frames added after the plan audit on 7 November. Each one was named in the
   * plan and had no screen behind it until now.
   */
  shFrameSearchInCourse: { en: 'Search inside a course', ar: 'البحث داخل مقرر' },
  shFrameLessonPlayer: { en: 'Lesson player', ar: 'مشغّل الدرس' },
  shFrameEarlyHelp: { en: 'Help', ar: 'المساعدة' },
  shFrameTenantBranding: { en: 'School branding', ar: 'هوية المدرسة' },
  shFrameSchoolSelection: { en: 'Choose a school', ar: 'اختيار المدرسة' },
  shFrameHelpCentre: { en: 'Help centre', ar: 'مركز المساعدة' },
  shFrameSupportTicket: { en: 'Support ticket', ar: 'طلب دعم' },
} satisfies Record<string, Phrase>
