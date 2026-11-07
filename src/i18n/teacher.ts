import type { Phrase } from './types'

/**
 * Copy for the teacher screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}`, `{c}`, `{d}`, `{g}`, `{p}`, `{a}` and `{t}`,
 * filled by the component with `.replace()`. A whole sentence per key rather
 * than glued fragments, because Arabic puts the number, the noun and the verb
 * in a different order and fragments cannot be reordered.
 *
 * The early tier wording is deliberate. For a K1 to Grade 3 class the teacher
 * reads "Needs time with you" rather than "At risk", and the Arabic has to stay
 * as gentle: يحتاج وقتاً معك, never anything that reads as failure, because
 * these are the words a teacher repeats to a seven year old's parent.
 */
export const teacher = {
  // Today
  tchTodayTitle: { en: 'Wednesday, 10 February', ar: 'الأربعاء ١٠ شباط' },
  tchTodaySubtitle: {
    en: 'Term 2, week 5 · Four classes today',
    ar: 'الفصل الثاني، الأسبوع الخامس · أربعة صفوف اليوم',
  },
  tchStartMarking: { en: 'Start marking', ar: 'ابدأ التصحيح' },
  tchWaitingToMark: { en: 'Waiting to be marked', ar: 'بانتظار التصحيح' },
  tchAcrossFourClasses: { en: 'Across four classes', ar: 'في أربعة صفوف' },
  tchDueThisWeek: { en: 'Due this week', ar: 'المستحق هذا الأسبوع' },
  tchAssignments: { en: 'Assignments', ar: 'الواجبات' },
  tchBelowThreshold: { en: 'Students below the threshold', ar: 'طلاب دون الحد الأدنى' },
  tchInYourClasses: { en: 'In your classes', ar: 'في صفوفك' },
  tchPeriodMathUnit1: { en: 'Mathematics, Unit 1', ar: 'الرياضيات، الوحدة الأولى' },
  tchPeriodMathUnit2: { en: 'Mathematics, Unit 2', ar: 'الرياضيات، الوحدة الثانية' },
  tchPeriodMathUnit3: { en: 'Mathematics, Unit 3', ar: 'الرياضيات، الوحدة الثالثة' },
  tchRoom: { en: 'Room {n}', ar: 'الغرفة {n}' },
  tchK1ToG3: { en: 'K1 to G3', ar: 'الروضة إلى الثالث' },
  tchNStudents: { en: '{n} students', ar: '{n} طالباً' },
  tchDaysShort: { en: '{n}d', ar: '{n} ي' },
  tchQueueClear: { en: 'Nothing waiting. The queue is clear.', ar: 'لا شيء بالانتظار. القائمة فارغة.' },
  tchYourClasses: { en: 'Your classes', ar: 'صفوفك' },
  tchScoresNote: {
    en: 'Scores are shown to you for every age group. Children in K1 to Grade 3 never see a percentage or the words at risk.',
    ar: 'تظهر لك الدرجات في كل المراحل العمرية. أما الأطفال من الروضة إلى الصف الثالث فلا يرون نسبة مئوية ولا كلمة متعثر.',
  },
  tchTodayAiHint: {
    en: 'Six students missed the same question on common denominators. Build a ten minute reteach from the course content.',
    ar: 'ستة طلاب أخطأوا في السؤال نفسه عن المقامات المشتركة. جهّز مراجعة من عشر دقائق من محتوى المقرر.',
  },
  tchOpenAiTools: { en: 'Open AI tools', ar: 'افتح أدوات الذكاء الاصطناعي' },

  // My classes
  tchClassesTerm: { en: '{n} classes · Term 2', ar: '{n} صفوف · الفصل الثاني' },
  tchGroupByClass: { en: 'Group by class', ar: 'تجميع حسب الصف' },
  tchAllCourses: { en: 'All courses', ar: 'كل المقررات' },
  tchPercentAverage: { en: '{n}% average', ar: 'معدل {n}%' },
  tchUnitsActivities: { en: '{n} units · {m} activities', ar: '{n} وحدات · {m} نشاطاً' },
  tchNoCoursesForClass: {
    en: 'No courses assigned to this class yet.',
    ar: 'لم يُسند أي مقرر إلى هذا الصف بعد.',
  },
  tchMyClassesNote: {
    en: 'Grouping by class is the default because a teacher thinks in classes, not courses. The flat view is kept for the teacher who carries one subject across many classes.',
    ar: 'التجميع حسب الصف هو الوضع الافتراضي لأن المعلم يفكر بالصفوف لا بالمقررات. ويبقى العرض المسطح للمعلم الذي يحمل مادة واحدة عبر صفوف عدة.',
  },

  // Class home
  tchClassNotFound: { en: 'Class not found', ar: 'الصف غير موجود' },
  tchClassArchived: { en: 'It may have been archived.', ar: 'ربما تمت أرشفته.' },
  tchClassSubtitle: {
    en: 'Grade {g} · {n} students · Term 2',
    ar: 'الصف {g} · {n} طالباً · الفصل الثاني',
  },
  tchEarlyClassBanner: {
    en: 'This is a K1 to Grade 3 class. You see the real scores so you can act on them. The children see stars and completion only, never a percentage and never the words at risk.',
    ar: 'هذا صف من الروضة إلى الصف الثالث. تظهر لك الدرجات الحقيقية لتتمكن من التصرف بناءً عليها. أما الأطفال فيرون النجوم ونسبة الإنجاز فقط، من دون نسبة مئوية ومن دون كلمة متعثر.',
  },
  tchClassAverageHint: { en: 'Class average this term', ar: 'معدل الصف هذا الفصل' },
  tchThisTerm: { en: 'This term', ar: 'هذا الفصل' },
  tchContent: { en: 'Content', ar: 'المحتوى' },
  tchSubmitted: { en: 'Submitted', ar: 'المُسلَّم' },
  tchWaiting: { en: 'Waiting', ar: 'بالانتظار' },
  tchRelease: { en: 'Release', ar: 'إظهار النتيجة' },
  tchImmediate: { en: 'Immediate', ar: 'فوري' },
  tchManual: { en: 'Manual', ar: 'يدوي' },

  // Early tier wording, kept gentle in both languages
  tchGoingWell: { en: 'Going well', ar: 'يسير على ما يرام' },
  tchKeepGoing: { en: 'Keep going', ar: 'واصل التقدم' },
  tchNeedsTimeWithYou: { en: 'Needs time with you', ar: 'يحتاج وقتاً معك' },
  tchNeedsTime: { en: 'Needs time', ar: 'يحتاج وقتاً' },

  // Gradebook
  tchGradebookSubtitle: {
    en: '{c} · Term 2 · {n} graded activities',
    ar: '{c} · الفصل الثاني · {n} نشاطاً مُقيَّماً',
  },
  tchChanges: { en: 'Changes', ar: 'التعديلات' },
  tchAll: { en: 'All', ar: 'الكل' },
  tchRowsOfStudents: { en: '{n} of {m} students', ar: '{n} من {m} طالباً' },
  tchOutOf: { en: 'out of {n}', ar: 'من {n}' },
  tchPercentAvgShort: { en: '{n}% avg', ar: 'معدل {n}%' },
  tchMark: { en: 'Mark', ar: 'صحّح' },
  tchMarkedNotReleased: {
    en: 'Marked but not released to the student',
    ar: 'مُصحَّح لكن لم يُظهر للطالب بعد',
  },
  tchNotStarted: { en: 'Not started', ar: 'لم يبدأ' },
  tchHeld: { en: 'Held', ar: 'محجوز' },
  tchLateKey: { en: 'L = submitted late', ar: 'L = سُلِّم متأخراً' },

  // Gradebook settings
  tchGradebookSettings: { en: 'Gradebook settings', ar: 'إعدادات سجل الدرجات' },
  tchGradebookSettingsSubtitle: {
    en: 'Weighting, dropped scores and how late work counts',
    ar: 'الأوزان، والدرجات المستبعدة، وكيفية احتساب العمل المتأخر',
  },
  tchCatQuizzes: { en: 'Quizzes', ar: 'الاختبارات القصيرة' },
  tchCatAssignments: { en: 'Assignments', ar: 'الواجبات' },
  tchCatUnitTests: { en: 'End of unit tests', ar: 'اختبارات نهاية الوحدة' },
  tchWeighting: { en: 'Weighting', ar: 'الأوزان' },
  tchWeight: { en: 'Weight', ar: 'الوزن' },
  tchDropLowest: { en: 'Drop the lowest', ar: 'استبعاد الأدنى' },
  tchWeightsWarning: {
    en: "Weights add up to {n}%. They have to total 100% before this can be saved, otherwise a student's average is not comparable with anyone else's.",
    ar: 'مجموع الأوزان {n}%. يجب أن يبلغ المجموع 100% قبل الحفظ، وإلا لم يعد معدل الطالب قابلاً للمقارنة بمعدل غيره.',
  },
  tchLateWork: { en: 'Late work', ar: 'العمل المتأخر' },
  tchLateNone: {
    en: 'Accept late work at full marks',
    ar: 'قبول العمل المتأخر بالدرجة الكاملة',
  },
  tchLatePercent: {
    en: 'Deduct 10% per day, to a floor of 50%',
    ar: 'خصم 10% عن كل يوم، بحد أدنى 50%',
  },
  tchLateZero: {
    en: 'Score zero once the assignment closes',
    ar: 'الدرجة صفر بعد إغلاق الواجب',
  },
  tchCalculation: { en: 'Calculation', ar: 'طريقة الاحتساب' },
  tchCountUngraded: {
    en: 'Count work that has not been submitted as zero',
    ar: 'احتساب العمل غير المُسلَّم صفراً',
  },
  tchCountUngradedHint: {
    en: 'Off means an average reflects only what a student has actually handed in, which looks kinder mid term but hides a child who has stopped working.',
    ar: 'عند الإيقاف يعكس المعدل ما سلّمه الطالب فعلاً فقط، وهو أرحم في منتصف الفصل لكنه يخفي طفلاً توقف عن العمل.',
  },
  tchGradingScale: { en: 'Grading scale', ar: 'سلّم التقدير' },
  tchGradingScaleHint: {
    en: 'Percentage. Set by the school so that reports across classes mean the same thing. A school admin can change it.',
    ar: 'نسبة مئوية. تحدده المدرسة ليكون للتقارير المعنى نفسه في كل الصفوف. ويمكن لإدارة المدرسة تغييره.',
  },
  tchSchoolSetting: { en: 'School setting', ar: 'إعداد المدرسة' },
  tchSaveRecalculate: { en: 'Save and recalculate', ar: 'احفظ وأعد الاحتساب' },
  tchSavedRecalculated: {
    en: 'Saved. Every average in this class has been recalculated.',
    ar: 'تم الحفظ. أُعيد احتساب كل المعدلات في هذا الصف.',
  },
  tchNothingUntilSave: {
    en: 'Nothing changes until you save. Averages recalculate for this class only.',
    ar: 'لا يتغير شيء قبل الحفظ. ويُعاد احتساب المعدلات لهذا الصف وحده.',
  },

  // Grade change audit
  tchGradeChanges: { en: 'Grade changes', ar: 'تعديلات الدرجات' },
  tchGradeChangesSubtitle: {
    en: 'Every manual override in your classes this term',
    ar: 'كل تعديل يدوي في صفوفك هذا الفصل',
  },
  tchChange: { en: 'Change', ar: 'التغيير' },
  tchReason: { en: 'Reason', ar: 'السبب' },
  tchBy: { en: 'By', ar: 'بواسطة' },
  tchByYou: { en: 'You', ar: 'أنت' },
  tchNotMarked: { en: 'not marked', ar: 'بلا درجة' },
  tchAuditReason1: {
    en: 'Marked down in error, the second working was correct',
    ar: 'خُفّضت الدرجة خطأً، والحل الثاني كان صحيحاً',
  },
  tchAuditReason2: {
    en: 'Sat the paper late after an authorised absence',
    ar: 'أدّى الورقة متأخراً بعد غياب بعذر',
  },
  tchAuditReason3: {
    en: 'Late penalty applied after the deadline was confirmed',
    ar: 'طُبّق خصم التأخير بعد تأكيد الموعد النهائي',
  },
  tchAuditReason4: {
    en: 'Remarked after the student queried question 4',
    ar: 'أُعيد التصحيح بعد استفسار الطالب عن السؤال الرابع',
  },
  tchAuditAt1: { en: '10 Feb, 09:12', ar: '١٠ شباط، ٠٩:١٢' },
  tchAuditAt2: { en: '9 Feb, 14:40', ar: '٩ شباط، ١٤:٤٠' },
  tchAuditAt3: { en: '9 Feb, 11:05', ar: '٩ شباط، ١١:٠٥' },
  tchAuditAt4: { en: '6 Feb, 16:22', ar: '٦ شباط، ١٦:٢٢' },
  tchGradeAuditNote: {
    en: 'A reason is required before a mark can be overridden, so this list has no blanks. The school admin sees the same records for every teacher.',
    ar: 'لا يمكن تعديل درجة من دون ذكر سبب، لذلك لا توجد خانة فارغة في هذه القائمة. وتطّلع إدارة المدرسة على السجلات نفسها لكل معلم.',
  },

  // Activity names used across the planner, calendar and audit
  tchActCheck13: { en: 'Check 1.3', ar: 'تحقق 1.3' },
  tchActCheck23: { en: 'Check 2.3', ar: 'تحقق 2.3' },
  tchActApply15: { en: 'Apply 1.5', ar: 'تطبيق 1.5' },
  tchActApply25: { en: 'Apply 2.5', ar: 'تطبيق 2.5' },

  // Needs grading
  tchNeedsGradingSubtitle: {
    en: '{n} pieces of work waiting across {m} activities',
    ar: '{n} قطعة عمل بانتظار التصحيح في {m} نشاطاً',
  },
  tchStartHere: { en: 'Start here: {t}', ar: 'ابدأ من هنا: {t}' },
  tchOldestLine: {
    en: '{c} · {n} waiting · oldest has been {d} days',
    ar: '{c} · {n} بالانتظار · أقدمها منذ {d} أيام',
  },
  tchMarkNow: { en: 'Mark now', ar: 'صحّح الآن' },
  tchQueue: { en: 'Queue', ar: 'قائمة الانتظار' },
  tchDueOn: { en: 'due {d}', ar: 'موعد التسليم {d}' },
  tchAutoMarked: { en: 'Auto marked, needs review', ar: 'صُحِّح آلياً، يحتاج مراجعة' },
  tchMarkedByHand: { en: 'Marked by hand', ar: 'يُصحَّح يدوياً' },
  tchWaitingDays: { en: 'waiting {d} days', ar: 'بالانتظار منذ {d} أيام' },
  tchQueueClearClass: {
    en: 'Nothing waiting in this class. The queue is clear.',
    ar: 'لا شيء بالانتظار في هذا الصف. القائمة فارغة.',
  },
  tchNeedsGradingNote: {
    en: 'Quizzes are marked by the platform and appear here only so you can check the borderline answers. Written work is here because it needs you.',
    ar: 'تصحّح المنصة الاختبارات القصيرة، وتظهر هنا لمراجعة الإجابات الحدّية فقط. أما العمل الكتابي فيظهر هنا لأنه يحتاج إليك.',
  },

  // Grade a submission
  tchRubricMethod: { en: 'Method is correct', ar: 'الطريقة صحيحة' },
  tchRubricWorking: { en: 'Working is shown', ar: 'خطوات الحل موضّحة' },
  tchRubricAnswerUnits: { en: 'Answer and units', ar: 'الإجابة والوحدات' },
  tchQuickComment1: {
    en: 'Good working, check your units next time.',
    ar: 'خطوات جيدة، انتبه للوحدات في المرة القادمة.',
  },
  tchQuickComment2: {
    en: 'Right method, arithmetic slipped at the last step.',
    ar: 'الطريقة صحيحة، لكن الحساب زلّ في الخطوة الأخيرة.',
  },
  tchQuickComment3: {
    en: 'Show your working so I can give method marks.',
    ar: 'اكتب خطوات الحل كي أمنحك درجات الطريقة.',
  },
  tchQuickComment4: {
    en: 'Strong improvement on last week.',
    ar: 'تحسن واضح عن الأسبوع الماضي.',
  },
  tchNothingToMark: { en: 'Nothing to mark here', ar: 'لا يوجد ما يُصحَّح هنا' },
  tchAllMarked: {
    en: 'Every submission for this activity has been marked.',
    ar: 'صُحِّحت كل التسليمات لهذا النشاط.',
  },
  tchSetMarked: { en: 'Set marked', ar: 'اكتمل تصحيح المجموعة' },
  tchMarkedCount: { en: '{n} of {m} marked', ar: 'صُحِّح {n} من {m}' },
  tchReleasedNow: {
    en: 'Marks and feedback are visible to students and their parents now.',
    ar: 'الدرجات والملاحظات ظاهرة الآن للطلاب ولأولياء أمورهم.',
  },
  tchMarksHeld: {
    en: 'Marks are held. Nothing is visible to students until you release them.',
    ar: 'الدرجات محجوزة. لا يرى الطلاب شيئاً حتى تُظهرها.',
  },
  tchReleaseToStudents: { en: 'Release to students', ar: 'أظهرها للطلاب' },
  tchBackToQueue: { en: 'Back to the queue', ar: 'العودة إلى القائمة' },
  tchMarking: { en: 'Marking', ar: 'التصحيح' },
  tchMarkingSubtitle: {
    en: '{c} · out of {p} · {n} left',
    ar: '{c} · من {p} · بقي {n}',
  },
  tchLate: { en: 'Late', ar: 'متأخر' },
  tchSubmittedAttempt: {
    en: 'Submitted {d} · attempt {n}',
    ar: 'سُلِّم {d} · المحاولة {n}',
  },
  tchTheQuestion: { en: 'The question', ar: 'السؤال' },
  tchSampleQuestion: {
    en: 'A recipe needs 3/4 of a cup of flour. You are making the recipe one and a half times. How much flour do you need? Show your working.',
    ar: 'تحتاج وصفة إلى 3/4 كوب من الطحين، وأنت تحضّرها مرة ونصف. كم كوباً من الطحين تحتاج؟ اكتب خطوات الحل.',
  },
  tchTheAnswer: { en: 'The answer', ar: 'الإجابة' },
  tchSuggestedMark: {
    en: 'Suggested 18 out of 20. Method and working are right, the units are missing from the first two lines. You decide the mark.',
    ar: 'الدرجة المقترحة 18 من 20. الطريقة وخطوات الحل صحيحة، لكن الوحدات ناقصة في أول سطرين. والقرار النهائي لك.',
  },
  tchMarkTitle: { en: 'Mark', ar: 'الدرجة' },
  tchAcceptSuggestion: { en: 'Accept the suggestion', ar: 'اعتمد الاقتراح' },
  tchFeedback: { en: 'Feedback', ar: 'الملاحظات' },
  tchFeedbackPlaceholder: {
    en: 'What should this student do differently next time?',
    ar: 'ما الذي ينبغي أن يفعله هذا الطالب على نحو مختلف في المرة القادمة؟',
  },
  tchReleaseAsIMark: { en: 'Release as I mark', ar: 'أظهر النتيجة أثناء التصحيح' },
  tchReleaseAsIMarkHint: {
    en: 'Off means nothing is visible until the whole set is done.',
    ar: 'عند الإيقاف لا يظهر شيء حتى ينتهي تصحيح المجموعة كاملة.',
  },
  tchPrevious: { en: 'Previous', ar: 'السابق' },
  tchSaveAndNext: { en: 'Save and next', ar: 'احفظ وانتقل' },
  tchStillToMark: { en: 'Still to mark', ar: 'ما زال للتصحيح' },

  // Students
  tchStudentsSubtitle: {
    en: '{n} students across {m} classes',
    ar: '{n} طالباً في {m} صفوف',
  },
  tchMessageParents: { en: 'Message the parents', ar: 'راسل أولياء الأمور' },
  tchAssignExtraPractice: { en: 'Assign extra practice', ar: 'أسند تدريباً إضافياً' },
  tchFlagToCoordinator: { en: 'Flag to the coordinator', ar: 'أبلغ المنسق' },
  tchDraftedForFamilies: {
    en: 'One message drafted for {n} families.',
    ar: 'صيغت رسالة واحدة لـ {n} أسرة.',
  },
  tchPracticeQueued: {
    en: 'Extra practice queued for {n} students.',
    ar: 'أُدرج تدريب إضافي لـ {n} طالباً.',
  },
  tchFlaggedToCoordinator: {
    en: '{n} students flagged to the coordinator.',
    ar: 'أُبلغ المنسق عن {n} طالباً.',
  },
  tchStudentsNote: {
    en: 'Sorted by lowest average first, because the list exists to find the children who need you. Selecting the at risk filter and then the header checkbox is the two click path to messaging every struggling family at once.',
    ar: 'الترتيب من أدنى معدل أولاً، لأن الغاية من القائمة هي العثور على الأطفال الذين يحتاجون إليك. واختيار مرشّح المتعثرين ثم مربع الاختيار في رأس الجدول هو الطريق بنقرتين إلى مراسلة كل الأسر المتعثرة دفعة واحدة.',
  },

  // Student detail
  tchStudentNotFound: { en: 'Student not found', ar: 'الطالب غير موجود' },
  tchMayHaveMovedClass: { en: 'They may have moved class.', ar: 'ربما انتقل إلى صف آخر.' },
  tchMessageParent: { en: 'Message the parent', ar: 'راسل ولي الأمر' },
  tchStudentSubtitle: { en: '{c} · Grade {g}', ar: '{c} · الصف {g}' },
  tchParentLine: { en: 'Parent: {n} · {m}', ar: 'ولي الأمر: {n} · {m}' },
  tchEarlyView: { en: 'K1 to G3 view', ar: 'عرض الروضة إلى الثالث' },
  tchAbsences: { en: 'Absences', ar: 'الغيابات' },
  tchLateArrivals: { en: 'Late arrivals', ar: 'مرات التأخير' },
  tchScoresOverTime: { en: 'Scores over time', ar: 'الدرجات عبر الزمن' },
  tchNeedsHelpBelow: { en: 'Needs help below here', ar: 'ما دون هذا الخط يحتاج دعماً' },
  tchTaskN: { en: 'Task {n}', ar: 'مهمة {n}' },
  tchWorkThisTerm: { en: 'Work this term', ar: 'أعمال هذا الفصل' },
  tchReleased: { en: 'Released', ar: 'ظاهرة' },
  tchWeakestSkills: { en: 'Weakest skills', ar: 'أضعف المهارات' },
  tchDrillDown: { en: 'Drill down', ar: 'تفصيل أكثر' },
  tchStudentAiHint: {
    en: 'The drop started after Unit 2, which is where common denominators are introduced. Assign the Unit 2 practice set before moving on.',
    ar: 'بدأ التراجع بعد الوحدة الثانية، وهي الوحدة التي تُعرَّف فيها المقامات المشتركة. أسند مجموعة تدريبات الوحدة الثانية قبل المتابعة.',
  },
  tchAssignPractice: { en: 'Assign practice', ar: 'أسند التدريب' },

  // Planner
  tchMonday: { en: 'Monday', ar: 'الاثنين' },
  tchTuesday: { en: 'Tuesday', ar: 'الثلاثاء' },
  tchWednesday: { en: 'Wednesday', ar: 'الأربعاء' },
  tchThursday: { en: 'Thursday', ar: 'الخميس' },
  tchFriday: { en: 'Friday', ar: 'الجمعة' },
  tchFeb8: { en: '8 Feb', ar: '٨ شباط' },
  tchFeb9: { en: '9 Feb', ar: '٩ شباط' },
  tchFeb10: { en: '10 Feb', ar: '١٠ شباط' },
  tchFeb11: { en: '11 Feb', ar: '١١ شباط' },
  tchFeb12: { en: '12 Feb', ar: '١٢ شباط' },
  tchPlannerSubtitle: {
    en: 'Week 5 · 8 to 12 February · Term 2',
    ar: 'الأسبوع الخامس · ٨ إلى ١٢ شباط · الفصل الثاني',
  },
  tchPreviousWeek: { en: 'Previous week', ar: 'الأسبوع السابق' },
  tchNextWeek: { en: 'Next week', ar: 'الأسبوع التالي' },
  tchAddToWeek: { en: 'Add to the week', ar: 'أضف إلى الأسبوع' },
  tchUnitPlan: { en: 'Unit plan', ar: 'خطة الوحدة' },
  tchUnitPlanBand: {
    en: 'Grade 6, Unit 2: Fractions. Set by the coordinator, runs 25 January to 19 February.',
    ar: 'الصف السادس، الوحدة الثانية: الكسور. وضعها المنسق، وتمتد من ٢٥ كانون الثاني إلى ١٩ شباط.',
  },
  tchWeek3Of4: { en: 'Week 3 of 4', ar: 'الأسبوع الثالث من أربعة' },
  tchPlanEquivalentFractions: { en: 'Equivalent fractions', ar: 'الكسور المتكافئة' },
  tchPlanCountingInTens: { en: 'Counting in tens', ar: 'العدّ بالعشرات' },
  tchPlanCommonDenominators: { en: 'Common denominators', ar: 'المقامات المشتركة' },
  tchPlanAddingFractions: { en: 'Adding fractions, practice', ar: 'جمع الكسور، تدريب' },
  tchPlanNumberLine100: { en: 'Number line to 100', ar: 'خط الأعداد حتى 100' },
  tchPlanRatioIntro: { en: 'Ratio, introduction', ar: 'النسبة، مقدمة' },
  tchPlanEndOfUnitCheck: { en: 'End of unit check', ar: 'اختبار نهاية الوحدة' },
  tchAssessed: { en: 'Assessed', ar: 'مُقيَّم' },
  tchAdd: { en: 'Add', ar: 'أضف' },
  tchStandardsCovered: { en: 'Standards covered this week', ar: 'المعايير المغطاة هذا الأسبوع' },
  tchNotYetCovered: { en: '{n} not yet covered', ar: '{n} لم يُغطَّ بعد' },
  tchPlannerAiHint: {
    en: 'Grade 6 Maple is one lesson behind Cedar on the same unit. Thursday has room to catch up before the end of unit check.',
    ar: 'الصف السادس، شعبة القيقب متأخر بدرس واحد عن شعبة الأرز في الوحدة نفسها. ويوم الخميس يتسع للحاق قبل اختبار نهاية الوحدة.',
  },
  tchBuildTheLesson: { en: 'Build the lesson', ar: 'جهّز الدرس' },

  // Calendar
  tchCalendarSubtitle: { en: 'February 2027 · Term 2', ar: 'شباط ٢٠٢٧ · الفصل الثاني' },
  tchPreviousMonth: { en: 'Previous month', ar: 'الشهر السابق' },
  tchNextMonth: { en: 'Next month', ar: 'الشهر التالي' },
  tchShow: { en: 'Show', ar: 'إظهار' },
  tchClearAll: { en: 'Clear all', ar: 'ألغِ تحديد الكل' },
  tchSelectAll: { en: 'Select all', ar: 'حدد الكل' },
  tchMonShort: { en: 'Mon', ar: 'إثن' },
  tchTueShort: { en: 'Tue', ar: 'ثلا' },
  tchWedShort: { en: 'Wed', ar: 'أرب' },
  tchThuShort: { en: 'Thu', ar: 'خمي' },
  tchFriShort: { en: 'Fri', ar: 'جمع' },
  tchSatShort: { en: 'Sat', ar: 'سبت' },
  tchSunShort: { en: 'Sun', ar: 'أحد' },
  tchDuePrefix: { en: 'Due: ', ar: 'موعد التسليم: ' },
  tchEvtCheck23Due: { en: 'Check 2.3 due', ar: 'تسليم تحقق 2.3' },
  tchEvtApply15Due: { en: 'Apply 1.5 due', ar: 'تسليم تطبيق 1.5' },
  tchEvtPractise24Due: { en: 'Practise 2.4 due', ar: 'تسليم تدريب 2.4' },
  tchEvtAddingFractions: { en: 'Adding fractions practice', ar: 'تدريب على جمع الكسور' },
  tchEvtRatioPractice: { en: 'Ratio practice', ar: 'تدريب على النسبة' },
  tchEvtRatioAssessment: { en: 'Ratio assessment', ar: 'تقييم النسبة' },
  tchEvtShapeAndSpace: { en: 'Shape and space', ar: 'الأشكال والفضاء' },
  tchDimmed: { en: 'Dimmed', ar: 'باهتة' },
  tchCalendarNote: {
    en: 'Unselected classes stay on the grid rather than vanishing, so you can still see the day is full before you agree to cover someone.',
    ar: 'تبقى الصفوف غير المحددة ظاهرة على الشبكة بدل أن تختفي، كي ترى أن اليوم ممتلئ قبل أن توافق على تغطية حصة زميل.',
  },

  // Assign an activity
  tchAssignActivity: { en: 'Assign an activity', ar: 'إسناد نشاط' },
  tchBackToClass: { en: 'Back to the class', ar: 'العودة إلى الصف' },
  tchStepWhat: { en: 'What', ar: 'ماذا' },
  tchStepWho: { en: 'Who', ar: 'لمن' },
  tchStepWhenHow: { en: 'When and how', ar: 'متى وكيف' },
  tchChooseActivity: { en: 'Choose the activity', ar: 'اختر النشاط' },
  tchSearchCourse: { en: 'Search the course', ar: 'ابحث في المقرر' },
  tchNoMatchInCourses: {
    en: "Nothing matches that in this class's courses.",
    ar: 'لا يوجد ما يطابق ذلك في مقررات هذا الصف.',
  },
  tchWhoGetsIt: { en: 'Who gets it', ar: 'من يحصل عليه' },
  tchWholeClass: { en: 'The whole class', ar: 'الصف بأكمله' },
  tchAllNStudentsIn: { en: 'All {n} students in {c}', ar: 'جميع الطلاب الـ {n} في {c}' },
  tchSomeStudents: { en: 'Some students', ar: 'بعض الطلاب' },
  tchSomeStudentsHint: {
    en: 'For reteaching or extension, without the rest of the class seeing it',
    ar: 'لإعادة التعليم أو للإثراء، من دون أن يراه بقية الصف',
  },
  tchWhenAndHowMarked: { en: 'When and how it is marked', ar: 'متى وكيف يُصحَّح' },
  tchAttemptsAllowed: { en: 'Attempts allowed', ar: 'عدد المحاولات المسموحة' },
  tchCountsTowardsGrade: { en: 'This counts towards the grade', ar: 'يُحتسب ضمن الدرجة' },
  tchCountsHint: {
    en: 'Off makes it practice. It still appears in progress, but never in the gradebook.',
    ar: 'عند الإيقاف يصبح تدريباً. يظهر ضمن التقدم لكنه لا يظهر في سجل الدرجات أبداً.',
  },
  tchWhenStudentsSee: { en: 'When students see their result', ar: 'متى يرى الطلاب نتيجتهم' },
  tchReleaseImmediate: { en: 'As soon as it is marked', ar: 'فور التصحيح' },
  tchReleaseImmediateHint: {
    en: 'Good for self marking quizzes where the feedback is the point.',
    ar: 'مناسب للاختبارات ذاتية التصحيح حيث تكون التغذية الراجعة هي المقصد.',
  },
  tchReleaseManual: { en: 'When I release it', ar: 'عندما أُظهرها' },
  tchReleaseManualHint: {
    en: 'Nothing is visible until you choose, so the class sees results together.',
    ar: 'لا يظهر شيء حتى تختار، فيرى الصف النتائج معاً.',
  },
  tchShowSolutions: {
    en: 'Show the worked solution after the last attempt',
    ar: 'أظهر الحل المفصّل بعد المحاولة الأخيرة',
  },
  tchShowSolutionsHint: {
    en: 'Off keeps the questions usable for a retake or a different class.',
    ar: 'عند الإيقاف تبقى الأسئلة صالحة لإعادة المحاولة أو لصف آخر.',
  },
  tchEarlyAssignNote: {
    en: 'This is a K1 to Grade 3 class. Whatever you choose here, the children see stars and a completion message, never a percentage.',
    ar: 'هذا صف من الروضة إلى الصف الثالث. مهما اخترت هنا، يرى الأطفال نجوماً ورسالة إنجاز، لا نسبة مئوية.',
  },
  tchAssignToNStudents: { en: 'Assign to {n} students', ar: 'أسنده إلى {n} طالباً' },
  tchAssignedTitle: { en: '{t} assigned', ar: 'تم إسناد {t}' },
  tchAssignSummaryOne: {
    en: '{n} students in {c}, due {d}, {a} attempt.',
    ar: '{n} طالباً في {c}، موعد التسليم {d}، {a} محاولة.',
  },
  tchAssignSummaryMany: {
    en: '{n} students in {c}, due {d}, {a} attempts.',
    ar: '{n} طالباً في {c}، موعد التسليم {d}، {a} محاولات.',
  },
  tchResultsHeld: {
    en: 'Results are held until you release them.',
    ar: 'تُحجز النتائج حتى تُظهرها.',
  },
  tchResultsImmediate: {
    en: 'Results appear as soon as the work is marked.',
    ar: 'تظهر النتائج فور تصحيح العمل.',
  },
  tchAssignAnother: { en: 'Assign another', ar: 'أسند نشاطاً آخر' },

  // Activity kinds, shown as badges
  tchKindLesson: { en: 'lesson', ar: 'درس' },
  tchKindInteractiveBook: { en: 'interactive book', ar: 'كتاب تفاعلي' },
  tchKindQuiz: { en: 'quiz', ar: 'اختبار قصير' },
  tchKindManipulative: { en: 'manipulative', ar: 'أداة تفاعلية' },
  tchKindAssignment: { en: 'assignment', ar: 'واجب' },

  // Course content browser
  tchCourseNotFound: { en: 'Course not found', ar: 'المقرر غير موجود' },
  tchCourseNotAssigned: {
    en: 'It may not be assigned to this class.',
    ar: 'ربما لم يُسند إلى هذا الصف.',
  },
  tchCourseSubtitle: { en: '{c} · {n} units', ar: '{c} · {n} وحدات' },
  tchNUnits: { en: '{n} units', ar: '{n} وحدات' },
  tchNActivities: { en: '{n} activities', ar: '{n} نشاطاً' },
  tchNMarks: { en: '{n} marks', ar: '{n} درجات' },
  tchNotGraded: { en: 'Not graded', ar: 'غير مُقيَّم' },
  tchPreview: { en: 'Preview', ar: 'معاينة' },
  tchMarks: { en: 'Marks', ar: 'الدرجات' },
  tchExpectedTime: { en: 'Expected time', ar: 'الوقت المتوقع' },
  tch15Minutes: { en: '15 minutes', ar: '15 دقيقة' },
  tchSkills: { en: 'Skills', ar: 'المهارات' },
  tchNotTagged: { en: 'Not tagged', ar: 'غير موسوم' },
  tchNotTaggedWarning: {
    en: 'Nothing tagged here, so this activity cannot feed the skill drill down or adaptive practice. Tagging happens in the authoring platform.',
    ar: 'لا يوجد وسم هنا، لذلك لا يغذي هذا النشاط تفصيل المهارات ولا التدريب التكيفي. والوسم يتم في منصة التأليف.',
  },
  tchAssign: { en: 'Assign', ar: 'إسناد' },
  tchPresent: { en: 'Present', ar: 'عرض' },
  tchPickActivityPreview: { en: 'Pick an activity to preview it.', ar: 'اختر نشاطاً لمعاينته.' },

  // Question types, built
  tchQtTrueFalse: { en: 'True or false', ar: 'صح أو خطأ' },
  tchQtMultipleChoice: { en: 'Multiple choice', ar: 'اختيار من متعدد' },
  tchQtShortAnswer: { en: 'Short answer', ar: 'إجابة قصيرة' },
  tchQtEssay: { en: 'Essay', ar: 'مقال' },
  tchQtDragIntoText: { en: 'Drag and drop into text', ar: 'سحب وإفلات داخل نص' },
  tchQtDragOntoImage: { en: 'Drag and drop onto image', ar: 'سحب وإفلات على صورة' },
  tchQtFreehandDrawing: { en: 'Freehand drawing', ar: 'رسم حر' },
  tchQtImageSequencing: { en: 'Image sequencing', ar: 'ترتيب الصور' },
  tchQtMultipleHotspots: { en: 'Multiple hotspots', ar: 'نقاط تفاعلية متعددة' },
  tchQtNumerical: { en: 'Numerical', ar: 'إجابة عددية' },
  tchQtFillBlanks: { en: 'Fill in the blanks', ar: 'ملء الفراغات' },
  tchQtSelectCorrectWords: { en: 'Select correct words', ar: 'اختيار الكلمات الصحيحة' },
  tchQtTextSequencing: { en: 'Text sequencing', ar: 'ترتيب النصوص' },
  tchQtFillBlanksImage: { en: 'Fill in the blanks on image', ar: 'ملء الفراغات على صورة' },
  tchQtHighlightWords: { en: 'Highlight correct words', ar: 'تظليل الكلمات الصحيحة' },
  tchQtRecordAudio: { en: 'Record audio', ar: 'تسجيل صوتي' },
  tchQtTextClassification: { en: 'Text classification', ar: 'تصنيف نصي' },
  tchQtImageClassification: { en: 'Image classification', ar: 'تصنيف الصور' },
  tchQtMatching: { en: 'Matching', ar: 'مطابقة' },
  tchQtCrossword: { en: 'Crossword', ar: 'كلمات متقاطعة' },

  // Question types, planned
  tchQtDropdown: { en: 'Dropdown', ar: 'قائمة منسدلة' },
  tchQtSpeakWords: { en: 'Speak the words', ar: 'انطق الكلمات' },
  tchQtDialogCards: { en: 'Dialog cards', ar: 'بطاقات حوار' },
  tchQtMemoryGame: { en: 'Memory game', ar: 'لعبة الذاكرة' },
  tchQtWordSearch: { en: 'Word search', ar: 'البحث عن الكلمات' },
  tchQtAiChat: { en: 'AI chat', ar: 'محادثة بالذكاء الاصطناعي' },
  tchQtCoursePresentation: { en: 'Course presentation', ar: 'عرض تقديمي للمقرر' },
  tchQtInteractiveVideo: { en: 'Interactive video', ar: 'فيديو تفاعلي' },

  // Question stems used in the bank and the quiz builder
  tchQAddThirdQuarter: { en: '1/3 + 1/4 =', ar: '1/3 + 1/4 =' },
  tchQAddTwoFifths: { en: '2/5 + 1/5 =', ar: '2/5 + 1/5 =' },
  tchQAddHalfSixth: { en: '1/2 + 1/6 =', ar: '1/2 + 1/6 =' },
  tchQCommonDenom12: {
    en: 'Which pair has a common denominator of 12?',
    ar: 'أي زوج مقامه المشترك 12؟',
  },
  tchQDragFractionsLine: {
    en: 'Drag each fraction onto the number line',
    ar: 'اسحب كل كسر إلى خط الأعداد',
  },
  tchQDragFractionsLineLong: {
    en: 'Drag each fraction onto the right place on the number line',
    ar: 'اسحب كل كسر إلى موضعه الصحيح على خط الأعداد',
  },
  tchQExplainEquivalence: {
    en: 'Explain why 2/6 and 1/3 are the same amount',
    ar: 'اشرح لماذا يمثل 2/6 و1/3 المقدار نفسه',
  },
  tchQPlaceValue7: {
    en: 'The place value of 7 in 4,721 is',
    ar: 'القيمة المنزلية للرقم 7 في 4,721 هي',
  },
  tchQRecordNumber: {
    en: 'Record yourself reading the number 3,408 aloud',
    ar: 'سجّل نفسك وأنت تقرأ العدد 3,408 بصوت عالٍ',
  },
  tchQLcd46: {
    en: 'The lowest common denominator of 4 and 6 is',
    ar: 'المقام المشترك الأصغر للعددين 4 و6 هو',
  },

  // Create a quiz
  tchCreateQuiz: { en: 'Create a quiz', ar: 'أنشئ اختباراً' },
  tchQuizDefaultTitle: {
    en: 'Fractions, end of unit check',
    ar: 'الكسور، اختبار نهاية الوحدة',
  },
  tchQuizSubtitle: { en: '{n} questions · {m} marks', ar: '{n} أسئلة · {m} درجات' },
  tchSaveAndAssign: { en: 'Save and assign', ar: 'احفظ وأسند' },
  tchTitle: { en: 'Title', ar: 'العنوان' },
  tchQuestionsInQuiz: { en: 'Questions in this quiz', ar: 'أسئلة هذا الاختبار' },
  tchRemove: { en: 'Remove', ar: 'إزالة' },
  tchNothingAddedYet: {
    en: 'Nothing added yet. Pull a question from the bank on the right.',
    ar: 'لم تُضف أسئلة بعد. اسحب سؤالاً من بنك الأسئلة المجاور.',
  },
  tchWriteNewQuestion: { en: 'Write a new question', ar: 'اكتب سؤالاً جديداً' },
  tchSuggestQuestions: {
    en: 'Suggest questions for this unit',
    ar: 'اقترح أسئلة لهذه الوحدة',
  },
  tchFromTheBank: { en: 'From the bank', ar: 'من بنك الأسئلة' },
  tchTypeAndMarks: { en: '{t} · {n} marks', ar: '{t} · {n} درجات' },
  tchShuffleQuestions: { en: 'Shuffle the questions', ar: 'اخلط ترتيب الأسئلة' },
  tchOnePerPage: { en: 'One question per page', ar: 'سؤال واحد في كل صفحة' },
  tchSkillsCovered: { en: 'Skills covered', ar: 'المهارات المغطاة' },
  tchNothingYet: { en: 'Nothing yet', ar: 'لا شيء بعد' },

  // Question bank
  tchQuestionBankSubtitle: {
    en: 'Questions you can reuse, and the rubrics you mark with',
    ar: 'أسئلة يمكنك إعادة استخدامها، وسلالم التقييم التي تصحّح بها',
  },
  tchQuestions: { en: 'Questions', ar: 'الأسئلة' },
  tchRubrics: { en: 'Rubrics', ar: 'سلالم التقييم' },
  tchQuestionTypes: { en: 'Question types', ar: 'أنواع الأسئلة' },
  tchAllQuestions: { en: 'All questions', ar: 'كل الأسئلة' },
  tchQuestion: { en: 'Question', ar: 'السؤال' },
  tchType: { en: 'Type', ar: 'النوع' },
  tchDifficulty: { en: 'Difficulty', ar: 'المستوى' },
  tchUsed: { en: 'Used', ar: 'مرات الاستخدام' },
  tchSource: { en: 'Source', ar: 'المصدر' },
  tchDiffFoundation: { en: 'Foundation', ar: 'أساسي' },
  tchDiffCore: { en: 'Core', ar: 'متوسط' },
  tchDiffStretch: { en: 'Stretch', ar: 'متقدم' },
  tchSourceYorkPress: { en: 'York Press', ar: 'York Press' },
  tchSourceMine: { en: 'Mine', ar: 'من إعدادي' },
  tchRubricMathWorking: {
    en: 'Mathematical working, 20 marks',
    ar: 'خطوات الحل الرياضي، 20 درجة',
  },
  tchRubricShortExplanation: {
    en: 'Short written explanation, 10 marks',
    ar: 'شرح كتابي قصير، 10 درجات',
  },
  tchRubricVocabulary: { en: 'Uses the right vocabulary', ar: 'يستخدم المصطلحات الصحيحة' },
  tchRubricReasoning: { en: 'Reasoning is complete', ar: 'التعليل مكتمل' },
  tchRubricClarity: { en: 'Clear to read', ar: 'واضح وسهل القراءة' },
  tchSharedGrade6: { en: 'Grade 6 team', ar: 'فريق الصف السادس' },
  tchSharedOnlyMe: { en: 'Only me', ar: 'أنا فقط' },
  tchAvailableNow: { en: 'Available now', ar: 'متاح الآن' },
  tchNBuilt: { en: '{n} built', ar: '{n} جاهزاً' },
  tchPlanned: { en: 'Planned', ar: 'مخطط له' },
  tchNNotBuilt: { en: '{n} not built yet', ar: '{n} لم تُبنَ بعد' },
  tchQuestionTypesNote: {
    en: 'Twenty eight question types in total. The planned eight are shown so a teacher never goes looking for something that does not exist yet.',
    ar: 'ثمانية وعشرون نوعاً من الأسئلة في المجموع. وتظهر الأنواع الثمانية المخططة كي لا يبحث المعلم عن شيء لم يوجد بعد.',
  },

  // Attendance
  tchAttendanceSubtitle: {
    en: 'Wednesday, 10 February · Period 1',
    ar: 'الأربعاء ١٠ شباط · الحصة الأولى',
  },
  tchPreviousDay: { en: 'Previous day', ar: 'اليوم السابق' },
  tchNextDay: { en: 'Next day', ar: 'اليوم التالي' },
  tchSaveRegister: { en: 'Save the register', ar: 'احفظ سجل الحضور' },
  tchStatePresent: { en: 'Present', ar: 'حاضر' },
  tchStateLate: { en: 'Late', ar: 'متأخر' },
  tchStateAbsent: { en: 'Absent', ar: 'غائب' },
  tchStateExcused: { en: 'Excused', ar: 'بعذر' },
  tchRegister: { en: 'Register', ar: 'سجل الحضور' },
  tchResetAllPresent: { en: 'Reset to all present', ar: 'أعد الجميع إلى حاضر' },
  tchNAbsencesTerm: { en: '{n} absences this term', ar: '{n} غيابات هذا الفصل' },
  tchRegisterSaved: {
    en: 'Register saved. Parents of absent students are notified automatically.',
    ar: 'حُفظ سجل الحضور. ويُبلَّغ أولياء أمور الغائبين تلقائياً.',
  },
  tchAttendanceNote: {
    en: 'Everyone starts present, so a full class is one tap. Parents of absent students are notified when you save.',
    ar: 'يبدأ الجميع حاضرين، فالصف المكتمل يحتاج نقرة واحدة. ويُبلَّغ أولياء أمور الغائبين عند الحفظ.',
  },

  // Announcements and messages
  tchAnnouncementsSubtitle: {
    en: 'One message to a class, or a private thread with a parent',
    ar: 'رسالة واحدة إلى صف، أو محادثة خاصة مع ولي أمر',
  },
  tchMessages: { en: 'Messages', ar: 'الرسائل' },
  tchWriteAnnouncement: { en: 'Write an announcement', ar: 'اكتب إعلاناً' },
  tchAnnouncementPlaceholder: {
    en: 'What do they need to know?',
    ar: 'ما الذي يحتاجون إلى معرفته؟',
  },
  tchWhoSeesIt: { en: 'Who sees it', ar: 'من يراه' },
  tchSendToParentsToo: {
    en: 'Send to parents as well as students',
    ar: 'أرسله إلى أولياء الأمور إلى جانب الطلاب',
  },
  tchPostToNStudents: { en: 'Post to {n} students', ar: 'انشره إلى {n} طالباً' },
  tchPostedStudents: {
    en: 'Posted. {n} students have been notified.',
    ar: 'تم النشر. أُبلغ {n} طالباً.',
  },
  tchPostedStudentsParents: {
    en: 'Posted. {n} students and their parents have been notified.',
    ar: 'تم النشر. أُبلغ {n} طالباً وأولياء أمورهم.',
  },
  tchAnnouncementHint: {
    en: 'Students see it on their dashboard. Parents get it by email as well.',
    ar: 'يراه الطلاب على لوحتهم، ويصل أولياء الأمور بالبريد الإلكتروني أيضاً.',
  },
  tchPost1Title: { en: 'End of unit check on Friday', ar: 'اختبار نهاية الوحدة يوم الجمعة' },
  tchPost1Body: {
    en: 'We finish fractions this week. Friday is a short check on everything from Unit 2, in class, no revision needed beyond the practice we have already done.',
    ar: 'ننهي الكسور هذا الأسبوع. والجمعة اختبار قصير على كل ما في الوحدة الثانية، داخل الصف، ولا حاجة إلى مراجعة غير التدريبات التي أنجزناها.',
  },
  tchPost1Date: { en: '9 February', ar: '٩ شباط' },
  tchPost2Title: { en: 'Bring a ruler on Tuesday', ar: 'أحضروا مسطرة يوم الثلاثاء' },
  tchPost2Body: {
    en: 'We start measuring next week. A ruler with centimetres is enough.',
    ar: 'نبدأ القياس الأسبوع المقبل. وتكفي مسطرة بالسنتيمترات.',
  },
  tchPost2Date: { en: '6 February', ar: '٦ شباط' },
  tchPost3Title: {
    en: 'Extra practice is open until Sunday',
    ar: 'التدريب الإضافي متاح حتى الأحد',
  },
  tchPost3Body: {
    en: 'The practice set on common denominators stays open until Sunday night for anyone who wants another go.',
    ar: 'تبقى مجموعة التدريبات على المقامات المشتركة متاحة حتى مساء الأحد لمن أراد محاولة أخرى.',
  },
  tchPost3Date: { en: '4 February', ar: '٤ شباط' },
  tchReadByOf: { en: 'read by {n} of {m}', ar: 'قرأها {n} من {m}' },
  tchThread1: { en: 'Thank you, that explains the mark.', ar: 'شكراً، هذا يوضّح الدرجة.' },
  tchThread2: {
    en: 'Will she need the textbook at home?',
    ar: 'هل ستحتاج إلى الكتاب في البيت؟',
  },
  tchThread3: {
    en: 'Noted, we will practise over the weekend.',
    ar: 'عُلم، سنتدرب في عطلة نهاية الأسبوع.',
  },
  tchThread4: {
    en: 'Can we talk at pickup on Thursday?',
    ar: 'هل يمكننا التحدث عند الاصطحاب يوم الخميس؟',
  },
  tchThread5: { en: 'Thank you for letting us know.', ar: 'شكراً لإعلامنا.' },
  tchAboutStudent: { en: 'about {n}', ar: 'بشأن {n}' },
  tchYesterday: { en: 'Yesterday', ar: 'أمس' },
  tchFeb6Short: { en: '6 Feb', ar: '٦ شباط' },
  tchFeb4Short: { en: '4 Feb', ar: '٤ شباط' },
  tchMessagesNote: {
    en: 'Messages are one to one with a parent and always attached to a child, so there is a record and nothing happens off the platform.',
    ar: 'الرسائل فردية مع ولي الأمر ومرتبطة دائماً بطفل، فيبقى هناك سجل ولا يجري شيء خارج المنصة.',
  },

  // AI teacher tools
  tchAiToolsSubtitle: {
    en: 'Drafts for you to edit, grounded in your own course content',
    ar: 'مسودات تحرّرها بنفسك، مبنية على محتوى مقررك',
  },
  tchAiToolsBanner: {
    en: 'These tools are for teachers. There is no AI tutor or AI examiner facing students in this release, which supersedes the student chatbot in the older features sheet. Nothing on this page reaches a student until you approve it.',
    ar: 'هذه الأدوات للمعلمين. لا يوجد في هذا الإصدار مدرّس ذكاء اصطناعي ولا مصحّح ذكاء اصطناعي موجّه إلى الطلاب، وهذا يحلّ محل روبوت المحادثة الطلابي الوارد في قائمة الميزات القديمة. ولا يصل شيء من هذه الصفحة إلى طالب قبل موافقتك.',
  },
  tchToolReteach: { en: 'Build a reteach', ar: 'جهّز مراجعة علاجية' },
  tchToolReteachWhat: {
    en: 'Turns the misconceptions your class actually showed into a ten minute lesson.',
    ar: 'يحوّل المفاهيم الخاطئة التي ظهرت فعلاً عند صفك إلى درس من عشر دقائق.',
  },
  tchToolReteachGround: {
    en: 'Reads the question level results for this class and pulls from the course content.',
    ar: 'يقرأ نتائج كل سؤال في هذا الصف ويستمد المادة من محتوى المقرر.',
  },
  tchToolQuiz: { en: 'Draft a quiz', ar: 'صُغ مسودة اختبار' },
  tchToolQuizWhat: {
    en: 'Suggests questions from the bank that cover the skills you have just taught.',
    ar: 'يقترح أسئلة من البنك تغطي المهارات التي درّستها للتو.',
  },
  tchToolQuizGround: {
    en: 'Uses the skill tags on your unit plan and the question bank you can already see.',
    ar: 'يستخدم وسوم المهارات في خطة وحدتك وبنك الأسئلة الذي تراه أصلاً.',
  },
  tchToolFeedback: { en: 'Draft feedback', ar: 'صُغ مسودة ملاحظات' },
  tchToolFeedbackWhat: {
    en: 'Writes a first pass of feedback on written work, which you edit before releasing.',
    ar: 'يكتب مسودة أولى من الملاحظات على العمل الكتابي، تحرّرها قبل إظهارها.',
  },
  tchToolFeedbackGround: {
    en: 'Reads the submission and the rubric you selected. Never released without you.',
    ar: 'يقرأ التسليم وسلّم التقييم الذي اخترته. ولا يُظهر شيئاً من دونك.',
  },
  tchToolDifferentiate: { en: 'Differentiate an activity', ar: 'نوّع مستوى نشاط' },
  tchToolDifferentiateWhat: {
    en: 'Produces a foundation and a stretch version of something you already assign.',
    ar: 'ينتج نسخة أساسية وأخرى متقدمة من نشاط تسنده أصلاً.',
  },
  tchToolDifferentiateGround: {
    en: 'Rewrites the existing activity rather than inventing new content.',
    ar: 'يعيد صياغة النشاط القائم بدل ابتكار محتوى جديد.',
  },
  tchToolParentMessage: { en: 'Draft a parent message', ar: 'صُغ رسالة إلى ولي الأمر' },
  tchToolParentMessageWhat: {
    en: 'Turns what the data shows into a message a parent will understand.',
    ar: 'يحوّل ما تظهره البيانات إلى رسالة يفهمها ولي الأمر.',
  },
  tchToolParentMessageGround: {
    en: 'Uses the results for that one child only. You send it, not the platform.',
    ar: 'يستخدم نتائج ذلك الطفل وحده. وأنت من يرسلها، لا المنصة.',
  },
  tchToolTranslate: { en: 'Translate a message', ar: 'ترجم رسالة' },
  tchToolTranslateWhat: {
    en: 'English to Arabic and back, for families who read one and not the other.',
    ar: 'من الإنجليزية إلى العربية وبالعكس، للأسر التي تقرأ إحداهما دون الأخرى.',
  },
  tchToolTranslateGround: {
    en: 'Translation only. It does not change what you wrote.',
    ar: 'ترجمة فقط. ولا تغيّر ما كتبته.',
  },
  tchLater: { en: 'Later', ar: 'لاحقاً' },
  tchWhatResultsShow: { en: 'What the results show', ar: 'ما تظهره النتائج' },
  tchReteachFindings: {
    en: 'Six students added numerators and denominators separately on three different questions. Four of the six were on track last month.',
    ar: 'ستة طلاب جمعوا البسوط والمقامات كلاً على حدة في ثلاثة أسئلة مختلفة. وأربعة منهم كانوا على المسار الشهر الماضي.',
  },
  tchSuggestedReteach: {
    en: 'Suggested ten minute reteach',
    ar: 'مراجعة علاجية مقترحة من عشر دقائق',
  },
  tchReteachStep1: {
    en: 'Open with 1/2 + 1/2, which they will all get right, and ask why the answer is not 2/4.',
    ar: 'ابدأ بـ 1/2 + 1/2، وسيجيبون جميعاً إجابة صحيحة، ثم اسأل لماذا ليست النتيجة 2/4.',
  },
  tchReteachStep2: {
    en: 'Use the number line manipulative from Unit 2 to show the two halves meeting at one.',
    ar: 'استخدم أداة خط الأعداد من الوحدة الثانية لإظهار التقاء النصفين عند الواحد.',
  },
  tchReteachStep3: {
    en: 'Work 1/3 + 1/4 together, naming the common denominator step out loud.',
    ar: 'احسبوا 1/3 + 1/4 معاً، مع تسمية خطوة المقام المشترك بصوت عالٍ.',
  },
  tchReteachStep4: {
    en: 'Set the three practice questions from Unit 2, the foundation version.',
    ar: 'أسند أسئلة التدريب الثلاثة من الوحدة الثانية، النسخة الأساسية.',
  },
  tchAddToThursday: { en: 'Add to Thursday', ar: 'أضفها إلى الخميس' },
  tchAssignToSix: { en: 'Assign the practice to the six', ar: 'أسند التدريب إلى الستة' },
  tchTryAgain: { en: 'Try again', ar: 'حاول مرة أخرى' },
  tchAiToolsNote: {
    en: 'Every step above points at content that already exists in your course. The tool arranges it, it does not write new teaching material.',
    ar: 'كل خطوة أعلاه تشير إلى محتوى موجود أصلاً في مقررك. فالأداة ترتّبه ولا تكتب مادة تعليمية جديدة.',
  },

  // Content library
  tchContentLibrary: { en: 'Content library', ar: 'مكتبة المحتوى' },
  tchLibrarySubtitle: {
    en: 'Search every course you teach, by title or by skill',
    ar: 'ابحث في كل مقرر تدرّسه، بالعنوان أو بالمهارة',
  },
  tchLibraryPlaceholder: {
    en: 'Try a skill, such as common denominators',
    ar: 'جرّب اسم مهارة، مثل المقامات المشتركة',
  },
  tchFacetEverything: { en: 'Everything', ar: 'كل شيء' },
  tchFacetLessons: { en: 'Lessons', ar: 'الدروس' },
  tchFacetBooks: { en: 'Books', ar: 'الكتب' },
  tchFacetQuizzes: { en: 'Quizzes', ar: 'الاختبارات القصيرة' },
  tchFacetManipulatives: { en: 'Manipulatives', ar: 'الأدوات التفاعلية' },
  tchFacetAssignments: { en: 'Assignments', ar: 'الواجبات' },
  tchAllSubjects: { en: 'All subjects', ar: 'كل المواد' },
  tchResultsAcross: {
    en: '{n} results across {m} courses',
    ar: '{n} نتيجة في {m} مقررات',
  },
  tchNoLibraryMatch: {
    en: 'Nothing matches. Try a skill name rather than a title.',
    ar: 'لا يوجد ما يطابق. جرّب اسم مهارة بدل العنوان.',
  },

  // Classroom presentation
  tchSlide1Title: { en: 'Adding fractions', ar: 'جمع الكسور' },
  tchSlide1Body: {
    en: 'When the denominators are different, you cannot add the numerators yet.',
    ar: 'عندما تختلف المقامات، لا يمكن جمع البسوط بعد.',
  },
  tchSlide2Title: { en: 'Find the common denominator', ar: 'أوجد المقام المشترك' },
  tchSlide2Body: {
    en: '1/3 + 1/4\n\nThe lowest common multiple of 3 and 4 is 12.',
    ar: '1/3 + 1/4\n\nالمضاعف المشترك الأصغر للعددين 3 و4 هو 12.',
  },
  tchSlide3Title: { en: 'Your turn', ar: 'دوركم' },
  tchSlide3Body: { en: '1/2 + 1/6 = ?', ar: '1/2 + 1/6 = ؟' },
  tchSlide4Title: { en: 'Together', ar: 'معاً' },
  tchSlide4Body: {
    en: '1/2 = 3/6\n\n3/6 + 1/6 = 4/6 = 2/3',
    ar: '1/2 = 3/6\n\n3/6 + 1/6 = 4/6 = 2/3',
  },
  tchPresentMeta: {
    en: 'Mathematics · Unit 2 · slide {n} of {m}',
    ar: 'الرياضيات · الوحدة الثانية · الشريحة {n} من {m}',
  },
  tchExit: { en: 'Exit', ar: 'خروج' },
  tchExplanation: { en: 'Explanation', ar: 'شرح' },
  tchHaveAnswered: { en: '{n} of {m} have answered', ar: 'أجاب {n} من {m}' },
  tchShowAnswers: { en: 'Show the answers', ar: 'أظهر الإجابات' },
  tchSlideAria: { en: 'Slide {n}', ar: 'الشريحة {n}' },
  tchAnnotate: { en: 'Annotate', ar: 'تعليق على الشريحة' },
  tchWindowed: { en: 'Windowed', ar: 'وضع النافذة' },

  // Skill and question drill down
  tchSkillsSuffix: { en: '{n} · skills', ar: '{n} · المهارات' },
  tchSkillDrilldownSubtitle: {
    en: 'Which skill, which question, and what they did instead',
    ar: 'أي مهارة، وأي سؤال، وماذا فعل الطالب بدلاً من ذلك',
  },
  tchBackToStudent: { en: 'Back to the student', ar: 'العودة إلى الطالب' },
  tchMiscAddedSeparately: {
    en: 'Added the numerators and denominators separately',
    ar: 'جمع البسوط والمقامات كلاً على حدة',
  },
  tchMiscMultipliedDenoms: {
    en: 'Multiplied the denominators instead of finding the lowest common multiple',
    ar: 'ضرب المقامين بدل إيجاد المضاعف المشترك الأصغر',
  },
  tchSameMistakeTimes: {
    en: 'The same mistake, {n} times',
    ar: 'الخطأ نفسه، {n} مرات',
  },
  tchOneMistakeWorth: {
    en: 'One mistake worth a conversation',
    ar: 'خطأ واحد يستحق حديثاً',
  },
  tchAssignReteach: { en: 'Assign the reteach', ar: 'أسند المراجعة العلاجية' },
  tchOneQuestion: { en: '{n} question', ar: 'سؤال واحد' },
  tchNQuestions: { en: '{n} questions', ar: '{n} أسئلة' },
  tchCorrect: { en: 'Correct', ar: 'صحيح' },
  tchWrong: { en: 'Wrong', ar: 'خطأ' },
  tchTheyAnswered: { en: 'They answered', ar: 'أجاب' },
  tchCorrectAnswer: { en: 'Correct answer', ar: 'الإجابة الصحيحة' },
  tchOneAttempt: { en: '{n} attempt', ar: 'محاولة واحدة' },
  tchNAttempts: { en: '{n} attempts', ar: '{n} محاولات' },
  tchTaggedMisconception: {
    en: 'Tagged misconception: {n}',
    ar: 'المفهوم الخاطئ الموسوم: {n}',
  },
  tchSkillDrilldownNote: {
    en: 'The misconception tag comes from the question metadata set in the authoring platform. This screen is only as good as that tagging, which is why the metadata work blocks the authoring sprint rather than the other way round.',
    ar: 'يأتي وسم المفهوم الخاطئ من البيانات الوصفية للسؤال المحددة في منصة التأليف. وهذه الشاشة بجودة ذلك الوسم لا أكثر، ولهذا يسبق عمل البيانات الوصفية سباق التأليف لا العكس.',
  },

  /*
   * The body of the one message a teacher sends to several families at once
   * from the bulk bar. Written to be true whichever child it reaches.
   */
  tchBulkMessageBody: {
    en: 'I wanted to let you know we are working on fractions this week and your child found the first lesson tricky. Ten minutes of practice at home would help. Please ask me anything.',
    ar: 'أردت إعلامكم أننا نعمل على الكسور هذا الأسبوع، وقد وجد طفلكم الدرس الأول صعباً. عشر دقائق من التدريب في المنزل ستساعد كثيراً. لا تترددوا في سؤالي عن أي شيء.',
  },

  /*
   * Search inside one course. Separate wording from the content library on
   * purpose: the library is a planning tool, this is the question a teacher
   * asks out loud in the middle of a lesson, so the copy names the course and
   * the position in the sequence rather than the catalogue.
   */
  tchCourseSearchTitle: { en: 'Search this course', ar: 'ابحث في هذا المقرر' },
  tchCourseSearchSubtitle: {
    en: 'Find where a topic sits in {c}, for {g}',
    ar: 'اعرف أين يقع موضوع ما في {c}، لصف {g}',
  },
  tchBackToCourse: { en: 'Back to the course', ar: 'العودة إلى المقرر' },
  tchCourseSearchPlaceholder: {
    en: 'Try a skill, such as common denominators, or a unit name',
    ar: 'جرّب مهارة، مثل المقامات المشتركة، أو اسم وحدة',
  },
  tchOnlyAssigned: { en: 'Only what I have assigned', ar: 'ما أسندته فقط' },
  tchOnlyAssignedHint: {
    en: 'Hides anything this class has not been given yet',
    ar: 'يخفي كل ما لم يُعطَ لهذا الصف بعد',
  },
  tchCourseSearchCount: {
    en: '{n} results in {m} units.',
    ar: '{n} نتيجة في {m} وحدات.',
  },
  tchCourseSearchAllShown: {
    en: 'The whole course, in order. Type to narrow it.',
    ar: 'المقرر كاملاً بترتيبه. اكتب لتضييق النتائج.',
  },
  tchCourseSearchScope: {
    en: 'This searches this course only.',
    ar: 'يبحث هذا في هذا المقرر وحده.',
  },
  tchSearchEveryCourse: {
    en: 'Search every course you teach',
    ar: 'ابحث في كل مقرر تدرّسه',
  },
  tchUnitPosition: { en: 'Unit {n} of {m}', ar: 'الوحدة {n} من {m}' },
  tchNMatchesInUnit: { en: '{n} matches here', ar: '{n} نتيجة هنا' },
  tchMatchedOnSkill: { en: 'Matched on a skill', ar: 'تطابق عبر مهارة' },
  tchAlreadyAssigned: { en: 'Already assigned', ar: 'مُسند مسبقاً' },
  tchNotAssignedYet: { en: 'Not assigned yet', ar: 'لم يُسند بعد' },
  tchNoCourseSearchMatch: {
    en: 'Nothing in this course matches that. Try the name of a skill, such as common denominators, rather than the title of an activity.',
    ar: 'لا شيء في هذا المقرر يطابق ذلك. جرّب اسم مهارة، مثل المقامات المشتركة، بدلاً من عنوان نشاط.',
  },
  tchCourseSearchNote: {
    en: 'Searching by skill only works because every activity is tagged in the authoring platform. A result with no skill on it is untagged, so no search by skill will ever reach it.',
    ar: 'لا يعمل البحث بالمهارة إلا لأن كل نشاط موسوم في منصة التأليف. والنتيجة التي بلا مهارة غير موسومة، فلن يصل إليها أي بحث بالمهارة.',
  },
  tchSearchThisCourse: { en: 'Search this course', ar: 'ابحث في هذا المقرر' },
} satisfies Record<string, Phrase>
