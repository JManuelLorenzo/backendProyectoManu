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
  const result = await prisma.quote.update({
    where: { ID, deleted: false },
    data: { quote: newQuote },
  });
  return result.count > 0;
}

export async function deleteQuote(ID) {
  const result = await prisma.quote.update({
    where: { ID, deleted: false },
    data: { deleted: true },
  });
  return result.count > 0;
}