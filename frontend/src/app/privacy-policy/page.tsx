import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Headers/Header'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
}

const PrivacyPolicy = () => {
  return (
    <div>
       <Header/>
      <div className='bg-white mx-auto px-80'>
      <div className='font-bold font-title text-3xl pt-6'>Say I Do Privacy Policy</div>
      <div className='font-body mt-8'>
      <h1 className='mt-8 font-bold font-title'>Effective Date: October 12, 2024</h1>

      <h1 className='mt-6 font-bold font-title text-lg'>1. Introduction</h1>

      <p className='mt-6'>Welcome to Say I Do. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This privacy policy outlines how we collect, use, disclose, and protect your information when you visit our website.</p>

<h1 className='mt-6 font-bold font-title text-lg'>2. Information We Collect</h1>

<p className='mt-6'>We may collect personal information from you when you visit our website, register for an account, place an order, or interact with our services. The types of information we may collect include:</p>
<ul className="list-disc pl-5 space-y-1">
<li>Personal Identification Information: Name, email address, phone number, and mailing address.
</li><li>Payment Information: Credit card details and billing address.
</li><li>Account Information: Username, password, and profile information.
</li><li>Usage Data: Information about how you use our website, including your IP address, browser type, and access times.
</li>
</ul>

<h1 className='mt-6 font-bold font-title text-lg'>3. How We Use Your Information</h1>

<p className='mt-6'>We may use the information we collect from you for various purposes, including:</p>
<ul className="list-disc pl-5 space-y-1">
<li>To provide and maintain our services.
</li><li>To process transactions and manage your account.
</li><li>To communicate with you, including sending you updates, marketing materials, and promotional offers.
</li><li>To improve our website and services based on your feedback and usage patterns.
</li><li>To protect our rights, privacy, safety, or property, and/or that of our users.</li></ul>

<h1 className='mt-6 font-bold font-title text-lg'>4. Sharing Your Information</h1>

<p className='mt-6'>We may share your information with third parties in the following circumstances:</p>
<ul className="list-disc pl-5 space-y-1">
<li>With vendors and service providers who assist us in operating our website and providing our services.
</li><li>In response to legal requests or to comply with applicable laws and regulations.
</li><li>In connection with a merger, sale, or acquisition of all or a portion of our business.
</li></ul>

<h1 className='mt-6 font-bold font-title text-lg'>5. Data Security</h1>


<p className='mt-6'>We take data security seriously and implement appropriate measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
</p>

<h1 className='mt-6 font-bold font-title text-lg'>6. Your Rights</h1>

<p className='mt-6'>You have the right to:</p>

<ul className="list-disc pl-5 space-y-1"><li>Access the personal information we hold about you.
</li><li>Request correction of any inaccurate information.
</li><li>Request deletion of your personal information.
</li><li>Opt-out of marketing communications.
</li><li>To exercise these rights, please contact us using the information below.</li></ul>

<h1 className='mt-6 font-bold font-title text-lg'>7. Changes to This Privacy Policy</h1>

<p className='mt-6'>We may update our privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this privacy policy periodically for any changes.
</p>

<h1 className='mt-6 font-bold font-title text-lg'>8. Contact Us</h1>

<p className='mt-6'>If you have any questions or concerns about this privacy policy or our data practices, please contact us at:</p>
<ul className="list-disc pl-5 space-y-1">
<li>Email: help@sayido.lk
</li><li>Phone: +94 47 786 4913
</li><li>Address: Hapugala,Galle, Sri Lanka</li>
</ul>
<div className='mt-4 mb-8'>Thank you for using Say I Do!</div>



</div>
      </div>
      <Footer/>

    </div>
  )
}

export default PrivacyPolicy
