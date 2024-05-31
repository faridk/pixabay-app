import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";

interface PaginatorProps {
  page: number;
  setPage: (
    value: number | ((prev: number) => number)
  ) => void;
  itemCount: number;
}

const DEFAULT_PAGE_SIZE = 20;

const Paginator: React.FC<PaginatorProps> = ({ page, setPage, itemCount }) => {
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    if (itemCount > 0) {
      setPageCount(itemCount / DEFAULT_PAGE_SIZE);
    } else {
      setPageCount(1);
    }
  }, [page, pageCount, setPage, itemCount]);
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink size="icon" onClick={() => {
            setPage(1);
          }}>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious size="default" onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}/>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink size="icon" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
        <PaginationNext size="default" onClick={() => {
            if (page < pageCount) {
              setPage(page + 1);
            }
          }}/>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink size="icon" onClick={() => {
              setPage(pageCount);
          }}>
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginator;