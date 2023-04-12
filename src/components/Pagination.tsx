import { useRouter } from 'next/router';

function Pagination() {
  const router = useRouter();
  const page: number = parseInt(router.query.page as string) || 1;

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
        Prev
      </button>
      <span>Page {page}</span>
      <button disabled={page === 3} onClick={() => goToPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
