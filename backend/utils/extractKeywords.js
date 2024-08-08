import natural from "natural";

const extractKeywords = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(text);
  const keywords = [];
  tfidf.listTerms(0).forEach((item) => {
    keywords.push(item.term);
  });
  return keywords;
};

export default extractKeywords;
