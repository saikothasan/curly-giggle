import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">My Blog</h1>
          <p className="text-lg text-muted-foreground">Thoughts, ideas, and tutorials on web development</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="flex flex-col space-y-2">
                  <CardTitle className="line-clamp-1">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{formatDate(post.date)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="w-full py-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">No blog posts found</h2>
            <p className="mt-2 text-muted-foreground">Add markdown files to the content directory to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

