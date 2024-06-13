import Link from 'next/link'
import React from 'react'
import aboutImage from '@/public/aboutImage.jpg'
import Image from 'next/image'

function About() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <Image
                            alt=""
                            src={aboutImage}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">Welcome to expense-tracker Website</h2>

                        <p className="mt-4 text-gray-600">
                            Expense Tracker is an innovative tool that helps you manage your daily expenses easily and efficiently,
                            enabling you to achieve your financial goals and track your spending accurately.
                        </p>

                        <Link
                            href="/register"
                            className="mt-8 inline-block rounded bg-mainButton px-12 py-3 text-sm font-medium text-white transition hover:bg-secondButton focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default About