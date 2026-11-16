import portrait480 from '../assets/portrait-480.webp'
import portrait800 from '../assets/portrait-800.webp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Text } from '../components/ui/Text'
import { about } from '../content/site'

export function About() {
  return (
    <section aria-labelledby="about" className="mt-32 md:mt-48">
      <SectionHeading id="about" number="02" label="About">
        About
      </SectionHeading>

      <div className="grid-site mt-12 gap-y-12 md:mt-20">
        <figure className="col-span-3 md:col-span-4">
          <img
            src={portrait800}
            srcSet={`${portrait480} 480w, ${portrait800} 800w`}
            sizes="(min-width: 48rem) 30vw, 75vw"
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            alt="Portrait of Wesley So in a dark suit and red tie, standing in front of a hedge."
            className="aspect-[4/5] w-full bg-plate object-cover"
          />
          <figcaption className="label mt-3 flex justify-between text-muted">
            <span>Wesley So</span>
            <span>Berkeley, CA</span>
          </figcaption>
        </figure>

        <div className="col-span-full md:col-span-6 md:col-start-6">
          <p className="font-serif text-lead">
            <Text value={about.lead} />
          </p>

          <div className="mt-10 space-y-5 text-muted md:mt-14">
            {about.body.map((paragraph, i) => (
              <p key={i} className="max-w-[60ch]">
                <Text value={paragraph} />
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-rule pt-4">
            <h3 className="label text-muted">Away from the keyboard</h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {about.outside.map((item, i) => (
                <li key={i}>
                  <Text value={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
