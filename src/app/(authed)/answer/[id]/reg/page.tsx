interface AnswerRegisPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerRegisPage({
  params,
}: AnswerRegisPageProps) {
  const { id } = await params;
  return <div>{id}</div>;
}
