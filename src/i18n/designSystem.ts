import type { Phrase } from './types'

/**
 * Phrases for the two design system screens.
 *
 * Note what is deliberately absent: variant names, prop names and class
 * strings. `variant="accent"` and `bg-primary/90` are code, and a developer
 * reading the Arabic build still types them in English. Translating them would
 * produce a spec that cannot be copied from, which is the one thing these two
 * screens exist to be.
 */
export const designSystem = {
  // Component states
  dsComponents: { en: 'Component states', ar: 'حالات المكونات' },
  dsComponentsSubtitle: {
    en: 'Every component in every state, with the class or prop that produces it.',
    ar: 'كل مكوّن في كل حالاته، مع الصنف أو الخاصية التي تنتجها.',
  },
  dsColState: { en: 'State', ar: 'الحالة' },
  dsColExample: { en: 'Example', ar: 'مثال' },
  dsColCode: { en: 'Code', ar: 'الشيفرة' },

  dsStateRest: { en: 'Rest', ar: 'السكون' },
  dsStateHover: { en: 'Hover', ar: 'التحويم' },
  dsStateFocus: { en: 'Focus visible', ar: 'التركيز الظاهر' },
  dsStateDisabled: { en: 'Disabled', ar: 'معطّل' },
  dsStateChecked: { en: 'Checked', ar: 'محدّد' },
  dsStateUnchecked: { en: 'Unchecked', ar: 'غير محدّد' },
  dsStateIndeterminate: { en: 'Indeterminate', ar: 'غير محسوم' },
  dsStateOn: { en: 'On', ar: 'مفعّل' },
  dsStateOff: { en: 'Off', ar: 'غير مفعّل' },
  dsStateActive: { en: 'Active', ar: 'نشط' },
  dsStatePlaceholder: { en: 'Placeholder', ar: 'نص إرشادي' },
  dsStateFilled: { en: 'Filled', ar: 'معبّأ' },
  dsStateError: { en: 'Error', ar: 'خطأ' },
  dsStateSelected: { en: 'Selected row', ar: 'صف محدّد' },
  dsStateWithIcon: { en: 'With icon', ar: 'مع أيقونة' },
  dsStateAsLink: { en: 'As a link', ar: 'كرابط' },
  dsStateEmphasis: { en: 'Needs attention', ar: 'يحتاج انتباهاً' },

  // Sample button labels. They live here rather than in `common` because they
  // are filler on a spec page, not words the product says anywhere.
  dsSampleDelete: { en: 'Delete', ar: 'حذف' },
  dsSampleAdd: { en: 'Add', ar: 'إضافة' },

  dsForcedNote: {
    en: 'Hover and focus cannot be captured in a static page, so those rows apply the resulting classes directly. The code column shows the real rule.',
    ar: 'لا يمكن التقاط التحويم والتركيز في صفحة ثابتة، لذا تطبّق هذه الصفوف الأصناف الناتجة مباشرة. ويعرض عمود الشيفرة القاعدة الحقيقية.',
  },

  dsButtons: { en: 'Button', ar: 'الأزرار' },
  dsButtonVariants: { en: 'Variants', ar: 'الأنماط' },
  dsButtonSizes: { en: 'Sizes', ar: 'المقاسات' },
  dsBadges: { en: 'Badge', ar: 'الشارات' },
  dsStatusBadges: { en: 'Status badge', ar: 'شارة الحالة' },
  dsInputs: { en: 'Input', ar: 'حقول الإدخال' },
  dsCheckbox: { en: 'Checkbox', ar: 'مربع الاختيار' },
  dsSwitch: { en: 'Switch', ar: 'المفتاح' },
  dsTabs: { en: 'Tabs', ar: 'التبويبات' },
  dsTable: { en: 'Table', ar: 'الجداول' },
  dsCards: { en: 'Card', ar: 'البطاقات' },
  dsStatCard: { en: 'Stat card', ar: 'بطاقة الرقم' },
  dsLearnerTier: { en: 'Learner tier, K1 to Grade 3', ar: 'فئة المتعلم، الروضة إلى الثالث' },
  dsLearnerTierNote: {
    en: 'The same components inside .learner-scope. Larger radius, teal primary, warm surface. No red and no percentages anywhere in this tier.',
    ar: 'المكونات نفسها داخل ‎.learner-scope‎. زوايا أوسع، ولون أساسي أزرق مخضر، وسطح دافئ. ولا أحمر ولا نسب مئوية في هذه الفئة إطلاقاً.',
  },

  dsNotBuilt: { en: 'Still missing', ar: 'ما زال ناقصاً' },
  dsNotBuiltNote: {
    en: 'Listed so nobody assumes these exist. Everything above this line is written and in the repository.',
    ar: 'مذكورة هنا حتى لا يفترض أحد وجودها. وكل ما فوق هذا السطر مكتوب وموجود في المستودع.',
  },
  dsMissingRadio: {
    en: 'No radio group. Screens that needed one used a row of buttons, which is not the same thing to a screen reader.',
    ar: 'لا توجد مجموعة أزرار اختيار. والشاشات التي احتاجت واحدة استخدمت صف أزرار، وهو ليس الشيء نفسه لقارئ الشاشة.',
  },
  dsMissingDatePicker: {
    en: 'No date picker. Due dates are typed. Both calendars and both numeral systems are a real decision, not a component choice.',
    ar: 'لا يوجد منتقي تواريخ. وتواريخ التسليم تُكتب يدوياً. فالتقويمان ونظاما الأرقام قرار حقيقي لا مجرد اختيار مكوّن.',
  },
  dsMissingFileUpload: {
    en: 'No file upload. The bulk import screen draws its own drop zone and it does not accept a real file.',
    ar: 'لا يوجد رفع ملفات. وشاشة الاستيراد المجمّع ترسم منطقة إفلات خاصة بها ولا تقبل ملفاً حقيقياً.',
  },
  dsMigrationNote: {
    en: 'Seven screens wrote their own save confirmation before SavedIndicator existed, and twelve drew their own progress bar. Both now have one definition. Migrating the existing screens onto them is a separate pass, not done.',
    ar: 'سبع شاشات كتبت تأكيد الحفظ الخاص بها قبل وجود ‎SavedIndicator‎، واثنتا عشرة رسمت شريط تقدمها. ولكليهما الآن تعريف واحد. ونقل الشاشات القائمة إليهما مرحلة منفصلة لم تُنفّذ بعد.',
  },

  // Components added 7 November
  dsSelect: { en: 'Select', ar: 'القائمة المنسدلة' },
  dsDialog: { en: 'Dialog', ar: 'الحوار' },
  dsTooltip: { en: 'Tooltip', ar: 'التلميح' },
  dsPopover: { en: 'Popover', ar: 'النافذة المنبثقة' },
  dsDropdown: { en: 'Dropdown menu', ar: 'قائمة الإجراءات' },
  dsProgress: { en: 'Progress', ar: 'شريط التقدم' },
  dsAvatar: { en: 'Avatar', ar: 'الصورة الرمزية' },
  dsSeparator: { en: 'Separator', ar: 'الفاصل' },
  dsFeedback: { en: 'Toast and save confirmation', ar: 'التنبيه وتأكيد الحفظ' },

  dsStateLoading: { en: 'Loading', ar: 'جارٍ التنفيذ' },
  dsStateOpen: { en: 'Open it', ar: 'افتحه' },
  dsStateHoverMe: { en: 'Hover or focus', ar: 'حوّم أو ركّز' },
  dsStateInline: { en: 'Inline, beside the control', ar: 'بجانب عنصر التحكم' },
  dsStateCorner: { en: 'Corner, after the fact', ar: 'في الزاوية، بعد الحدث' },

  dsSelectNote: {
    en: 'Radix rather than a native select, so an option can carry two lines. The list takes the trigger width and flips side in Arabic on its own.',
    ar: 'من Radix لا من العنصر الأصلي، ليتسع الخيار لسطرين. وتأخذ القائمة عرض الزر وتنقلب جهتها في العربية من تلقاء نفسها.',
  },
  dsDialogNote: {
    en: 'Focus moves in and is trapped, Escape closes, the page behind is inert, focus returns to whatever opened it. The close button takes its name as a required prop so it cannot ship English into Arabic.',
    ar: 'ينتقل التركيز إلى الداخل ويُحتجز، ومفتاح الهروب يغلق، والصفحة خلفه معطّلة، ويعود التركيز إلى ما فتحه. ويأخذ زر الإغلاق اسمه كخاصية إلزامية حتى لا تتسرب الإنجليزية إلى العربية.',
  },
  dsTooltipNote: {
    en: 'A hint, never the only place something lives. It does not appear on touch and it does not reach a screen reader that is reading rather than focusing.',
    ar: 'تلميح، لا المكان الوحيد للمعلومة. فهو لا يظهر باللمس ولا يصل إلى قارئ الشاشة حين يقرأ دون تركيز.',
  },
  dsProgressNote: {
    en: 'The label is a required prop. A bare bar announces a number with no subject, which passes an automated audit and means nothing to the person listening.',
    ar: 'التسمية خاصية إلزامية. فالشريط المجرد يعلن رقماً بلا موضوع، وهو ما يجتاز الفحص الآلي ولا يعني شيئاً لمن يسمعه.',
  },
  dsFeedbackNote: {
    en: 'Two components, deliberately. A save is confirmed where the action was. The corner is for something that finished after the person moved on. The live region is mounted empty from first paint, because a region created at the same moment as its message is never announced.',
    ar: 'مكوّنان، عن قصد. فالحفظ يُؤكَّد في موضع الإجراء، والزاوية لما انتهى بعد أن انتقل الشخص. والمنطقة الحيّة مثبتة فارغة منذ أول رسم، لأن المنطقة التي تُنشأ مع رسالتها لا تُعلَن أبداً.',
  },
  dsToastDemo: { en: 'Show a toast', ar: 'أظهر تنبيهاً' },
  dsSavedDemo: { en: 'Save', ar: 'احفظ' },
  dsTooltipDemo: { en: 'Explains the control it sits on', ar: 'يشرح العنصر الذي يقف عليه' },
  dsDialogTitle: { en: 'Remove this student from the class?', ar: 'إزالة هذا الطالب من الصف؟' },
  dsDialogBody: {
    en: 'Their work and grades stay in the gradebook. They lose access to the course from the next sign in.',
    ar: 'تبقى أعماله ودرجاته في سجل الدرجات، ويفقد الوصول إلى المقرر من تسجيل الدخول التالي.',
  },
  dsPopoverBody: {
    en: 'For content a person works with. If they only read it, that is a tooltip.',
    ar: 'لمحتوى يتفاعل معه الشخص. وإن كان للقراءة فقط فذلك تلميح.',
  },
  dsMenuEdit: { en: 'Edit', ar: 'تعديل' },
  dsMenuDuplicate: { en: 'Duplicate', ar: 'تكرار' },
  dsMenuRemove: { en: 'Remove', ar: 'إزالة' },
  dsPickClass: { en: 'Pick a class', ar: 'اختر صفاً' },

  // Tokens
  dsTokens: { en: 'Design tokens', ar: 'رموز التصميم' },
  dsTokensSubtitle: {
    en: 'The values behind every screen. Defined once in src/index.css, read through Tailwind.',
    ar: 'القيم التي تقوم عليها كل شاشة. تُعرَّف مرة واحدة في ‎src/index.css‎ وتُقرأ عبر Tailwind.',
  },
  dsColToken: { en: 'Token', ar: 'الرمز' },
  dsColValue: { en: 'Value', ar: 'القيمة' },
  dsColUse: { en: 'Used for', ar: 'يُستخدم لـ' },
  dsColSample: { en: 'Sample', ar: 'عيّنة' },
  dsColClass: { en: 'Class', ar: 'الصنف' },

  dsColourSurfaces: { en: 'Surfaces and text', ar: 'الأسطح والنصوص' },
  dsColourBrand: { en: 'Brand', ar: 'العلامة' },
  dsColourStatus: { en: 'Status', ar: 'الحالات' },
  dsColourLearner: { en: 'Learner tier', ar: 'فئة المتعلم' },
  dsTypeScale: { en: 'Type scale', ar: 'سلم الخطوط' },
  dsRadiusShadow: { en: 'Radius and shadow', ar: 'الزوايا والظلال' },
  dsSpacing: { en: 'Spacing', ar: 'المسافات' },
  dsFonts: { en: 'Typefaces', ar: 'الخطوط' },

  dsUseBackground: { en: 'Page behind the content', ar: 'خلفية الصفحة' },
  dsUseSurface: { en: 'Cards, sidebars, table headers', ar: 'البطاقات والأشرطة الجانبية ورؤوس الجداول' },
  dsUseSurfaceSunken: { en: 'Wells and inset areas', ar: 'المناطق الغائرة' },
  dsUseForeground: { en: 'Body text and headings', ar: 'النصوص والعناوين' },
  dsUseMuted: { en: 'Quiet fills', ar: 'التعبئات الهادئة' },
  dsUseMutedFg: { en: 'Secondary and label text', ar: 'النصوص الثانوية والعناوين الفرعية' },
  dsUseBorder: { en: 'Default lines', ar: 'الخطوط الافتراضية' },
  dsUseBorderStrong: { en: 'Control outlines', ar: 'حدود عناصر التحكم' },
  dsUseRing: { en: 'Focus ring', ar: 'حلقة التركيز' },
  dsUsePrimary: { en: 'Primary buttons and checked controls', ar: 'الأزرار الأساسية والعناصر المحدّدة' },
  dsUseAccent: { en: 'The one primary action on a screen', ar: 'الإجراء الأساسي الوحيد في الشاشة' },
  dsUseSuccess: { en: 'On track', ar: 'على المسار' },
  dsUseWarning: { en: 'Watch', ar: 'للمتابعة' },
  dsUseDanger: { en: 'At risk, staff screens only', ar: 'متعثر، في شاشات الطاقم فقط' },
  dsUseTint: { en: 'Pill backgrounds', ar: 'خلفيات الشارات' },
  dsUseLearnerSurface: { en: 'Early tier page', ar: 'صفحة الفئة المبكرة' },
  dsUseLearnerSidebar: { en: 'Early tier cards', ar: 'بطاقات الفئة المبكرة' },
  dsUseLearnerPrimary: { en: 'Early tier actions and stars', ar: 'إجراءات الفئة المبكرة ونجومها' },
  dsUseLearnerNext: { en: 'The next thing to do', ar: 'الخطوة التالية' },

  dsAccentRule: {
    en: 'Yellow is an accent and never a surface on staff screens. One accent action per screen, or it stops reading as emphasis.',
    ar: 'الأصفر لون إبراز لا سطح في شاشات الطاقم. إجراء مُبرز واحد لكل شاشة، وإلا فقد معناه.',
  },
  dsNoRedRule: {
    en: 'The danger colour never appears in the learner tier. A six year old does not need to be told they are at risk in red.',
    ar: 'لون الخطر لا يظهر في فئة المتعلم إطلاقاً. فالطفل في السادسة لا يحتاج أن يُقال له بالأحمر إنه متعثر.',
  },
  dsFontNote: {
    en: 'One family covers both scripts, so a mixed Arabic and English line does not change typeface mid sentence.',
    ar: 'عائلة خطوط واحدة تغطي النصين، فلا يتغير الخط في منتصف الجملة عند خلط العربية والإنجليزية.',
  },
  dsTabularNote: {
    en: 'Any figure in a column carries .tabular so the digits line up.',
    ar: 'كل رقم في عمود يحمل ‎.tabular‎ لتتراصف الخانات.',
  },
} satisfies Record<string, Phrase>
