'use client'

import { InfoCard } from '../components/InfoCard/InfoCard'

const Header = () => {
  return (
    <div className="relative">
      <img
        src="/assets/images/about-banner.png"
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      />
      <div className="absolute top-0 right-0 w-2/3 h-full flex items-center justify-center p-20">
        <h1 className="text-5xl font-semibold text-white text-right"></h1>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="flex flex-col p-8 pt-4 w-full justify-center items-center">
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard
          icon={'❓'}
          title={'What is the Bible Translation Project?'}
        />
        <p className="mt-4 mb-4">
          An effort to show, in an easy to understand way, where your favorite
          translation comes from, what manuscripts were used to create it, and
          why it was made in the first place.
        </p>
      </div>
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard
          icon={'⏳'}
          title={'Why should I care about the history of the Bible?'}
        />
        <p className="mt-4 mb-4">
          The history of the Bible is a part of history.
        </p>
        <p className="mt-4 mb-4">
          From a secular perspective, consider how influential the Bible has
          been for the past 2000 years. Learning about different societies and
          cultures and how they interacted with the Bible is a great way to
          learn about the evolution of literature, literacy, religion, and
          palaeography - the study of ancient writing systems and the
          deciphering and dating of historical manuscripts.
        </p>
        <p className="mt-4 mb-4">
          From a Christian perspective, God is the author of history and the
          Bible. With that said, the Bible has also been <b>interpreted</b> and{' '}
          <b>translated</b> countless times over by flawed people, with God's
          help. We have faith that the word of God, through oral tradition and
          writing, has been preserved and passed down to us today, as He
          intended. However, in history there have also been attempts to change
          the Bible to fit a certain narrative or agenda. These biases have
          influenced the way we read and understand the Bible today, because all
          modern Bibles come from many different manuscripts. Therefore,
          learning more about where our Bibles come from can help us be more
          intentional about how we read and understand God's word, and to see
          potential biases that we may have never been conscious of before. God
          can speak to us through the Bible, <b>and</b> through the history of
          the Bible.
        </p>
      </div>
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard
          icon={'📊'}
          title={'Do you have an agenda for or against certain translations?'}
        />
        <p className="mt-4 mb-4">
          This project does not endorse any particular translation, but instead
          seeks to give you the tools to understand the history and sources of
          all of them openly, without hiding anything or trying to marginalize a
          random translation.
        </p>
        <p className="mt-4 mb-4">
          Reducing translation bias is one of the goals of this project. We hope
          that each translation is represented as honestly as possible, with the
          intention of helping people learn.
        </p>
      </div>
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard icon={'📶'} title={'What is translation bias?'} />
        <p className="mt-4 mb-4">
          Translation bias is when you believe that a certain translation is the
          only "true" word of God. The reality is that when you learn about
          where this particular translation comes from, you'll find that it is
          just like all the rest and was pieced together from many different
          manuscripts, which all come from other manuscripts, and so on. If a
          given translation is the only true translation, what about its source
          material? What about the manuscripts which are closer to the original
          source?
        </p>
        <p className="mt-4 mb-4">
          You could also argue that the oldest manuscripts are the most
          accurate, and therefore the "true" word of God. You'll find that while
          older manuscripts are indeed closer to their original sources, they
          themselves are based on oral tradition, apostles dictating to scribes,
          or are missing entire books of the Bible. We also have to consider
          that direct translations from ancient manuscripts requires a spectrum
          between exact translation word-for-word (which loses meaning due to
          the limitations of language), original author intent (which relies on
          accuracy of interpretation), and paraphrasing (which is the furthest
          from a manuscript source).
        </p>
        <img src="/assets/images/spectrum.png" style={{ width: '100%' }} />
        <p className="mt-4 mb-4">
          Our hope is that learning about the history of Bible translations
          widens your view of how God can speak to us, and inspire you to ask
          questions about where things come from, who wrote them, and why.
        </p>
      </div>
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard icon={'📖'} title={'Why is X translation missing?'} />
        <p className="mt-4 mb-4">
          This project is still in its infancy, and we're working on adding more
          and more translations as we go. There are hundreds and hundreds of
          different translations, manuscripts, and languages to cover, so it
          will take time to organize them all. If you have a translation you'd
          like to see added, please let us know!
        </p>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

export default About
