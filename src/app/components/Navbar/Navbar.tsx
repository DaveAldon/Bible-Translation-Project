'use client'
import Link from 'next/link'
import { Fragment } from 'react'
import { Transition, Menu } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { links } from '@/app/util/links'

function Navbar() {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Link className="text-2xl font-extrabold text-gray-500" href="/">
              project
            </Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium lg:flex"
          >
            {links.map((link, idx) => (
              <Link key={idx} className="text-gray-500" href={link.href}>
                {link.children}
              </Link>
            ))}
          </nav>

          <Menu as="div" className="lg:hidden">
            <Menu.Button
              className="rounded-lg bg-gray-100 p-2 text-gray-600 lg:hidden"
              type="button"
            >
              <Bars3Icon className="h-5 w-5" />
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
              <Menu.Items className="bg-black z-50 flex flex-col space-y-1 origin-top-right absolute right-0 w-full mt-4">
                {links.map((link, idx) => (
                  <Menu.Item key={idx}>
                    {({ active }) => (
                      <a
                        className={`${
                          active && 'bg-indigo-400/75'
                        } block px-4 py-2 text-sm font-medium text-white`}
                        href={link.href}
                      >
                        {link.children}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Navbar
