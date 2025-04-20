import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - NEXUS CORP',
};

// Helper component for placeholders (Assuming it's needed or beneficial)
const Placeholder = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-block bg-white/10 px-2 py-0.5 rounded-sm text-white/50 font-mono text-sm break-all">
    {children}
  </span>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-16 md:py-24 lg:py-32">
      {/* Apply prose styles for readability and use inherited Manifold font */}
      <article className="prose prose-invert prose-lg mx-auto max-w-3xl 
                      prose-headings:font-light prose-headings:text-white/90 prose-headings:my-6 
                      prose-p:text-white/70 prose-p:my-4 
                      prose-a:text-sky-400 hover:prose-a:text-sky-300 
                      prose-ul:my-4 prose-ul:space-y-2 prose-li:my-2 prose-li:marker:text-white/50 
                      prose-ol:my-4 prose-ol:space-y-2 
                      prose-table:my-6 prose-th:border-white/20 prose-th:p-3 prose-td:border-white/20 prose-td:p-3 prose-td:align-middle">
        
        <h1>PRIVACY POLICY</h1>
        <p className="lead !text-base !text-white/60">
          Last updated: <Placeholder>April 20, 2025</Placeholder>
        </p>

        <p>
          This Privacy Notice for <Placeholder>crisp.sh</Placeholder> (doing business as <Placeholder>OnlyPrompt</Placeholder>) ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
        </p>
        <ul>
          <li>Visit our website at <a href="#"><Placeholder>crisp.sh</Placeholder></a>, or any website of ours that links to this Privacy Notice</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <p>
          <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:s@crisp.sh"><Placeholder>s@crisp.sh</Placeholder></a>.
        </p>

        <h2>SUMMARY OF KEY POINTS</h2>
        <p className="!italic">
          This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <a href="#toc">table of contents</a> below to find the section you are looking for.
        </p>

        <p>
          <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a href="#personalinfo">personal information you disclose to us</a>.
        </p>
        
        <p>
          <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
        </p>

        <p>
          <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
        </p>

        <p>
          <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#infouse">how we process your information</a>.
        </p>

        <p>
          <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about <a href="#whoshare">when and with whom we share your personal information</a>.
        </p>

        <p>
          <strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a href="#infosafe">how we keep your information safe</a>.
        </p>

        <p>
          <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacyrights">your privacy rights</a>.
        </p>

        <p>
          <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting <a href="#"><Placeholder>crisp.sh/data-request</Placeholder></a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
        </p>

        <p>
          Want to learn more about what we do with any information we collect? <a href="#toc">Review the Privacy Notice in full</a>.
        </p>

        <h2 id="toc">TABLE OF CONTENTS</h2>
        <ol className="list-decimal !pl-6 space-y-1">
          <li><a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a></li>
          <li><a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
          <li><a href="#legalbases">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
          <li><a href="#whoshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
          <li><a href="#3pwebsites">WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></li>
          <li><a href="#cookies">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
          <li><a href="#ai">DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
          <li><a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
          <li><a href="#inforetain">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
          <li><a href="#infosafe">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
          <li><a href="#infominors">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
          <li><a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
          <li><a href="#DNT">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
          <li><a href="#uslaws">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
          <li><a href="#policyupdates">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
          <li><a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
          <li><a href="#request">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
        </ol>

        <h2 id="infocollect">1. WHAT INFORMATION DO WE COLLECT?</h2>
        <h3 id="personalinfo">Personal information you disclose to us</h3>
        <p className="!italic">
          <strong>In Short:</strong> We collect personal information that you provide to us.
        </p>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </p>
        <p>
          <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul>
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
          <li>mailing addresses</li>
          <li>usernames</li>
          <li>passwords</li>
          <li>contact preferences</li>
          <li>contact or authentication data</li>
          <li>billing addresses</li>
          <li>debit/credit card numbers</li>
        </ul>
        <p id="sensitiveinfo">
          <strong>Sensitive Information.</strong> We do not process sensitive information.
        </p>
        <p>
          <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by <Placeholder>Stripe</Placeholder>. You may find their privacy notice link(s) here: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">https://stripe.com/privacy</a>.
        </p>
        <p>
          <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called "<a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>" below.
        </p>
        <p>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </p>
        <h3>Information automatically collected</h3>
        <p className="!italic">
          <strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
        </p>
        <p>
          We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
        </p>
        <p>
          Like many businesses, we also collect information through cookies and similar technologies.
        </p>
        <p>
          The information we collect includes:
        </p>
        <ul>
          <li>
            <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
          </li>
          <li>
            <em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
          </li>
          <li>
            <em>Location Data.</em> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
          </li>
        </ul>
        <h3>Google API</h3>
        <p>
          Our use of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener noreferrer" target="_blank">Google API Services User Data Policy</a>, including the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" rel="noopener noreferrer" target="_blank">Limited Use requirements</a>.
        </p>
        
        <h2 id="infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
        </p>
        <p>
          <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
        </p>
        <ul>
          <li>
            <strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.
          </li>
          <li>
            <strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.
          </li>
          <li>
            <strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
          </li>
          <li>
            <strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
          </li>
          <li>
            <strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.
          </li>
          <li>
            <strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.
          </li>
          <li>
            <strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.
          </li>
          <li>
            <strong>To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.
          </li>
          <li>
            <strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.
          </li>
          <li>
            <strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.
          </li>
          <li>
            <strong>To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.
          </li>
          <li>
            <strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.
          </li>
        </ul>

        <h2 id="legalbases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
        </p>
        <p className="!italic">
          <strong><u>If you are located in the EU or UK, this section applies to you.</u></strong>
        </p>
        <p>
          The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
        </p>
        <ul>
          <li>
            <strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about <a href="#withdrawconsent">withdrawing your consent</a>.
          </li>
          <li>
            <strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.
          </li>
          <li>
            <strong>Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
            {/* Nested list styling handled by prose */}
            <ul>
              <li>Develop and display personalized and relevant advertising content for our users</li>
              <li>Analyze how our Services are used so we can improve them to engage and retain users</li>
              <li>Support our marketing activities</li>
              <li>Diagnose problems and/or prevent fraudulent activities</li>
              <li>Understand how our users use our products and services so we can improve user experience</li>
            </ul>
          </li>
          <li>
            <strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
          </li>
          <li>
            <strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.
          </li>
        </ul>
        <p className="!italic">
          <strong><u>If you are located in Canada, this section applies to you.</u></strong>
        </p>
        <p>
          We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can <a href="#withdrawconsent">withdraw your consent</a> at any time.
        </p>
        <p>
          In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:
        </p>
        <ul>
          <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
          <li>For investigations and fraud detection and prevention</li>
          <li>For business transactions provided certain conditions are met</li>
          <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
          <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
          <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
          <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
          <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
          <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
          <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
          <li>If the information is publicly available and is specified by the regulations</li>
        </ul>

        <h2 id="whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
        </p>
        <p>
          We may need to share your personal information in the following situations:
        </p>
        <ul>
          <li>
            <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
          </li>
        </ul>

        <h2 id="3pwebsites">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.
        </p>
        <p>
          The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third-party websites. Any data collected by third parties is not covered by this Privacy Notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
        </p>

        <h2 id="cookies">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
        </p>
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
        </p>
        <p>
          We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
        </p>
        <p>
          To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "<a href="#uslaws">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>"
        </p>
        <p>
          Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
        </p>
        <h3>Google Analytics</h3>
        <p>
          We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: <Placeholder>Google Display Network Impressions Reporting</Placeholder>, <Placeholder>Google Analytics Demographics and Interests Reporting</Placeholder> and <Placeholder>Remarketing with Google Analytics</Placeholder>. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">https://tools.google.com/dlpage/gaoptout</a>. You can opt out of Google Analytics Advertising Features through <a href="https://adssettings.google.com/" rel="noopener noreferrer" target="_blank">Ads Settings</a> and Ad Settings for mobile apps. Other opt out means include <a href="http://optout.networkadvertising.org/" rel="noopener noreferrer" target="_blank">http://optout.networkadvertising.org/</a> and <a href="http://www.networkadvertising.org/mobile-choice" rel="noopener noreferrer" target="_blank">http://www.networkadvertising.org/mobile-choice</a>. For more information on the privacy practices of Google, please visit the <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy & Terms page</a>.
        </p>

        <h2 id="ai">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.
        </p>
        <p>
          As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, "AI Products"). These tools are designed to enhance your experience and provide you with innovative solutions. The terms in this Privacy Notice govern your use of the AI Products within our Services.
        </p>
        <h3>Use of AI Technologies</h3>
        <p>
          We provide the AI Products through third-party service providers ("AI Service Providers"), including <Placeholder>Google Cloud AI</Placeholder>, <Placeholder>Mistral AI</Placeholder>, <Placeholder>DALL-E</Placeholder> and <Placeholder>OpenAI</Placeholder>. As outlined in this Privacy Notice, your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products for purposes outlined in "<a href="#legalbases">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a>" You must not use the AI Products in any way that violates the terms or policies of any AI Service Provider.
        </p>
        <h3>Our AI Products</h3>
        <p>
          Our AI Products are designed for the following functions:
        </p>
        <ul>
          <li>Video analysis</li>
          <li>Video generation</li>
          <li>Text analysis</li>
          <li>AI research</li>
          <li>AI applications</li>
          <li>AI document generation</li>
          <li>Image generation</li>
          <li>Image analysis</li>
        </ul>
        <h3>How We Process Your Data Using AI</h3>
        <p>
          All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties. This ensures high security and safeguards your personal information throughout the process, giving you peace of mind about your data's safety.
        </p>

        <h2 id="sociallogins">8. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
        <p className="!italic">
          <strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
        </p>
        <p>
          Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
        </p>
        <p>
          We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
        </p>

        <h2 id="inforetain">9. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
        </p>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </p>

        <h2 id="infosafe">10. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.
        </p>
        <p>
          We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
        </p>

        <h2 id="infominors">11. DO WE COLLECT INFORMATION FROM MINORS?</h2>
        <p className="!italic">
          <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
        </p>
        <p>
          We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:s@crisp.sh"><Placeholder>s@crisp.sh</Placeholder></a>.
        </p>

        <h2 id="privacyrights">12. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p className="!italic">
          <strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
        </p>
        <p>
          In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below.
        </p>
        <p>
          We will consider and act upon any request in accordance with applicable data protection laws.
        </p>
        <p>
          If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" rel="noopener noreferrer" target="_blank">Member State data protection authority</a> or <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" rel="noopener noreferrer" target="_blank">UK data protection authority</a>.
        </p>
        <p>
          If you are located in Switzerland, you may contact the <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" rel="noopener noreferrer" target="_blank">Federal Data Protection and Information Commissioner</a>.
        </p>
        <h3 id="withdrawconsent">Withdrawing your consent:</h3>
        <p>
          If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below or updating your preferences.
        </p>
        <p>
          However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
        </p>
        <h3>Opting out of marketing and promotional communications:</h3>
        <p>
          You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, replying "STOP" or "UNSUBSCRIBE" to the SMS messages that we send, or by contacting us using the details provided in the section "<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>" below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.
        </p>
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with third parties.
        </p>
        <h3>Account Information</h3>
        <p>
          If you would at any time like to review or change the information in your account or terminate your account, you can:
        </p>
        <ul>
          <li>Contact us using the contact information provided.</li>
        </ul>
        <p>
          Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
        </p>
        <h3>Cookies and similar technologies:</h3>
        <p>
          Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. You may also <a href="http://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">opt out of interest-based advertising by advertisers</a> on our Services.
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may email us at <a href="mailto:s@crisp.sh"><Placeholder>s@crisp.sh</Placeholder></a>.
        </p>

        <h2 id="DNT">13. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
        <p>
          Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
        </p>
        <p>
          California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
        </p>

        <h2 id="uslaws">14. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
        <p className="!italic">
          <strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.
        </p>
        <h3>Categories of Personal Information We Collect</h3>
        <p>
          We have collected the following categories of personal information in the past twelve (12) months:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/20">
            <thead className="bg-white/5">
              <tr>
                <th className="w-[34%] text-left">Category</th>
                <th className="w-[51%] text-left">Examples</th>
                <th className="w-[15%] text-center">Collected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A. Identifiers</td>
                <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>B. Personal information as defined in the California Customer Records statute</td>
                <td>Name, contact information, education, employment, employment history, and financial information</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>C. Protected classification characteristics under state or federal law</td>
                <td>Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>D. Commercial information</td>
                <td>Transaction information, purchase history, financial details, and payment information</td>
                <td className="text-center">NO</td>
              </tr>
              <tr>
                <td>E. Biometric information</td>
                <td>Fingerprints and voiceprints</td>
                <td className="text-center">NO</td>
              </tr>
              <tr>
                <td>F. Internet or other similar network activity</td>
                <td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>G. Geolocation data</td>
                <td>Device location</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>H. Audio, electronic, sensory, or similar information</td>
                <td>Images and audio, video or call recordings created in connection with our business activities</td>
                <td className="text-center">YES</td>
              </tr>
              <tr>
                <td>I. Professional or employment-related information</td>
                <td>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                <td className="text-center">NO</td>
              </tr>
              <tr>
                <td>J. Education Information</td>
                <td>Student records and directory information</td>
                <td className="text-center">NO</td>
              </tr>
              <tr>
                <td>K. Inferences drawn from collected personal information</td>
                <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics</td>
                <td className="text-center">NO</td>
              </tr>
              <tr>
                <td>L. Sensitive personal Information</td>
                <td></td>
                <td className="text-center">NO</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
        </p>
        <ul>
          <li>Receiving help through our customer support channels;</li>
          <li>Participation in customer surveys or contests; and</li>
          <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
        </ul>
        <p>
          We will use and retain the collected personal information as needed to provide the Services or for:
        </p>
        <ul>
          <li>Category A - <Placeholder>As long as the user has an account with us</Placeholder></li>
          <li>Category B - <Placeholder>As long as the user has an account with us</Placeholder></li>
          <li>Category C - <Placeholder>As long as the user has an account with us</Placeholder></li>
          <li>Category F - <Placeholder>As long as the user has an account with us</Placeholder></li>
          <li>Category G - <Placeholder>As long as the user has an account with us</Placeholder></li>
          <li>Category H - <Placeholder>As long as the user has an account with us</Placeholder></li>
        </ul>
        <h3>Sources of Personal Information</h3>
        <p>
          Learn more about the sources of personal information we collect in "<a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>"
        </p>
        <h3>How We Use and Share Personal Information</h3>
        <p>
          Learn more about how we use your personal information in the section, "<a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>"
        </p>
        <h3>Will your information be shared with anyone else?</h3>
        <p>
          We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "<a href="#whoshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>"
        </p>
        <p>
          We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
        </p>
        <p>
          We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
        </p>
        <h3>Your Rights</h3>
        <p>
          You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:
        </p>
        <ul>
          <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
          <li><strong>Right to access</strong> your personal data</li>
          <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
          <li><strong>Right to request</strong> the deletion of your personal data</li>
          <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
          <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
          <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California's privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
        </ul>
        <p>
          Depending upon the state where you live, you may also have the following rights:
        </p>
        <ul>
          <li>Right to access the categories of personal data being processed (as permitted by applicable law, including the privacy law in Minnesota)</li>
          <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in California, Delaware, and Maryland)</li>
          <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in Minnesota and Oregon)</li>
          <li>Right to review, understand, question, and correct how personal data has been profiled (as permitted by applicable law, including the privacy law in Minnesota)</li>
          <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including the privacy law in California)</li>
          <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including the privacy law in Florida)</li>
        </ul>
        <h3>How to Exercise Your Rights</h3>
        <p>
          To exercise these rights, you can contact us by visiting <a href="#"><Placeholder>crisp.sh/data-request</Placeholder></a>, by visiting <a href="#"><Placeholder>crisp.sh/contact</Placeholder></a>, or by referring to the contact details at the bottom of this document.
        </p>
        <p>
          Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.
        </p>
        <h3>Request Verification</h3>
        <p>
          Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.
        </p>
        <p>
          If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.
        </p>
        <h3>Appeals</h3>
        <p>
          Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="mailto:s@crisp.sh"><Placeholder>s@crisp.sh</Placeholder></a>. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.
        </p>
        <h3>Financial Incentives</h3>
        <p>
          "Financial incentive" means a program, benefit, or other offering, including payments to consumers as compensation, for the disclosure, deletion, sale, or sharing of personal information.
        </p>
        <p>
          The law permits financial incentives or a price or service difference if it is reasonably related to the value of the consumer's data. A business must be able to explain how the financial incentive or price or service difference is reasonably related to the value of the consumer's data. The explanation must include:
        </p>
        <ul>
          <li>a good-faith estimate of the value of the consumer's data that forms the basis for offering the financial incentive or price or service difference; and</li>
          <li>a description of the method the business used to calculate the value of the consumer's data.</li>
        </ul>
        <p>
          We may decide to offer a "bona fide loyalty program" under Colorado law, or a "financial incentive" under California law (e.g., price or service difference) in exchange for the retention, sale, or sharing of a consumer's personal information.
        </p>
        <p>
          If we decide to offer a financial incentive, we will notify you of such financial incentive and explain the price difference, as well as material terms of the financial incentive or price of service difference, including the categories of personal information that are implicated by the financial incentive or price or service difference.
        </p>
        <p>
          Under California law, the value of your personal information to us is related to the value of the free or discounted products or services, or other benefits that you obtain or that are provided as part of the applicable program, less the expense related to offering those products, services, and benefits to program participants.
        </p>
        <p>
          If you choose to participate in the financial incentive you can withdraw from the financial incentive at any time by visiting <a href="#"><Placeholder>crisp.sh/contact</Placeholder></a> or by referring to the contact details at the bottom of this document.
        </p>
        <h3>California "Shine The Light" Law</h3>
        <p>
          California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "<a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>"
        </p>

        <h2 id="policyupdates">15. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <p className="!italic">
          <strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.
        </p>
        <p>
          We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
        </p>

        <h2 id="contact">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p>
          If you have questions or comments about this notice, you may email us at <a href="mailto:s@crisp.sh"><Placeholder>s@crisp.sh</Placeholder></a> or contact us by post at:
        </p>
        <p className="!mt-0">
          <Placeholder>crisp.sh</Placeholder><br />
          <Placeholder>__________</Placeholder><br />
          <Placeholder>__________</Placeholder>
        </p>

        <h2 id="request">17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
        <p>
          Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: <a href="#"><Placeholder>crisp.sh/data-request</Placeholder></a>.
        </p>

      </article>
    </div>
  );
} 