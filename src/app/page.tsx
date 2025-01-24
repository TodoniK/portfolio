import Home from '@/components/Sections/Home';
import Jobs from '@/components/Sections/Jobs';
import Projects from '@/components/Sections/Projects';
import Educations from '@/components/Sections/Educations';
import Contacts from '@/components/Sections/Contacts';

export default function Page() {
  return (
      <main>
          <Home/>
          <Jobs/>
          <Educations/>
          <Projects/>
          <Contacts/>
      </main>
  )
}
