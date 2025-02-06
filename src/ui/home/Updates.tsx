"use client"
import React, { useState, useRef } from 'react';
import Button from '../Button';
import { SiSoundcharts } from 'react-icons/si';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Updates = () => {
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const { clientX, clientY } = event;
        const element = imgRefs.current[index];
        const rect = element?.getBoundingClientRect();
        
        if (!rect || !element) return;

        const xOffset = clientX - rect.left - rect.width / 2;
        const yOffset = clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
            x: xOffset * 0.01, 
            y: yOffset * 0.01, 
            rotationY: xOffset / 25, 
            rotationX: -yOffset / 25, 
            transformPerspective: 900,
            duration: 0.7,
            ease: 'power1.out',
        });
    };
    
    const handleMouseLeave = (index: number) => {
        const element = imgRefs.current[index];
        if (!element) return;

        gsap.to(element, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.1,
            ease: 'power1.out',
        });
    };

    useGSAP(() => {
        gsap.to('#title1', {
            scrollTrigger: {
                trigger: '#title1',
                start: '40% center',
                end: 'bottom center',
                pin: true,
                toggleActions: 'play none none none',
            },
            duration: 1.5,
        });
    }, []);

    return (
        <section className='min-h-screen flex flex-col md:flex-row gap-5 justify-between p-5 md:p-20 md:px-32'>
            {/* Left Section: Title and Button */}
            <div id='title1' className='max-w-md space-y-5'>
                <h1 className='plain-heading special-font text-black text-[5rem] px-4 md:text-[10rem] leading-none text-start'>
                    Lat<b>e</b>st <b>U</b>PDATES
                </h1>
                <p className='md:ps-5 text-lg font-semibold opacity-70'>
                    Stay updated with the latest news, events, and updates in our ecosystem. Be part of our universe&apos;s growth and evolution.
                </p>
                <Button 
                    id="read-news"
                    title='READ ALL NEWS' 
                    containerClass='!bg-black text-white flex space-x-3 md:ms-5' 
                    rightIcon={<SiSoundcharts />}
                    leftIcon={null}
                />
            </div>

            {/* Right Section: Images with mouse movement effect */}
            <div className='flex flex-col gap-5 max-lg:mt-64'>
                {/* First Image */}
                <div
                    onMouseMove={(e) => handleMouseMove(e, 0)}
                    onMouseLeave={() => handleMouseLeave(0)}
                    className='relative'
                >
                    <div className='flex justify-between max-w-lg space-x-5 py-5'>
                        <p className='text-sm font-general font-semibold opacity-70'>09.05.2024</p>
                        <h1 className='font-robert-medium text-xl max-w-xs'>Welcome NEXUS: Zentry&apos;s Social Gateway</h1>
                    </div>
                    <div className="relative h-96 w-full">
                        <Image
                            ref={el => {
                                if (el) imgRefs.current[0] = el;
                            }}
                            src='/img/swordman-partial.webp'
                            alt='updates-1'
                            fill
                            className='rounded-lg object-cover border border-black'
                        />
                    </div>
                </div>

                {/* Second Image */}
                <div
                    onMouseMove={(e) => handleMouseMove(e, 1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    className='relative'
                >
                    <div className='flex justify-between space-x-5 max-w-lg py-5'>
                        <p className='text-sm font-general font-semibold opacity-70'>23.04.2024</p>
                        <h1 className='font-robert-medium text-xl max-w-xs'>Introducing Zentry: The Metagame Layer</h1>
                    </div>
                    <div className="relative h-96 w-full">
                        <Image
                            ref={el => {
                                if (el) imgRefs.current[1] = el;
                            }}
                            src='/img/swordman-partial.webp'
                            alt='updates-2'
                            fill
                            className='rounded-lg object-cover border border-black hover:shadow-md transition-all'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Updates;
