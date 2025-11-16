import { useState } from 'react';
import {
  DocumentTextIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const AdvocacyToolkit = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadAsFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const advocacyTools = [
    {
      id: 'legislator-letter',
      category: 'letters',
      title: 'State Legislator Letter Template',
      icon: DocumentTextIcon,
      description: 'Professional letter template for contacting South Carolina state legislators about bail reform',
      preview: 'Dear [Legislator Name],\n\nI am writing as your constituent to urge you to support comprehensive bail reform legislation...',
      content: `Dear [Legislator Name],

I am writing as your constituent residing in [Your City/District] to urge you to support comprehensive bail reform legislation in South Carolina. The tragic death of Logan Holley on July 7, 2024, has brought to light the dangerous flaws in our current pretrial release system.

Logan Holley, a 20-year-old University of South Carolina student with a bright future, was killed by a driver with multiple prior DUI convictions who was out on bond at the time of the crash. This preventable tragedy is not an isolated incident—it represents a systemic failure that puts South Carolina families at risk every day.

I am asking you to support the following reforms:

1. MANDATORY RISK ASSESSMENTS: Require comprehensive risk assessments before releasing defendants charged with violent crimes or repeat offenders.

2. STRICTER BAIL CONDITIONS: Implement GPS monitoring and mandatory check-ins for high-risk defendants released on bond.

3. JUDICIAL ACCOUNTABILITY: Establish review mechanisms for bail decisions that result in reoffending during the pretrial period.

4. VICTIM NOTIFICATION SYSTEM: Ensure victims and their families are notified when defendants are released on bond.

5. PUBLIC TRANSPARENCY: Require annual reporting of pretrial release outcomes, including reoffending rates.

According to the Bureau of Justice Statistics, approximately 30% of violent crime defendants are rearrested while on pretrial release. We can no longer accept these statistics as inevitable. Logan's death was preventable, and with your support, we can prevent future tragedies.

As your constituent, I am asking you to champion bail reform legislation this session. Logan's family deserves justice, and South Carolina families deserve safety.

I would appreciate the opportunity to discuss this matter further and would welcome your response outlining your position on pretrial release reform.

Thank you for your attention to this critical public safety issue.

Sincerely,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email Address]`,
      filename: 'legislator-letter-template.txt'
    },
    {
      id: 'governor-letter',
      category: 'letters',
      title: 'Governor Letter Template',
      icon: DocumentTextIcon,
      description: 'Template for writing to the Governor of South Carolina',
      preview: 'Dear Governor McMaster,\n\nI am writing to request your leadership on urgent bail reform in South Carolina...',
      content: `Dear Governor McMaster,

I am writing to request your leadership on urgent bail reform in South Carolina following the tragic death of Logan Holley on July 7, 2024.

Logan Holley was a 20-year-old University of South Carolina student whose life was cut short by a repeat DUI offender who was out on bond at the time of the fatal crash. This young man had everything ahead of him—he was pursuing his education, contributing to his community, and building a future that will never be realized.

As Governor, you have the authority and platform to prioritize public safety reform. I respectfully urge you to:

• DECLARE BAIL REFORM A PRIORITY: Use your executive influence to make pretrial release reform a legislative priority this session.

• ESTABLISH A TASK FORCE: Create a Governor's Task Force on Pretrial Justice to study South Carolina's bail system and recommend evidence-based reforms.

• SUPPORT VICTIM-CENTERED LEGISLATION: Endorse legislation that prioritizes victim safety and holds repeat offenders accountable.

• ENHANCE DATA COLLECTION: Direct state agencies to improve tracking and reporting of pretrial reoffending rates.

Logan's death represents a failure of our criminal justice system to protect innocent citizens. Research shows that 25% of defendants charged with violent crimes commit new offenses while on bail. These are not just statistics—they represent real people, real families, and preventable tragedies.

South Carolina needs strong leadership on this issue. Logan's family deserves justice, and our communities deserve leaders who will act decisively to prevent future tragedies.

I ask for your commitment to making bail reform a cornerstone of your public safety agenda. Will you stand with Logan's family and advocate for meaningful change?

I look forward to your response and hope to see your leadership on this critical issue.

Respectfully,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email Address]`,
      filename: 'governor-letter-template.txt'
    },
    {
      id: 'social-media-post',
      category: 'social',
      title: 'Social Media Post Templates',
      icon: ShareIcon,
      description: 'Ready-to-share social media content with hashtags',
      preview: 'Logan Holley was 20 years old with his whole life ahead of him. On July 7, 2024, his future was stolen...',
      content: `INSTAGRAM/FACEBOOK POST:

Logan Holley was 20 years old with his whole life ahead of him. On July 7, 2024, his future was stolen by a repeat DUI offender who was out on bond.

Logan's death was 100% preventable.

This isn't just Logan's story—30% of violent crime defendants are rearrested while on pretrial release. How many more families must suffer before we demand change?

South Carolina needs comprehensive bail reform NOW.

🔹 Stricter bail requirements for violent offenders
🔹 Mandatory risk assessments
🔹 Judicial accountability
🔹 Victim protection prioritization

Join Logan's family in fighting for justice and reform. Link in bio.

#JusticeForLogan #BailReform #SouthCarolina #CriminalJusticeReform #LogansLaw #PreventableTragedies #VictimRights #PublicSafety

---

TWITTER/X POST (Short Version):

Logan Holley, 20, was killed by a repeat DUI offender out on bond. His death was preventable.

30% of violent crime defendants are rearrested on pretrial release.

South Carolina needs bail reform NOW.

#JusticeForLogan #BailReform #LogansLaw

Learn more: [your website link]

---

LINKEDIN POST (Professional):

The criminal justice system failed Logan Holley.

On July 7, 2024, Logan Holley, a 20-year-old University of South Carolina student, was killed in a crash caused by a driver with multiple DUI convictions who was out on bond pending trial.

According to the Bureau of Justice Statistics, approximately 30% of violent crime defendants are rearrested while on pretrial release. These aren't just numbers—they represent preventable tragedies affecting families across our state.

As professionals and community members, we have a responsibility to advocate for evidence-based criminal justice reform:

• Mandatory comprehensive risk assessments
• Enhanced monitoring of high-risk defendants
• Transparent reporting of pretrial outcomes
• Victim-centered policy making

Logan's family is channeling their grief into advocacy for bail reform in South Carolina. Their courage deserves our support and action.

What can you do?
- Contact your state legislators
- Share Logan's story
- Support bail reform initiatives

Criminal justice reform is not a partisan issue—it's a public safety imperative.

#CriminalJusticeReform #PublicPolicy #SouthCarolina #VictimAdvocacy #BailReform #JusticeForLogan`,
      filename: 'social-media-templates.txt'
    },
    {
      id: 'talking-points',
      category: 'speaking',
      title: 'Discussion Talking Points',
      icon: ChatBubbleLeftRightIcon,
      description: 'Key talking points for conversations about criminal justice reform',
      preview: 'THE FACTS:\n• Logan Holley was 20 years old when he was killed on July 7, 2024\n• The driver had multiple prior DUI convictions...',
      content: `TALKING POINTS: Justice for Logan & Bail Reform

THE FACTS:
• Logan Holley was 20 years old when he was killed on July 7, 2024
• The driver had multiple prior DUI convictions and was out on bond at the time
• Logan was a University of South Carolina student with his entire future ahead of him
• This tragedy was 100% preventable

THE PROBLEM:
• 30% of violent crime defendants are rearrested while on pretrial release (Bureau of Justice Statistics)
• 25% of defendants charged with violent crimes commit new offenses while on bail
• Current risk assessment tools are either not used or insufficient
• There is limited accountability for bail decisions that result in reoffending
• Victims and families often have no notification when defendants are released

WHAT WE'RE ADVOCATING FOR:
1. Mandatory risk assessments for all defendants charged with violent crimes
2. Stricter criteria for releasing repeat offenders on bond
3. Enhanced monitoring (GPS, check-ins) for high-risk defendants
4. Victim notification when defendants are released
5. Judicial review mechanisms for problematic bail decisions
6. Public transparency through annual reporting of pretrial outcomes

ADDRESSING COMMON CONCERNS:

"Isn't this about innocent until proven guilty?"
• Absolutely. Pretrial detention is about managing risk, not punishment
• We support release for low-risk defendants with appropriate monitoring
• High-risk individuals (violent crimes, repeat offenders) pose a clear danger
• The right to bail must be balanced with community safety

"Won't this lead to overcrowded jails?"
• Risk-based assessment allows low-risk defendants to be released
• Resources saved from reduced reoffending can support alternatives
• Technology (GPS monitoring) provides supervision without detention
• Prevention costs less than responding to new crimes

"Aren't you just responding emotionally to one tragedy?"
• Logan's death highlights a systemic problem backed by data
• 1,000+ preventable deaths annually from crimes by defendants on bond
• This is evidence-based policy making, not emotional reaction
• Multiple families across South Carolina have experienced similar tragedies

"Isn't reform already happening?"
• Some jurisdictions have made progress, but South Carolina lags behind
• Current reforms are insufficient and inconsistently applied
• We need statewide standards, not patchwork local policies
• Accountability mechanisms are virtually non-existent

THE ASK:
• Contact your state legislators and demand bail reform legislation
• Support Logan's family as they advocate for change
• Share Logan's story to raise awareness
• Sign the petition for "Logan's Law" bail reform legislation
• Attend legislative hearings and community meetings

THE BOTTOM LINE:
Logan Holley deserved to live. His death was preventable. We have both the knowledge and tools to make our communities safer—we just need the political will to implement reform. How many more families must suffer before we act?

HASHTAGS: #JusticeForLogan #BailReform #LogansLaw #CriminalJusticeReform`,
      filename: 'talking-points.txt'
    },
    {
      id: 'public-comment',
      category: 'speaking',
      title: 'Public Hearing Comment',
      icon: MegaphoneIcon,
      description: 'Template for testifying at legislative hearings or public meetings',
      preview: 'Good [morning/afternoon]. My name is [Your Name], and I am here today to speak in support of bail reform...',
      content: `PUBLIC HEARING/LEGISLATIVE TESTIMONY TEMPLATE
(Time: 2-3 minutes)

Good [morning/afternoon]. My name is [Your Name], and I am here today to speak in support of comprehensive bail reform in South Carolina.

[PERSONAL CONNECTION - Choose one:]
• "I am a constituent of [District/County]..."
• "I am a parent of [number] children and I fear for their safety..."
• "I am a criminal justice professional who has witnessed these failures firsthand..."
• "I am here representing Logan Holley's family..."

On July 7, 2024, 20-year-old Logan Holley was killed by a repeat DUI offender who was out on bond awaiting trial. Logan was a University of South Carolina student. He had dreams, goals, and people who loved him. His death was entirely preventable.

This committee has the power to prevent tragedies like Logan's. The data is clear:
• Thirty percent of violent crime defendants are rearrested while on pretrial release
• Twenty-five percent of defendants charged with violent crimes commit new offenses while on bail
• These crimes result in over 1,000 preventable deaths annually nationwide

I am asking this committee to support legislation that includes:

ONE: Mandatory risk assessments before releasing defendants charged with violent crimes or repeat offenses.

TWO: Enhanced monitoring, including GPS tracking and regular check-ins for high-risk defendants released on bond.

THREE: Victim notification requirements when defendants are released.

FOUR: Annual public reporting of pretrial outcomes to ensure transparency and accountability.

[PERSONAL CLOSE - Choose one:]
• "As a taxpayer and voter, I am asking you to prioritize public safety over convenience."
• "Logan's family will live with this loss forever. You have the opportunity to prevent other families from experiencing the same pain."
• "I will be watching how you vote on this issue, and so will voters across South Carolina."
• "Do the right thing. Support bail reform. Save lives."

Thank you for your time and consideration.

---

TIPS FOR DELIVERY:
• Speak slowly and clearly
• Make eye contact with committee members
• Stay within time limits (typically 2-3 minutes)
• Remain respectful even if you disagree with questions
• Bring written copies of your testimony to submit
• Provide contact information for follow-up
• Consider mentioning your voting status in the district`,
      filename: 'public-hearing-speech.txt'
    },
    {
      id: 'email-campaign',
      category: 'email',
      title: 'Email Campaign Template',
      icon: EnvelopeIcon,
      description: 'Concise email template for quick constituent contact',
      preview: 'Subject: Urgent: Support Bail Reform Legislation\n\nDear [Legislator Name],\n\nAs your constituent, I am writing to urge...',
      content: `SUBJECT LINE OPTIONS:
• Urgent: Support Bail Reform Legislation - [Your Name]
• Constituent Request: Vote YES on Bail Reform
• In Memory of Logan Holley - Support Public Safety Reform
• Your Constituent Demands Action on Pretrial Release Reform

---

EMAIL BODY (Keep under 300 words):

Dear [Legislator Name],

As your constituent in [City/District], I am writing to urge your support for comprehensive bail reform legislation.

On July 7, 2024, Logan Holley, a 20-year-old University of South Carolina student, was killed by a repeat DUI offender who was out on bond. Logan's death was preventable and highlights dangerous flaws in South Carolina's pretrial release system.

The statistics are alarming:
• 30% of violent crime defendants are rearrested while on pretrial release
• 25% commit new offenses while on bail
• Over 1,000 preventable deaths occur annually from crimes by defendants out on bond

I am asking you to support legislation that includes:
✓ Mandatory risk assessments for violent crime defendants
✓ Enhanced monitoring (GPS, check-ins) for high-risk defendants
✓ Victim notification when defendants are released
✓ Public reporting of pretrial outcomes

Public safety must be the priority. Logan's family deserves justice, and South Carolina families deserve protection.

Will you commit to supporting bail reform legislation this session?

I request a response outlining your position on this critical issue.

Sincerely,
[Your Full Name]
[Your Complete Address - this confirms you're a constituent]
[Your Phone Number]
[Your Email Address]

---

FOLLOW-UP EMAIL (if no response after 2 weeks):

SUBJECT: Following Up: Bail Reform Support - [Your Name]

Dear [Legislator Name],

I am following up on my email from [date] regarding bail reform legislation in memory of Logan Holley.

I have not yet received a response outlining your position on pretrial release reform. As your constituent, I believe I deserve to know where you stand on this critical public safety issue.

Will you support comprehensive bail reform legislation this session?

I look forward to your prompt response.

Sincerely,
[Your Name]
[Your Address]

---

THANK YOU EMAIL (if they respond positively):

SUBJECT: Thank You for Supporting Bail Reform

Dear [Legislator Name],

Thank you for your response and your commitment to supporting bail reform legislation. Your leadership on this issue will save lives and prevent tragedies like Logan Holley's death.

I appreciate your dedication to public safety and will continue to follow this legislation. Please let me know how I can support your efforts.

Sincerely,
[Your Name]`,
      filename: 'email-campaign-template.txt'
    },
    {
      id: 'op-ed',
      category: 'letters',
      title: 'Op-Ed / Letter to Editor',
      icon: DocumentTextIcon,
      description: 'Template for submitting opinion pieces to newspapers',
      preview: 'Logan Holley Should Still Be Alive: Why South Carolina Needs Bail Reform Now...',
      content: `LETTER TO THE EDITOR / OP-ED TEMPLATE
(Word count: 250-750 words depending on publication guidelines)

HEADLINE OPTIONS:
• "Logan Holley Should Still Be Alive: Why South Carolina Needs Bail Reform Now"
• "Preventable Tragedy: The Case for Bail Reform in South Carolina"
• "My [Son/Daughter/Friend] Deserved Better: A Call for Criminal Justice Reform"
• "South Carolina's Broken Bail System Killed Logan Holley"

---

LETTER TO THE EDITOR (Short version - 250 words):

On July 7, 2024, 20-year-old Logan Holley was killed by a driver with multiple DUI convictions who was out on bond awaiting trial. Logan was a University of South Carolina student with his entire future ahead of him. His death was entirely preventable.

Logan's tragedy is not unique. According to the Bureau of Justice Statistics, approximately 30% of violent crime defendants are rearrested while on pretrial release. Twenty-five percent of defendants charged with violent crimes commit new offenses while on bail. These aren't abstract statistics—they represent real people and devastated families.

South Carolina's bail system is broken. Repeat offenders are released without adequate risk assessment, monitoring, or accountability. Judges face no consequences when their bail decisions result in new crimes. Victims and families receive no notification when dangerous defendants are released.

We need comprehensive reform now:
• Mandatory risk assessments for violent crime defendants
• GPS monitoring for high-risk individuals released on bond
• Victim notification requirements
• Public reporting of pretrial outcomes

This is not a partisan issue—it's a public safety imperative. Logan's family is courageously advocating for change despite their grief. The least our legislators can do is act.

How many more Logan Holleys must die before South Carolina prioritizes public safety over a broken status quo?

Contact your state legislators today. Demand bail reform. Save lives.

[Your Name]
[Your City]

---

OP-ED (Long version - 600-750 words):

LOGAN HOLLEY SHOULD STILL BE ALIVE
Why South Carolina Must Reform Its Broken Bail System

On a summer evening that should have been ordinary, 20-year-old Logan Holley's life was cut short. A University of South Carolina student with dreams and aspirations, Logan died on July 7, 2024, when he was struck by a driver with multiple prior DUI convictions. The driver was out on bond, awaiting trial for previous offenses.

Logan's death was not an accident. It was not unavoidable. It was the predictable result of a broken pretrial release system that prioritizes convenience over public safety.

THE SCOPE OF THE PROBLEM

South Carolina's bail system operates on outdated assumptions about risk and accountability. Research from the Bureau of Justice Statistics reveals that approximately 30% of violent crime defendants are rearrested while on pretrial release. A quarter of defendants charged with violent crimes commit new offenses while on bail. These reoffenses result in over 1,000 preventable deaths annually nationwide.

In South Carolina, repeat offenders routinely receive bond with minimal risk assessment or monitoring. Judges face no meaningful accountability when their bail decisions result in new crimes. Victims and their families often learn about defendants' release through tragic circumstances rather than official notification.

This is not justice. This is not public safety. This is bureaucratic failure with deadly consequences.

WHAT REFORM LOOKS LIKE

Comprehensive bail reform is not radical—it's evidence-based policy making. Other states have successfully implemented reforms that balance individual liberty with community safety:

RISK ASSESSMENT: Virginia requires validated risk assessment tools before releasing defendants charged with violent crimes. This data-driven approach identifies high-risk individuals while allowing low-risk defendants to be released with appropriate monitoring.

ENHANCED MONITORING: New Jersey's bail reform includes GPS tracking and regular check-ins for defendants who pose elevated risk. This allows release while ensuring accountability.

VICTIM NOTIFICATION: Multiple states now require automatic notification when defendants in violent crime cases are released on bond, ensuring victims can take appropriate safety precautions.

TRANSPARENCY: Several jurisdictions now publish annual reports on pretrial outcomes, including reoffending rates, allowing for continuous improvement and accountability.

THE PATH FORWARD

South Carolina legislators must act decisively this session. The reforms needed are clear:

First, mandate comprehensive risk assessments before releasing defendants charged with violent crimes or repeat offenses. These tools exist and work—we simply need the political will to require their use.

Second, implement enhanced monitoring for high-risk defendants released on bond. GPS tracking and regular check-ins provide supervision without the cost of detention.

Third, establish victim notification requirements. Victims of violent crimes deserve to know when defendants are released and have the opportunity to provide input on bail conditions.

Fourth, require public reporting of pretrial outcomes. Transparency drives improvement and allows citizens to hold the system accountable.

Fifth, create review mechanisms for bail decisions that result in reoffending. Judges should receive feedback on outcomes and face consequences for patterns of problematic decisions.

A CALL TO ACTION

Logan Holley's family is channeling their devastating grief into advocacy for reform. Their courage deserves more than our sympathy—it demands our action.

This is not a partisan issue. Public safety transcends political divides. Conservatives who value law and order should support keeping dangerous offenders off our streets. Progressives who champion evidence-based policy should embrace risk assessment and alternatives to detention.

Every day we delay reform, more families face the possibility of preventable tragedy. Every legislative session we ignore this issue, we accept that Logan's death—and others like it—were somehow inevitable.

They were not. They are not.

Contact your state legislators today. Tell them Logan Holley's death demands meaningful bail reform. Tell them public safety must be the priority. Tell them you will remember their vote on this issue.

Logan deserved to live. He deserved to graduate, to build a career, to fall in love, to make his family proud. His future was stolen by a system that failed to protect him.

We cannot bring Logan back. But we can honor his memory by ensuring the system that failed him is fixed. We can prevent other families from experiencing this devastating loss.

South Carolina, we must do better. We can do better. And we must start now.

[Your Name] is a [resident/parent/professional] in [City], South Carolina, and an advocate for criminal justice reform.

---

SUBMISSION TIPS:
• Check newspaper's submission guidelines for word count limits
• Include your full name, city, and phone number (for verification)
• Send during business hours, Monday-Thursday for best consideration
• Follow up after 1 week if you don't receive confirmation
• Share published pieces on social media to amplify reach`,
      filename: 'op-ed-template.txt'
    },
    {
      id: 'petition-share',
      category: 'social',
      title: 'Petition Sharing Script',
      icon: DocumentDuplicateIcon,
      description: 'Text for sharing petitions via email, text, or social media',
      preview: 'PERSONAL MESSAGE:\nI just signed a petition calling for bail reform in South Carolina...',
      content: `PETITION SHARING TEMPLATES

---

PERSONAL MESSAGE (Email/Text to Friends):

Hey [Name],

I just signed a petition calling for bail reform in South Carolina in memory of Logan Holley, a 20-year-old UofSC student who was killed by a repeat DUI offender out on bond.

This could happen to anyone—30% of violent crime defendants are rearrested while on pretrial release. We need to demand that our legislators prioritize public safety.

Would you take 30 seconds to sign and share? [Petition Link]

Every signature matters. Thank you.

[Your Name]

---

SOCIAL MEDIA POST (Facebook/Instagram):

I just signed this important petition calling for bail reform in South Carolina. 🖊️

Logan Holley was only 20 years old when he was killed by a repeat offender who was out on bond. His death was preventable.

30% of violent crime defendants are rearrested while on pretrial release. This has to change.

Please take 30 seconds to sign and share this petition. Let's get to [goal number] signatures and show our legislators that South Carolina demands action.

Sign here: [Petition Link]

#JusticeForLogan #BailReform #SouthCarolina

---

TWITTER/X POST:

Logan Holley, 20, was killed by a repeat DUI offender out on bond.

30% of violent crime defendants are rearrested on pretrial release.

South Carolina needs bail reform NOW.

Sign the petition: [Petition Link]

#JusticeForLogan #BailReform

Every signature counts. Please share. 🖊️

---

EMAIL TO FAMILY MEMBERS:

Subject: Please Sign This Petition - It Takes 30 Seconds

Dear Family,

I'm reaching out to ask for your support on something important to me.

On July 7, 2024, a 20-year-old college student named Logan Holley was killed by a driver with multiple DUI convictions who was out on bond awaiting trial. Logan's entire future was stolen because our criminal justice system failed to protect him.

I've signed a petition calling for comprehensive bail reform in South Carolina, and I'm asking you to do the same. It takes less than a minute and could help prevent tragedies like Logan's death.

Please sign here: [Petition Link]

And if you're willing, please share with your own networks. The more signatures we gather, the more pressure we put on legislators to act.

Thank you for taking action.

Love,
[Your Name]

---

COMMUNITY GROUP MESSAGE:

Hi everyone,

I wanted to bring an important issue to the group's attention. Logan Holley, a 20-year-old University of South Carolina student, was killed this summer by a repeat DUI offender who was out on bond. His family is now advocating for bail reform in South Carolina.

There's a petition calling for comprehensive pretrial release reform, and I think it aligns with our group's values around [community safety/justice/family protection].

If you're interested in supporting this effort, you can sign the petition here: [Petition Link]

And of course, feel free to share with your own networks if you think it's worthwhile.

Thanks for considering!

[Your Name]

---

PROFESSIONAL NETWORK MESSAGE (LinkedIn):

I'm supporting an important public safety initiative in South Carolina and wanted to share it with my network.

Following the preventable death of Logan Holley—a 20-year-old UofSC student killed by a repeat DUI offender out on bond—advocates are calling for comprehensive bail reform.

The petition calls for evidence-based risk assessments, enhanced monitoring of high-risk defendants, and greater transparency in pretrial release decisions.

If this resonates with you, I encourage you to sign and share: [Petition Link]

Criminal justice reform benefits all of us. Thank you for considering.

---

GROUP TEXT MESSAGE:

Hey everyone! Quick favor - I just signed this petition for bail reform in SC. It's in memory of Logan Holley, a 20-year-old who was killed by a repeat offender out on bond. Takes 30 seconds: [Petition Link]

Please sign and share if you can! 🙏

---

INSTAGRAM STORY TEXT:

Swipe up to sign this petition ⬆️

Logan Holley was 20 years old when he was killed by a repeat DUI offender out on bond.

30% of violent crime defendants are rearrested while on pretrial release.

South Carolina needs bail reform NOW.

Sign the petition: [Link]

#JusticeForLogan #BailReform

(Please reshare to your stories!)

---

TIPS FOR EFFECTIVE PETITION SHARING:
• Personalize your message—don't just copy-paste
• Explain why YOU care about this issue
• Keep it brief—people are more likely to read short messages
• Include a clear call to action ("Sign here")
• Follow up with milestones ("We hit 1,000 signatures!")
• Thank people who sign and share
• Share across multiple platforms for maximum reach
• Time your posts for maximum engagement (lunch hours, evenings)
• Use relevant hashtags to increase visibility`,
      filename: 'petition-sharing-script.txt'
    },
    {
      id: 'door-knocking-script',
      category: 'speaking',
      title: 'Door-Knocking / Canvassing Script',
      icon: ChatBubbleLeftRightIcon,
      description: 'Script for community outreach and door-to-door advocacy',
      preview: 'Hi, my name is [Your Name]. I\'m here today talking to neighbors about an important public safety issue...',
      content: `DOOR-KNOCKING / CANVASSING SCRIPT

---

OPENING (First 15 seconds):

Hi, my name is [Your Name]. I'm here today talking to neighbors about an important public safety issue affecting our community. Do you have a minute?

[If NO:] No problem! Can I leave you this information? [Hand them a flyer] Have a great day!

[If YES:] Thank you! This will just take a minute.

---

THE INTRODUCTION (30 seconds):

I'm here because I want to tell you about Logan Holley. Logan was a 20-year-old University of South Carolina student who was killed this past July by a driver with multiple DUI convictions. The driver was out on bond awaiting trial when he killed Logan.

Logan's death was completely preventable, and his family is now fighting for bail reform in South Carolina to prevent other families from experiencing this tragedy.

Have you heard about Logan's story?

[If YES:] That's great that you're aware. What do you think about the bail reform effort?

[If NO:] Let me share a few quick facts...

---

THE FACTS (30 seconds):

Here's what's happening in South Carolina right now:
• 30% of violent crime defendants are rearrested while they're out on pretrial release
• Repeat offenders are routinely given bond without proper risk assessment
• Families of victims often don't even know when the defendant is released

This isn't just about Logan—it's about keeping our communities safe.

Does this concern you as a [parent/homeowner/community member]?

---

THE ASK (30 seconds):

Here's where you come in. There are three things you can do to help:

1. SIGN THE PETITION: We're gathering signatures to show legislators that South Carolina voters demand bail reform. [Have petition ready on clipboard or tablet]

2. CONTACT YOUR LEGISLATORS: [Have legislator contact info on flyer] A quick email or phone call from constituents makes a huge difference.

3. SHARE THE STORY: Talk to your neighbors, share on social media, help spread awareness.

Would you be willing to sign the petition today?

---

HANDLING COMMON RESPONSES:

RESPONSE: "I don't usually sign petitions."
YOU: "I totally understand. This is actually the first petition I've ever worked on, but Logan's story really affected me. All we're asking for is common-sense risk assessments before releasing violent offenders. Would you be willing to make an exception this time?"

RESPONSE: "Isn't everyone innocent until proven guilty?"
YOU: "Absolutely, and we're not saying people shouldn't get bail. We're saying that repeat violent offenders should have a proper risk assessment and monitoring. Low-risk defendants should still be released. This is about keeping the community safe while respecting individual rights."

RESPONSE: "I need to think about it."
YOU: "Of course! Here's a flyer with more information and a QR code to sign the petition online. The most important thing is that you're informed about the issue. Can I count on you to look into it?"

RESPONSE: "How do I know this will make a difference?"
YOU: "Great question. Multiple states have successfully implemented bail reform that reduced crime while maintaining individual rights. And historically, grassroots pressure from voters is what drives legislative change. Your signature and voice matter."

RESPONSE: "I'm not interested."
YOU: "No problem at all. Have a great day!" [Move on politely—never argue]

---

CLOSING (If they sign):

Thank you so much for signing! This really makes a difference. Here's a flyer with more information and ways to stay involved. Would you be willing to share this with neighbors or on social media?

[Hand them flyer with QR code, website, and hashtags]

Again, thank you for your support. Have a wonderful day!

---

CLOSING (If they don't sign but are friendly):

I appreciate you hearing me out! Here's some information if you'd like to learn more. Have a great day!

[Hand them flyer and move on]

---

MATERIALS TO BRING:
□ Clipboard with petition pages
□ Tablet/phone for digital signatures (if applicable)
□ Flyers with key information, QR codes, and legislator contact info
□ Business cards or contact info for questions
□ Water bottle and comfortable shoes
□ Pen/markers
□ A script card for quick reference

---

BEST PRACTICES:
• Go in pairs for safety and moral support
• Canvas during early evening (5-7 PM) or Saturday mornings (10 AM-12 PM)
• Dress casually but professionally (avoid political logos)
• Always be polite—you represent the cause
• Don't argue with people who disagree
• Keep conversations brief (2-3 minutes max)
• Track your conversations (addresses, signatures, responses)
• Stay hydrated and take breaks
• Debrief with your partner about what's working

---

SAFETY TIPS:
• Always go in pairs or groups
• Let someone know your route and check-in times
• Stay in well-lit, populated areas
• Trust your instincts—if something feels wrong, leave
• Have a charged phone with you
• Don't enter anyone's home
• If someone is hostile, politely leave immediately
• Canvas during daylight hours when possible

---

TERRITORY STRATEGY:
• Focus on neighborhoods with higher voter turnout
• Target areas near the university (UofSC community may be especially responsive)
• Consider neighborhoods with families (parent perspective)
• Return to friendly areas for signature drives
• Keep detailed maps of areas covered

Remember: Every conversation matters. Even if someone doesn't sign, you're raising awareness and planting seeds for change. Stay positive, be respectful, and trust that your efforts are making a difference.`,
      filename: 'canvassing-script.txt'
    },
    {
      id: 'press-release',
      category: 'media',
      title: 'Press Release Template',
      icon: MegaphoneIcon,
      description: 'Template for announcing advocacy events or milestones',
      preview: 'FOR IMMEDIATE RELEASE\n\nFamily of Logan Holley Launches Bail Reform Campaign...',
      content: `FOR IMMEDIATE RELEASE

Contact: [Your Name]
Phone: [Your Phone]
Email: [Your Email]
Website: [Website URL]

FAMILY OF LOGAN HOLLEY LAUNCHES BAIL REFORM CAMPAIGN FOLLOWING PREVENTABLE TRAGEDY

South Carolina Advocates Call for Comprehensive Pretrial Release Reform After 20-Year-Old Student's Death

[CITY, SC] — [Date] — The family of Logan Holley, a 20-year-old University of South Carolina student killed by a repeat DUI offender out on bond, today launched a comprehensive campaign calling for bail reform in South Carolina.

Logan Holley died on July 7, 2024, when he was struck by a driver with multiple prior DUI convictions who was awaiting trial and out on bond. His death highlights systemic failures in South Carolina's pretrial release system that advocates say put communities at risk.

"Logan's death was 100% preventable," said [Family Spokesperson Name]. "Our criminal justice system failed to protect him, and we're fighting to ensure no other family experiences this devastating loss. South Carolina needs comprehensive bail reform now."

According to the Bureau of Justice Statistics, approximately 30% of violent crime defendants are rearrested while on pretrial release. The campaign argues that current risk assessment tools are either insufficient or not consistently applied, leading to dangerous offenders being released without adequate monitoring.

THE CAMPAIGN'S KEY DEMANDS:

• Mandatory comprehensive risk assessments before releasing defendants charged with violent crimes
• Enhanced monitoring, including GPS tracking, for high-risk defendants released on bond
• Victim notification requirements when defendants are released on pretrial release
• Judicial review mechanisms for bail decisions that result in reoffending
• Annual public reporting of pretrial release outcomes to ensure transparency

"This is not a partisan issue—it's a public safety imperative," said [Spokesperson]. "We're calling on legislators from both parties to prioritize community safety and evidence-based criminal justice reform."

The campaign has already gathered [NUMBER] signatures on its petition and has secured meetings with [NUMBER] state legislators. Advocates plan to testify at upcoming legislative hearings and organize community events throughout the state.

WHAT: Justice for Logan - Bail Reform Campaign Launch
WHEN: [Date and Time]
WHERE: [Location]
WHO: Logan Holley's family, criminal justice reform advocates, community supporters

For more information, to schedule interviews, or to support the campaign, visit [Website] or contact [Name] at [Email/Phone].

###

ABOUT JUSTICE FOR LOGAN:
Justice for Logan is a campaign advocating for comprehensive bail reform in South Carolina following the preventable death of Logan Holley. The campaign seeks evidence-based policy changes to ensure public safety while respecting individual rights. For more information, visit [Website].

---

MEDIA KIT COMPONENTS (to accompany press release):

1. HIGH-RESOLUTION PHOTOS
   - Photo of Logan Holley (with family permission)
   - Photo of family spokesperson
   - Campaign logo/graphics

2. FACT SHEET
   - Key statistics about pretrial release
   - Timeline of Logan's case
   - Specific policy recommendations
   - Contact information

3. FAMILY STATEMENT
   - Personal statement from family members
   - Quote available for media use

4. EXPERT CONTACTS
   - Criminal justice reform experts
   - Legal professionals supporting the campaign
   - Victim advocates

5. B-ROLL SUGGESTIONS (for TV)
   - Community vigil footage
   - Family photos of Logan
   - Petition signing
   - Legislative hearing attendance

---

MEDIA OUTREACH STRATEGY:

TIER 1 - PRIMARY TARGETS (Send first):
□ The State (Columbia) - State Government Reporter
□ Post and Courier (Charleston) - Criminal Justice Reporter
□ Greenville News - State News Desk
□ WISTV (Columbia) - News Director
□ WLTX (Columbia) - Assignment Desk
□ WIS News 10 - Assignment Desk

TIER 2 - SECONDARY TARGETS:
□ Associated Press (Columbia Bureau)
□ WSPA (Spartanburg)
□ WCSC (Charleston)
□ WMBF (Myrtle Beach)
□ SC Public Radio
□ Local newspapers in affected districts

TIER 3 - NATIONAL TARGETS (if story gains traction):
□ CNN (Criminal Justice)
□ NBC News (Justice Desk)
□ USA Today (Nation section)
□ Washington Post (National)
□ Advocacy organizations with media presence

---

FOLLOW-UP PROTOCOL:
• Send press release 7 days before event
• Follow up with phone calls 3 days before event
• Send reminder email day before event
• Be available for interviews on short notice
• Provide additional info/photos immediately upon request
• Thank journalists who cover the story
• Share coverage on social media to amplify reach

---

INTERVIEW PREPARATION TIPS:
• Prepare 3-4 key talking points and repeat them
• Have statistics memorized but accessible in notes
• Speak in sound bites (10-15 second quotes)
• Stay on message—don't let questions derail you
• Show emotion but remain composed
• Always mention Logan by name and age
• End with clear call to action
• Thank the interviewer for coverage

Remember: Media coverage is crucial for building public awareness and pressure on legislators. Treat journalists professionally, respond quickly, and maintain relationships for future coverage.`,
      filename: 'press-release-template.txt'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: DocumentDuplicateIcon },
    { id: 'letters', name: 'Letters', icon: DocumentTextIcon },
    { id: 'social', name: 'Social Media', icon: ShareIcon },
    { id: 'speaking', name: 'Speaking', icon: ChatBubbleLeftRightIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'media', name: 'Media', icon: MegaphoneIcon }
  ];

  const filteredTools = selectedCategory === 'all'
    ? advocacyTools
    : advocacyTools.filter(tool => tool.category === selectedCategory);

  return (
    <section id="advocacy-toolkit" className="section-container bg-gradient-to-b from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Advocacy Toolkit</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary-dark mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Download templates and resources to advocate for criminal justice reform. Every voice matters in the fight for Logan's Law.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-secondary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Tool Header */}
                <div className="bg-gradient-to-r from-secondary to-secondary-light p-6 text-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                      <p className="text-white/90 text-sm">{tool.description}</p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-6 border-b border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-words">{tool.preview}</pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => copyToClipboard(tool.content, tool.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      {copiedId === tool.id ? (
                        <>
                          <CheckCircleIcon className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="w-5 h-5" />
                          Copy to Clipboard
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => downloadAsFile(tool.content, tool.filename)}
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-br from-primary via-pink-500 to-primary-dark rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Additional Resources</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-bold mb-2">Social Media Graphics</h4>
              <p className="text-sm mb-4">Download pre-made graphics optimized for Instagram, Facebook, and Twitter</p>
              <a href="#" className="text-white hover:text-gray-100 underline font-medium">
                Coming Soon
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-bold mb-2">Legislator Directory</h4>
              <p className="text-sm mb-4">Find contact information for your South Carolina representatives</p>
              <a
                href="https://www.scstatehouse.gov/legislatorssearch.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-100 underline font-medium"
              >
                Find Your Legislator
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-bold mb-2">Fact Sheets</h4>
              <p className="text-sm mb-4">Downloadable fact sheets with statistics and research citations</p>
              <a href="#" className="text-white hover:text-gray-100 underline font-medium">
                Coming Soon
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-primary">
            <h3 className="text-2xl font-bold text-secondary mb-4">Ready to Make a Difference?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Choose a template that resonates with you, personalize it with your story, and take action today. Every letter, every phone call, every social media post brings us closer to meaningful reform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#advocacy"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Learn More About Our Cause
              </a>
              <a
                href="#newsletter"
                className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Stay Updated
              </a>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h4 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Tips for Effective Advocacy
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Personalize templates with your own story and connection to the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Be specific about what you're asking legislators to do</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Follow up if you don't receive a response within 2 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Share your advocacy efforts on social media to inspire others</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Stay respectful and professional, even when frustrated</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h4 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              How to Use These Templates
            </h4>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Click "Copy to Clipboard" or "Download" for any template</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Replace bracketed placeholders [like this] with your information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Add personal details to make your message more compelling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Review for tone and accuracy before sending</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">5.</span>
                <span>Keep a copy for your records and follow-up purposes</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvocacyToolkit;
