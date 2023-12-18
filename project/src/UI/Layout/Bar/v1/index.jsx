'use client'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
    FireIcon,
    FlagIcon,
    WrenchScrewdriverIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    Cog6ToothIcon,
    HandThumbUpIcon,
} from '@heroicons/react/24/outline'

import { useBarStore } from '@/store/bar'
const { visibleBar } = useBarStore

const navigation = [
    // { name: 'Дашборд', href: '/dashboard', icon: ChartPieIcon, current: true },
    {
        name: 'Главная',
        href: '/main',
        icon: HomeIcon,
        current: false,
        children: [
            { name: 'Список постов', href: '#' },
            { name: 'Human Resources', href: '#' },
            { name: 'Customer Success', href: '#' },
        ],
    },
    {
        name: 'Компания',
        href: '/company',
        icon: FlagIcon,
        current: false,
        children: [
            { name: 'хххх', href: '#' },
            { name: 'хххх', href: '#' },
            { name: 'хххх', href: '#' },
        ],
    },
    {
        name: 'Блог',
        icon: HandThumbUpIcon,
        current: false,
        children: [
            { name: 'Список', href: '#' },
            { name: 'Категория', href: '#' },
            { name: 'Пост', href: '#' },
            { name: 'Автор', href: '#' },
        ],
    },
    {
        name: 'Каталог',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Рубрика', href: '/rubrics' },
            { name: 'Категория', href: '/categories' },
            { name: 'Продукт', href: '/products' },
            { name: 'Тег', href: '/products' },
        ],
    },
    {
        name: 'Сервис',
        href: '/#',
        icon: WrenchScrewdriverIcon,
        current: false,
        children: [{ name: 'Список', href: '#' }],
    },
    {
        name: 'Акции',
        href: '/#',
        icon: FireIcon,
        current: false,
        children: [{ name: 'Список', href: '#' }],
    },
    {
        name: 'Салоны',
        href: '/',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Руководство', href: '#' },
            { name: 'Сервис', href: '#' },
            { name: 'Дизайнеры', href: '#' },
        ],
    },
]
const analytics = [
    { id: 1, name: 'SEO', href: '#', initial: 'S', current: false },
    { id: 2, name: 'Реклама', href: '#', initial: 'Р', current: false },
    { id: 3, name: 'Статистика', href: '#', initial: 'С', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default () => {
    const { currentVisibleBar, closeVisibleBar } = visibleBar()

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
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="bg-gray-800 px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <img
                                                    className="h-10"
                                                    src="https://zovrus.ru/design/zovrus/images/dist/svg/logo-white.svg"
                                                    alt="Белорусская абрика мебели 'ЗОВ'"
                                                />
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
                                                <div className="py-6 text-2xl font-bold tracking-wide leading-6 text-gray-700">
                                                    Сайт
                                                </div>
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
                                                                            <div
                                                                                onClick={() =>
                                                                                    closeVisibleBar()
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    rel="prefetch"
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
                                                                            </div>
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
                                                                                                    <li
                                                                                                        onClick={() =>
                                                                                                            closeVisibleBar()
                                                                                                        }
                                                                                                        className="hover:bg-gray-50"
                                                                                                        key={
                                                                                                            subItem.name
                                                                                                        }
                                                                                                    >
                                                                                                        {/* 44px */}
                                                                                                        <Link
                                                                                                            href={
                                                                                                                subItem.href
                                                                                                            }
                                                                                                        >
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
                                                <div className="mt-6 py-4 text-2xl font-bold tracking-wide leading-6 text-gray-700">
                                                    Продвижение
                                                </div>
                                                <ul
                                                    role="list"
                                                    className=" mt-2 space-y-1"
                                                >
                                                    {analytics.map(team => (
                                                        <li key={team.name}>
                                                            <a
                                                                href={team.href}
                                                                className={classNames(
                                                                    team.current
                                                                        ? 'bg-gray-50 text-gray-600'
                                                                        : 'text-gray-700 hover:text-gray-600 hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md py-2 text-base leading-6 font-semibold',
                                                                )}
                                                            >
                                                                <span
                                                                    className={classNames(
                                                                        team.current
                                                                            ? 'text-gray-600 border-gray-600'
                                                                            : 'text-gray-400 border-gray-200 group-hover:border-gray-600 group-hover:text-gray-600',
                                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                                                    )}
                                                                >
                                                                    {
                                                                        team.initial
                                                                    }
                                                                </span>
                                                                <span className="truncate">
                                                                    {team.name}
                                                                </span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="mt-auto p-6">
                                            <Link
                                                href="/settings"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-600"
                                            >
                                                <Cog6ToothIcon
                                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-600"
                                                    aria-hidden="true"
                                                />
                                                Настройки
                                            </Link>
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
