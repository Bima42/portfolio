import { createFileRoute } from '@tanstack/react-router'
import Contact from '../components/contact/Contact.tsx'

export const Route = createFileRoute('/contact')({
  component: Contact,
})