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

  dsNotBuilt: { en: 'Open questions', ar: 'أسئلة مفتوحة' },
  dsNotBuiltNote: {
    en: 'Not missing components. Decisions a component cannot make on its own, listed so they are answered rather than rediscovered.',
    ar: 'ليست مكوّنات ناقصة، بل قرارات لا يستطيع المكوّن حسمها وحده، مذكورة ليُجاب عنها لا لتُكتشف من جديد.',
  },
  dsOpenHijri: {
    en: 'The date picker is Gregorian only. Every academic date in Lebanon, the Gulf and Jordan is Gregorian, but holidays, Ramadan timetables and the shortened school day are Hijri. Whether a parent sees both needs an answer from editorial before anyone builds a dual calendar.',
    ar: 'منتقي التواريخ ميلادي فقط. فكل تاريخ دراسي في لبنان والخليج والأردن ميلادي، لكن العطل وجداول رمضان واليوم الدراسي المختصر هجرية. وما إذا كان ولي الأمر يرى الاثنين يحتاج جواباً من القسم التحريري قبل أن يبني أحد تقويماً مزدوجاً.',
  },
  dsOpenNumerals: {
    en: 'Numerals are Latin in Arabic, following formatDate. That matches how timetables and exam papers are printed across the three markets, and it is a convention worth confirming once rather than per screen.',
    ar: 'الأرقام لاتينية في العربية، تبعاً لـ ‎formatDate‎. وهذا يطابق طريقة طباعة الجداول وأوراق الامتحانات في الأسواق الثلاثة، وهو عرف يستحق تثبيته مرة واحدة لا في كل شاشة.',
  },
  dsOpenUpload: {
    en: 'The file upload holds files in state and sends them nowhere. That is correct for a studio and the first thing to change in the real build.',
    ar: 'رفع الملفات يحتفظ بالملفات في الحالة ولا يرسلها إلى أي مكان. وهذا صحيح في الاستوديو، وأول ما يتغير في البناء الحقيقي.',
  },
  dsMigrationNote: {
    en: 'Migration done: all seven hand written save confirmations and twenty three hand drawn progress bars now use the shared components. Three bars were deliberately left alone, including the one in the early tier, which counts filled blocks because three of three is countable by a six year old and 67% is not.',
    ar: 'اكتمل النقل: جميع تأكيدات الحفظ السبعة المكتوبة يدوياً وثلاثة وعشرون شريط تقدم مرسوماً يدوياً تستخدم الآن المكوّنات المشتركة. وتُركت ثلاثة أشرطة عمداً، منها شريط الفئة المبكرة الذي يعدّ مربعات ممتلئة، لأن ثلاثة من ثلاثة يعدّها طفل في السادسة أما ٦٧٪ فلا.',
  },

  // The calendar comparison. Three variants, one decision.
  calCompareTitle: { en: 'Choosing the calendar', ar: 'اختيار التقويم' },
  calCompareSubtitle: {
    en: 'Two grids that look the same. One knows nothing about the school. The other knows everything and keeps it out of the cells.',
    ar: 'شبكتان تبدوان متطابقتين. إحداهما لا تعرف شيئاً عن المدرسة، والأخرى تعرف كل شيء وتبقيه خارج الخانات.',
  },
  calWhyTitle: { en: 'How this got quiet', ar: 'كيف صار هادئاً' },
  calWhyBody: {
    en: 'The first pass showed its knowledge inside the cells: a tint across Ramadan, a strike through closures, dots for workload. The verdict was that the plain one looked right and the clever ones looked cluttered, but that the knowledge was the point. Both are true, and together they describe a better component than any of the three. Try 10 March below. The grid barely moves and the message is unmissable.',
    ar: 'في المحاولة الأولى كانت المعرفة داخل الخانات: لون عبر رمضان، وشطب على الإغلاقات، ونقاط للعبء. وكان الحكم أن الشكل المجرد هو الصحيح وأن الأشكال الذكية مزدحمة، لكن المعرفة هي المقصد. وكلا الأمرين صحيح، ومعاً يصفان مكوّناً أفضل من الثلاثة جميعاً. جرّب ١٠ آذار أدناه: تكاد الشبكة لا تتغير والرسالة لا تُفوَّت.',
  },

  calVariantPlainTitle: { en: 'Plain', ar: 'مجرد' },
  calVariantPlainBlurb: {
    en: 'Dates and nothing else. What every library ships. A deadline can land in the Easter break and the platform will not mention it.',
    ar: 'تواريخ لا غير، وهو ما تقدمه كل المكتبات الجاهزة. وقد يقع موعد التسليم في عطلة الفصح دون أن تنبّه المنصة إلى ذلك.',
  },

  calVariantAwareTitle: { en: 'Aware, and quiet about it', ar: 'واعٍ، وهادئ' },
  calVariantAwareBlurb: {
    en: 'Knows the term, the closures and what is already due. Says it in three places, none of them a cell: a closed day is dimmed, the month names what it holds in one line, and the field speaks only when the chosen date is a problem.',
    ar: 'يعرف الفصل والإغلاقات وما هو مستحق أصلاً. ويقولها في ثلاثة مواضع ليس بينها خانة: اليوم المغلق يخفت، والشهر يسمّي ما فيه في سطر واحد، والحقل لا يتكلم إلا حين يكون التاريخ المختار مشكلة.',
  },

  calMonthViewTitle: { en: 'The same grid as a month view', ar: 'الشبكة نفسها كعرض شهري' },
  calMonthViewBlurb: {
    en: 'One component, a larger size. A cell 64px tall has room for a word and a person looking at a month view came to read it, so here the grid may speak. This is why the choice is a prop and not three files: the calendar screens inherit it.',
    ar: 'المكوّن نفسه بحجم أكبر. فالخانة بارتفاع ٦٤ بكسل تتسع لكلمة، ومن يفتح عرضاً شهرياً جاء ليقرأ، فيُسمح للشبكة هنا أن تتكلم. ولهذا كان الاختيار خاصية لا ثلاثة ملفات: فشاشات التقويم ترثه.',
  },

  /*
    What applying the grid actually bought.

    Worth stating plainly on the page rather than only in the commit log,
    because it is the argument for shared components in general and this is the
    only place a reader meets the evidence.
  */
  calAppliedTitle: { en: 'Where the grid is used', ar: 'أين تُستخدم هذه الشبكة' },
  calAppliedBlurb: {
    en: 'Four places, one component. Teacher > Calendar and Student > Calendar were each a hand written month grid until the shared one replaced them, and the date picker and Teacher > Assign activity use the same grid in its compact size.',
    ar: 'أربعة مواضع ومكوّن واحد. فشاشتا «المعلم ← التقويم» و«الطالب ← التقويم» كانت كل منهما شبكة شهرية مكتوبة يدوياً إلى أن حلّت محلهما الشبكة المشتركة، ويستخدم منتقي التواريخ و«المعلم ← إسناد نشاط» الشبكة نفسها بحجمها المضغوط.',
  },
  calAppliedBug1: {
    en: 'Both screens hardcoded a Monday to Sunday weekday row, so the Arabic build showed correct Arabic in the wrong columns. The week now comes from the school, which is the harder half of the fix: reading it from the language instead would still have put Amman on a Beirut week.',
    ar: 'كانت الشاشتان تثبّتان صف الأيام من الإثنين إلى الأحد، فظهرت في النسخة العربية كلمات عربية صحيحة في أعمدة خاطئة. والأسبوع الآن يأتي من المدرسة، وهذا هو النصف الأصعب من الإصلاح: فقراءته من اللغة كانت ستضع عمّان على أسبوع بيروت.',
  },
  calAppliedBug2: {
    en: 'Both drew 28 cells with no leading blanks, under a comment noting that February 2027 happens to start on a Monday. True for exactly that month in exactly that week convention.',
    ar: 'وكانت كل منهما ترسم ٢٨ خانة بلا فراغات في البداية، مع تعليق يوضح أن شباط ٢٠٢٧ يبدأ صدفةً يوم إثنين. وهذا صحيح لذلك الشهر وحده وبذلك التقويم الأسبوعي وحده.',
  },
  calAppliedBug3: {
    en: 'The previous and next month arrows on both screens had no click handler. They were decoration, and the fixed month in each subtitle was what kept that from showing.',
    ar: 'ولم يكن لسهمَي الشهر السابق والتالي في الشاشتين أي معالج نقر. كانا زينة، والشهر الثابت في العنوان الفرعي هو ما أخفى ذلك.',
  },

  /*
    The second question for the branches, alongside the lunar dates.

    It sits in the same warning card because it is the same kind of question:
    neither of these is ours to settle, and both are wrong by default until a
    branch answers.
  */
  calRegionBody: {
    en: 'The week itself is also regional, and the studio reads it from the school rather than the language. Beirut and Dubai start on Monday and close Saturday and Sunday; Amman, Cairo and Riyadh start on Saturday and close Friday and Saturday. February is شباط in the Levant and فبراير in Egypt and the Gulf. Each branch needs to confirm its own week and month names, and the UAE in particular changed to a Monday to Friday week in January 2022.',
    ar: 'والأسبوع نفسه إقليمي، والاستوديو يقرأه من المدرسة لا من اللغة. فبيروت ودبي تبدآن الإثنين وتغلقان السبت والأحد، وعمّان والقاهرة والرياض تبدأ السبت وتغلق الجمعة والسبت. وشهر شباط في المشرق هو فبراير في مصر والخليج. وعلى كل فرع أن يؤكد أسبوعه وأسماء أشهره، والإمارات تحديداً انتقلت إلى أسبوع من الإثنين إلى الجمعة في كانون الثاني ٢٠٢٢.',
  },

  calLunarTitle: { en: 'Before this ships', ar: 'قبل الإطلاق' },
  calLunarBody: {
    en: 'Ramadan and Eid here are computed estimates for 1448 AH, marked approximate in the data. Their real dates depend on moon sighting, are declared per country, and differ between Lebanon, the UAE and Jordan. They must come from each branch, and the interface has to be able to say "around" rather than implying certainty.',
    ar: 'رمضان والعيد هنا تقديرات محسوبة لعام ١٤٤٨ هـ، ومعلَّمة في البيانات بأنها تقريبية. فتواريخها الحقيقية تعتمد على رؤية الهلال، وتُعلَن في كل بلد على حدة، وتختلف بين لبنان والإمارات والأردن. ويجب أن تأتي من كل فرع، وأن تكون الواجهة قادرة على قول «نحو» لا أن توحي باليقين.',
  },

  /*
    The browser's own furniture, now ours.

    On the component states page rather than the tokens page, because these are
    states: they are what the interface looks like while somebody is selecting,
    scrolling, filling or tabbing through it, and none of them appear in a
    screenshot of a page at rest. That is why they survived ninety four screens.
  */
  dsBrowserChrome: { en: 'What the browser draws', ar: 'ما يرسمه المتصفح' },
  dsBrowserChromeNote: {
    en: 'Six defaults that were still Chrome’s. None is serious alone, which is why they lasted twelve roles. Together they are the difference between a product and a prototype. They live in index.css, not in a component, so a developer who restyles one of these is restyling all ninety four screens.',
    ar: 'ستة إعدادات افتراضية بقيت على حالها في كروم. ولا واحد منها خطير بمفرده، ولهذا بقيت عبر اثني عشر دوراً. لكنها مجتمعة هي الفرق بين منتج ونموذج أولي. وهي في index.css لا في مكوّن، فمن يغيّر واحداً منها يغيّر الشاشات الأربع والتسعين كلها.',
  },
  dsChromeSelection: {
    en: 'Selection. Was system blue, which is the one colour the palette does not contain. Now York yellow on black on staff screens, and the learner teal inside .learner-scope, because the youngest tier has no yellow in it at all.',
    ar: 'التحديد. كان أزرق النظام، وهو اللون الوحيد غير الموجود في اللوحة. وصار أصفر يورك على أسود في شاشات العاملين، والأخضر المزرق داخل learner-scope، لأن الفئة الأصغر لا تحوي الأصفر إطلاقاً.',
  },
  dsChromeScrollbar: {
    en: 'Scrollbars. Styled twice on purpose: scrollbar-color is the standard that Firefox and recent Chrome read, and the ::-webkit- pseudo-elements cover the Safari and older Chrome that schools in all three markets still run. One alone leaves a grey system bar for some of our users.',
    ar: 'أشرطة التمرير. مُنسَّقة مرتين عن قصد: فخاصية scrollbar-color هي المعيار الذي يقرأه فايرفوكس وكروم الحديث، وعناصر webkit الزائفة تغطي سفاري وكروم الأقدم التي ما زالت المدارس في الأسواق الثلاثة تستخدمها. وواحدة بمفردها تترك شريطاً رمادياً لبعض مستخدمينا.',
  },
  dsChromeAutofill: {
    en: 'Autofill. Chrome paints its own pale yellow and ignores background-color outright, so the override is a 1000px inset shadow plus -webkit-text-fill-color. It matters more here than it usually would: that yellow is close enough to York yellow to look like a field we highlighted on purpose.',
    ar: 'الملء التلقائي. يرسم كروم أصفره الباهت ويتجاهل background-color تماماً، فالتجاوز ظلٌّ داخلي بعرض ١٠٠٠ بكسل مع webkit-text-fill-color. وهذا أهم هنا من المعتاد: فذلك الأصفر قريب من أصفر يورك إلى حد يجعل الحقل يبدو وكأننا أبرزناه عمداً.',
  },
  dsChromeFocus: {
    en: 'Focus. A fallback ring for anything not wrapped in one of our components: links in prose, skip targets, native controls. :focus-visible rather than :focus, so a mouse click leaves nothing behind.',
    ar: 'التركيز. حلقة احتياطية لكل ما ليس داخل أحد مكوّناتنا: الروابط في النص، وأهداف التخطي، والعناصر الأصلية. بخاصية focus-visible لا focus، فلا تترك نقرة الفأرة أثراً.',
  },
  dsChromeMotion: {
    en: 'Reduced motion. Honours the system setting, which is WCAG 2.2 and is cheap now and expensive once a hundred components each own a transition. Durations go near zero rather than zero, so animations still fire their completion events and nothing waiting on one hangs.',
    ar: 'تقليل الحركة. يحترم إعداد النظام، وهو من متطلبات WCAG 2.2، ورخيص الآن وباهظ حين تملك مئة مكوّن انتقالاتها. والمدد تقترب من الصفر لا تساويه، فتُطلق الحركات أحداث انتهائها ولا يتعلق شيء ينتظرها.',
  },
  dsChromeTouch: {
    en: 'Touch and rotation. The grey flash a tap leaves on a touch screen is gone, since every button already has a pressed state, and iOS no longer inflates body text when a phone turns to landscape.',
    ar: 'اللمس والتدوير. اختفى الوميض الرمادي الذي تتركه اللمسة على الشاشة، فلكل زر حالة ضغط أصلاً، ولم تعد iOS تكبّر نص الصفحة عند تدوير الهاتف أفقياً.',
  },

  // Components added later on 7 November
  dsRadioGroup: { en: 'Radio group', ar: 'مجموعة الاختيار' },
  dsDatePicker: { en: 'Date picker', ar: 'منتقي التواريخ' },
  dsFileUpload: { en: 'File upload', ar: 'رفع الملفات' },

  dsRadioNote: {
    en: 'Native inputs, not a Radix primitive. Grouped radios already give one tab stop, arrow key selection, wrapping at the ends and reversed arrows in RTL, and a hand rolled roving tabindex usually gets one of those four wrong.',
    ar: 'عناصر إدخال أصلية لا من Radix. فأزرار الاختيار المجمّعة تعطي محطة تنقل واحدة، واختياراً بأسهم لوحة المفاتيح، والتفافاً عند الطرفين، وعكساً للأسهم في العربية، والتنفيذ اليدوي يخطئ عادة في إحدى هذه الأربع.',
  },
  dsDateNote: {
    en: 'The weekday order and the first day of the week come from Intl, not a table. Saturday starts the week in much of the region and Monday does in the UK, so hardcoding either would be wrong half the time.',
    ar: 'ترتيب أيام الأسبوع وأول يوم فيه يأتيان من ‎Intl‎ لا من جدول. فالسبت يبدأ الأسبوع في معظم المنطقة والاثنين في بريطانيا، وتثبيت أيهما يكون خطأ في نصف الحالات.',
  },
  dsUploadNote: {
    en: 'A real file input behind the drop zone, so Tab reaches it and Space opens the dialog. Drag and drop is an addition, never the only way in. A rejected file is named and explained rather than dropped quietly, which is how a person ends up believing they uploaded their spreadsheet.',
    ar: 'عنصر إدخال ملفات حقيقي خلف منطقة الإفلات، فيصله مفتاح التنقل ويفتحه مفتاح المسافة. والسحب والإفلات إضافة لا الطريق الوحيد. والملف المرفوض يُسمّى ويُفسَّر لا يُسقَط بصمت، فالصمت هو ما يجعل الشخص يظن أنه رفع جدوله.',
  },
  dsRadioTermLabel: { en: 'When do reports close?', ar: 'متى تُقفل التقارير؟' },
  dsRadioTermHint: {
    en: 'Applies to every class in the school.',
    ar: 'ينطبق على كل صفوف المدرسة.',
  },
  dsRadioEndOfTerm: { en: 'End of term', ar: 'نهاية الفصل' },
  dsRadioEndOfTermHint: { en: '2 April 2027', ar: '٢ نيسان ٢٠٢٧' },
  dsRadioTwoWeeks: { en: 'Two weeks after', ar: 'بعد أسبوعين' },
  dsRadioTwoWeeksHint: { en: 'Gives teachers a marking window', ar: 'يمنح المعلمين مهلة للتصحيح' },
  dsRadioNever: { en: 'Leave open', ar: 'اتركها مفتوحة' },
  dsDueDate: { en: 'Due date', ar: 'تاريخ التسليم' },
  dsPickDate: { en: 'Pick a date', ar: 'اختر تاريخاً' },

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
