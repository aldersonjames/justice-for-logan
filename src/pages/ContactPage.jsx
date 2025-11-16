import MediaBooking from '../components/MediaBooking'
import Guestbook from '../components/Guestbook'
import Newsletter from '../components/Newsletter'

const ContactPage = () => {
  return (
    <div className="pt-20">
      <MediaBooking />
      <Guestbook />
      <Newsletter />
    </div>
  )
}

export default ContactPage
