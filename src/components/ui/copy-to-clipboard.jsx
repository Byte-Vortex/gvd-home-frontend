"use client"

import { useEffect, useState, Fragment } from "react";
import { LuCopy as CopyIcon } from "react-icons/lu"
import { BsCheckLg as CheckIcon } from "react-icons/bs"
import { Transition } from "@headlessui/react";

export default function CopyToClipboard({ text }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <button
        type="button"
            className="cursor-pointer inline h-4 w-4"
            onClick={() => { setCopied(true); navigator.clipboard.writeText(text); }}
        >
            <div className="flex items-center justify-center relative">
                <Transition
                    as={"span"}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute p-1 rounded-lg hover:bg-foreground/10"
                    show={!copied}
                >
                    <CopyIcon />
                </Transition>

                <Transition
                    as={"span"}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute"
                    show={copied}
                >
                    <CheckIcon className="text-green-700" />
                </Transition>
            </div>
        </button>
    );
}