import { usePageMeta } from '../hooks/usePageMeta'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { SelectedWork } from '../sections/SelectedWork'

export function HomePage() {
  usePageMeta({ path: '/' })

  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Contact />
    </>
  )
}
