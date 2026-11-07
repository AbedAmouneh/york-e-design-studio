import type { Phrase } from './types'

/**
 * Copy for the coordinator screens. English and Arabic side by side so a missing
 * translation is a type error rather than an English word on an Arabic page.
 *
 * Placeholders are `{n}`, `{m}` and `{c}`, filled by the component with
 * `.replace()`. A whole sentence per key rather than glued fragments, because
 * Arabic puts the number, the noun and the verb in a different order.
 *
 * The three coverage marks carry the weight of the standards screen and the
 * Arabic has to keep them apart: مغطّى is taught and assessed, جزئياً is taught
 * but not yet assessed, لم يُدرَّس بعد is not taught at all. Blurring those into
 * one word would make the grid worthless to the person who has to defend it to
 * a ministry inspector.
 */
export const coordinator = {
  // Role
  coRoleTitle: { en: 'Mathematics coordinator', ar: 'منسق الرياضيات' },
  coSubjectMathematics: { en: 'Mathematics', ar: 'الرياضيات' },

  // Overview
  coOverviewSubtitle: {
    en: '{n} classes · {m} teachers · Term 2, week 5',
    ar: '{n} صفوف · {m} معلمين · الفصل الثاني، الأسبوع الخامس',
  },
  coAcrossAllMyClasses: { en: 'Across all my classes', ar: 'في كل صفوفي' },
  coClassesBehindPlan: { en: 'Classes behind plan', ar: 'صفوف متأخرة عن الخطة' },
  coAndJoin: { en: ' and ', ar: ' و' },
  coBehindPlanBanner: {
    en: '{c} is behind the unit plan with two weeks of term left. The end of unit check is set for 12 February in every class.',
    ar: '{c} متأخر عن خطة الوحدة وقد بقي أسبوعان على نهاية الفصل. واختبار نهاية الوحدة محدد في ١٢ شباط في كل الصفوف.',
  },
  coOpenUnitPlan: { en: 'Open the unit plan', ar: 'افتح خطة الوحدة' },
  coCompare: { en: 'Compare', ar: 'قارن' },
  coUnassigned: { en: 'Unassigned', ar: 'غير مُسند' },
  coNLearners: { en: '{n} learners', ar: '{n} طالباً' },
  coPercentOfPlan: { en: '{n}% of plan', ar: '{n}% من الخطة' },
  coNAtRisk: { en: '{n} at risk', ar: '{n} متعثرون' },
  coOverviewNote: {
    en: 'Coverage is measured against the unit plan you set, not against what other coordinators are doing. Teachers are not ranked against each other anywhere in this role.',
    ar: 'تُقاس التغطية مقابل خطة الوحدة التي وضعتها أنت، لا مقابل ما يفعله منسقون آخرون. ولا يُرتَّب المعلمون بعضهم في مواجهة بعض في أي موضع من هذا الدور.',
  },

  // Unit plans
  coUnitPlansSubtitle: {
    en: 'Mathematics, Grade 6 · applies to all four classes',
    ar: 'الرياضيات، الصف السادس · تنطبق على الصفوف الأربعة',
  },
  coAddUnit: { en: 'Add a unit', ar: 'أضف وحدة' },
  coUnitPlaceValue: { en: 'Place value and rounding', ar: 'القيمة المنزلية والتقريب' },
  coUnitFractions: { en: 'Fractions', ar: 'الكسور' },
  coUnitDecimals: {
    en: 'Decimals and percentages',
    ar: 'الكسور العشرية والنسب المئوية',
  },
  coUnitRatio: { en: 'Ratio and proportion', ar: 'النسبة والتناسب' },
  coWeeksU1: { en: '7 Sept to 9 Oct', ar: '٧ أيلول إلى ٩ تشرين الأول' },
  coWeeksU2: { en: '25 Jan to 19 Feb', ar: '٢٥ كانون الثاني إلى ١٩ شباط' },
  coWeeksU3: { en: '22 Feb to 19 Mar', ar: '٢٢ شباط إلى ١٩ آذار' },
  coWeeksU4: { en: '19 Apr to 21 May', ar: '١٩ نيسان إلى ٢١ أيار' },
  coRunningNow: { en: 'Running now', ar: 'جارية الآن' },
  coFinished: { en: 'Finished', ar: 'منتهية' },
  coPlanned: { en: 'Planned', ar: 'مخططة' },
  coLockSequence: {
    en: 'Lock the sequence and the assessment date',
    ar: 'ثبّت التسلسل وتاريخ التقييم',
  },
  coLockedHint: {
    en: 'Every class covers this in the same order and sits the check on the same day.',
    ar: 'يغطي كل صف هذه الوحدة بالترتيب نفسه ويؤدي الاختبار في اليوم نفسه.',
  },
  coUnlockedHint: {
    en: 'Each teacher orders this unit themselves. The assessment date is still yours.',
    ar: 'يرتّب كل معلم هذه الوحدة بنفسه. أما تاريخ التقييم فيبقى من اختصاصك.',
  },
  coPublishToAllClasses: { en: 'Publish to all classes', ar: 'انشرها إلى كل الصفوف' },
  coPublishedNotified: {
    en: 'Published. Four teachers have been notified.',
    ar: 'تم النشر. أُبلغ أربعة معلمين.',
  },
  coPublishHint: {
    en: 'Teachers see changes to a published plan on their planner immediately.',
    ar: 'يرى المعلمون التعديلات على الخطة المنشورة في مخططهم فوراً.',
  },

  // Standards coverage
  coStandardsSubtitle: {
    en: 'Mathematics · Term 2 to date',
    ar: 'الرياضيات · الفصل الثاني حتى تاريخه',
  },
  coMarkCovered: { en: 'Covered', ar: 'مغطّى' },
  coMarkPartly: { en: 'Partly', ar: 'جزئياً' },
  coMarkNotYet: { en: 'Not yet', ar: 'لم يُدرَّس بعد' },
  coPartlyCovered: { en: 'Partly covered', ar: 'مغطّى جزئياً' },
  coNotYetTaught: { en: 'Not yet taught', ar: 'لم يُدرَّس بعد' },
  coStandardByClass: { en: 'Standard by class', ar: 'المعيار حسب الصف' },
  coNStandards: { en: '{n} standards', ar: '{n} معايير' },
  coColStandard: { en: 'Standard', ar: 'المعيار' },
  coStdPlaceValueMillions: {
    en: 'Place value to millions',
    ar: 'القيمة المنزلية حتى الملايين',
  },
  coStdRounding: { en: 'Rounding and estimation', ar: 'التقريب والتقدير' },
  coStdEquivalentFractions: { en: 'Equivalent fractions', ar: 'الكسور المتكافئة' },
  coStdAddSubtractFractions: {
    en: 'Adding and subtracting fractions',
    ar: 'جمع الكسور وطرحها',
  },
  coStdMultiplyingFractions: { en: 'Multiplying fractions', ar: 'ضرب الكسور' },
  coStdRatioLanguage: { en: 'Ratio language', ar: 'لغة النسبة' },
  coStdPercentagesContext: {
    en: 'Percentages in context',
    ar: 'النسب المئوية في سياق حياتي',
  },
  coStandardsNote: {
    en: 'Covered means taught and assessed. Partly means taught but not yet assessed. A standard that was mentioned in a lesson and never tested does not count as covered.',
    ar: 'مغطّى تعني أن المعيار دُرِّس وقُيِّم. وجزئياً تعني أنه دُرِّس ولم يُقيَّم بعد. أما المعيار الذي ذُكر في درس ولم يُختبر فلا يُعد مغطّى.',
  },

  // Across my classes
  coAcrossSubtitle: {
    en: 'End of unit check, fractions · sat by all four classes on 12 February',
    ar: 'اختبار نهاية الوحدة، الكسور · أدّته الصفوف الأربعة في ١٢ شباط',
  },
  coCorrectByQuestion: { en: 'Correct answers by question', ar: 'الإجابات الصحيحة حسب السؤال' },
  coQ1Equivalent: { en: 'Q1 equivalent', ar: 'س1 التكافؤ' },
  coQ2CommonDenom: { en: 'Q2 common denom', ar: 'س2 المقام المشترك' },
  coQ3Adding: { en: 'Q3 adding', ar: 'س3 الجمع' },
  coQ4Explain: { en: 'Q4 explain', ar: 'س4 التفسير' },
  coQ5WordProblem: { en: 'Q5 word problem', ar: 'س5 مسألة لفظية' },
  coBiggestGaps: { en: 'Biggest gaps between classes', ar: 'أكبر الفجوات بين الصفوف' },
  coPointSpread: { en: '{n} point spread', ar: 'فارق {n} نقطة' },
  coWorthALook: { en: 'Worth a look', ar: 'يستحق النظر' },
  coAcrossInsight: {
    en: 'Questions 2 and 3 both sit around 30 points below the other classes in {c}, and both depend on common denominators. That class is also behind the unit plan, so the likely explanation is sequence rather than teaching.',
    ar: 'يقل السؤالان 2 و3 بنحو 30 نقطة عن بقية الصفوف في {c}، وكلاهما يعتمد على المقامات المشتركة. وهذا الصف متأخر أيضاً عن خطة الوحدة، فالتفسير الأرجح هو التسلسل لا التدريس.',
  },

  // Flagged students
  coFlaggedSubtitle: {
    en: '{n} flagged · {m} struggling in more than one subject',
    ar: '{n} طالباً بحاجة إلى متابعة · {m} يتعثرون في أكثر من مادة',
  },
  coMultiSubjectBanner: {
    en: '{n} students are flagged in two or more subjects. No single teacher can see this pattern, which is why it surfaces here.',
    ar: '{n} طلاب مُبلَّغ عنهم في مادتين أو أكثر. ولا يستطيع معلم بمفرده أن يرى هذا النمط، ولهذا يظهر هنا.',
  },
  coAskTeachersForNote: {
    en: 'Ask their teachers for a note',
    ar: 'اطلب ملاحظة من معلميهم',
  },
  coRaiseWithHead: {
    en: 'Raise with the head of school',
    ar: 'ارفع الأمر إلى مدير المدرسة',
  },
  coRequestedNotes: {
    en: 'Requested notes on {n} students.',
    ar: 'طُلبت ملاحظات عن {n} طالباً.',
  },
  coRaisedWithHead: {
    en: 'Raised {n} students with the head of school.',
    ar: 'رُفع أمر {n} طالباً إلى مدير المدرسة.',
  },
  coFlaggedTitle: { en: 'Flagged', ar: 'بحاجة إلى متابعة' },
  coOneSubject: { en: '{n} subject', ar: '{n} مادة' },
  coNSubjects: { en: '{n} subjects', ar: '{n} مواد' },
  coRaisedAutomatic: { en: 'Automatic', ar: 'تلقائي' },
  coRaisedTeacher: { en: 'Teacher', ar: 'معلم' },
  coFlaggedNote: {
    en: 'Automatic means the platform raised it from the data. Teacher means a person did. Both are shown because they mean different things when you follow them up.',
    ar: 'تلقائي تعني أن المنصة رصدت الأمر من البيانات. ومعلم تعني أن شخصاً رصده. ويظهر الاثنان لأن لكل منهما معنى مختلفاً عند المتابعة.',
  },
} satisfies Record<string, Phrase>
