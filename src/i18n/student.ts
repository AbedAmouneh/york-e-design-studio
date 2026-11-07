import type { Phrase } from './types'

/**
 * Copy for the student screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Two tiers, two registers, and the prefix tells you which one you are in.
 *
 *   stu  Grade 3 and above. Scores, percentages and feedback are all fair game
 *        here, because a twelve year old can act on a mark. The one thing that
 *        never appears at any age is the at risk label: that is a teacher's
 *        flag, and the Arabic متعثر is a verdict a child should hear from a
 *        person with a plan, not from a screen.
 *
 *   erl  K1 to Grade 3. No percentage, no average, no comparison. A missed
 *        answer says انظر مرة أخرى, never خطأ, because at this age the whole
 *        point is that trying again costs nothing. Short sentences, common
 *        words, and the second person a child is actually spoken to in.
 *
 * Placeholders are `{n}`, `{m}` and `{d}`, filled by the component with
 * `.replace()`. A whole sentence per key rather than glued fragments, because
 * Arabic puts the number, the noun and the verb in a different order and
 * fragments cannot be reordered. Counts that differ in English keep paired
 * keys, one singular and one plural.
 */
export const student = {
  // Shell
  stuGradeN: { en: 'Grade {n}', ar: 'الصف {n}' },

  // Dashboard
  stuHello: { en: 'Hello, {n}', ar: 'مرحباً {n}' },
  stuTermWeek: { en: 'Term 2, week 5', ar: 'الفصل الثاني، الأسبوع الخامس' },
  stuDueThisWeek: { en: 'Due this week', ar: 'المستحق هذا الأسبوع' },
  stuActivity: { en: 'Activity', ar: 'نشاط' },
  stuDueOn: { en: 'due {d}', ar: 'موعد التسليم {d}' },
  stuNothingDue: {
    en: 'Nothing due. You are up to date.',
    ar: 'لا شيء مستحق. أنت متابع لكل شيء.',
  },
  stuHowYouAreDoing: { en: 'How you are doing', ar: 'كيف يسير عملك' },
  stuAverageThisTerm: { en: 'average this term', ar: 'معدلك هذا الفصل' },
  stuWorkCompleted: { en: 'Work completed', ar: 'العمل المنجز' },
  stuAverageNote: {
    en: 'Your average counts only work that has been marked and returned to you.',
    ar: 'يحتسب معدلك العمل الذي صُحِّح وأُعيد إليك فقط.',
  },
  stuMarksBack: { en: 'Marks that came back', ar: 'الدرجات التي عادت إليك' },
  stuFeedback: { en: 'Feedback', ar: 'ملاحظات' },

  // My courses
  stuNUnits: { en: '{n} units', ar: '{n} وحدات' },
  stuNActivities: { en: '{n} activities', ar: '{n} نشاطاً' },
  stuCoursesThisTerm: { en: '{n} courses this term', ar: '{n} مقررات هذا الفصل' },
  stuUnitsActivities: {
    en: '{n} units · {m} activities',
    ar: '{n} وحدات · {m} نشاطاً',
  },
  stuYourProgress: { en: 'Your progress', ar: 'تقدمك' },
  stuWhyShort: { en: 'Why this list is short', ar: 'لماذا هذه القائمة قصيرة' },
  stuWhyShortBody: {
    en: 'You see the courses your teacher has opened for your class. Anything else in the school library is not yours to browse yet.',
    ar: 'ترى المقررات التي فتحها معلمك لصفك. وما عدا ذلك في مكتبة المدرسة ليس متاحاً لك للتصفح بعد.',
  },

  // Assignments
  stuAssignmentsSubtitle: { en: '{n} to do · Term 2', ar: '{n} للإنجاز · الفصل الثاني' },
  stuTabTodo: { en: 'To do', ar: 'للإنجاز' },
  stuTabHandedIn: { en: 'Handed in', ar: 'مُسلَّم' },
  stuTabMarked: { en: 'Marked', ar: 'مُصحَّح' },
  stuHandedInLate: { en: 'Handed in late', ar: 'سُلِّم متأخراً' },
  stuWithYourTeacher: { en: 'With your teacher', ar: 'عند معلمك' },
  stuSeeFeedback: { en: 'See feedback', ar: 'اطّلع على الملاحظات' },
  stuNothingToDo: { en: 'Nothing to do right now.', ar: 'لا شيء للإنجاز الآن.' },
  stuNothingHereYet: { en: 'Nothing here yet.', ar: 'لا شيء هنا بعد.' },

  // Take a quiz
  stuQuiz: { en: 'Quiz', ar: 'اختبار قصير' },
  stuMathsGrade6: { en: 'Mathematics, Grade 6', ar: 'الرياضيات، الصف السادس' },
  stuOneAttempt: { en: 'one attempt', ar: 'محاولة واحدة' },
  stuLeave: { en: 'Leave', ar: 'مغادرة' },
  stuQuestionNofM: { en: 'Question {n} of {m}', ar: 'السؤال {n} من {m}' },
  stuFlagged: { en: 'Flagged', ar: 'معلَّم' },
  stuFlagForLater: { en: 'Flag for later', ar: 'علّمه للعودة إليه' },
  stuYourAnswer: { en: 'Your answer', ar: 'إجابتك' },
  stuWriteYourAnswer: { en: 'Write your answer', ar: 'اكتب إجابتك' },
  stuHandItIn: { en: 'Hand it in', ar: 'سلّم الآن' },
  stuQuestions: { en: 'Questions', ar: 'الأسئلة' },
  stuNAnswered: { en: '{n} answered', ar: 'أجبت عن {n}' },
  stuNFlagged: { en: '{n} flagged', ar: 'علّمت {n}' },
  stuHandItInConfirm: { en: 'Hand it in?', ar: 'هل تريد التسليم؟' },
  stuBlankOne: {
    en: '{n} question is still blank.',
    ar: 'بقي {n} سؤال من دون إجابة.',
  },
  stuBlankMany: {
    en: '{n} questions are still blank.',
    ar: 'بقيت {n} أسئلة من دون إجابة.',
  },
  stuFlaggedOne: {
    en: 'You flagged {n} question to come back to.',
    ar: 'علّمت {n} سؤالاً للعودة إليه.',
  },
  stuFlaggedMany: {
    en: 'You flagged {n} questions to come back to.',
    ar: 'علّمت {n} أسئلة للعودة إليها.',
  },
  stuOneAttemptWarning: {
    en: 'You have one attempt, so you cannot change your answers after this.',
    ar: 'لديك محاولة واحدة، فلا يمكنك تغيير إجاباتك بعد ذلك.',
  },
  stuKeepWorking: { en: 'Keep working', ar: 'تابع العمل' },

  // Quiz questions and the options that carry words
  stuQ1: {
    en: 'Which pair of fractions has a common denominator of 12?',
    ar: 'أي زوج من الكسور مقامه المشترك 12؟',
  },
  stuQ1OptA: { en: '1/3 and 1/4', ar: '1/3 و1/4' },
  stuQ1OptB: { en: '1/2 and 1/5', ar: '1/2 و1/5' },
  stuQ1OptC: { en: '2/3 and 3/5', ar: '2/3 و3/5' },
  stuQ1OptD: { en: '1/6 and 1/8', ar: '1/6 و1/8' },
  stuQ2: {
    en: 'Work out 1/3 + 1/4. Give your answer as a fraction.',
    ar: 'احسب 1/3 + 1/4. واكتب إجابتك على صورة كسر.',
  },
  stuQ3: { en: 'Which of these is equal to 2/6?', ar: 'أي مما يأتي يساوي 2/6؟' },
  stuQ4: {
    en: 'Explain in one sentence why you cannot add 1/2 and 1/3 without changing them first.',
    ar: 'اشرح في جملة واحدة لماذا لا يمكن جمع 1/2 و1/3 من دون تغييرهما أولاً.',
  },
  stuQ5: {
    en: 'A recipe needs 3/4 of a cup of flour. You make it twice. How much flour do you need?',
    ar: 'تحتاج وصفة إلى 3/4 كوب من الطحين، وأنت تحضّرها مرتين. كم كوباً من الطحين تحتاج؟',
  },

  // Quiz results
  stuYourResults: { en: 'Your results', ar: 'نتيجتك' },
  stuOutOf: { en: 'out of {n}', ar: 'من {n}' },
  stuFullyRight: { en: '{n} of {m} fully right', ar: '{n} من {m} صحيحة بالكامل' },
  stuFromYourTeacher: { en: 'From your teacher', ar: 'من معلمك' },
  stuQuestionByQuestion: { en: 'Question by question', ar: 'سؤالاً سؤالاً' },
  stuYouWrote: { en: 'You wrote', ar: 'كتبت' },
  stuTheAnswerWas: { en: 'The answer was', ar: 'الإجابة الصحيحة' },
  stuPractiseHint: {
    en: 'Adding fractions is the one to practise. There are three more questions on it in Unit 2.',
    ar: 'جمع الكسور هو ما يستحق التدريب. وفي الوحدة الثانية ثلاثة أسئلة أخرى عليه.',
  },
  stuGoToUnit: { en: 'Go to the unit', ar: 'انتقل إلى الوحدة' },
  stuR2: { en: 'Work out 1/3 + 1/4.', ar: 'احسب 1/3 + 1/4.' },
  stuR4: {
    en: 'Explain why you cannot add 1/2 and 1/3 without changing them first.',
    ar: 'اشرح لماذا لا يمكن جمع 1/2 و1/3 من دون تغييرهما أولاً.',
  },
  stuR5: {
    en: 'A recipe needs 3/4 of a cup of flour. You make it twice.',
    ar: 'تحتاج وصفة إلى 3/4 كوب من الطحين، وأنت تحضّرها مرتين.',
  },
  stuA4Yours: {
    en: 'Because the bottoms are different.',
    ar: 'لأن الأرقام في الأسفل مختلفة.',
  },
  stuA5: { en: '1 and 1/2 cups', ar: 'كوب ونصف' },
  stuWhy2: {
    en: 'You added the tops and the bottoms. Change both to twelfths first, then add only the tops.',
    ar: 'جمعت الأرقام العليا والسفلى معاً. حوّل الكسرين إلى أجزاء من اثني عشر أولاً، ثم اجمع الأرقام العليا فقط.',
  },
  stuWhy4: {
    en: 'Right idea. Name what the bottom number means, the size of each piece, for the last mark.',
    ar: 'الفكرة صحيحة. سمِّ ما يعنيه الرقم السفلي، أي حجم كل جزء، لتنال الدرجة الأخيرة.',
  },

  // My grades
  stuGradesSubtitle: {
    en: 'Term 2 · {n} marks released',
    ar: 'الفصل الثاني · {n} درجات ظاهرة',
  },
  stuAverageLabel: { en: 'Average this term', ar: 'المعدل هذا الفصل' },
  stuMarksReleased: { en: 'Marks released', ar: 'الدرجات الظاهرة' },
  stuReleasedNote: {
    en: 'Marked work appears when your teacher releases it',
    ar: 'يظهر العمل المُصحَّح عندما يُظهره معلمك',
  },
  stuPercentAverage: { en: '{n}% average', ar: 'معدل {n}%' },
  stuNoMarksYet: { en: 'No marks yet', ar: 'لا درجات بعد' },
  stuColReturned: { en: 'Returned', ar: 'تاريخ الإعادة' },
  stuColMark: { en: 'Mark', ar: 'الدرجة' },
  stuNothingMarkedYet: {
    en: 'Nothing marked in this course yet.',
    ar: 'لم يُصحَّح شيء في هذا المقرر بعد.',
  },

  // My progress
  stuProgressSubtitle: {
    en: 'Term 2, how your work has gone',
    ar: 'الفصل الثاني، كيف سار عملك',
  },
  stuBandSolid: { en: 'Solid', ar: 'متقن' },
  stuBandGetting: { en: 'Getting there', ar: 'في الطريق' },
  stuBandPractise: { en: 'Worth practising', ar: 'يستحق التدريب' },
  stuTrendRising: { en: 'You are improving', ar: 'أنت في تحسن' },
  stuTrendFalling: { en: 'Slipping a little lately', ar: 'تراجع بسيط مؤخراً' },
  stuTrendSteady: { en: 'Holding steady', ar: 'ثابت على مستواك' },
  stuMarksOverTime: { en: 'Your marks over time', ar: 'درجاتك عبر الزمن' },
  stuOnlyReleasedNote: {
    en: 'Only marks your teacher has released appear here.',
    ar: 'لا تظهر هنا إلا الدرجات التي أظهرها معلمك.',
  },
  stuGoodAtTitle: {
    en: 'What you are good at, and what to practise',
    ar: 'ما تتقنه، وما يستحق التدريب',
  },
  stuTaskN: { en: 'Task {n}', ar: 'مهمة {n}' },
  stuSkill: { en: 'Skill', ar: 'مهارة' },
  stuPractiseHint2: {
    en: 'Adding fractions is the one worth practising. Unit 2 has three short questions on it.',
    ar: 'جمع الكسور هو ما يستحق التدريب. وفي الوحدة الثانية ثلاثة أسئلة قصيرة عليه.',
  },
  stuOpenUnit2: { en: 'Open Unit 2', ar: 'افتح الوحدة الثانية' },

  // Calendar
  stuCalendarMonth: { en: 'February 2027', ar: 'شباط ٢٠٢٧' },
  stuPreviousMonth: { en: 'Previous month', ar: 'الشهر السابق' },
  stuNextMonth: { en: 'Next month', ar: 'الشهر التالي' },
  stuMonShort: { en: 'Mon', ar: 'إثن' },
  stuTueShort: { en: 'Tue', ar: 'ثلا' },
  stuWedShort: { en: 'Wed', ar: 'أرب' },
  stuThuShort: { en: 'Thu', ar: 'خمي' },
  stuFriShort: { en: 'Fri', ar: 'جمع' },
  stuSatShort: { en: 'Sat', ar: 'سبت' },
  stuSunShort: { en: 'Sun', ar: 'أحد' },
  stuDuePrefix: { en: 'Due: ', ar: 'موعد التسليم: ' },
  stuEvtEquivalentFractions: { en: 'Equivalent fractions', ar: 'الكسور المتكافئة' },
  stuEvtReadingComprehension: { en: 'Reading comprehension', ar: 'الفهم القرائي' },
  stuEvtCheck23: { en: 'Check 2.3', ar: 'تحقق 2.3' },
  stuEvtApply15: { en: 'Apply 1.5', ar: 'تطبيق 1.5' },
  stuEvtWaterCycle: { en: 'The water cycle', ar: 'دورة الماء' },
  stuEvtAddingFractions: { en: 'Adding fractions practice', ar: 'تدريب على جمع الكسور' },
  stuEvtEndOfUnitCheck: { en: 'End of unit check', ar: 'اختبار نهاية الوحدة' },
  stuEvtPhotosynthesis: { en: 'Photosynthesis', ar: 'البناء الضوئي' },
  stuEvtPractise24: { en: 'Practise 2.4', ar: 'تدريب 2.4' },
  stuEvtParagraphStructure: { en: 'Paragraph structure', ar: 'بناء الفقرة' },
  stuSubjMathematics: { en: 'Mathematics', ar: 'الرياضيات' },
  stuSubjEnglish: { en: 'English', ar: 'اللغة الإنجليزية' },
  stuSubjScience: { en: 'Science', ar: 'العلوم' },
  stuLegendLesson: { en: 'Lesson', ar: 'درس' },
  stuLegendDue: { en: 'Something is due', ar: 'شيء مستحق التسليم' },
  stuLegendTest: { en: 'Test', ar: 'اختبار' },
  stuLegendAssessment: { en: 'An assessment', ar: 'تقييم' },

  // Announcements
  stuAnnSubtitle: {
    en: 'From your school and your teachers',
    ar: 'من مدرستك ومعلميك',
  },
  stuAnnFamilyNote: {
    en: 'Messages your teacher sends to your family are not shown here.',
    ar: 'الرسائل التي يرسلها معلمك إلى أسرتك لا تظهر هنا.',
  },

  // Course player
  stuCourseNotFound: { en: 'Course not found', ar: 'المقرر غير موجود' },
  stuCourseNotOpen: {
    en: 'It may not be open for your class.',
    ar: 'ربما لم يُفتح لصفك.',
  },
  stuNextUp: { en: 'Next up', ar: 'التالي' },
  stuOpensLater: { en: 'Opens later', ar: 'يُفتح لاحقاً' },
  stuHandedIn: { en: 'Handed in', ar: 'مُسلَّم' },
  stuHandedInNote: {
    en: 'Handed in means your teacher has it. A mark appears only once they release it to the class.',
    ar: 'مُسلَّم يعني أن عملك وصل إلى معلمك. ولا تظهر الدرجة إلا عندما يُظهرها للصف.',
  },

  // ------------------------------------------------------------------
  // K1 to Grade 3. Everything below is read by a child of five to eight,
  // or read aloud to them. Short, warm, and nothing that sounds like a
  // verdict.
  // ------------------------------------------------------------------

  // Shell and navigation
  erlHello: { en: 'Hello, {n}', ar: 'أهلاً يا {n}' },
  erlHome: { en: 'Home', ar: 'الرئيسية' },
  erlMyWork: { en: 'My work', ar: 'أعمالي' },
  erlMyStickers: { en: 'My stickers', ar: 'ملصقاتي' },

  // Home
  erlNextForYou: { en: 'Next for you', ar: 'دورك الآن' },
  erlLetUsGo: { en: 'Let us go', ar: 'هيا بنا' },
  erlAllDone: { en: 'All done for today', ar: 'أنهيت كل شيء اليوم' },
  erlComeBackTomorrow: { en: 'Come back tomorrow', ar: 'نراك غداً' },
  erlToday: { en: 'Today', ar: 'اليوم' },
  erlNofMFinished: { en: '{n} of {m} finished', ar: 'أنهيت {n} من {m}' },
  erlYouHaveStickers: { en: 'You have {n} stickers', ar: 'عندك {n} ملصقاً' },
  erlSeeThem: { en: 'See them', ar: 'شاهدها' },

  // My work
  erlNofMDone: { en: '{n} of {m} done', ar: 'أنهيت {n} من {m}' },
  erlTeacherWillOpen: {
    en: 'Your teacher will open this',
    ar: 'معلمك سيفتحه لك',
  },
  erlReadyForYou: { en: 'Ready for you', ar: 'جاهز لك' },

  // Subjects
  erlSubjMaths: { en: 'Maths', ar: 'الرياضيات' },
  erlSubjReading: { en: 'Reading', ar: 'القراءة' },
  erlSubjShapes: { en: 'Shapes', ar: 'الأشكال' },

  // Activity titles
  erlActCountingInTens: { en: 'Counting in tens', ar: 'العدّ بالعشرات' },
  erlActHungryFox: { en: 'The hungry fox', ar: 'الثعلب الجائع' },
  erlActNumberLine100: { en: 'Number line to 100', ar: 'خط الأعداد حتى 100' },
  erlActAddingTo20: { en: 'Adding to 20', ar: 'الجمع حتى 20' },
  erlActRhymingWords: { en: 'Rhyming words', ar: 'كلمات تتشابه نهايتها' },
  erlActLostKite: { en: 'The lost kite', ar: 'الطائرة الورقية الضائعة' },
  erlActCirclesSquares: { en: 'Circles and squares', ar: 'الدوائر والمربعات' },

  // Doing an activity
  erlClose: { en: 'Close', ar: 'إغلاق' },
  erlQuestionNofM: { en: 'Question {n} of {m}', ar: 'السؤال {n} من {m}' },
  erlReadAloud: { en: 'Read this out loud', ar: 'اقرأ لي السؤال' },
  erlTapYourAnswer: { en: 'Tap your answer', ar: 'اضغط على إجابتك' },
  erlThatIsRight: { en: 'That is right', ar: 'أحسنت، هذه هي' },
  erlFinish: { en: 'Finish', ar: 'أنهيت' },
  // Never "wrong", in either language. The child looks again and picks again.
  erlHaveAnotherLook: { en: 'Have another look', ar: 'انظر مرة أخرى' },
  erlTryAgain: { en: 'Try again', ar: 'جرّب مرة أخرى' },
  erlQ1: { en: 'What comes after 40?', ar: 'ما العدد الذي يأتي بعد 40؟' },
  erlQ2: { en: 'What comes after 70?', ar: 'ما العدد الذي يأتي بعد 70؟' },
  erlQ3: {
    en: 'Count in tens. 10, 20, 30, ...',
    ar: 'عُدّ بالعشرات. 10، 20، 30، ...',
  },
  erlQ4: { en: 'What comes before 60?', ar: 'ما العدد الذي يأتي قبل 60؟' },

  // Well done
  erlPraiseThree: { en: 'Brilliant work, {n}', ar: 'عمل رائع يا {n}' },
  erlPraiseTwo: { en: 'Nice work, {n}', ar: 'أحسنت يا {n}' },
  erlPraiseOne: { en: 'You finished it, {n}', ar: 'أنهيتها يا {n}' },
  erlStarsEarned: { en: 'You earned {n} out of 3 stars', ar: 'حصلت على {n} من 3 نجوم' },
  erlWellDoneBody: {
    en: 'You finished counting in tens. You got better as you went.',
    ar: 'أنهيت العدّ بالعشرات. وصرت أفضل كلما تقدمت.',
  },
  erlKeepGoing: { en: 'Keep going', ar: 'واصل' },
  erlSeeMyStickers: { en: 'See my stickers', ar: 'شاهد ملصقاتي' },
  erlTeacherCanSee: {
    en: 'Your teacher can see how you did.',
    ar: 'معلمك يرى عملك.',
  },

  // Stickers
  erlStickersCount: { en: 'You have {n} stickers, {m}', ar: 'عندك {n} ملصقاً يا {m}' },
  erlCollectRest: { en: 'Keep going to collect the rest.', ar: 'واصل لتجمع الباقي.' },
  erlStickerCounted100: { en: 'Counted to 100', ar: 'عددت حتى 100' },
  erlStickerRead5: { en: 'Read 5 stories', ar: 'قرأت 5 قصص' },
  erlStickerThreeStars: { en: 'Three stars', ar: 'ثلاث نجوم' },
  erlStickerEveryDay: { en: 'Every day this week', ar: 'كل يوم هذا الأسبوع' },
  erlStickerShapesExpert: { en: 'Shapes expert', ar: 'خبير الأشكال' },
  erlStickerTriedAgain: { en: 'Tried again', ar: 'حاولت من جديد' },
  erlStickerFirstFinish: { en: 'First finish', ar: 'أول إنجاز' },
  erlStickerRead10: { en: 'Read 10 stories', ar: 'قرأت 10 قصص' },
  erlStickerCounted200: { en: 'Counted to 200', ar: 'عددت حتى 200' },
  erlStickerTwoWeeks: { en: 'Two weeks in a row', ar: 'أسبوعان متتاليان' },
} satisfies Record<string, Phrase>
