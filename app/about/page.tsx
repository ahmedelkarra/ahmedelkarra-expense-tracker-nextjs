import About from '@/components/About'
import React from 'react'
import icon from '@/public/icon.png'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense-Tracker",
  description: "Manage your personal and business expenses effortlessly with ExpenseTracker. Enjoy real-time tracking, detailed reports, budget planning, and secure data encryption. Get started today!",
  keywords: ['expense tracking', ' personal finance management', ' budget planning', 'expense reports', 'financial tracking', 'money management', ' budgeting tools', ' expense management software', 'real-time expense tracking', 'secure financial data', 'bank account integration', 'multi-currency support', 'financial analytics', 'mobile expense tracking', 'expense categories'],
  icons: {
    icon: icon.src
  }
};


function AboutPage() {
    return (
        <div className="min-h-[50dvh]">
            <About />
        </div>
    )
}

export default AboutPage