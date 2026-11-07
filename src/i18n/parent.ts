import type { Phrase } from './types'

/**
 * Copy for the parent screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}`, `{c}`, `{d}` and `{t}`, filled by the
 * component with `.replace()`. A whole sentence per key rather than glued
 * fragments, because Arabic builds a possessive differently: "Lina's progress"
 * is not a name plus a suffix, it is تقدم لينا, with the noun first.
 *
 * Two rules hold across every string here.
 *
 * The words "at risk" never appear in parent copy in either language. That
 * label is a teacher's working judgement and a school tells a family about it
 * in person, not through a badge on a dashboard.
 *
 * The early tier sentences never read as failure. A Grade 2 child's parent
 * sees stars, a next step and a plain description of what the child can do.
 * The Arabic has to stay as gentle as the English, so "Needs work" becomes
 * يحتاج تدريباً rather than anything that translates back as behind or weak.
 */
export const parent = {
  // Shell and child switcher
  parMyChildren: { en: 'My children', ar: 'أبنائي' },
  parGrade2: { en: 'Grade 2', ar: 'الصف الثاني' },
  parGrade6: { en: 'Grade 6', ar: 'الصف السادس' },
  parNameProgress: { en: "{n}'s progress", ar: 'تقدم {n}' },
  parNameWork: { en: "{n}'s work", ar: 'أعمال {n}' },
  parNameAttendance: { en: "{n}'s attendance", ar: 'حضور {n}' },
  parMessages: { en: 'Messages', ar: 'الرسائل' },

  // My children
  parSchoolTermWeek: {
    en: 'Cedar Valley School · Term 2, week 5',
    ar: 'مدرسة وادي الأرز · الفصل الثاني، الأسبوع الخامس',
  },
  parK1ToG3: { en: 'K1 to G3', ar: 'الروضة إلى الثالث' },
  parStarsThisTerm: { en: 'average this term', ar: 'المستوى العام هذا الفصل' },
  parAverageThisTerm: { en: 'average this term', ar: 'المعدل هذا الفصل' },
  parBasedOnOne: {
    en: 'Based on {n} marked piece of work released so far.',
    ar: 'بناءً على {n} عمل مُصحَّح ظهرت نتيجته حتى الآن.',
  },
  parBasedOnMany: {
    en: 'Based on {n} marked pieces of work released so far.',
    ar: 'بناءً على {n} أعمال مُصحَّحة ظهرت نتائجها حتى الآن.',
  },
  parDueSoon: { en: 'Due soon', ar: 'المطلوب قريباً' },
  parSeeChild: { en: 'See {n}', ar: 'اطّلع على {n}' },
  parMyChildrenNote: {
    en: "You see the same marks your child sees. Work your child's teacher has not released yet does not appear here either.",
    ar: 'ترى الدرجات نفسها التي يراها طفلك. والعمل الذي لم يُظهره المعلم بعد لا يظهر هنا أيضاً.',
  },

  // Child overview
  parClassTermWeek: { en: '{c} · Term 2, week 5', ar: '{c} · الفصل الثاني، الأسبوع الخامس' },
  parMessageTeacher: { en: 'Message the teacher', ar: 'راسل المعلم' },
  parSeesStarsNotScore: {
    en: 'In class they see stars like these, never a score.',
    ar: 'في الصف يرى نجوماً مثل هذه، لا درجة.',
  },
  parWorkFinished: { en: 'Work finished', ar: 'الأعمال المنجزة' },
  parAvgThisTerm: { en: 'Average this term', ar: 'المعدل هذا الفصل' },
  parMarksReleased: { en: 'Marks released', ar: 'الدرجات الظاهرة' },
  parDaysPresent: { en: 'Days present', ar: 'أيام الحضور' },
  parNofM: { en: '{n} of {m}', ar: '{n} من {m}' },
  parHowChildIsGettingOn: { en: 'How {n} is getting on', ar: 'كيف يسير {n}' },
  parGoingWell: { en: 'Going well', ar: 'يسير على ما يرام' },
  parGoingWellEarly: {
    en: 'Counting in tens and reading aloud. They finished everything set this week.',
    ar: 'العدّ بالعشرات والقراءة بصوت عالٍ. وقد أنجز كل ما طُلب منه هذا الأسبوع.',
  },
  parGoingWellUpper: {
    en: 'Place value and common denominators. Work is handed in on time.',
    ar: 'القيمة المنزلية والمقامات المشتركة. ويُسلَّم العمل في موعده.',
  },
  parWorthHelpAtHome: {
    en: 'Worth a bit of help at home',
    ar: 'يستحق بعض المساعدة في البيت',
  },
  parHelpEarly: {
    en: 'Counting past 100. Practising out loud on the way to school is plenty.',
    ar: 'العدّ إلى ما بعد 100. ويكفي التدرب بصوت عالٍ في الطريق إلى المدرسة.',
  },
  parHelpUpper: {
    en: 'Adding fractions with different denominators. Ten minutes of practice would help.',
    ar: 'جمع الكسور ذات المقامات المختلفة. وعشر دقائق من التدريب تساعد.',
  },
  parComingUp: { en: 'Coming up', ar: 'القادم' },
  parNothingOutstanding: { en: 'Nothing outstanding.', ar: 'لا شيء متبقٍ.' },
  parRecentMarks: { en: 'Recent marks', ar: 'آخر الدرجات' },
  parProgress: { en: 'Progress', ar: 'التقدم' },

  // Progress
  parProgressSubtitleEarly: {
    en: 'Term 2, what they can do now',
    ar: 'الفصل الثاني، ما يستطيع فعله الآن',
  },
  parProgressSubtitleUpper: {
    en: 'Term 2, marks over time',
    ar: 'الفصل الثاني، الدرجات عبر الزمن',
  },
  parWhatChildCanDoNow: { en: 'What {n} can do now', ar: 'ما يستطيع {n} فعله الآن' },
  parCanDo1: {
    en: 'Counts in tens to 100 without help',
    ar: 'يعدّ بالعشرات حتى 100 من دون مساعدة',
  },
  parCanDo2: {
    en: 'Reads a short story aloud and tells you what happened',
    ar: 'يقرأ قصة قصيرة بصوت عالٍ ويروي لك ما حدث',
  },
  parCanDo3: {
    en: 'Names circles, squares and triangles',
    ar: 'يسمّي الدوائر والمربعات والمثلثات',
  },
  parCanDo4: {
    en: 'Writes numbers to 50 the right way round',
    ar: 'يكتب الأعداد حتى 50 باتجاهها الصحيح',
  },
  parNoChartNote: {
    en: 'At this age the school reports what a child can do rather than a score. There is no chart here on purpose.',
    ar: 'في هذه السن تُخبر المدرسة بما يستطيع الطفل فعله بدل أن تعطي درجة. ولا يوجد رسم بياني هنا عن قصد.',
  },
  parMarksOverTime: { en: 'Marks over time', ar: 'الدرجات عبر الزمن' },
  parTrendImproving: { en: 'Improving', ar: 'في تحسن' },
  parTrendSlipping: { en: 'Slipping a little', ar: 'تراجع قليلاً' },
  parTrendSteady: { en: 'Steady', ar: 'مستقر' },
  parTaskN: { en: 'Task {n}', ar: 'مهمة {n}' },
  parOwnWorkNote: {
    en: "This is {n}'s own work over time. It is not compared with anyone else in the class.",
    ar: 'هذا عمل {n} وحده عبر الزمن، ولا يُقارن بأحد آخر في الصف.',
  },
  parByTopic: { en: 'By topic', ar: 'حسب الموضوع' },
  parTopic: { en: 'Topic', ar: 'الموضوع' },
  parTopicSecure: { en: 'Secure', ar: 'متمكّن' },
  parTopicGettingThere: { en: 'Getting there', ar: 'في طريقه' },
  parTopicNeedsWork: { en: 'Needs work', ar: 'يحتاج تدريباً' },

  // Work
  parWorkSubtitle: {
    en: '{n} still to do · {m} marked',
    ar: '{n} ما زال للإنجاز · {m} مُصحَّح',
  },
  parStillToDo: { en: 'Still to do', ar: 'ما زال للإنجاز' },
  parDueOn: { en: 'due {d}', ar: 'موعد التسليم {d}' },
  parNothingOutstandingNow: {
    en: 'Nothing outstanding right now.',
    ar: 'لا شيء متبقٍ في الوقت الحالي.',
  },
  parMarkedAndReturned: { en: 'Marked and returned', ar: 'مُصحَّح ومُعاد' },
  parColReturned: { en: 'Returned', ar: 'تاريخ الإعادة' },
  parStars: { en: 'Stars', ar: 'النجوم' },
  parMark: { en: 'Mark', ar: 'الدرجة' },
  parWorkNote: {
    en: 'Work that is with the teacher does not appear until it is marked and released, so you and your child see the same thing at the same time.',
    ar: 'العمل الذي ما زال عند المعلم لا يظهر حتى يُصحَّح وتُعلن نتيجته، فترى أنت وطفلك الشيء نفسه في الوقت نفسه.',
  },

  // Attendance
  parAttendanceSubtitle: {
    en: 'Term 2 · recorded by the class teacher each morning',
    ar: 'الفصل الثاني · يسجّله معلم الصف كل صباح',
  },
  parTellSchoolAbsence: {
    en: 'Tell the school about an absence',
    ar: 'أبلغ المدرسة عن غياب',
  },
  parPresent: { en: 'Present', ar: 'حاضر' },
  parLate: { en: 'Late', ar: 'متأخر' },
  parAbsent: { en: 'Absent', ar: 'غائب' },
  parExcused: { en: 'Excused', ar: 'بعذر' },
  parOfNDays: { en: 'of {n} days', ar: 'من {n} يوماً' },
  parDayByDay: { en: 'Day by day', ar: 'يوماً بيوم' },
  parNDays: { en: '{n} days', ar: '{n} يوماً' },
  parAttendanceNote: {
    en: 'If something here looks wrong, tell the school office rather than the class teacher. The register is corrected at the office.',
    ar: 'إذا بدا شيء هنا غير صحيح، أبلغ مكتب المدرسة بدل معلم الصف. فالسجل يُصحَّح في المكتب.',
  },

  // Messages
  parMessagesSubtitle: {
    en: "From your children's teachers and the school office",
    ar: 'من معلمي أبنائك ومن مكتب المدرسة',
  },
  parSchoolOffice: { en: 'School office', ar: 'مكتب المدرسة' },
  parRoleClassTeacher: { en: 'Class teacher', ar: 'معلم الصف' },
  parRoleAdministration: { en: 'Administration', ar: 'الإدارة' },
  parAboutChild: { en: 'about {n}', ar: 'بشأن {n}' },
  parRoleAboutChild: { en: '{t} · about {n}', ar: '{t} · بشأن {n}' },
  parKeptOnRecord: { en: 'Kept on record', ar: 'محفوظة في السجل' },
  parMsg1Body: {
    en: 'Good afternoon. Just to let you know we are starting fractions this week. {n} found the first lesson tricky, which is completely normal at this point. Ten minutes of practice at home would make a real difference.',
    ar: 'مساء الخير. أحببت إعلامكم بأننا نبدأ الكسور هذا الأسبوع. وجد {n} الدرس الأول صعباً بعض الشيء، وهذا طبيعي تماماً في هذه المرحلة. وعشر دقائق من التدريب في البيت تحدث فرقاً حقيقياً.',
  },
  parMsg2Body: {
    en: 'Thank you for letting us know. We will go over it this weekend.',
    ar: 'شكراً لإعلامنا. سنراجعها في عطلة نهاية الأسبوع.',
  },
  parMsg3Body: {
    en: 'That is great, thank you. There are three short practice questions set in the app if it helps.',
    ar: 'هذا رائع، شكراً لكم. وهناك ثلاثة أسئلة تدريبية قصيرة في التطبيق إن كانت تساعد.',
  },
  parMsgAt1: { en: 'Yesterday, 15:40', ar: 'أمس، ١٥:٤٠' },
  parMsgAt2: { en: 'Yesterday, 19:02', ar: 'أمس، ١٩:٠٢' },
  parMsgAt3: { en: 'Today, 09:12', ar: 'اليوم، ٠٩:١٢' },
  parReplyTo: { en: 'Reply to {n}', ar: 'ردّ على {n}' },
  parSend: { en: 'Send', ar: 'إرسال' },
  parSentNote: {
    en: 'Sent. Teachers reply in school hours.',
    ar: 'أُرسلت. يردّ المعلمون في أوقات الدوام.',
  },
  parReplyHours: {
    en: 'Teachers reply during school hours, Monday to Friday.',
    ar: 'يردّ المعلمون خلال أوقات الدوام، من الاثنين إلى الجمعة.',
  },

  // Announcements
  parAnnouncementsSubtitle: {
    en: 'From Cedar Valley School',
    ar: 'من مدرسة وادي الأرز',
  },
  parWholeSchool: { en: 'Whole school', ar: 'المدرسة بأكملها' },
  parConcerns: { en: 'Concerns: {n}', ar: 'يخص: {n}' },

  // Notification settings
  parSignedInAs: { en: 'Signed in as {n}', ar: 'مسجّل الدخول باسم {n}' },
  parHowToReachYou: { en: 'How to reach you', ar: 'كيف نصل إليك' },
  parChannelEmail: { en: 'Email only', ar: 'البريد الإلكتروني فقط' },
  parChannelApp: { en: 'In the app only', ar: 'داخل التطبيق فقط' },
  parChannelBoth: { en: 'Both', ar: 'كلاهما' },
  parNotifAbsence: { en: 'My child is marked absent', ar: 'تسجيل غياب طفلي' },
  parNotifAbsenceHint: {
    en: 'Sent the same morning. This cannot be turned off.',
    ar: 'يُرسل في الصباح نفسه. ولا يمكن إيقافه.',
  },
  parNotifMarks: { en: 'Work is marked and returned', ar: 'تصحيح العمل وإعادته' },
  parNotifMarksHint: {
    en: 'Sent when the teacher releases it.',
    ar: 'يُرسل عندما يُظهر المعلم النتيجة.',
  },
  parNotifDue: { en: 'Something is due tomorrow', ar: 'موعد تسليم غداً' },
  parNotifDueHint: {
    en: 'One reminder the evening before.',
    ar: 'تذكير واحد في مساء اليوم السابق.',
  },
  parNotifMessages: { en: 'A teacher messages me', ar: 'وصول رسالة من معلم' },
  parNotifMessagesHint: { en: 'Sent straight away.', ar: 'يُرسل فوراً.' },
  parNotifAnnouncements: { en: 'School announcements', ar: 'إعلانات المدرسة' },
  parNotifAnnouncementsHint: { en: 'Sent when posted.', ar: 'يُرسل عند النشر.' },
  parNotifWeekly: { en: 'Weekly summary', ar: 'ملخص أسبوعي' },
  parNotifWeeklyHint: {
    en: 'One email on Friday afternoon.',
    ar: 'رسالة واحدة بعد ظهر الجمعة.',
  },
  parAlwaysOn: { en: 'Always on', ar: 'مفعّل دائماً' },
  parSettingsNote: {
    en: 'Settings apply per child, not to your whole account.',
    ar: 'تُطبَّق الإعدادات لكل طفل على حدة، لا على حسابك كله.',
  },

  /*
   * The early tier summary, one phrase per star count.
   *
   * This lived in the data layer as an English sentence and rendered English
   * inside an Arabic paragraph. It is three keys now, chosen by
   * earlySummaryKey, so the data layer decides which sentence and the
   * component decides which language.
   *
   * None of the three passes a verdict. The one star version names what the
   * teacher is doing about it rather than telling a family their child is
   * behind.
   */
  parEarlySummaryThree: {
    en: '{n} is finishing their work and getting most of it right.',
    ar: 'ينهي {n} أعماله ويصيب في معظمها.',
  },
  parEarlySummaryTwo: {
    en: '{n} is finishing their work. A few topics are still settling.',
    ar: 'ينهي {n} أعماله، وبعض المواضيع ما زالت تترسخ.',
  },
  parEarlySummaryOne: {
    en: '{n} is finishing their work and finding some of it hard. Their teacher is working on it with them.',
    ar: 'ينهي {n} أعماله ويجد بعضها صعباً، ومعلمه يعمل معه على ذلك.',
  },
  parJustNow: { en: 'Just now', ar: 'الآن' },
} satisfies Record<string, Phrase>
