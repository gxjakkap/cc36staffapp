interface AnswerAcademicPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerAcademicPage({
  params,
}: AnswerAcademicPageProps) {
  const { id } = await params;
  return <div>{id}</div>;
}
