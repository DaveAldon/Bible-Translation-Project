import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="text-black bg-black">
        <section className="text-gray-600 body-font">
          <div className="max-w-7xl mx-auto flex px-4 lg:flex-row items-center flex-col-reverse">
            <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-8 items-center text-center">
              <h1 className="mb-5 sm:text-6xl text-5xl font-semibold items-center xl:w-2/2 text-white">
                We are making the source and history of Bible translations easy
                to understand
              </h1>
              <p className="mb-4 lg:w-3/5 sm:w-full text-gray-400 text-lg">
                The Bible Translation Project is an effort to show where your
                favorite translation comes from, all the way up to the source,
                being the original authors, and God. Bible translations are
                often based on other translations, various manuscripts, and
                commentaries. But which ones? How far removed are they from the
                original text? What books do they include, or omit? How do they
                relate to each other? Why do they exist? Who wrote them?
              </p>
              <p className="mb-4 xl:w-3/4 text-gray-400 text-lg">
                We believe that these are important questions to ask for three
                reasons:
              </p>
              <ReasonsList />

              <div className="grid grid-cols-2 gap-4"></div>
            </div>

            <div className="lg:max-w-lg lg:w-full w-1/2 mb-20 mr-10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="shape"
                style={{
                  scale: '1.4',
                  margin: 20,
                }}
              >
                <source
                  src="/assets/videos/hebrew_video.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

const ReasonsList = () => {
  return (
    <div className="flex sm:w-full lg:w-2/3 justify-left text-white">
      <ul className="flex flex-col">
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="select-none cursor-pointer bg-gray-700 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-900 justify-center items-center mr-4">
              📖
            </div>
            <div className="flex-1 pl-1 mr-16">
              <div className="font-medium">
                So that we can better understand Biblical history
              </div>
            </div>
          </div>
        </li>
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="select-none cursor-pointer bg-gray-700 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-900 justify-center items-center mr-4">
              ✝️
            </div>
            <div className="flex-1 pl-1 mr-16">
              <div className="font-medium">
                So that we can be better equipped to engage with translation
                bias in the Church
              </div>
            </div>
          </div>
        </li>
        <li className="border-gray-400 flex flex-row mb-2">
          <div className="select-none cursor-pointer bg-gray-700 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-900 justify-center items-center mr-4">
              🫂
            </div>
            <div className="flex-1 pl-1 mr-16">
              <div className="font-medium">
                So that we can see how God has inspired each generation to
                translate His word into ever-evolving languages
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
