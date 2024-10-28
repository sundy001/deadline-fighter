import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { loadBooks } from "@/scanner";

export default async function BooksPage() {
  const books = await loadBooks();

  return books.map(({ name }) => {
    return (
      <div key={name} className="px-3 py-4 flex">
        <Card className="p2">
          <Link href={`/books/${name}`}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>This is a good book</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Link>
        </Card>
      </div>
    );
  });
}
