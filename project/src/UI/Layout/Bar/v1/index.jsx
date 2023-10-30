'use client'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { useBarStore } from '@/store/bar'
const { visibleBar } = useBarStore

const navigation = [
    { name: 'Главная', href: '/dashboard', icon: HomeIcon, current: true },
    {
        name: 'Команда',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Engineering', href: '#' },
            { name: 'Human Resources', href: '#' },
            { name: 'Customer Success', href: '#' },
        ],
    },
    {
        name: 'Каталог',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Меню', href: '/menu' },
            { name: 'Рубрика', href: '/rubrics' },
            { name: 'Категория', href: '/categories' },
            { name: 'Продукт', href: '/products' },
        ],
    },
    {
        name: 'Блог',
        href: '/blog',
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: 'СЕО', href: '/seo', icon: ChartPieIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { currentVisibleBar, closeVisibleBar } = visibleBar()

    const [open, setOpen] = useState(true)

    return (
        <Transition.Root show={currentVisibleBar} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={closeVisibleBar}
            >
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="bg-gray-800 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                    Проект "ЗОВ"
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-gray-800 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() =>
                                                            closeVisibleBar()
                                                        }
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* <div className="mt-1">
                                                <p className="text-sm text-gray-300">
                                                    Lorem, ipsum dolor sit amet
                                                    consectetur adipisicing elit
                                                    aliquam ad hic recusandae
                                                    soluta.
                                                </p>
                                            </div> */}
                                        </div>
                                        <div className="relative flex-1 px-4 py-6 sm:px-6">
                                            <nav className="flex flex-1 flex-col">
                                                <ul
                                                    role="list"
                                                    className="flex flex-1 flex-col gap-y-7"
                                                >
                                                    <li>
                                                        <ul
                                                            role="list"
                                                            className="-mx-2 space-y-1"
                                                        >
                                                            {navigation.map(
                                                                item => (
                                                                    <li
                                                                        key={
                                                                            item.name
                                                                        }
                                                                    >
                                                                        {!item.children ? (
                                                                            <Link rel="prefetch"
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                className={classNames(
                                                                                    item.current
                                                                                        ? 'bg-gray-50'
                                                                                        : 'hover:bg-gray-50',
                                                                                    'group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold text-gray-700',
                                                                                )}
                                                                            >
                                                                                <item.icon
                                                                                    className="h-6 w-6 shrink-0 text-gray-400"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </Link>
                                                                        ) : (
                                                                            <Disclosure as="div">
                                                                                {({
                                                                                    open,
                                                                                }) => (
                                                                                    <>
                                                                                        <Disclosure.Button
                                                                                            className={classNames(
                                                                                                item.current
                                                                                                    ? 'bg-gray-50'
                                                                                                    : 'hover:bg-gray-50',
                                                                                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-base leading-6 font-semibold text-gray-700',
                                                                                            )}
                                                                                        >
                                                                                            <item.icon
                                                                                                className="h-6 w-6 shrink-0 text-gray-400"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                            {
                                                                                                item.name
                                                                                            }
                                                                                            <ChevronRightIcon
                                                                                                className={classNames(
                                                                                                    open
                                                                                                        ? 'rotate-90 text-gray-500'
                                                                                                        : 'text-gray-400',
                                                                                                    'ml-auto h-5 w-5 shrink-0',
                                                                                                )}
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </Disclosure.Button>
                                                                                        <Disclosure.Panel
                                                                                            as="ul"
                                                                                            className="mt-1 px-2"
                                                                                        >
                                                                                            {item.children.map(
                                                                                                subItem => (
                                                                                                    <li className='hover:bg-gray-50'
                                                                                                        key={
                                                                                                            subItem.name
                                                                                                        }
                                                                                                    >
                                                                                                        {/* 44px */}
                                                                                                       <Link  href={ subItem.href }>
                                                                                                            <Disclosure.Button
                                                                                                                className={classNames(
                                                                                                                    subItem.current
                                                                                                                        ? 'bg-gray-50'
                                                                                                                        : 'hover:bg-gray-50',
                                                                                                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700',
                                                                                                                )}
                                                                                                            >
                                                                                                                {
                                                                                                                    subItem.name
                                                                                                                }
                                                                                                            </Disclosure.Button>
                                                                                                        </Link>
                                                                                                    </li>
                                                                                                ),
                                                                                            )}
                                                                                        </Disclosure.Panel>
                                                                                    </>
                                                                                )}
                                                                            </Disclosure>
                                                                        )}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
