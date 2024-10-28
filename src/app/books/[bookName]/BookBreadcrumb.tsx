import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/components/ui/link";

type Props = {
  bookName: string;
  sectionName?: string;
};

export function BookBreadcrumb({ bookName, sectionName }: Props) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href={`/books`}>Books</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {sectionName ? (
            <Link href={`/books/${bookName}`}>{bookName}</Link>
          ) : (
            <BreadcrumbPage>{bookName}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {sectionName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{sectionName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
