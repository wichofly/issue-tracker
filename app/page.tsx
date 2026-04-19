import Pagination from './components/Pagination';

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export const Home = async ({ searchParams }: HomeProps) => {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(page ?? '', 10) || 1);

  return <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />;
};

export default Home;
