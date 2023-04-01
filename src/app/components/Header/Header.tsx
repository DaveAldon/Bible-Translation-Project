import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { links } from '@/app/util/links'

const HeaderLink = ({ href, children }: { href: string; children: string }) => (
  <li>
    <Link
      className="text-white transition hover:text-gray-400 hidden md:inline-block"
      href={href}
    >
      <p style={{ whiteSpace: 'nowrap' }}>{children}</p>
    </Link>
  </li>
)

export const Header = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div
        className="flex items-center justify-between"
        style={{
          height: '54px',
        }}
      >
        <div className="flex w-10 h-100 bg-red">
          <Link
            className="flex flex-row justify-center items-center gap-4 text-white"
            href="/"
          >
            {/* <CircleLogo /> */}
          </Link>
        </div>

        <div className="md:flex md:items-center md:gap-12">
          <nav aria-label="Site Nav" className="block">
            <ul className="flex items-center gap-6 text-sm w-full">
              {links.map((link, i) => (
                <HeaderLink key={i} href={link.href}>
                  {link.children}
                </HeaderLink>
              ))}
              <MobileMenu />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
