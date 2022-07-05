import TOC from "../docs/toc.json" assert { type: "json" }

interface TOCItem {
  title: string;
  pages?: [string, string][];
}

export interface DocumentItem {
  slug: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}

export interface DocumentSubjectEntry {
  title: string;
  href: string;
}

export interface DocumentSubject {
  title: string;
  href: string;
  entries: DocumentSubjectEntry[];
}

export const TABLE_OF_CONTENTS: Record<string, DocumentItem> = {}
export const SUBJECTS: DocumentSubject[] = []

for(const parent in (TOC as unknown as TOCItem)){
  const subject = (TOC as unknown as TOCItem)[parent]
  const href = `/${parent}`;
  const file = `docs/${parent}/index.md`;

  TABLE_OF_CONTENTS[parent] = {
    slug: parent,
    title: subject.title,
    href,
    file,
  };

  const subjectData = {
    title: subject.title,
    href,
    entries: []
  }
  SUBJECTS.push(subjectData)

  if(subject.pages) {
    for(const [id, title] of subject.pages) {
      const slug = `${parent}/${id}`;
      const href = `/${slug}`;
      const file = `docs/${slug}.md`;
      const page = {slug, title, href, subject: parent, file}
      TABLE_OF_CONTENTS[slug] = page;
      subjectData.entries.push({title, href})
    }
  }
}

export const SLUGS = Object.keys(TABLE_OF_CONTENTS)