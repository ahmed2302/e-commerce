import {
  faArrowLeft,
  faArrowRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({ setPage, pageCount }) {
  return (
    <>
      <ReactPaginate
        breakLabel={<FontAwesomeIcon icon={faEllipsis} />}
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
        pageCount={pageCount > 1 ? pageCount : 0}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination"
        pageLinkClassName="pagination-link mx-2"
        previousLinkClassName="prev-link"
        nextLinkClassName="next-link"
        activeLinkClassName="active"
        onPageChange={(e) => {
          setPage(e.selected + 1);
        }}
      />
    </>
  );
}
