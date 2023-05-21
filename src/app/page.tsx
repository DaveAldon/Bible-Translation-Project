import { CallToActionForm } from './components/CallToActionForm/CallToActionForm'

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
    <div className="grid grid-cols-2 gap-10 p-10">
      <div className="flex w-full justify-center">
        <p className="mb-4 lg:w-3/5 sm:w-full text-gray-400 text-lg">
          The Bible Translation Project is an effort to show where your favorite
          translation comes from, what manuscripts were used to create it, and
          why it was made in the first place. Bible translations are often based
          on other translations, various manuscripts, and commentaries. But
          which ones? How far removed are they from the original text? What
          books do they include, or omit? How do they relate to each other? Why
          do they exist? Who wrote them?
        </p>
      </div>
      <div>
        <div className="flex flex-col w-full items-center justify-center">
          <p className="mb-4 text-gray-400 text-lg">
            We believe that these are important questions to ask for three
            reasons:
          </p>
          <ReasonsList />
        </div>
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

  const Reason = (props: { icon: string; reason: string }) => {
    return (
      <li className="border-gray-400 flex flex-row">
        <div className="select-none bg-gray-800 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col rounded-md w-10 h-10 bg-gray-900 justify-center items-center mr-4">
            {props.icon}
          </div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">{props.reason}</div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="flex sm:w-full lg:w-2/3 justify-left text-white">
      <ul className="flex flex-col gap-2">
        {reasons.map((reason) => (
          <Reason icon={reason.icon} reason={reason.reason} />
        ))}
      </ul>
    </div>
  )
}
