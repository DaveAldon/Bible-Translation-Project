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

const PersonCard = () => {
  return (
    <div className="p-4">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
          src="/assets/images/creator.jpg"
        />
        <div className="flex-grow sm:pl-8">
          <h2 className="title-font font-medium text-lg text-white">
            David Crawford
          </h2>
          <h3 className="text-gray-500 mb-3">Creator</h3>
          <p className="mb-2">Passionate about the history of the Bible.</p>
          <p className="mb-2">
            Check out David's theology blog at{' '}
            <a className="text-blue-500" href="https://davealdon.com/">
              davealdon.com
            </a>
          </p>
          <p className="mb-4">
            If you have comments or corrections for this site, you can contact
            David at{' '}
            <a className="text-blue-500" href="mailto:davealdonbooks@gmail.com">
              davealdonbooks@gmail.com
            </a>
          </p>
          <span className="inline-flex">
            <a
              href={'https://github.com/DaveAldon'}
              target="_blank"
              className="text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>

            <a
              href={'https://www.linkedin.com/in/davidcrawfordprofile/'}
              target="_blank"
              className="ml-2 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="flex flex-col p-8 pt-4 w-full justify-center items-center">
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <PersonCard />
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
      <div className="lg:w-3/5 sm:w-full text-white text-lg font-light">
        <InfoCard icon={'🧑‍💻'} title={'What are you currently working on?'} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="border-gray-400 flex flex-col select-none bg-gray-800 rounded-md flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <p className="mt-4 mb-4 font-normal">
              Building a comprehensive connection between English translations
            </p>
            <p className="mt-4 mb-4 text-md font-light">
              There are hundreds of intricacies making up the history of
              codices, manuscripts, and translations. They're all interwoven
              between each other, and it takes time to get it right. Once this
              it done, we will focus on other languages and their translation
              origins.
            </p>
          </div>
          <div className="border-gray-400 flex flex-col select-none bg-gray-800 rounded-md flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <p className="mt-4 mb-4 font-normal">
              Writing easy-to-understand, short descriptions of each translation
            </p>
            <p className="mt-4 mb-4 text-md font-light">
              We want to make sure that each translation is represented properly
              with a succinct description of its history and purpose. This takes
              a lot of writing time to go through, so you'll find many
              translations that are missing descriptions as we work through them
              all.
            </p>
          </div>
        </div>
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
