"use client"

import { DayPicker } from 'react-day-picker';
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";
import 'react-day-picker/dist/style.css';
import { useEffect, useMemo, useState } from 'react';
import { getMonth as date_fns_getMonth, setMonth as date_fns_setMonth, setYear as date_fns_setYear, getYear as date_fns_getYear } from 'date-fns';
import clsx from 'clsx';
import { MenuIcon, XIcon } from 'lucide-react';


import { Transition } from '@headlessui/react';
import { cn, convertJsDateToMySqlDate } from '@/lib/utils';
import { ProseInnerHtmlContainer } from '@/components/prose-container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export default function VaishnavCalendar({ data }) {

    const [month, setMonth] = useState(() => new Date());

    const [selected, setSelected] = useState(() => new Date());

    const [leftExpanded, setLeftExpanded] = useState(false);

    const dateMap = useMemo(() => {
        const map = new Map();
        data.forEach((item) => {
            if (!map.has(item.date)) {
                map.set(item.date, []);
            }
            map.get(item.date).push(item);
        })

        return map;
    }, [data]);


    const selectedDateItem = selected ? dateMap.get(convertJsDateToMySqlDate(selected)) : null;

    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function changeMonth(monthNumber) {
        // return;
        const temp = date_fns_setMonth(new Date(month), monthNumber);
        setMonth(temp);
    }

    function changeYear(offset) {
        const cur_selected = new Date(month);
        const temp = date_fns_setYear(cur_selected, date_fns_getYear(cur_selected) + offset);
        setMonth(temp);
    }

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setLeftExpanded(true);
        }
    }, []);


    function formatDate(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${dayOfWeek}, ${dayOfMonth}${daySuffix(dayOfMonth)} ${month} ${year}`;
    }


    return (
        <div className="md:max-h-[460px] md:min-h-[460px] rounded-xl overflow-hidden grid  md:grid-cols-2 lg:flex max-w-sm md:max-w-full w-full bg-surface text-on-surface gap-2 min-h-max relative">


            <Transition
                enter="transition-all duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={leftExpanded}
                as={"div"}
                className={"bg-primary text-on-primary min-h-full h-full overflow-auto absolute top-0 left-0 lg:relative z-10 md:min-w-[16rem] md:max-w-[16rem] min-w-full max-w-full flex scrollbar-hide"}
            >

                <div className='flex-grow p-4 flex flex-col'>
                    <div className='flex w-full justify-between items-center text-2xl mb-4'>

                        <button onClick={changeYear.bind(null, -1)} className='text-lg p-0.5 rounded-full border-2 border-on-primary hover:text-primary hover:bg-on-primary duration-150'>
                            <FaCaretLeft />
                        </button>


                        <span className='font-semibold'>{date_fns_getYear(month)}</span>


                        <button onClick={changeYear.bind(null, 1)} className='text-lg p-0.5 rounded-full border-2 border-on-primary hover:text-primary hover:bg-on-primary duration-150'>
                            <FaCaretRight />
                        </button>

                    </div>

                    <div className='flex-1 flex gap-0.5 justify-around text-sm font-semibold flex-col'>

                        {
                            MONTHS.map((MONTH, index) => (
                                <button variant="link" className={clsx(date_fns_getMonth(month) === index && "bg-on-primary text-primary rounded-lg", "text-left px-2 py-1")} key={index} onClick={changeMonth.bind(null, index)}>
                                    {MONTH}
                                </button>
                            ))
                        }

                    </div>
                </div>

                <button
                    onClick={() => setLeftExpanded(state => false)}
                    className='lg:hidden sticky h-full bg-background text-on-background top-0 right-0 duration-150 border-r-2 border-outline/50 hover:text-red-500'
                >
                    <XIcon className='w-7 h-7' />
                </button>

            </Transition>

            <div className='lg:min-w-max mx-auto h-full p-4'>
                <div className='flex justify-between gap-1 w-full mb-4'>

                    <button
                        onClick={() => setLeftExpanded(state => !state)}
                        className={clsx('rounded-xl bg-background text-lg font-semibold h-8 w-8 flex items-center justify-center hover:bg-on-background hover:text-background duration-150', leftExpanded && "rotate-180")}
                    >
                        <MenuIcon />
                    </button>

                </div>

                <DayPicker
                    mode="single"
                    showOutsideDays
                    components={{
                        Day: ({ day, modifiers, children, ...props }) => {


                            return (
                                <td
                                    {...props}
                                >
                                    {children}

                                    {
                                        dateMap.has(convertJsDateToMySqlDate(day.date)) &&
                                        <div className={cn('absolute h-2 w-2 bg-primary right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 rounded-full mix-blend-difference')}></div>
                                    }
                                </td>
                            )
                        }
                    }}
                    classNames={{
                        chevron: "fill-on-background w-5 h-5",
                        today: "!text-blue-500 !underline !font-bold underline-offset-2",
                        selected: "!bg-primary !text-on-primary hover:opacity-60 !font-bold",
                        button_next: "!bg-background rounded-md flex items-center justify-center !p-1 !mr-2 hover:opacity-70",
                        button_previous: "!bg-background rounded-md flex items-center justify-center !p-1 !mr-2 hover:opacity-70",
                        outside: "!opacity-30",
                        day: "relative hover:bg-background rounded-md text-base !rounded-full w-11 h-11 sm:w-12 sm:h-12",
                        weekday: "!text-primary font-medium text-lg",
                        day_button: "w-full h-full flex items-center justify-center !rounded-full focus:outline-none focus:!ring-on-background focus:ring-1"
                    }}
                    month={month}
                    onMonthChange={setMonth}
                    selected={selected}
                    onSelect={(date) => { setSelected(date) }}
                />



            </div>

            <div className='p-4 h-full overflow-auto w-full'>
                <div className='text-xl font-semibold mb-4'>
                    <h4>{selected ? formatDate(selected) : "Select Date"}</h4>
                </div>

                {/* <ScrollArea className="pr-4"> */}

                    <div className='max-h-56 sm:max-h-max overflow-y-auto pr-1'>
                    {

                        selected ?

                            selectedDateItem ?
                                <div className='space-y-4'>
                                    {selectedDateItem.map((item, index) => (

                                        <div key={index} className='border border-primary bg-background text-on-background rounded-lg p-4'>
                                            <h5>{item.title}</h5>
                                            <ProseInnerHtmlContainer className='prose-sm sm:!prose-sm text-on-background/70 break-all' html={item.description} />
                                            {
                                                item.buttontext &&
                                                <Button asChild variant="link" className="px-0 mt-2 h-max">
                                                    <Link href={item.buttonlink}>
                                                        {item.buttontext}
                                                    </Link>
                                                </Button>
                                            }
                                        </div>
                                    ))}
                                </div>
                                :


                                <div className='border border-primary bg-background text-on-background rounded-lg p-4'>
                                    <h5 className='text-primary font-medium'>No Notable Events on This Day</h5>
                                </div>

                            :
                            <div className='border border-primary bg-background text-on-background rounded-lg p-4'>
                                <h5 className='text-primary font-medium'>Please select a date!</h5>
                            </div>
                    }
                    </div>
                    {/* <ScrollBar orientation="vertical" /> */}
                {/* </ScrollArea> */}
            </div>


        </div>
    )
}