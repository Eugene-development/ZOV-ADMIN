'use client'

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { useAuth } from '@/hooks/auth'

import { useBarStore } from '@/store/bar'
const { visibleBar } = useBarStore

// const navigation = [
//     { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
//     { name: 'Team', href: '#', icon: UsersIcon, current: false },
//     { name: 'Projects', href: '#', icon: FolderIcon, current: false },
//     { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//     {
//         name: 'Documents',
//         href: '#',
//         icon: DocumentDuplicateIcon,
//         current: false,
//     },
//     { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
// ]
// const teams = [
//     { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//     { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//     { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { openVisibleBar } = visibleBar()

    const { user } = useAuth({ middleware: 'auth' })
    const { logout } = useAuth()

    return (
        <>
            <div className="">
                <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-full ">
                    <div className="flex lg:px-8 h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6  lg:shadow-none">
                        {/* Separator */}
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none"
                            onClick={() => openVisibleBar()}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </button>
                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div
                                className="relative flex flex-1"
                                action="#"
                                method="GET"
                            >
                                <label
                                    htmlFor="search-field"
                                    className="sr-only"
                                >
                                    Поиск
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Поиск..."
                                    type="search"
                                    name="search-new"
                                />
                            </div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Separator */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                                    aria-hidden="true"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                className="ml-4 text-base font-semibold leading-6 text-gray-900"
                                                aria-hidden="true"
                                            >
                                                {user?.name}
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/profile"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-50'
                                                                : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                                                        )}
                                                    >
                                                        Ваш профиль
                                                    </a>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={logout}
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-50 cursor-pointer'
                                                                : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                                                        )}
                                                    >
                                                        Выйти
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <main className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            uuu
                        </div>
                    </main> */}
            </div>
        </>
    )
}
