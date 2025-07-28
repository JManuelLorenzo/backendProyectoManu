import prisma from '../prismaclient.js'; // ajustá el path si está en otro lugar

export async function getAllQuotes() {
  return await prisma.quote.findMany({ where: { deleted: false } });
}

export async function createQuote(movie, quote, character) {
  return await prisma.quote.create({
    data: { movie, quote, character, deleted: false },
  });
}
export async function updateQuote(ID, newQuote) {
  const quote = await prisma.quote.findUnique({ where: { ID: ID } });
  if (!quote || quote.deleted) return false;

  await prisma.quote.update({
    where: { ID: ID },
    data: { quote: newQuote },
  });

  return true;
}

export async function deleteQuote(ID) {
  const quote = await prisma.quote.findUnique({ where: { ID: ID } });
  if (!quote || quote.deleted) return false;

  await prisma.quote.update({
    where: { ID: ID },
    data: { deleted: true },
  });

  return true;
}
