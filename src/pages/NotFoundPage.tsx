import { Link } from 'react-router'
import { Arrow } from '../components/ui/Arrow'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta({ title: 'Page not found', path: '/404', noindex: true })

  return (
    <section className="grid-site min-h-[60vh] content-center pt-16">
      <p className="label col-span-full text-cobalt">404</p>
      <h1 tabIndex={-1} className="col-span-full mt-6 text-headline font-medium outline-none md:col-span-8">
        This page doesn’t exist, <span className="font-serif font-normal text-muted italic">yet.</span>
      </h1>
      <p className="col-span-full mt-10">
        <Link to="/" viewTransition className="group inline-flex min-h-11 items-center gap-2 font-medium text-cobalt">
          <Arrow direction="left" className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="link-draw">Back to the homepage</span>
        </Link>
      </p>
    </section>
  )
}
