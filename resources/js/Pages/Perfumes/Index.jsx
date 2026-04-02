import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PerfumeCard from '@/Components/PerfumeCard';


export default function Index({ auth ,perfumes }) {
const Layout = auth.user ? AuthenticatedLayout : GuestLayout;
  return (
        <Layout  user={auth.user} header={<h2 className="text-xl font-semibold">Perfume Collection</h2>}>
            <Head title="Perfumes" />
            <div >
    <div className="relative mx-auto flex min-h-[45vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 font-[var(--font-inter)] text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Curated fragrances for the discerning soul
        </p>
        <h2>Where Every Scent Tells a Story</h2>
        <h2>Our collection</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {perfumes.map((perfume)=>(
            <div>
              {/* {console.log(perfume.id)} */}
              <PerfumeCard key={perfume.id} perfume={perfume} />
            </div>
          ))}
        </div>
    </div>
        </Layout>
    );
}