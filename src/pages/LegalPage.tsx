import { useEffect } from "react"

type LegalPolicy = "terms" | "privacy"
type LegalSection = {
  id: string
  heading: string
  paragraphs?: string[]
  list?: string[]
}

const policies: Record<LegalPolicy, {
  title: string
  introduction: string
  sections: LegalSection[]
}> = {
  terms: {
    title: "Terms of Service",
    introduction:
      "These Terms of Service govern your access to and use of the CaliMind mobile application, its related features and services, and the CaliMind release portal at calimind.iddychesire.me (together, the “Services”). Please read them carefully. By creating an account, selecting the acceptance control during registration, downloading, accessing, or using a Service, you agree to these Terms. If you do not agree, do not use the Services.",
    sections: [
      {
        id: "provider-and-contact",
        heading: "1. Who provides the Services",
        paragraphs: [
          "The CaliMind portal identifies Aventorgo LLC as its developer. In these Terms, “CaliMind,” “we,” “us,” and “our” refer to the operator of the Services, Aventorgo LLC. “You” means the person using the Services or, where applicable, the organization on whose behalf that person is acting.",
          "You can contact the developer through the Contact the developer link on the CaliMind portal. Please include enough information for us to identify the relevant account or issue, but do not send passwords, authentication codes, or sensitive personal information through a general contact form.",
        ],
      },
      {
        id: "eligibility-and-account",
        heading: "2. Eligibility and your account",
        paragraphs: [
          "You must be legally able to enter into a binding agreement where you live. If you are below the age at which you may independently consent to online services or enter contracts in your jurisdiction, you may use the Services only with the involvement and permission of a parent or legal guardian, where permitted by law. The Services are not designed for children to use independently.",
          "Provide accurate information when creating or maintaining an account and keep it up to date. You are responsible for protecting your sign-in credentials and for activity through your account, except to the extent that applicable law says otherwise. Tell us promptly if you believe your account has been accessed without permission.",
          "Do not share an account in a way that compromises its security, impersonate another person, or use someone else’s account without authorization. We may take reasonable steps to protect accounts and the Services, including asking you to verify account access or temporarily restricting activity that appears abusive or unsafe.",
        ],
      },
      {
        id: "service-description",
        heading: "3. The Services",
        paragraphs: [
          "CaliMind is a personal planning tool. Depending on the version, device, settings, and availability, it may let you create and organize tasks, notes, and schedules; review progress; use voice capture; receive local or push reminders; use focus tools and widgets; request optional Aventor Eye suggestions; and hand off event or alarm details to other applications.",
          "The release portal displays release information and lets you request selected downloadable files. Releases, supported devices, features, and integrations may change. We may add, change, suspend, or discontinue a feature, provided we respect rights that cannot legally be limited and give any notice required by law.",
          "The Services may depend on internet access, your device and operating system, app permissions, and third-party services. You are responsible for your device, connectivity, backups where available, and reviewing the requirements for a release before installing it.",
        ],
      },
      {
        id: "your-content",
        heading: "4. Your content and responsibilities",
        paragraphs: [
          "You retain any rights you have in the tasks, notes, schedules, recordings, and other content you submit (“User Content”). You are responsible for your User Content, including its accuracy, legality, and suitability for storage or processing by the Services.",
          "You give us a limited, non-exclusive permission to host, store, transmit, format, and process User Content only as reasonably necessary to provide, secure, troubleshoot, and maintain the features you choose to use, and as otherwise described in the Privacy Policy or required by law. This permission ends when the relevant content is deleted from our systems, subject to backup, security, and legal retention periods described in the Privacy Policy.",
          "Do not submit content that you do not have the right to use, that violates another person’s privacy or intellectual-property rights, or that is unlawful. Avoid placing passwords, payment card details, government identifiers, confidential business material, or other highly sensitive information in task titles, notes, recordings, or prompts.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "5. Acceptable use",
        paragraphs: [
          "Use the Services for lawful personal planning and in accordance with these Terms. You must not, and must not help another person to:",
        ],
        list: [
          "break the law, infringe another person’s rights, or use the Services to harass, threaten, defraud, or harm anyone;",
          "probe, scan, or test the security of the Services, bypass access controls, interfere with their operation, or introduce malware or harmful code;",
          "attempt to gain unauthorized access to another account, system, or data;",
          "scrape, copy, redistribute, or commercially exploit the Services or release files except as permitted by law or an applicable license;",
          "reverse engineer or decompile the Services except where applicable law gives you a right that cannot be excluded by contract; or",
          "use automation or excessive requests in a way that degrades the Services, circumvents reasonable limits, or creates avoidable cost or security risk.",
        ],
      },
      {
        id: "ai-and-planning",
        heading: "6. AI features and planning information",
        paragraphs: [
          "Voice parsing and Aventor Eye use automated systems to interpret information and generate suggestions. Aventor Eye is optional and is off until you enable it. When enabled, the app may send a limited snapshot of relevant task titles, categories, priorities, durations, deadlines or reminder times, schedule blocks, and—only when calendar busy-time access is separately enabled—busy time ranges to the Aventor Eye service for processing by Groq. Task notes, account identifiers, and calendar event titles or descriptions are not included in that Aventor Eye snapshot.",
          "Automated output can be inaccurate, incomplete, unsuitable, or out of date. Treat suggestions as optional organizational aids, not as professional, medical, financial, legal, safety, or emergency advice. Review task details, dates, times, and proposed schedules yourself before relying on them. You remain responsible for decisions and actions based on information shown by the Services.",
          "Do not rely on AI output or a reminder as the sole method for a critical deadline, safety-related activity, medication, emergency, or other matter where an error or missed alert could cause harm.",
        ],
      },
      {
        id: "integrations-reminders",
        heading: "7. Notifications, calendars, and device integrations",
        paragraphs: [
          "Notifications and reminders are best-effort features. Delivery can be delayed, blocked, silenced, or prevented by device permissions, operating-system settings, power management, network conditions, or third-party services. We do not guarantee that a notification, alarm, or reminder will arrive at a particular time.",
          "Calendar-aware planning uses calendar access you grant on your device to identify busy intervals. When you ask CaliMind to prepare a calendar event or phone alarm, it hands details to a compatible application for you to review and confirm. Unless the app reports otherwise, you are responsible for checking that the event or alarm was actually saved in that other application.",
          "Third-party applications and integrations are governed by their own terms, privacy notices, and settings. We do not control whether an external calendar, clock, notification provider, or device feature is available or operates as expected.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "8. CaliMind software and intellectual property",
        paragraphs: [
          "The Services, including their software, design, branding, text, and other materials, are owned by us or our licensors and are protected by intellectual-property laws. Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to use the Services for their intended purpose. This license does not transfer ownership to you.",
          "Third-party software and open-source components may be subject to separate licenses. If a third-party license conflicts with these Terms for that component, the third-party license governs to the extent of the conflict.",
          "If you send suggestions or feedback, you allow us to use them to improve the Services without restriction or payment, provided that this does not transfer ownership of your User Content.",
        ],
      },
      {
        id: "third-party-services",
        heading: "9. Third-party services and links",
        paragraphs: [
          "The Services may rely on or link to third-party services, including hosting, authentication, data storage, AI processing, app stores, release file hosting, calendars, and device notification services. Your use of those services may be subject to separate terms and privacy practices. We are not responsible for third-party services to the extent they are outside our control, and links do not mean that we endorse every third-party statement or product.",
          "For example, the release portal obtains release information and selected files from external release infrastructure. Check the file name, version, publisher, and device compatibility before installing a download.",
        ],
      },
      {
        id: "availability-security",
        heading: "10. Availability, changes, and security",
        paragraphs: [
          "We aim to operate the Services reliably, but cannot promise uninterrupted, error-free, or permanently available access. Maintenance, updates, outages, network conditions, security events, or third-party changes may affect availability. We may release updates and, where reasonably necessary, restrict or suspend access to protect users, the Services, or our systems.",
          "Keep the app reasonably up to date and install it only from sources you trust. No internet-connected service or device can be guaranteed completely secure. We use reasonable measures intended to protect the Services, but you should not treat the Services as an archival or guaranteed backup system.",
        ],
      },
      {
        id: "termination",
        heading: "11. Suspension and termination",
        paragraphs: [
          "You may stop using the Services at any time. You may sign out, disable optional features, uninstall the app, or contact us about closing an account. Uninstalling the app does not necessarily delete information already stored by a backend provider; see the Privacy Policy for data requests.",
          "We may suspend or terminate access where we reasonably believe you have materially breached these Terms, use the Services unlawfully or abusively, create a security risk, or where continued operation is no longer practicable. Where appropriate and legally permitted, we will provide notice and an opportunity to address the issue. Termination does not affect rights or obligations that arose earlier or provisions that by their nature should continue.",
        ],
      },
      {
        id: "warranties",
        heading: "12. Disclaimers",
        paragraphs: [
          "To the fullest extent permitted by applicable law, the Services are provided “as is” and “as available,” without warranties or conditions that the law allows us to disclaim. We do not warrant that the Services will meet every need, that AI output will be accurate, that files will always be available or compatible, or that reminders, integrations, or third-party features will operate without interruption.",
          "Nothing in these Terms excludes or limits a warranty, consumer guarantee, or other right that applicable law does not permit us to exclude or limit. Where a statutory guarantee applies, these Terms operate subject to that guarantee.",
        ],
      },
      {
        id: "liability",
        heading: "13. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by applicable law, we are not liable for indirect, incidental, special, consequential, exemplary, or punitive loss, or for loss of data, profits, goodwill, or business opportunity arising from or related to your use of the Services. This does not apply where such a limitation is prohibited by law.",
          "To the fullest extent permitted by law, our total liability for claims arising from the Services or these Terms is limited to the amount, if any, you paid us directly to use the relevant Service during the 12 months before the event giving rise to the claim. If you paid nothing, the cap is the minimum amount permitted by applicable law. This cap does not apply to liability that cannot legally be limited, including where applicable law prohibits limits for fraud, intentional misconduct, or personal injury caused by negligence.",
          "The Services are planning aids, not a substitute for your own judgment. To the extent permitted by law, we are not responsible for decisions made solely in reliance on a task, schedule, notification, calendar handoff, or AI suggestion without your review.",
        ],
      },
      {
        id: "indemnity",
        heading: "14. Responsibility for claims",
        paragraphs: [
          "To the extent permitted by applicable law, you agree to be responsible for reasonable losses and costs arising from third-party claims caused by your unlawful use of the Services or your material violation of these Terms. This does not require you to indemnify us for our own negligence, wilful misconduct, breach of law, or other liability that cannot legally be shifted to you.",
        ],
      },
      {
        id: "changes-and-law",
        heading: "15. Changes to these Terms and applicable law",
        paragraphs: [
          "We may update these Terms to reflect changes to the Services, security, or legal requirements. We will update the date above and provide additional notice where required by law. If a change materially affects your rights, we will take reasonable steps to bring it to your attention. Continued use after an updated version takes effect means acceptance only where that result is permitted by applicable law; where renewed consent is required, we will request it.",
          "These Terms are subject to the laws and mandatory consumer protections that apply to you. Nothing here deprives you of a right to bring a claim in a court or forum where applicable law gives you that right. Before starting formal proceedings, you may contact us so we can try to resolve the concern informally.",
        ],
      },
      {
        id: "general",
        heading: "16. General terms",
        paragraphs: [
          "If a provision is held invalid or unenforceable, it will be limited only as much as necessary, and the remaining provisions will continue to apply. A failure to enforce a provision is not a waiver of it. You may not transfer your rights under these Terms without our consent; we may transfer them as part of a reorganization or transfer of the Services, subject to applicable law. These Terms and the Privacy Policy describe the agreement relating to the Services, without overriding any separate written agreement or mandatory legal right.",
          "The English-language version controls where permitted by law. Headings are for convenience and do not affect interpretation.",
        ],
      },
      {
        id: "contact",
        heading: "17. Contact",
        paragraphs: [
          "For questions, complaints, or requests relating to these Terms, use the Contact the developer link in the CaliMind portal footer. Please identify the Service and describe the issue without including your password or authentication codes.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    introduction:
      "This Privacy Policy explains how CaliMind handles information when you use the CaliMind mobile application, its related features, and the release portal at calimind.iddychesire.me (together, the “Services”). It describes the information involved, why it is used, when it may be shared, and choices available to you. The actual processing depends on the features you enable, the permissions you grant, and the service providers configured for the Services.",
    sections: [
      {
        id: "who-we-are",
        heading: "1. Who is responsible",
        paragraphs: [
          "The CaliMind portal identifies Aventorgo LLC as the developer. In this Policy, “CaliMind,” “we,” “us,” and “our” refer to the operator of the Services, Aventorgo LLC. Depending on the feature and applicable privacy law, we may act as the organization deciding why and how information is processed, while service providers process information on our behalf.",
          "For privacy questions or requests, use the Contact the developer link in the portal footer. Please do not send passwords, authentication codes, or unnecessary sensitive information through a general contact form.",
        ],
      },
      {
        id: "information-we-handle",
        heading: "2. Information we handle",
        paragraphs: [
          "The information involved depends on how you use CaliMind. It may include:",
        ],
        list: [
          "Account and authentication information, such as your email address, account identifier, sign-in state, and information returned by the authentication provider. If you register, the app records the Terms version and acceptance time in account metadata.",
          "Profile information you choose to provide, such as your name or planning preferences, if those fields are enabled in your app version.",
          "Planning content you create, including task titles, descriptions or notes, categories, priorities, duration, deadlines, reminder times, completion status, schedule blocks, and related activity.",
          "Voice information when you use voice capture. The audio, transcript, or both may be sent to the configured CaliMind Edge Function for transcription or command parsing.",
          "Device and integration information needed for features you enable, such as notification permission state, a push-notification token, calendar busy intervals, or preferences stored on the device.",
          "Technical information generated when the website or services are requested, such as network and request information processed by hosting, security, authentication, and release providers. The portal also requests release metadata and files from external release infrastructure when you browse or download.",
        ],
      },
      {
        id: "sources",
        heading: "3. Where information comes from",
        paragraphs: [
          "Most account and planning information comes directly from you when you register, sign in, create or edit tasks, build a schedule, change settings, or contact support. Authentication providers may return account and session information needed to sign you in.",
          "If you grant calendar access, the Android app reads calendar event times on your device to identify busy intervals for planning. The busy-time feature does not read event titles or descriptions. Calendar event creation is a handoff to a calendar app that you review and confirm; that external app may handle information under its own policy.",
          "Some technical and delivery information is generated by the device, operating system, hosting platform, authentication service, or notification infrastructure as the Services operate.",
        ],
      },
      {
        id: "how-we-use",
        heading: "4. How information is used",
        paragraphs: [
          "We use information as reasonably necessary to:",
        ],
        list: [
          "create and secure accounts, authenticate users, and provide sign-in, recovery, and account-related functions;",
          "store and display tasks, notes, schedules, preferences, and progress that you request;",
          "transcribe or interpret voice input and, if you opt in, generate Aventor Eye planning suggestions;",
          "schedule local reminders, register and deliver push notifications where enabled, and update supported widgets;",
          "support calendar-aware planning and prepare event or alarm handoffs that you choose to initiate;",
          "operate the release portal, provide release information and downloads, and respond to technical problems;",
          "protect the Services, investigate abuse or security incidents, troubleshoot failures, and maintain reliability; and",
          "comply with applicable law, enforce our terms, and respond to valid legal requests.",
        ],
      },
      {
        id: "ai-processing",
        heading: "5. Voice features and Aventor Eye",
        paragraphs: [
          "Voice capture: When you use voice task capture, audio or a transcript needed for the requested feature is sent to the configured CaliMind Edge Function. The function may send it to Groq to transcribe speech or interpret a command. Avoid speaking information you do not want processed by those services. Voice features do not guarantee a correct transcription or task.",
          "Aventor Eye: Aventor Eye is optional and off by default. When you enable it, the app sends a limited snapshot of relevant incomplete task titles, categories, priorities, durations, deadlines or reminder times, schedule blocks, and local date and time to the authenticated Aventor Eye Edge Function. It does not include task notes or account identifiers. If you separately enable calendar busy-time access, busy time ranges may be included; calendar event titles and descriptions are not read or sent by this feature.",
          "The Aventor Eye function sends the snapshot to Groq to generate short suggestions. The app caches generated cards locally to support display and fallback when a refresh is unavailable. Disabling Aventor Eye clears its local insight cache. Requests are subject to the app’s refresh interval and device state; disabling the feature prevents further requests from that app while disabled.",
          "Groq processes submitted content under its own terms and privacy practices. Supabase hosts the CaliMind Edge Function and associated backend services. We do not control the independent privacy practices or retention policies of these providers. Review their current notices if you need details about their processing.",
        ],
      },
      {
        id: "calendar-notifications",
        heading: "6. Calendar access, reminders, and notifications",
        paragraphs: [
          "Calendar access is optional. When enabled, calendar busy intervals are read on your Android device for planning. Event titles and descriptions are not read by the busy-time planning feature. When you choose to add an event, the app hands event details to a calendar application; the event is not saved until you review and confirm it there.",
          "Local reminders and Clock alarms use device features and permissions. The optional Clock integration opens an installed clock application with details for you to review; CaliMind cannot confirm that an alarm was saved unless that application reports success.",
          "If push notifications are enabled, the app may register a device notification token and send it to the configured notification service so notifications can be delivered. Notification content and delivery depend on the feature used, your preferences, device permissions, and provider behavior. You can change permissions and notification settings in the app or device settings.",
        ],
      },
      {
        id: "where-stored",
        heading: "7. Storage and service providers",
        paragraphs: [
          "Account, profile, task, schedule, and related backend information is handled through the Supabase services configured for CaliMind. Supabase may process authentication, database, function, hosting, and technical request information to provide those services.",
          "Depending on the feature, information may also be processed by Groq for AI requests; Google Firebase or related push infrastructure for notifications; the operating system and installed calendar, clock, or widget applications for device integrations; and GitHub or other release infrastructure for portal release metadata and downloads. The website is hosted through its configured hosting provider. Each provider may receive technical information needed to respond to a request.",
          "The release portal retrieves public release information and, when you select a file, requests that file from the release source for your browser to save. The portal does not require you to sign in to GitHub to initiate a download. The release host may receive your browser’s request and network information.",
          "We do not control third-party services. Their own terms, security practices, and privacy notices apply to their processing, and their availability may affect CaliMind features.",
        ],
      },
      {
        id: "local-storage",
        heading: "8. Information stored on your device",
        paragraphs: [
          "The app stores selected settings and feature data locally, which may include notification preferences, calendar or integration preferences, focus-session state, widget data, and cached Aventor Eye cards. Device storage can remain after you sign out or uninstall the app, depending on the operating system and feature. Use the controls provided by your device to remove app data when appropriate.",
          "Local reminders and alarms may be managed by the operating system or another installed application. Removing CaliMind may not remove events or alarms you separately confirmed in those applications.",
        ],
      },
      {
        id: "legal-bases",
        heading: "9. Legal bases and choices",
        paragraphs: [
          "Where privacy law requires a legal basis, we rely on the basis appropriate to the processing and jurisdiction. This may include providing a service you request, your consent for optional features such as Aventor Eye or device permissions, our legitimate interests in operating and securing the Services, and compliance with legal obligations. You may withdraw consent for an optional feature by turning it off or revoking the relevant device permission; this does not affect processing that already occurred.",
          "You can choose not to provide optional information or permissions, but some features may then be unavailable. You can turn Aventor Eye off in Settings, manage notifications and calendar access in the app or device settings, and stop using the Services at any time.",
        ],
      },
      {
        id: "sharing",
        heading: "10. When information may be disclosed",
        paragraphs: [
          "We may disclose information to service providers that help operate the Services, limited to what is reasonably needed for their role; to a calendar, clock, operating-system, or other application when you initiate an integration; to professional advisers where necessary; or to public authorities and other parties when required by law or reasonably necessary to protect rights, safety, and security.",
          "Information may also be transferred as part of a merger, restructuring, or transfer of the Services, subject to applicable law and appropriate safeguards. We do not sell personal information for money. This statement does not change any rights or definitions provided by the privacy law that applies to you.",
        ],
      },
      {
        id: "retention",
        heading: "11. Retention and deletion",
        paragraphs: [
          "We keep information for as long as reasonably necessary to provide the Services, maintain account and planning functions, meet legal obligations, resolve disputes, enforce agreements, and protect security. Retention periods vary by information type, feature, provider, and legal requirements. Provider backups, security logs, and records needed to establish or defend legal claims may persist for a limited period after active use or a deletion request.",
          "You can delete individual tasks or other content using available app controls. To request account closure or deletion of backend personal information, contact us through the portal’s Contact the developer link and identify the account using its registered email address. We may need to verify your request. We will respond in accordance with applicable law and explain if some information must be retained. Deleting the app alone does not delete backend account data.",
          "Information sent to an independent provider for processing may be subject to that provider’s retention practices. We cannot promise immediate removal from a provider’s backups or records that must be retained by law.",
        ],
      },
      {
        id: "rights",
        heading: "12. Your privacy rights",
        paragraphs: [
          "Depending on where you live, you may have rights to request access to, correction of, deletion of, or a copy of personal information; object to or restrict certain processing; withdraw consent; or complain to a privacy regulator. These rights are subject to legal conditions and exceptions.",
          "To make a request, contact us using the developer link in the portal footer. Tell us what right you wish to exercise and which account or information is involved. We may ask for information needed to verify identity and protect your account. We will not require more information than is reasonably necessary to handle the request. You may also have the right to contact your local data-protection or privacy authority.",
        ],
      },
      {
        id: "security",
        heading: "13. Security",
        paragraphs: [
          "We use reasonable administrative, technical, and organizational measures intended to protect information against unauthorized access, loss, misuse, or alteration. No system, transmission, device, or storage method can be guaranteed completely secure. Protect your account credentials, keep your device secure, and contact us promptly if you suspect unauthorized access.",
        ],
      },
      {
        id: "international",
        heading: "14. International processing",
        paragraphs: [
          "CaliMind and its providers may process or store information in countries other than the country where you live. Privacy protections and government access laws may differ. Where applicable law requires safeguards for international transfers, we will use a permitted transfer mechanism or other required protection.",
        ],
      },
      {
        id: "children",
        heading: "15. Children’s privacy",
        paragraphs: [
          "The Services are not designed for children to use independently. We do not knowingly seek to collect personal information from a child where doing so would require parental consent that has not been obtained. If you believe a child has provided personal information inappropriately, contact us through the developer link so we can review the request and take action as required by law.",
        ],
      },
      {
        id: "policy-changes",
        heading: "16. Changes to this Policy",
        paragraphs: [
          "We may update this Policy when the Services, providers, or legal requirements change. We will revise the date above and provide additional notice or obtain consent when required by law. Please review this page periodically. If a material change requires renewed consent, we will request it before applying the change to the relevant processing.",
        ],
      },
      {
        id: "privacy-contact",
        heading: "17. Contact",
        paragraphs: [
          "For questions, privacy requests, or complaints, use the Contact the developer link in the CaliMind portal footer. Include the email address associated with your account and a clear description of your request. Do not send your password or authentication codes.",
        ],
      },
    ],
  },
}

export function LegalPage({ policy }: { policy: LegalPolicy }) {
  const content = policies[policy]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${content.title} · CaliMind`
    return () => {
      document.title = previousTitle
    }
  }, [content.title])

  return (
    <article className="content-page legal-page">
      <header className="legal-header">
        <p className="legal-kicker">CaliMind · Legal</p>
        <h1>{content.title}</h1>
        <p className="legal-updated">
          Effective date: October 4, 2026 · Last updated: October 4, 2026
        </p>
        <p className="legal-introduction">{content.introduction}</p>
      </header>

      <nav className="legal-contents" aria-label={`${content.title} contents`}>
        <h2>On this page</h2>
        <ol>
          {content.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading.replace(/^\d+\.\s*/, "")}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal-document">
        {content.sections.map((section) => (
          <section className="legal-section" id={section.id} key={section.id}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p className="legal-footer-note">
        These documents describe the Services and are not a substitute for
        advice about the laws that apply to your particular business or users.
      </p>
    </article>
  )
}
