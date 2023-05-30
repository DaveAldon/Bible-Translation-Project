import { CallToActionForm } from './components/CallToActionForm/CallToActionForm'
import { InfoCard } from './components/InfoCard/InfoCard'

const Header = () => {
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[500px] object-cover brightness-50"
        style={{
          scale: '1',
          margin: 0,
        }}
      >
        <source src="/assets/videos/hebrew_video.m4v" type="video/mp4" />
      </video>
      <div className="absolute top-0 right-0 w-2/3 h-full flex items-center justify-center p-20">
        <h1 className="text-5xl font-semibold text-white text-right">
          We are making the source and history of Bible translations easy to
          understand
        </h1>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="flex flex-col p-8 pt-4 w-full justify-center items-center">
      <div className="flex w-full justify-center items-center max-w-xl">
        <p className="mb-4 w-full text-gray-400 text-lg">
          The Bible Translation Project is an effort to show where your favorite
          translation comes from, what manuscripts were used to create it, and
          why it was made in the first place. Bible translations are often based
          on other translations, various manuscripts, and commentaries. But
          which ones? How far removed are they from the original text? What
          books do they include, or omit? How do they relate to each other? Why
          do they exist? Who wrote them?
        </p>
      </div>
      <div className="flex flex-col w-full items-center justify-center max-w-xl text-white">
        <p className="mb-4 text-lg text-center font-light">
          We believe that this project and these questions are important to ask
          for three reasons:
        </p>
        <ReasonsList />
        <p className="mb-4 mt-4 text-lg text-center font-light">
          You can read more about these reasons on our{' '}
          <a
            href="/about"
            className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
          >
            About
          </a>{' '}
          page.
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <div className="text-black bg-black">
        <Header />
        <CallToActionForm />
        <Content />
      </div>
    </main>
  )
}

const ReasonsList = () => {
  const reasons = [
    {
      icon: '📖',
      reason: 'So that we can better understand Biblical history',
    },
    {
      icon: '✝️',
      reason:
        'So that we can be better equipped to engage with translation bias in the Church',
    },
    {
      icon: '🫂',
      reason:
        'So that we can see how God has inspired each generation to translate His word into ever-evolving languages',
    },
  ]

  return (
    <div className="flex w-full justify-left text-white">
      <ul className="flex flex-col gap-2">
        {reasons.map((reason, index) => (
          <InfoCard key={index} icon={reason.icon} title={reason.reason} />
        ))}
      </ul>
    </div>
  )
}
